"use client"

import { useRef, useEffect } from "react"

interface Message {
  sender: string | number;
  username: string;
  message: string;
}

interface ChatWindowProps {
  messages: Message[];
  currentUser: string | number;
}

const ChatWindow = ({ messages, currentUser }: ChatWindowProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4 sm:px-6">
      {messages.map((msg, i) => (
        <div key={i} className={`${msg.sender === currentUser ? "text-right" : "text-left"}`}>
          <span className="mb-1 block text-[11px] font-medium text-slate-500">{msg.username}</span>
          <div className={`
              inline-block max-w-[78%] rounded-2xl px-4 py-2 text-sm leading-relaxed break-words shadow-sm
              ${msg.sender === currentUser
              ? "border border-emerald-200 bg-emerald-100 text-emerald-950"
              : "border border-slate-200 bg-white text-slate-800"}`
          }>
            {msg.message}
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  )
}

export default ChatWindow