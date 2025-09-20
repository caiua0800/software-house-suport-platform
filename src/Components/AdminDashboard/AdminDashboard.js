// src/Components/AdminDashboard/AdminDashboard.js
import React, { useState, useEffect, useMemo, useCallback } from "react";
import ticketService from "../../Services/ticketService";
import TicketCard from "../TicketCard/TicketCard";
import styles from "./styles";
import { useLoading } from "../../Context/LoadingContext"; // Importa o hook de loading

const AdminDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const { showLoading, hideLoading } = useLoading(); // Pega as funções do contexto

  // Usamos useCallback para memoizar a função e evitar recriações
  const fetchTickets = useCallback(async () => {
    showLoading(); // Mostra o overlay de loading global
    try {
      setError("");
      const data = await ticketService.getAllTickets();
      setTickets(data);
    } catch (err) {
      setError(
        "Falha ao carregar os tickets. Por favor, tente recarregar a página."
      );
      console.error(err);
    } finally {
      hideLoading(); // Esconde o overlay de loading, com sucesso ou erro
    }
  }, [showLoading, hideLoading]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const filteredTickets = useMemo(() => {
    if (filter === "all") return tickets;
    // O backend retorna os enums como "Pending", "InProgress", etc.
    return tickets.filter((ticket) => ticket.status === filter);
  }, [tickets, filter]);

  const getButtonStyle = (buttonFilter) => ({
    ...styles.filterButton,
    ...(filter === buttonFilter ? styles.activeFilterButton : {}),
  });

  // O componente de loading global já está sendo exibido pelo App.js,
  // então só precisamos nos preocupar em mostrar uma mensagem de erro se houver.
  if (error) {
    return (
      <p style={{ color: "red", textAlign: "center", padding: "2rem" }}>
        {error}
      </p>
    );
  }

  return (
    <div>
      <div style={styles.header}>
        <h2 style={styles.title}>Dashboard do Administrador</h2>
        {/* Futuramente, um botão de recarregar pode ser útil aqui */}
        {/* <button onClick={fetchTickets}>Recarregar</button> */}
      </div>

      <div style={styles.filterContainer}>
        <span>Filtrar por:</span>
        <button onClick={() => setFilter("all")} style={getButtonStyle("all")}>
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

      <div style={styles.ticketList}>
        {tickets.length > 0 && filteredTickets.length === 0 ? (
          <p style={{ textAlign: "center", padding: "1rem" }}>
            Nenhum ticket encontrado com o filtro selecionado.
          </p>
        ) : tickets.length === 0 ? (
          <p style={{ textAlign: "center", padding: "1rem" }}>
            Ainda não há tickets no sistema.
          </p>
        ) : (
          filteredTickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
