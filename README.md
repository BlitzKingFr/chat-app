# 💬 My Chat App

A real-time chat application built with **Next.js and Socket.IO**, allowing users to join chat rooms and communicate instantly.

---

## 🚀 Features

* 💬 Real-time messaging with WebSockets
* 🧑 Join chat rooms using a username
* 👥 Live user updates in each room
* ⚡ Fast and responsive UI with Next.js App Router
* 🔌 Custom `useSocket` hook for clean socket management

---

## 🛠️ Tech Stack

**Frontend:**

* Next.js (App Router)
* React
* JavaScript

---

## 📂 Project Structure

```bash
my-chat-app/
├── server.js                 # Socket.IO + Express server
├── package.json
├── next.config.js
│
├── lib/
│   └── socket.js             # Socket instance setup
│
├── hooks/
│   └── useSocket.js          # Custom hook for socket handling
│
└── app/
    ├── layout.js             # Root layout
    ├── page.js               # Home page (join room)
    │
    └── chat/
        └── [room]/
            ├── page.js       # Dynamic room route
            └── ChatRoom.jsx  # Chat UI component
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/my-chat-app.git
cd my-chat-app
```

### 2. Install dependencies

```bash
npm install
```

---

## ▶️ Running the App

### Start the server

```bash
node server.js
```

### Start Next.js app

```bash
npm run dev
```

App will run on:

* Frontend: `http://localhost:3000`
* Backend: `http://localhost:5000` (or your configured port)

---

## 🔌 Socket Workflow

1. User joins a room → `join-room`
2. Server tracks users per room
3. Messages are sent → `send-message`
4. All users receive → `receive-message`
5. Active users update → `room-users`

---

## 🧠 How It Works

* `socket.js` → creates and exports a socket connection
* `useSocket.js` → handles connection, events, and cleanup
* `[room]/page.js` → dynamic routing for chat rooms
* `ChatRoom.jsx` → UI + message handling

---

## 🌟 Future Improvements

* 🔐 Authentication (NextAuth / JWT)
* 💾 Store messages (MongoDB)
* 📸 Image/file sharing
* 🟢 Online/offline status
* ✉️ Private messaging

---



## 📄 License

MIT License

---

## 👨‍💻 Author

Jevis Kafle
GitHub: https://github.com/BlitzKingFr

---
