// services/api/axiosConfig.ts
import axios from 'axios';

// Tạo instance axios với cấu hình mặc định
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    timeout: 10000,
    // headers: {
    //     'Content-Type': 'application/json',
    // },
});

// Request interceptor - thêm token vào header
// axiosInstance.interceptors.request.use(
//     (config) => {
//         // Lấy token từ localStorage hoặc cookie
//         const token = localStorage.getItem('auth_token');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// Response interceptor - xử lý lỗi global
// axiosInstance.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error) => {
//         // Xử lý lỗi HTTP status code
//         if (error.response?.status === 401) {
//             // Token hết hạn, đăng xuất user
//             localStorage.removeItem('auth_token');
//             localStorage.removeItem('user');
//             window.location.href = '/login';
//         }

//         return Promise.reject(error);
//     }
// );

export default axiosInstance;