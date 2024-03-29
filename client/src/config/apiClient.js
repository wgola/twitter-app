import axios from 'axios';

export const apiClient = axios.create({
  baseURL: `https://${window.location.hostname}:8080`,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});
