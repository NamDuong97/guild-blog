"use client";
import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import styles from './LoginModal.module.css';
import { useUser } from '@/contexts/UserContext'
import { useAlert } from '@/contexts/AlertContext';


interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading, logout, user } = useUser();
    const { showAlert } = useAlert();


    const handleLogin = async () => {
        const success = await login(username, password);
        if (success) {
            showAlert('Đăng nhập thành công!', 'success');
            onClose();
            setUsername('');
            setPassword('');
        } else {
            showAlert('Đăng nhập thất bại!', 'warning');
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                {/* Nút đóng */}
                <button onClick={onClose} className={styles.closeButton}>
                    ×
                </button>

                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.iconWrapper}>
                        <User className={styles.headerIcon} />
                    </div>
                    <h2 className={styles.title}>Đăng Nhập</h2>
                    <p className={styles.subtitle}>Chào mừng bạn trở lại!</p>
                </div>

                {/* Form */}
                <div className={styles.form}>
                    {/* Username */}
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Tài khoản</label>
                        <div className={styles.inputWrapper}>
                            <User className={styles.inputIcon} />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Nhập tài khoản"
                                className={styles.input}
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Mật khẩu</label>
                        <div className={styles.inputWrapper}>
                            <Lock className={styles.inputIcon} />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Nhập mật khẩu"
                                className={styles.input}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className={styles.togglePassword}
                            >
                                {showPassword ? (
                                    <EyeOff className={styles.eyeIcon} />
                                ) : (
                                    <Eye className={styles.eyeIcon} />
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={handleLogin}
                        disabled={isLoading}
                        className={styles.submitButton}
                    >
                        {isLoading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;