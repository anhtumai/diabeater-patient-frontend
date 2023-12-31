import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { VITE_BACKEND_URL } from '../utils/constants';

async function fetchPatients() {
  const response = await axios.get(`${VITE_BACKEND_URL}/api/stats/badStats`);
  return response.data;
}

async function getPatient(userId: number) {
  const response = await axios.get(
    `${VITE_BACKEND_URL}/api/user/info?userId=${userId}`,
  );
  return response.data;
}

export function useFetchPatients() {
  return useQuery({
    queryKey: ['patients'],
    queryFn: () => fetchPatients(),
  });
}

export function useGetPatient(userId: number) {
  return useQuery({
    queryKey: ['patient', userId],
    queryFn: () => getPatient(userId),
  });
}
