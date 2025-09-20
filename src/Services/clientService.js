// src/Services/clientService.js
import api from './api';

const clientService = {
  login: async (email, password) => {
    try {
      const response = await api.post('Client/login', { email, password });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Erro ao tentar fazer login como cliente.';
    }
  },
};

export default clientService;