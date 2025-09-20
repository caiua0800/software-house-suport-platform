// src/Services/adminService.js
import api from "./api";

const adminService = {
  /**
   * Autentica um admin e retorna o token.
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{token: string}>}
   */
  login: async (email, password) => {
    try {
      const response = await api.post("Admin/login", { email, password });
      return response.data; // Retorna { token: "..." }
    } catch (error) {
      // Lança o erro para ser tratado no componente
      throw error.response?.data?.message || "Erro ao tentar fazer login.";
    }
  },

  /**
   * Busca os dados de um admin pelo ID.
   * Requer autenticação.
   * @param {number} id
   * @returns {Promise<object>}
   */
  getAdminById: async (id) => {
    try {
      const response = await api.get(`Admin/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Erro ao buscar dados do admin.";
    }
  },
};

export default adminService;
