import axios from 'axios';
import { ValidationResponse } from '@/types/validation';

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export const validateDesign = async (payload: any): Promise<ValidationResponse> => {
  const { data } = await axios.post(`${API_BASE}/design/validate`, payload);
  return data;
};
