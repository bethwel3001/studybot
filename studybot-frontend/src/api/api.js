import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;;

export const askQuestion = async (question, subject = 'general') => {
  try {
    const response = await axios.post(`${API_BASE_URL}/ask`, { question, subject });
    return response.data.answer;
  } catch (error) {
    console.error('Error asking question:', error);
    throw error;
  }
};
