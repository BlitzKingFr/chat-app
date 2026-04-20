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
    <div className="flex h-screen bg-gray-500">
      <aside className="w-64 border-r border-[#eee] p-4">
        <h3 className="font-bold mb-4">Online</h3>
        <div className="space-y-2">
          {users.map(u => (
            <div key={u} className="text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              {u}
            </div>
          ))}
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <div className="p-4 border-b font-medium text-gray-700">
          Room: {room}
        </div>

        <ChatWindow messages={messages} currentUser={username} />
        <MessageInput onSend={sendMessage} />
      </main>
    </div>
  );
}

export default ChatRoom