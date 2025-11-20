'use client'

import React, { createContext, useContext, useState, useCallback } from 'react';
import Alert from '@/components/Alert/Alert';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertState {
    isOpen: boolean;
    message: string;
    type: AlertType;
}

interface AlertContextType {
    showAlert: (message: string, type?: AlertType) => void;
    hideAlert: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [alertState, setAlertState] = useState<AlertState>({
        isOpen: false,
        message: '',
        type: 'info'
    });

    const showAlert = useCallback((message: string, type: AlertType = 'info') => {
        setAlertState({
            isOpen: true,
            message,
            type
        });
    }, []);

    const hideAlert = useCallback(() => {
        setAlertState(prev => ({ ...prev, isOpen: false }));
    }, []);

    return (
        <AlertContext.Provider value={{ showAlert, hideAlert }}>
            {children}
            <Alert
                isOpen={alertState.isOpen}
                message={alertState.message}
                type={alertState.type}
                onClose={hideAlert}
                duration={4000}
            />
        </AlertContext.Provider>
    );
};

export const useAlert = () => {
    const context = useContext(AlertContext);
    if (context === undefined) {
        throw new Error('useAlert must be used within an AlertProvider');
    }
    return context;
};