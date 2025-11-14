// services/api/auth.ts
import axiosInstance from '@/config/axiosConfig';
import { Member } from '@/types';
import { members } from '@/data/mockData'
import { GOOGLE_SCRIPT_URL_USER } from '@/untils/Constants'


export interface LoginResponse {
    user: Member;
    token: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

const apiUser = () => {

}

export const authService = {

    async login(username: string, password: string): Promise<Member> {
        try {
            const response = await axiosInstance.post<LoginResponse>(GOOGLE_SCRIPT_URL_USER, {
                username,
                password,
            } as LoginRequest);

            const { user, token } = response.data;

            // Lưu token vào localStorage
            localStorage.setItem('auth_token', token);
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        } catch (error: any) {
            // Xử lý lỗi cụ thể
            if (error.response?.data?.message) {
                throw new Error(error.response.data.message);
            }
            throw new Error('Đăng nhập thất bại. Vui lòng thử lại.');
        }
    },

    async logout(): Promise<void> {
        try {
            await axiosInstance.post('/auth/logout');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Luôn xóa token và user data dù API có thành công hay không
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user');
        }
    },

    async getCurrentUser(): Promise<Member | null> {
        try {
            const token = localStorage.getItem('auth_token');
            if (!token) {
                return null;
            }

            const response = await axiosInstance.get<Member>('/auth/me');
            return response.data;
        } catch (error: any) {
            // Nếu lỗi 401, clear token
            if (error.response?.status === 401) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('user');
            }
            return null;
        }
    },

    async refreshToken(): Promise<string | null> {
        try {
            const response = await axiosInstance.post<{ token: string }>('/auth/refresh');
            const { token } = response.data;

            localStorage.setItem('auth_token', token);
            return token;
        } catch (error) {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user');
            return null;
        }
    },

    // Kiểm tra xem user đã đăng nhập chưa
    isAuthenticated(): boolean {
        if (typeof window === 'undefined') return false;
        return !!localStorage.getItem('auth_token');
    },

    // Lấy token
    getToken(): string | null {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem('auth_token');
    }
};