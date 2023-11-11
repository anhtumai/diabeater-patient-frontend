import axios from 'axios';

import { VITES_BACKEND_URL } from '../utils/constants';

async function fetchStats(userId: number, range: 'year' | 'week' | 'month') {
  const response = await axios.get(
    `${VITES_BACKEND_URL}/api/stats?userId=${userId}&range=${range}`,
  );
  console.log('Response data', response.data);
  return response.data;
}

export { fetchStats };
