import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

export function useMetrics() {
    return useQuery({
        queryKey: ['metrics'],
        queryFn: () => api.get('/admin/metrics').then(res => res.data),
        refetchInterval: 5000, // Poll every 5 seconds
        staleTime: 4000,
    });
}
