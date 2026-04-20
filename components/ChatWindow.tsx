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
    <div className="h-100 overflow-y-auto">
      {messages.map((msg, i) => (
        <div key={i} className={`mb-2 ${msg.sender === currentUser ? "text-right" : "text-left"}`}>
          <span className="text-[11px] text-[#888] block">{msg.username}</span>
          <div className={`
              inline-block px-3 py-2 rounded-xl max-w-[70%] wrap-break-word
              ${msg.sender === currentUser
              ? "bg-[#DCF8C6] border-none"
              : "bg-white border border-[#eee]"}`
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