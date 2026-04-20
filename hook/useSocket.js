import { useEffect, useRef } from "react";
import {getSocket} from "../lib/socket";

export default function useSocket(room, username, onMessage, onRoomUsers) {
  const socketRef = useRef(null);

  useEffect(()=>{
    if (!room || !username) return;

    const socket = getSocket();
    socketRef.current = socket;

    socket.connect();
    socket.emit("join_room", {room, username});

    socket.on("receive_message", onMessage);
    socket.on("room_users", onRoomUsers);
    socket.on("user_joined", ({username : u, message}) => {
        onMessage({sender: "System", username: "System", message: message || `${u} has joined the room`});
    });
    socket.on("user_left", ({username: u, message}) =>{
        onMessage({sender: "System", username: "System", message: message || `${u} has left the room`});
    });

    return () => {
        socket.off("receive_message", onMessage);
        socket.off("room_users", onRoomUsers);
        socket.off("user_joined");
        socket.off("user_left");
        socket.disconnect();
    }

  },[room,username,onMessage,onRoomUsers])

  const sendMessage = (message) => {
    socketRef.current?.emit("send_message", message);
  }

  return {sendMessage};
}