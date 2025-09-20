// src/Components/LoginClient/styles.js
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f7f6", // Fundo claro
  },
  form: {
    backgroundColor: "#ffffff",
    padding: "2.5rem",
    borderRadius: "8px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "420px",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  title: {
    textAlign: "center",
    color: "#34495e",
    fontWeight: "600",
    fontSize: "1.8rem",
    marginBottom: "0.5rem",
  },
  subtitle: {
    textAlign: "center",
    color: "#95a5a6",
    marginTop: 0,
    marginBottom: "1rem",
  },
  formGroup: { display: "flex", flexDirection: "column", gap: "0.5rem" },
  label: { fontWeight: "500", color: "#34495e" },
  input: {
    padding: "0.9rem",
    border: "1px solid #ecf0f1",
    borderRadius: "4px",
    fontSize: "1rem",
  },
  button: {
    backgroundColor: "#1abc9c",
    color: "white",
    padding: "0.9rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
  },
  error: {
    color: "#e74c3c",
    backgroundColor: "#fdd",
    padding: "0.8rem",
    borderRadius: "4px",
    textAlign: "center",
    fontSize: "0.9rem",
  },
};

export default styles;
