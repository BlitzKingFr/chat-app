import { io } from "socket.io-client";

let socket;

export const getSocket = () => {
    if(!socket) {
        socket = io("http://localhost:3000",{
            autoConnect: false,
        });
    }
    return socket;
}