import axios from 'axios';

const baseURL = axios.create({
  baseURL: 'https://server.fixflex.tech/api/v1/',
  withCredentials: true,
});

export default baseURL;
