// contexts/UserContext.tsx
"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Member } from '@/types';
import { GOOGLE_SCRIPT_URL_USER } from '@/untils/Constants'
import { members } from '@/data/mockData';

interface UserContextType {
    user: Member | null;
    users: Member[];
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    loadUser: () => void;
    isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<Member | null>(null);
    const [users, setUsers] = useState<Member[]>(members);
    const [isLoading, setIsLoading] = useState(false);

    const loadUserFromGoogleSheet = async (): Promise<Member[]> => {
        try {
            const response = await fetch(GOOGLE_SCRIPT_URL_USER);
            const result = await response.json();

            if (result.success && result.data) {
                return result.data.map((item: any) => {
                    const cleanItem: any = {};
                    Object.keys(item).forEach(key => {
                        const cleanKey = key.trim();
                        cleanItem[cleanKey] = item[key];
                    });
                    return {
                        id: Number(cleanItem.id) || 0,
                        name: cleanItem.name || '',
                        userId: cleanItem.userid || cleanItem.userId || '',
                        nickName: cleanItem.nickname || cleanItem.nickName || '',
                        password: cleanItem.password || '',
                        ingameName: cleanItem.ingamename || cleanItem.ingameName || '',
                        role: (cleanItem.role as 'guild-master' | 'vice-master' | 'hall-master' | 'village-master' | 'manager' | 'elder' | 'elite' | 'member') || 'member',
                        avatar: cleanItem.avatar || '',
                        maxim: cleanItem.maxim || '',
                        sect: cleanItem.sect || '',
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

    const loadUser = () => {
        try {
            const loadUserGGs = async () => {
                var data = await loadUserFromGoogleSheet();
                var dataUserLocal = localStorage.getItem('users');
                console.log("data", data);

                const usersWithoutPassword = data.map(user => ({
                    ...user,
                    password: ''
                }));

                if (data.length != (JSON.parse(dataUserLocal || '[]')?.length || 0)) {
                    localStorage.setItem('users', JSON.stringify(usersWithoutPassword));
                    setUsers(data); // Cập nhật state users
                } else {
                    const localUsers = JSON.parse(dataUserLocal || '[]');
                    setUsers(localUsers); // Cập nhật state users
                }
            }
            loadUserGGs();

            const savedUser = localStorage.getItem('currentUser');
            if (savedUser && savedUser != '' && savedUser != 'null') {
                const userData = JSON.parse(savedUser);
                if (userData.password) {
                    userData.password = '';
                }
                setUser(userData);
            }
        } catch (error) {
            console.error('Error parsing localStorage data or Error load data from Google Sheet:', error);
        }
    }

    useEffect(() => {
        loadUser();
    }, []);

    const login = async (username: string, password: string): Promise<boolean> => {
        setIsLoading(true);
        try {
            // Tìm user trong state users (đã được cập nhật)
            var checkUser = users.find(it => it.userId == username)
            if (checkUser && checkUser.password == password) {
                setUser(checkUser);
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
        users: users, // Dùng state users
        login,
        logout,
        loadUser,
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