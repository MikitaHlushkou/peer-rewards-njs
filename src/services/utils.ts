import axios from "axios";

export const localService = axios.create({
  baseURL: "http://localhost:3000/api",
});
