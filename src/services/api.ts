import axios from "axios";

export const localService = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});
