'use client'

import React, { useEffect, useState, useRef, useCallback } from 'react';
import styles from './Alert.module.css';

interface AlertProps {
    message: string;
    type?: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
    onClose?: () => void;
    isOpen?: boolean;
}

const Alert: React.FC<AlertProps> = ({
    message,
    type = 'info',
    duration = 3000,
    onClose,
    isOpen = true
}) => {
    const [visible, setVisible] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const exitTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Hàm đóng alert
    const handleClose = useCallback(() => {
        if (isExiting) return;

        setIsExiting(true);

        // Clear các timeout cũ
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Animation exit
        exitTimeoutRef.current = setTimeout(() => {
            setVisible(false);
            setIsExiting(false);
            onClose?.();
        }, 300);
    }, [isExiting, onClose]);

    // Hiệu ứng mở alert
    useEffect(() => {
        if (isOpen && !visible) {
            // Sửa: Tránh setState đồng bộ, dùng setTimeout
            const openTimer = setTimeout(() => {
                setVisible(true);
                setIsExiting(false);
            }, 10);

            // Tự động đóng sau duration
            if (duration > 0) {
                timeoutRef.current = setTimeout(() => {
                    handleClose();
                }, duration);
            }

            return () => {
                clearTimeout(openTimer);
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }
            };
        }

        if (!isOpen && visible && !isExiting) {
            handleClose();
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            if (exitTimeoutRef.current) {
                clearTimeout(exitTimeoutRef.current);
            }
        };
    }, [isOpen, visible, duration, handleClose, isExiting]);

    // Cleanup khi unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            if (exitTimeoutRef.current) {
                clearTimeout(exitTimeoutRef.current);
            }
        };
    }, []);

    // Không render nếu không mở và không visible
    if (!isOpen && !visible && !isExiting) {
        return null;
    }

    // Tính toán class
    const alertClasses = [
        styles.alert,
        styles[type],
        visible && !isExiting ? styles.show : '',
        isExiting ? styles.hide : ''
    ].filter(Boolean).join(' ');

    return (
        <div className={alertClasses} role="alert">
            <div className={styles.alertContent}>
                <div className={styles.icon}>
                    {type === 'success' && '✅'}
                    {type === 'error' && '❌'}
                    {type === 'warning' && '⚠️'}
                    {type === 'info' && 'ℹ️'}
                </div>
                <span className={styles.message}>{message}</span>
                <button
                    className={styles.closeButton}
                    onClick={handleClose}
                    aria-label="Close alert"
                >
                    ✕
                </button>
            </div>
        </div>
    );
};

export default Alert;