// src/Components/SupportDashboard/SupportDashboard.js
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useAuth } from "../../hooks/useAuth";
import ticketService from "../../Services/ticketService";
import TicketCard from "../TicketCard/TicketCard";
import { useLoading } from "../../Context/LoadingContext";
import styles from "./styles"; // Importa os novos estilos

const SupportDashboard = () => {
  const { user } = useAuth();
  const { showLoading, hideLoading } = useLoading();

  const [allTickets, setAllTickets] = useState([]);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  const fetchTickets = useCallback(async () => {
    if (!user) return;
    showLoading();
    try {
      setError("");
      const data = await ticketService.getAllTickets();
      setAllTickets(data);
    } catch (err) {
      setError(
        "Não foi possível carregar seus tickets. Tente recarregar a página."
      );
      console.error(err);
    } finally {
      hideLoading();
    }
  }, [user, showLoading, hideLoading]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const filteredTickets = useMemo(() => {
    if (!user || !allTickets.length) return [];

    // O backend já filtra por usuário, mas fazemos aqui como fallback caso a API mude
    const myTickets = allTickets.filter(
      (ticket) => ticket.createdByUserId === parseInt(user.id, 10)
    );

    if (filter === "all") return myTickets;

    // Filtra por status (case-insensitive para segurança)
    return myTickets.filter(
      (ticket) => ticket.status.toLowerCase() === filter.toLowerCase()
    );
  }, [allTickets, user, filter]);

  // Função para aplicar o estilo dinâmico aos botões de filtro
  const getButtonStyle = (buttonFilter) => ({
    ...styles.filterButton,
    ...(filter.toLowerCase() === buttonFilter.toLowerCase()
      ? styles.activeFilterButton
      : {}),
  });

  if (error) {
    return (
      <div style={styles.messageContainer}>
        <span style={styles.messageIcon}>⚠️</span>
        <p style={{ ...styles.messageText, color: "red" }}>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div style={styles.header}>
        <h2 style={styles.title}>Meus Chamados</h2>
        <div style={styles.filterContainer}>
          <button
            onClick={() => setFilter("all")}
            style={getButtonStyle("all")}
          >
            Todos
          </button>
          <button
            onClick={() => setFilter("Pending")}
            style={getButtonStyle("Pending")}
          >
            Pendentes
          </button>
          <button
            onClick={() => setFilter("InProgress")}
            style={getButtonStyle("InProgress")}
          >
            Em Andamento
          </button>
          <button
            onClick={() => setFilter("Completed")}
            style={getButtonStyle("Completed")}
          >
            Concluídos
          </button>
          <button
            onClick={() => setFilter("Cancelled")}
            style={getButtonStyle("Cancelled")}
          >
            Cancelados
          </button>
        </div>
      </div>

      <div style={styles.ticketList}>
        {allTickets.length > 0 && filteredTickets.length === 0 ? (
          <div style={styles.messageContainer}>
            <span style={styles.messageIcon}>🧐</span>
            <p style={styles.messageText}>
              Nenhum chamado encontrado com o filtro "{filter}".
            </p>
          </div>
        ) : filteredTickets.length > 0 ? (
          filteredTickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))
        ) : (
          <div style={styles.messageContainer}>
            <span style={styles.messageIcon}>📂</span>
            <p style={styles.messageText}>
              Você ainda não criou nenhum chamado. Use o menu para criar seu
              primeiro ticket.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportDashboard;
