// hooks/useCurrentTime.ts
import { useEffect, useState } from 'react';

export function useCurrentTime(updateInterval = 60000) { // Cập nhật mỗi phút
    const [currentTime, setCurrentTime] = useState(Date.now());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(Date.now());
        }, updateInterval);

        return () => clearInterval(interval);
    }, [updateInterval]);

    return currentTime;
}