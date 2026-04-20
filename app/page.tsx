"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";



export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("general");

  const join = () => {
    if(!username.trim()) return;
    localStorage.setItem("username", username);
    router.push(`/chat/${room}`);
  }

  return (
    <div>
      <h1>Chat Lobby</h1>
      <input
        type="text"
        placeholder="Enter your username"
        onChange={(e)=> setUsername(e.target.value)}
        value={username}
      />
      <input
        type="text"
        placeholder="Enter room name"
        onChange={(e)=> setRoom(e.target.value)}
        value={room}
      />
      <button onClick={join}>Join</button>
    </div>
  );
}
