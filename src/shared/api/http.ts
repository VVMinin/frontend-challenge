import axios from "axios";
import { env } from "../config/env";

export const http = axios.create({
  baseURL: "https://api.thecatapi.com/v1",
});

if (env.catApiKey) {
  http.defaults.headers.common["x-api-key"] = env.catApiKey;
}
