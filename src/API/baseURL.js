import axios from 'axios';

const baseURL = axios.create({
  baseURL: 'https://server.fixflex.tech/api/v1/',
  withCredentials: true,
});

export function getAccessToken() {
  return localStorage.getItem('accessToken');
}

export function setAccessToken(token) {
  localStorage.setItem('accessToken', token);
}

// Request interceptor to add the auth token
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

// Response interceptor to handle token expiration
baseURL.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.response.data.message === 'Token expired' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const { data } = await baseURL.get('/auth/refresh-token');
        setAccessToken(data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return baseURL(originalRequest); // Retry the original request with the new token
      } catch (refreshError) {
        console.error('Failed to refresh token:', refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default baseURL;
