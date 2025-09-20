// src/Components/SupportDashboard/styles.js
const styles = {
  // --- Cabeçalho da Página ---
  header: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginBottom: "2.5rem",
    borderBottom: "1px solid #dee2e6",
    paddingBottom: "1.5rem",
  },
  title: {
    margin: 0,
    fontSize: "2rem",
    fontWeight: 600,
    color: "#1e293b", // Azul mais escuro
  },

  // --- Container dos Filtros ---
  filterContainer: {
    backgroundColor: "white",
    padding: "0.75rem",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    display: "flex",
    gap: "0.5rem",
    alignItems: "center",
  },
  filterButton: {
    flex: 1,
    backgroundColor: "transparent",
    color: "#475569",
    border: "none",
    padding: "0.75rem 1rem",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "500",
    fontSize: "0.9rem",
    transition: "background-color 0.2s ease, color 0.2s ease",
  },
  activeFilterButton: {
    backgroundColor: "#3498db",
    color: "white",
    boxShadow: "0 4px 8px rgba(52, 152, 219, 0.3)",
  },

  // --- Lista de Tickets ---
  ticketList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", // Layout responsivo
    gap: "1.5rem",
  },

  // --- Mensagens de Estado Vazio ou Erro ---
  messageContainer: {
    textAlign: "center",
    padding: "4rem 2rem",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
    marginTop: "2rem",
  },
  messageText: {
    fontSize: "1.1rem",
    color: "#475569",
    margin: 0,
  },
  messageIcon: {
    fontSize: "3rem",
    color: "#cbd5e1",
  },
};

export default styles;
