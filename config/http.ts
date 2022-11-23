import axios from 'axios';

export default axios.create({
  baseURL: process.env['PUBLIC_SERVER_ENDPOINT'],
  timeout: 60000,
});
