import next from 'next';
import { createServer } from 'http';
import { parse } from 'url';
import { Server } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer((req, res) => {
        const parsedUrl = parse(req.url, true);

        //socket io
        if (parsedUrl.pathname && parsedUrl.pathname.startsWith('/socket.io')) {
            return;
        }
        handle(req, res, parsedUrl);
    })

    const io = new Server(httpServer, {
        cors: {
            origin: '*',
            transport: ['websocket', 'polling']
        }
    });

    io.on("connection", (socket) => {
        console.log("a user connected, ID:", socket.id);

        //join a chatroom
        socket.on("join_room", ({ room, username }) => {
            if (!room || !username) return;

            socket.join(room);
            socket.data.username = username;
            socket.data.room = room;

            //display newly joined user to other users in the room
            socket.to(room).emit("user_joined", {
                username: socket.data.username,
                message: `${socket.data.username} has joined the room.`
            });
            //current users in the room
            const users = [...io.sockets.adapter.rooms.get(room) ?? []]
                .map(id => io.sockets.sockets.get(id).data.username)
                .filter(Boolean);
            io.to(room).emit("room_users", users);
        });

        socket.on("send_message", (message) => {
            const room = socket.data.room;
            if (!room || !message) return;

            io.to(room).emit("receive_message", {
                sender: socket.data.username,
                username: socket.data.username,
                message,
                time: new Date().toISOString()
            });
        });

        //disconnect user
        socket.on("disconnect", () => {
            const {username, room} = socket.data;
            if(room){
                socket.to(room).emit("user_left", {
                    username,
                    message: `${username} has left the room.`
                });

                const users = [...(io.sockets.adapter.rooms.get(room) ?? [])]
                    .map(id => io.sockets.sockets.get(id)?.data?.username)
                    .filter(Boolean);
                io.to(room).emit("room_users", users);
            }
        });
    });

    httpServer.listen(3000, () => {
        console.log('> Server is running on http://localhost:3000');
    });
});

