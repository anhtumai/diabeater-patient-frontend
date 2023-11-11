import axios from 'axios';

import { VITES_BACKEND_URL } from '../utils/constants';
import { useQuery } from '@tanstack/react-query';

async function fetchStats(userId: number, range: 'year' | 'week' | 'month') {
  const response = await axios.get(
    `${VITES_BACKEND_URL}/api/stats?userId=${userId}&range=${range}`,
  );
  return response.data;
}

const useUserStats = (userId?: string) => {
  return useQuery({
    queryKey: ['stats', userId],
    queryFn: () =>
      axios.get(`${VITES_BACKEND_URL}/api/stats/frontPage`, {
        params: { userId },
      }),
  });
};

export { fetchStats, useUserStats };
