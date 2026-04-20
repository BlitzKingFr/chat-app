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
    <div className="flex gap-2 p-3 border-t border-[#eee]">
      <input
        className='flex-1 px-8 py-12 border-r-8 border-[#ddd]'
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Type a message..."
      />
      <button 
        onClick={handleSend}
        className='px-8 py-16 cursor-pointer'
      >
        Send
      </button>
    </div>
  );
}