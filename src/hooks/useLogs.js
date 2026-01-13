import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import { useState, useEffect } from 'react';

export function useLogs() {
    const [allLogs, setAllLogs] = useState([]);

    const { data: newLogs } = useQuery({
        queryKey: ['logs'],
        queryFn: () => api.get('/admin/logs').then(res => res.data),
        refetchInterval: 2000,
        staleTime: 0,
    });

    // Accumulate logs instead of replacing them
    useEffect(() => {
        if (newLogs && newLogs.length > 0) {
            setAllLogs(prev => {
                // Combine and de-duplicate based on ID (just in case, though random IDs usually work for mocks)
                const combined = [...newLogs, ...prev];
                // Keep only last 100
                return combined.slice(0, 100);
            });
        }
    }, [newLogs]);

    return { logs: allLogs };
}
