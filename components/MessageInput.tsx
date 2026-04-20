'use client';

import { useState } from 'react';

interface MessageInputProps {
  onSend: (text: string) => void;
}

export default function MessageInput({ onSend }: MessageInputProps) {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText('');
  };
  return (
    <div className="flex items-center gap-2 border-t border-slate-200 bg-white p-3 sm:p-4">
      <input
        className="flex-1 rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            handleSend();
          }
        }}
        placeholder="Type a message..."
      />
      <button 
        onClick={handleSend}
        className="cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 active:scale-[0.99]"
      >
        Send
      </button>
    </div>
  );
}