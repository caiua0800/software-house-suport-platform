// src/Components/TicketCard/TicketCard.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles";

// Componente interno para o Badge de Status
const TicketStatusBadge = ({ status }) => {
  const getStatusInfo = (s) => {
    switch (s?.toLowerCase()) {
      case "pending":
        return { text: "Pendente", style: styles.statusPending };
      case "inprogress":
        return { text: "Em Andamento", style: styles.statusInProgress };
      case "completed":
        return { text: "Concluído", style: styles.statusCompleted };
      case "cancelled":
        return { text: "Cancelado", style: styles.statusCancelled };
      default:
        return { text: status || "Desconhecido", style: {} };
    }
  };
  const { text, style } = getStatusInfo(status);
  return <span style={{ ...styles.statusBadge, ...style }}>{text}</span>;
};

// Componente Principal do Card
const TicketCard = ({ ticket }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Define a cor da borda com base no status
  const getBorderStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return styles.borderPending;
      case "inprogress":
        return styles.borderInProgress;
      case "completed":
        return styles.borderCompleted;
      case "cancelled":
        return styles.borderCancelled;
      default:
        return {};
    }
  };

  // Combina os estilos base com os estilos dinâmicos
  const cardStyle = {
    ...styles.cardLink,
    ...getBorderStyle(ticket.status),
    ...(isHovered
      ? {
          transform: "translateY(-5px)",
          boxShadow: "0 8px 25px rgba(44, 62, 80, 0.15)",
        }
      : {}),
  };

  return (
    <Link
      to={`/ticket/${ticket.id}`}
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.cardHeader}>
        <h3 style={styles.cardTitle}>
          #{ticket.id} - {ticket.title}
        </h3>
        <TicketStatusBadge status={ticket.status} />
      </div>
      <p style={styles.cardDate}>
        Criado em: {new Date(ticket.createdAt).toLocaleDateString("pt-BR")}
      </p>
    </Link>
  );
};

export default TicketCard;
