import axios from 'axios';
import { baseURL } from '../config/Constants';

const api = axios.create({
    baseURL,
    timeout: 10000
});

export default api;
