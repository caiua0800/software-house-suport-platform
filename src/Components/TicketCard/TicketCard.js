// src/Components/TicketCard/TicketCard.js
import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles";

const TicketCard = ({ ticket }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return styles.statusPending;
      case "in_progress":
        return styles.statusInProgress;
      case "completed":
        return styles.statusCompleted;
      case "cancelled":
        return styles.statusCancelled;
      default:
        return {};
    }
  };

  return (
    <Link to={`/ticket/${ticket.id}`} style={styles.cardLink}>
      <div style={styles.cardHeader}>
        <h3 style={styles.cardTitle}>
          #{ticket.id} - {ticket.title}
        </h3>
        <span style={{ ...styles.status, ...getStatusStyle(ticket.status) }}>
          {ticket.status.replace("_", " ").toUpperCase()}
        </span>
      </div>
      <p style={styles.cardDate}>
        Criado em: {new Date(ticket.createdAt).toLocaleDateString()}
      </p>
    </Link>
  );
};

export default TicketCard;
