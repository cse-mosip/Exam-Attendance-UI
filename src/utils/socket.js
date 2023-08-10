import { io } from "socket.io-client";

const URL = process.env.REACT_APP_SOCKET_HOST;

export const socket = io(URL);
