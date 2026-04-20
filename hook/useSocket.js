import { useEffect, useRef } from "react";
import {getSocket} from "../socket";
import { use } from "react";

export default function useSocket(room, username, onMessage, onRoomUsers) {
  const socketRef = useRef(null);

  useEffect(()=>{
    const socket = getSocket();
    socketRef.current = socket;

    socket.connect();
    socket.emit("join room", {room, username});

    socket.on("receive message", onMessage);
    socket.on("room-users", onRoomUsers);
    socket.on("user joined", ({username : u}) => {
        onMessage({username: "System", text: `${u} has joined the room`});
    });
    socket.on("user left", ({username: u}) =>{
        onMessage({username: "System", text: `${u} has left the room`});
    });

    return () => {
        socket.off("receive message", onMessage);
        socket.off("room-users", onRoomUsers);
        socket.off("user joined");
        socket.off("user left");
        socket.disconnect();
    }

  },[room,username])

  const sendMessage = (message) => {
    socketRef.current?.emit("send message", {room, username, text: message});
  }

  return {sendMessage};
}