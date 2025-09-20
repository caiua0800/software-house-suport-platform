// src/Components/TicketCard/styles.js
const styles = {
  cardLink: {
    backgroundColor: "#ffffff",
    padding: "1.5rem",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(44, 62, 80, 0.08)",
    textDecoration: "none",
    color: "inherit",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    borderLeft: "5px solid transparent", // Borda para a cor do status
    transition:
      "transform 0.2s ease, box-shadow 0.2s ease, border-left-color 0.2s ease",
    cursor: "pointer",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "1rem",
  },
  cardTitle: {
    margin: 0,
    fontSize: "1.15rem",
    color: "#2c3e50",
    fontWeight: 600,
    lineHeight: 1.4,
  },
  cardDate: {
    color: "#7f8c8d",
    fontSize: "0.85rem",
    margin: 0,
  },
  statusBadge: {
    padding: "0.4rem 0.9rem",
    borderRadius: "16px",
    fontSize: "0.8rem",
    fontWeight: "bold",
    color: "white",
    textTransform: "capitalize",
    flexShrink: 0, // Impede que o badge encolha
  },
  // Cores para os status
  statusPending: { backgroundColor: "#f39c12" },
  statusInProgress: { backgroundColor: "#3498db" },
  statusCompleted: { backgroundColor: "#2ecc71" },
  statusCancelled: { backgroundColor: "#e74c3c" },
  // Cores para a borda esquerda
  borderPending: { borderLeftColor: "#f39c12" },
  borderInProgress: { borderLeftColor: "#3498db" },
  borderCompleted: { borderLeftColor: "#2ecc71" },
  borderCancelled: { borderLeftColor: "#e74c3c" },
};

export default styles;
