import axios from 'axios';
import useAuth from '../contexts/auth';

import { VITE_BACKEND_URL } from '../utils/constants';
import { useMutation, useQuery } from '@tanstack/react-query';

async function fetchStats(userId: number, range: 'year' | 'week' | 'month') {
  const response = await axios.get(
    `${VITE_BACKEND_URL}/api/stats?userId=${userId}&range=${range}`,
  );
  return response.data;
}

function useChartStats() {
  const { getUser } = useAuth();
  const user = getUser()!;

  return useQuery({
    queryKey: ['chartStats', user.id],
    queryFn: () => fetchStats(user.id, 'week'),
  });
}

const useUserStats = (userId?: string) => {
  return useQuery({
    queryKey: ['stats', userId],
    queryFn: () =>
      axios.get(`${VITE_BACKEND_URL}/api/stats/frontPage`, {
        params: { userId },
      }),
  });
};

const useCreateUserStats = () => {
  return useMutation({
    mutationKey: ['useCreateUserStats'],
    mutationFn: (data: {
      userId: number;
      glucoseLevel: number;
      a1cLevel: number;
      weight: number;
      height: number;
    }) =>
      axios.post(`${VITE_BACKEND_URL}/api/stats`, data),
  });
};

export { fetchStats, useUserStats, useCreateUserStats, useChartStats };
