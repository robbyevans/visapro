import api from './api';

export const checkSystemStatus = async (): Promise<boolean> => {
  try {
    const response = await api.get('/setup_status');
    return response.data.is_initialized;
  } catch (error) {
    console.error("Failed to fetch system setup status:", error);
    return true; 
  }
};