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
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-semibold text-slate-900">Chat Lobby</h1>
        <p className="mt-2 text-sm text-slate-600">
          Pick a username and room to start chatting.
        </p>

        <div className="mt-6 space-y-3">
          <input
            type="text"
            placeholder="Enter your username"
            onChange={(e)=> setUsername(e.target.value)}
            value={username}
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />
          <input
            type="text"
            placeholder="Enter room name"
            onChange={(e)=> setRoom(e.target.value)}
            value={room}
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <button
          onClick={join}
          className="mt-5 w-full cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 active:scale-[0.99]"
        >
          Join Room
        </button>
      </section>
    </main>
  );
}
