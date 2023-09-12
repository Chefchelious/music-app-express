import axios from 'axios';
import { apiUrl } from './constants';

const axiosApi = axios.create({
  baseURL: apiUrl,
});

export  default axiosApi;