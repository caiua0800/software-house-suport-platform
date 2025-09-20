// src/Components/TicketCard/styles.js
const styles = {
  cardLink: {
    backgroundColor: "#ffffff",
    padding: "1.5rem",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.08)",
    textDecoration: "none",
    color: "inherit",
    display: "block",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "0.5rem",
  },
  cardTitle: {
    margin: 0,
    fontSize: "1.2rem",
  },
  cardDate: {
    color: "#7f8c8d",
    fontSize: "0.9rem",
  },
  status: {
    padding: "0.3rem 0.8rem",
    borderRadius: "12px",
    fontSize: "0.8rem",
    fontWeight: "bold",
    color: "white",
  },
  statusPending: { backgroundColor: "#f39c12" },
  statusInProgress: { backgroundColor: "#3498db" },
  statusCompleted: { backgroundColor: "#2ecc71" },
  statusCancelled: { backgroundColor: "#e74c3c" },
};

export default styles;
