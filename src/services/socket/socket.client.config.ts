import { BASE_URL } from "@/constants/host";
import { io } from "socket.io-client";

export const socket = io(BASE_URL, {
  withCredentials: true,
  transports: ["websocket"],
  autoConnect: false,
});
