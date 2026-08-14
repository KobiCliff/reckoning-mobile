import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = '10.182.19.97';

const api = axios.create({
    baseURL: API_BASE_URL,
});

api.interceptors.request.use(async (config) =>{
    const token = await AsyncStorage.getItem('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;