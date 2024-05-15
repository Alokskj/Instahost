import { Server } from 'socket.io';
import _config from './_config';
const io = new Server();

export const socketServer = (server: any) => {
    io.attach(server);
};
io.on('connection', (socket) => {
    socket.on('subscribe', (channel) => {
        socket.join(channel);
        socket.emit('message', `Joined to ${channel}`);
    });
});

export default io;
