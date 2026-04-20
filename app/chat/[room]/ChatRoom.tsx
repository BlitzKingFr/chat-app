"use client"

import { useState, useCallback } from "react"
import useSocket from "../../../hook/useSocket"
import ChatWindow from "@/components/ChatWindow"
import MessageInput from "@/components/MessageInput"

interface ChatRoomProps {
  room: string
}

interface Message {
  sender: string;
  username: string;
  message: string;
}

const ChatRoom = ({ room }: ChatRoomProps) => {
  const [username] = useState(() => {
    if (typeof window === "undefined") return "Guest";
    return localStorage.getItem("username") || "Guest";
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<string[]>([]);

  const onMessage = useCallback((msg: Message) => {
    setMessages(prev => [...prev, msg]);
  }, []);

  const { sendMessage } = useSocket(room, username, onMessage, setUsers);

  return (
    <div className="flex h-screen bg-slate-100 text-slate-900">
      <aside className="w-72 border-r border-slate-200 bg-white/80 p-5 backdrop-blur">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Online
        </h3>
        <div className="space-y-2">
          {users.map(u => (
            <div key={u} className="flex items-center gap-2 rounded-md px-2 py-1 text-sm text-slate-700">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              {u}
            </div>
          ))}
        </div>
      </aside>

      <main className="flex flex-1 flex-col bg-slate-50">
        <div className="border-b border-slate-200 bg-white px-6 py-4 text-sm font-medium text-slate-700 shadow-sm">
          Room: <span className="font-semibold text-slate-900">{room}</span>
        </div>

        <ChatWindow messages={messages} currentUser={username} />
        <MessageInput onSend={sendMessage} />
      </main>
    </div>
  );
}

export default ChatRoom