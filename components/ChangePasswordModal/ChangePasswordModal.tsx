// ChangePasswordModal.tsx
'use client'

import React, { useRef, useState } from 'react';
import styles from './ChangePasswordModal.module.css';

interface ChangePasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (oldPassword: string, newPassword: string) => Promise<boolean>;
    oldPass: string
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ isOpen, onClose, onSubmit, oldPass }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [oldPas, setOldPas] = useState<string>(oldPass);

    const validatePassword = (password: string): boolean => {
        if (password.length < 6) {
            setError('Mật khẩu phải có ít nhất 6 ký tự');
            return false;
        }
        if (!/[A-Z]/.test(password)) {
            setError('Mật khẩu phải có ít nhất 1 chữ hoa');
            return false;
        }
        if (!/[0-9]/.test(password)) {
            setError('Mật khẩu phải có ít nhất 1 chữ số');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!oldPassword || !newPassword || !confirmPassword) {
            setError('Vui lòng điền đầy đủ thông tin');
            return;
        }

        if (oldPas != oldPassword) {
            setError('Mật khẩu cũ không đúng');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Mật khẩu mới và xác nhận mật khẩu không khớp');
            return;
        }

        if (oldPassword === newPassword) {
            setError('Mật khẩu mới phải khác mật khẩu cũ');
            return;
        }

        if (!validatePassword(newPassword)) {
            return;
        }

        setIsLoading(true);
        try {
            const success = await onSubmit(oldPassword, newPassword);
            if (success) {
                handleClose();
            } else {
                setError('Mật khẩu cũ không đúng');
            }
        } catch (err) {
            setError('Có lỗi xảy ra. Vui lòng thử lại');
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setOldPas(newPassword);
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setError('');
        setShowOldPassword(false);
        setShowNewPassword(false);
        setShowConfirmPassword(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={handleClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2>🔒 Đổi mật khẩu</h2>
                    <button className={styles.closeBtn} onClick={handleClose}>
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className={styles.modalBody}>
                    {error && (
                        <div className={styles.errorMessage}>
                            ⚠️ {error}
                        </div>
                    )}

                    <div className={styles.formGroup}>
                        <label>Mật khẩu hiện tại</label>
                        <div className={styles.passwordInput}>
                            <input
                                type={showOldPassword ? 'text' : 'password'}
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                placeholder="Nhập mật khẩu hiện tại"
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                className={styles.togglePassword}
                                onClick={() => setShowOldPassword(!showOldPassword)}
                            >
                                {showOldPassword ? '👁️' : '👁️‍🗨️'}
                            </button>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Mật khẩu mới</label>
                        <div className={styles.passwordInput}>
                            <input
                                type={showNewPassword ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Nhập mật khẩu mới"
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                className={styles.togglePassword}
                                onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                                {showNewPassword ? '👁️' : '👁️‍🗨️'}
                            </button>
                        </div>
                        <div className={styles.passwordHint}>
                            • Tối thiểu 6 ký tự<br />
                            • Ít nhất 1 chữ hoa<br />
                            • Ít nhất 1 chữ số
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Xác nhận mật khẩu mới</label>
                        <div className={styles.passwordInput}>
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Nhập lại mật khẩu mới"
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                className={styles.togglePassword}
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                            </button>
                        </div>
                    </div>

                    <div className={styles.modalFooter}>
                        <button
                            type="button"
                            className={styles.cancelBtn}
                            onClick={handleClose}
                            disabled={isLoading}
                        >
                            Hủy bỏ
                        </button>
                        <button
                            type="submit"
                            className={styles.submitBtn}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Đang xử lý...' : 'Đổi mật khẩu'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordModal;