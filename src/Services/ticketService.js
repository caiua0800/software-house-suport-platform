// src/Services/ticketService.js
import api from "./api";

const ticketService = {
  /**
   * Busca todos os tickets. Requer autenticação.
   * @returns {Promise<Array<object>>}
   */
  getAllTickets: async () => {
    try {
      const response = await api.get("Ticket");
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Erro ao buscar tickets.";
    }
  },

  /**
   * Busca um ticket específico pelo seu ID. Requer autenticação.
   * @param {number} id
   * @returns {Promise<object>}
   */
  getTicketById: async (id) => {
    try {
      const response = await api.get(`Ticket/${id}`);
      return response.data;
    } catch (error) {
      throw (
        error.response?.data?.message || "Erro ao buscar detalhes do ticket."
      );
    }
  },

  /**
   * Cria um novo ticket. Requer autenticação.
   * @param {object} ticketData - { title, description, clientId, ... }
   * @returns {Promise<object>}
   */
  createTicket: async (ticketData) => {
    try {
      const response = await api.post("Ticket", ticketData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Erro ao criar o ticket.";
    }
  },

  /**
   * Atualiza o status de um ticket. Requer autenticação.
   * @param {number} id
   * @param {string} status - Ex: "InProgress", "Completed"
   * @returns {Promise<object>}
   */
  updateTicketStatus: async (id, status) => {
    try {
      const response = await api.put(`Ticket/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw (
        error.response?.data?.message || "Erro ao atualizar o status do ticket."
      );
    }
  },
};

export default ticketService;
