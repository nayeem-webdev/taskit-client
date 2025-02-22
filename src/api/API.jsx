import axios from "axios";

export const API = axios.create({
  // baseURL: "https://taskit-server.vercel.app",
  baseURL: "http://localhost:5000",
  headers: { "Content-Type": "application/json" },
});
