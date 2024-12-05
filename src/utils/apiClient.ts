import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const API_READ_ACCESS_TOKEN = process.env.API_READ_ACCESS_TOKEN;

const movieDBClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
  },
});

export default movieDBClient;
