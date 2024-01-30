import axios from 'axios';

const baseURL = axios.create({
  baseURL: 'https://fixflex.onrender.com/api/v1',
  withCredentials: true,
});

export default baseURL;
