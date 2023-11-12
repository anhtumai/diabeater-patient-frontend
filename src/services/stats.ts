import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAuth from '../contexts/auth';

import { VITE_BACKEND_URL } from '../utils/constants';

async function fetchStats(userId: number, range: 'year' | 'week' | 'month') {
  const response = await axios.get(
    `${VITE_BACKEND_URL}/api/stats?userId=${userId}&range=${range}`,
  );
  console.log('Response data', response.data);
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

export { fetchStats, useChartStats };
