import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 10000,
});

export const shortenUrl = async (longUrl, customCode) => {
  try {
    const response = await API.post("/url/shorten", { longUrl, customCode });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Connection Error";
  }
};

export const pingServer = async () => {
  try {
    const response = await API.get("/ping");
    return response.data;
  } catch (error) {
    return null;
  }
};
