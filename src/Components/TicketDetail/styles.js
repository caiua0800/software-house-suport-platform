// src/Components/TicketDetail/styles.js

const styles = {
  // --- Container Principal ---
  container: {
    backgroundColor: "#ffffff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },

  // --- Cabeçalho (Título e Status) ---
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #ecf0f1",
    paddingBottom: "1rem",
    marginBottom: "1.5rem",
  },
  title: {
    margin: 0,
    color: "#2c3e50",
    fontSize: "1.8rem",
  },

  // --- Corpo de Informações ---
  body: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  infoRow: {
    display: "flex",
    alignItems: "center",
  },
  infoLabel: {
    fontWeight: "bold",
    color: "#34495e",
    marginRight: "8px",
    minWidth: "150px", // Alinha os valores
  },

  // --- Caixa de Descrição ---
  descriptionBox: {
    backgroundColor: "#f9f9f9",
    border: "1px solid #ecf0f1",
    padding: "1rem",
    borderRadius: "4px",
    marginTop: "1rem",
    whiteSpace: "pre-wrap", // Mantém a formatação do texto (quebras de linha)
    lineHeight: "1.6",
    color: "#34495e",
  },

  // --- Seção de Ações do Admin ---
  adminActions: {
    marginTop: "2rem",
    borderTop: "1px solid #ecf0f1",
    paddingTop: "1.5rem",
  },
  adminTitle: {
    marginBottom: "1rem",
    color: "#2c3e50",
  },
  adminFormGroup: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  adminSelect: {
    padding: "0.8rem",
    border: "1px solid #bdc3c7",
    borderRadius: "4px",
    fontSize: "1rem",
    minWidth: "200px",
  },
  adminButton: {
    backgroundColor: "#2ecc71",
    color: "white",
    padding: "0.8rem 1.5rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
  },

  // --- Estilos de Status ---
  statusBadge: {
    padding: "0.4rem 1rem",
    borderRadius: "16px",
    fontSize: "0.9rem",
    fontWeight: "bold",
    color: "white",
    textTransform: "capitalize",
  },
  statusPending: { backgroundColor: "#f39c12" },
  statusInProgress: { backgroundColor: "#3498db" },
  statusCompleted: { backgroundColor: "#2ecc71" },
  statusCancelled: { backgroundColor: "#e74c3c" },
};

export default styles;
