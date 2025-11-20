'use client'

import React, { useEffect, useState } from 'react';
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

    useEffect(() => {
        if (isOpen) {
            setVisible(true);

            const timer = setTimeout(() => {
                setVisible(false);
                setTimeout(() => onClose?.(), 300);
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [isOpen, duration, onClose]);

    if (!isOpen && !visible) return null;

    return (
        <div className={`${styles.alert} ${styles[type]} ${visible ? styles.show : styles.hide}`}>
            <div className={styles.alertContent}>
                <div className={styles.icon}>
                    {type === 'success' && '✅'}
                    {type === 'error' && '❌'}
                    {type === 'warning' && '⚠️'}
                    {type === 'info' && 'ℹ️'}
                </div>
                <span className={styles.message}>{message}</span>
                <button className={styles.closeButton} onClick={() => {
                    setVisible(false);
                    setTimeout(() => onClose?.(), 300);
                }}>
                    ✕
                </button>
            </div>
        </div>
    );
};

export default Alert;