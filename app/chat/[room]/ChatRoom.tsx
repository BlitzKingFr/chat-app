"use client"

import { useState, useCallback, useEffect } from "react"
import useSocket from "../../../hook/useSocket"

const ChatRoom = () => {
  const socket = useSocket();

  return (
    <div>ChatRoom</div>
  )
}

export default ChatRoom