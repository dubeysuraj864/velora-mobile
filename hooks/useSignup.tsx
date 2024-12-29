import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.20.10.2:5000/api',
});

export const Signup = async (payload) => {
  try {
    const response = await api.post('/auth/signup', payload);
    return response;
  } catch (error) {
    console.error('Signup API Error:', error.response?.data || error.message);
    return error;
  }
};
