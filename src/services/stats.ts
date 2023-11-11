import axios from 'axios';

const BACKEND_URL = '172.20.10.10';
async function fetchStats(userId: number, range: 'year' | 'week' | 'month') {
  const response = await axios.get(
    `http://172.20.10.10:8080/api/stats?userId=${userId}&range=${range}`,
  );
  console.log("Response data", response.data);
  return response.data;
}

export { fetchStats };
