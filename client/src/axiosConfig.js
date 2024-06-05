import axios from 'axios';

const baseURL = 'http://localhost:3001';
// const baseURL = 'https://bbms-server.vercel.app';

const instance = axios.create({
  baseURL,
  timeout: 5000,
});

export default instance;
