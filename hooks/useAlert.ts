import { useState, useCallback } from 'react';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertState {
    isOpen: boolean;
    message: string;
    type: AlertType;
}

export const useAlert = () => {
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

    return {
        alertState,
        showAlert,
        hideAlert
    };
};