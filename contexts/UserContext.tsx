// contexts/UserContext.tsx
"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Member } from '@/types';
import { GOOGLE_SCRIPT_URL_USER } from '@/untils/Constants'
import { members } from '@/data/mockData';
import { encrypt, decrypt, encryptForComparison } from '@/untils/encryption';


interface UserContextType {
    updateMemberProfile: (updates: {
        id: string | number;
        name?: string;
        nickName?: string;
        ingameName?: string;
        avatar?: string;
        maxim?: string;
        sect?: string;
        level?: number;
    }) => Promise<boolean>;
    updatePassword: (updatePass: { id: string | number; userId: string; password: string }) => Promise<boolean>;
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

                // Mã hoá password trước khi lưu xuống localStorage
                const usersWithEncryptedPassword = data.map(user => ({
                    ...user,
                    password: "lamgicopasshehe" // Mã hoá password
                }));

                // Lưu lại xún local storage
                localStorage.setItem('users', JSON.stringify(usersWithEncryptedPassword));

                // Giữ nguyên password gốc trong state để login
                setUsers(data);

                // Cập nhật lại user hiện tại vào state và localStorage
                const savedUser = localStorage.getItem('currentUser');
                if (savedUser && savedUser !== '' && savedUser !== 'null') {
                    var userLocal = JSON.parse(savedUser);
                    var userDB = data.find(it => it.userId == userLocal.userId)
                    if (userDB) {
                        localStorage.setItem('currentUser', JSON.stringify({ ...userDB, password: "lamgicopasshehe"}));
                        setUser(userDB);
                    } else {
                        setUser({ ...userLocal, password: "lamgicopasshehe"});
                    }
                }
            }
            loadUserGGs();
        } catch (error) {
            console.error('Error parsing localStorage data:', error);
        }
    }

    const updateMember = async (memberData: Partial<Member> & { id: string | number }): Promise<boolean> => {
        try {
            const response = await fetch(GOOGLE_SCRIPT_URL_USER, {
                method: 'POST',
                body: JSON.stringify({
                    action: 'update',
                    ...memberData
                }),
            });

            const result = await response.json();

            if (result.success) {
                console.log('Cập nhật thành viên thành công');
                return true;
            } else {
                console.error('Lỗi khi cập nhật:', result.error);
                return false;
            }
        } catch (error) {
            console.error('Lỗi kết nối:', error);
            return false;
        }
    };

    const updatePassword = async (updatePass: { id: string | number; userId: string; password: string }): Promise<boolean> => {
        console.log("dữ liệu mún cập nhật", updatePass);
        return await updateMember(updatePass);
    };

    const updateMemberProfile = async (updates: {
        id: string | number;
        name?: string;
        nickName?: string;
        ingameName?: string;
        avatar?: string;
        maxim?: string;
        sect?: string;
        level?: number;
    }): Promise<boolean> => {
        return await updateMember(updates);
    };

    useEffect(() => {
        loadUser();
    }, []);

    const login = async (username: string, password: string): Promise<boolean> => {
        setIsLoading(true);
        try {
            var checkUser = users.find(it => it.userId == username);
            if (checkUser) {
                const encryptedInputPassword = encryptForComparison(password);
                const encryptedUserPassword = encryptForComparison(checkUser.password);
                if (encryptedUserPassword === encryptedInputPassword) {
                    setUser(checkUser);
                    const userToStore = { ...checkUser, password: encrypt(checkUser.password) };
                    localStorage.setItem('currentUser', JSON.stringify(userToStore));
                    return true;
                }
            }
            return false;
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
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setUser(null);
            setIsLoading(false);
        }
    };

    const value: UserContextType = {
        updateMemberProfile,
        updatePassword,
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