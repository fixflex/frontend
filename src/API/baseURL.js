import axios from 'axios';

const baseURL = axios.create({
  baseURL: 'https://server.fixflex.tech/api/v1/',
  withCredentials: true,
});

export function getAccessToken() {
  return localStorage.getItem('accessToken');
}

baseURL.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default baseURL;
