'use client'

import React, { useEffect, useState, useRef } from 'react';
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

    // ✅ Hàm đóng alert - KHÔNG dùng useCallback
    const handleClose = () => {
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
    };

    // Effect mở alert và tự động đóng
    useEffect(() => {
        if (isOpen) {
            // Reset states
            setIsExiting(false);
            
            // Hiển thị alert với delay nhỏ cho animation
            const openTimer = setTimeout(() => {
                setVisible(true);
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
        } else if (!isOpen && visible) {
            // Đóng alert khi isOpen = false
            handleClose();
        }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, duration]); // ⭐ KHÔNG thêm handleClose vào dependency

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

    // Không render nếu chưa bao giờ mở
    if (!visible && !isExiting) {
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