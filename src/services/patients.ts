import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { VITE_BACKEND_URL } from '../utils/constants';

async function fetchPatients() {
  const response = await axios.get(`${VITE_BACKEND_URL}/api/stats/badStats`);
  return response.data;
}

export function useFetchPatients() {
  return useQuery({
    queryKey: ['patients'],
    queryFn: () => fetchPatients(),
  });
}
