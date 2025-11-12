"use client";
import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import styles from './LoginModal.module.css';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log('Login:', { username, password });
        alert(`Đăng nhập với tài khoản: ${username}`);
        onClose();
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

                    {/* Remember & Forgot */}
                    <div className={styles.options}>
                        <label className={styles.remember}>
                            <input type="checkbox" className={styles.checkbox} />
                            <span>Ghi nhớ đăng nhập</span>
                        </label>
                        <button className={styles.forgotPassword}>Quên mật khẩu?</button>
                    </div>

                    {/* Submit Button */}
                    <button onClick={handleLogin} className={styles.submitButton}>
                        Đăng Nhập Ngay
                    </button>

                    {/* Divider */}
                    <div className={styles.divider}>
                        <div className={styles.dividerLine}></div>
                        <span className={styles.dividerText}>Hoặc đăng nhập với</span>
                    </div>

                    {/* Social Login */}
                    <div className={styles.socialButtons}>
                        <button className={styles.facebookButton}>
                            <span>📘</span>
                            Facebook
                        </button>
                        <button className={styles.googleButton}>
                            <span>🔍</span>
                            Google
                        </button>
                    </div>

                    {/* Register Link */}
                    <div className={styles.register}>
                        <span className={styles.registerText}>Chưa có tài khoản? </span>
                        <button className={styles.registerLink}>Đăng ký ngay</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;