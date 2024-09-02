import app from './app';
import SocketService from "./services/socket";
import dotenv from 'dotenv';

// Load .env
dotenv.config();

const port = process.env.PORT ? process.env.PORT : 8000;
const socketService = new SocketService();
const server = require('http').createServer(app);

server.listen(port, () => console.log(`Server is listening on port ${port}.`));

socketService.io.attach(server)
socketService.initListeners();
