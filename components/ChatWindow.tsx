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
    <div style={{ height: "400px", overflowY: "auto" }}>
      {messages.map((msg, i) => (
        <div key={i} style={{ textAlign: msg.sender === currentUser ? "right" : "left", marginBottom: 8 }}>
          <span style={{ fontSize: 11, color:'#888', display: 'block' }}>{msg.username}</span>
          <div style={{
            display: "inline-block",
            padding: "8px 12px",
            borderRadius: 12,
            backgroundColor: msg.sender === currentUser ? "#DCF8C6" : "#FFF",
            maxWidth: "70%",
            wordBreak: "break-word",
            border: msg.sender === currentUser ? "none" : "1px solid #eee"
          }}>
            {msg.message}
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  )
}

export default ChatWindow