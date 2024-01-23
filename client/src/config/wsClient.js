import { io } from 'socket.io-client';

export const socket = io(`wss://${window.location.hostname}:8080`, {
  withCredentials: true,
  autoConnect: false
});
