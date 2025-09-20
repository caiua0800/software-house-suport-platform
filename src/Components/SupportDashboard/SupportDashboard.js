// src/Components/SupportDashboard/SupportDashboard.js
import React, { useState, useEffect, useMemo } from "react";
import { useAuth } from "../../hooks/useAuth";
import ticketService from "../../Services/ticketService"; // Unicamente da API
import TicketCard from "../TicketCard/TicketCard";

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
  },
  title: {
    margin: 0,
  },
  ticketList: {
    display: "grid",
    gap: "1.5rem",
  },
  message: {
    textAlign: "center",
    padding: "2rem",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
};

const SupportDashboard = () => {
  const { user } = useAuth();
  const [allTickets, setAllTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        const data = await ticketService.getAllTickets();
        setAllTickets(data);
      } catch (err) {
        setError(
          "Não foi possível carregar seus tickets. Tente recarregar a página."
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const myTickets = useMemo(() => {
    if (!user || !allTickets.length) return [];
    // Filtra no frontend para mostrar apenas os tickets do usuário logado
    // O ID do usuário no token (user.id) é uma string, então convertemos para número para garantir a comparação
    return allTickets.filter(
      (ticket) => ticket.createdByUserId === parseInt(user.id, 10)
    );
  }, [allTickets, user]);

  if (loading) {
    return <div style={styles.message}>Carregando seus tickets...</div>;
  }

  if (error) {
    return <div style={{ ...styles.message, color: "red" }}>{error}</div>;
  }

  return (
    <div>
      <div style={styles.header}>
        <h2 style={styles.title}>Meus Tickets de Suporte</h2>
      </div>
      <div style={styles.ticketList}>
        {myTickets.length > 0 ? (
          myTickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))
        ) : (
          <p style={styles.message}>
            Você ainda não criou nenhum ticket. Use o menu ao lado para criar
            seu primeiro ticket.
          </p>
        )}
      </div>
    </div>
  );
};

export default SupportDashboard;
