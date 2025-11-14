// services/api/auth.ts
import { Member } from '@/types';
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxHiBpLQkP8Hs8IdzVaysEqSKXZrZTIEucT9sKjR0W-KZ82RU3oQFwEAMaCiz1fd6TO/exec';

export const WheelHistory = {
    async login(username: string, password: string): Promise<Member> {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        return response.json();
    },

    async logout(): Promise<void> {
        await fetch('/api/auth/logout', { method: 'POST' });
    },

    async getCurrentUser(): Promise<Member | null> {
        try {
            const response = await fetch('/api/auth/me');
            if (response.ok) {
                return response.json();
            }
            return null;
        } catch {
            return null;
        }
    }
};