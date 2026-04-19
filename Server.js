import next from 'next';
import { createServer } from 'http';
import { parse } from 'url';
import { Server } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer((req,res) => {
        
    })
});