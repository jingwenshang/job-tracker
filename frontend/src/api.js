// src/api.js
import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE,
    withCredentials: true,
});


API.interceptors.request.use(config => {
    const token = localStorage.getItem('token');

    const skipAuth = ['/login', '/register'].some(path =>
        config.url.includes(path)
    );

    if (token && !skipAuth) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default API;





/*// src/api.js
import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8080/api',
});


API.interceptors.request.use(config => {
    const token = localStorage.getItem('token');

    const skipAuth = ['/login', '/register'].some(path => config.url.includes(path));

    if (token && !skipAuth) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default API;
*/
