import { io } from "socket.io-client";

const URL = "http://localhost:7291";
export const socket = io(URL);
