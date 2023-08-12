import axios from 'axios';

const API_URL = 'http://127.0.0.1:8080';

export const API = axios.create({
  baseURL: API_URL,
});
