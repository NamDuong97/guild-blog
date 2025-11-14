
// contexts/UserContext.tsx
"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';
import { Member } from '@/types';
import { authService } from '@/services/api/authService';
import { GOOGLE_SCRIPT_URL_USER } from '@/untils/Constants'
import { json } from 'stream/consumers';


interface UserContextType {
    user: Member | null;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<Member | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const userFromGGSheet = useRef<Member[]>([]);

    const loadUserFromGoogleSheet = async (): Promise<Member[]> => {
        try {
            const response = await fetch(GOOGLE_SCRIPT_URL_USER);
            const result = await response.json();

            if (result.success && result.data) {
                return result.data.map((item: any) => {
                    const cleanItem: any = {};
                    Object.keys(item).forEach(key => {
                        const cleanKey = key.trim(); // Remove spaces from both ends
                        cleanItem[cleanKey] = item[key];
                    });
                    return {
                        id: Number(cleanItem.id) || 0,
                        name: cleanItem.name || '',
                        userId: cleanItem.userid || cleanItem.userId || '',
                        password: cleanItem.password || '',
                        ingameName: cleanItem.ingamename || cleanItem.ingameName || '',
                        role: (cleanItem.role as 'guild-master' | 'vice-master' | 'hall-master' | 'village-master' | 'manager' | 'elder' | 'elite' | 'member') || 'member',
                        avatar: cleanItem.avatar || '',
                        level: Number(cleanItem.level) || 1,
                        joinDate: cleanItem.joindate || cleanItem.joinDate || '',
                        lastActive: cleanItem.lastactive || cleanItem.lastActive || ''
                    } as Member;
                });
            } else {
                console.log("No data found or request failed:", result);
                return [];
            }

        } catch (error) {
            console.log("Error when load member from Google Sheet", error);
            return [];
        }
    }

    useEffect(() => {
        // hàm lấy user từ Google Sheet và lưu xuống local nếu local chưa có
        const loadUsers = async () => {
            var data = await loadUserFromGoogleSheet();
            userFromGGSheet.current = data;
            localStorage.setItem('users', JSON.stringify(data));
        }

        var dataUserLocal = localStorage.getItem('users');
        if (dataUserLocal && dataUserLocal != '' && dataUserLocal != 'null' && dataUserLocal != '[]') {
            userFromGGSheet.current = JSON.parse(dataUserLocal);
        } else {
            loadUsers();
        }

        const savedUser = localStorage.getItem('currentUser');
        if (savedUser && savedUser != '' && savedUser != 'null') {
            const userData = JSON.parse(savedUser);
            setUser(userData);
            // duy trì đăng nhập
        }
    }, []);

    const login = async (username: string, password: string): Promise<boolean> => {
        setIsLoading(true);
        try {
            console.log("danh sách user", userFromGGSheet.current);
            var checkUser = userFromGGSheet.current.find(it => it.userId == username)
            console.log("du liệu user tìm thấy", checkUser);
            if (checkUser && checkUser.password == password) {
                setUser(checkUser);
                // Đăng nhập thành công thì lưu user xún localStorage để duy trì đăng nhập
                const userToStore = { ...checkUser, password: '' };
                localStorage.setItem('currentUser', JSON.stringify(userToStore));
                return true;
            }
            return false
        } catch (error: any) {
            console.error('Login failed:', error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            setUser(null);
            localStorage.setItem('currentUser', '');
            console.log("logout thành công")
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setUser(null);
            setIsLoading(false);
        }
    };

    const value: UserContextType = {
        user,
        login,
        logout,
        isLoading,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};