import api from './config';

export const getWallet = () => api.get('/wallet');
export const getGoals = () => api.get('/goals');
export const createGoal = (name, frequency, stake_amount) => api.post('/goals', { name, frequency, stake_amount });
export const submitReport = (goalId) => api.post(`/reports/${goalId}/report`);