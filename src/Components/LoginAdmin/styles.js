// src/Components/LoginAdmin/styles.js
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#2c3e50", // Fundo escuro
  },
  form: {
    backgroundColor: "#ffffff",
    padding: "2.5rem",
    borderRadius: "8px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    width: "100%",
    maxWidth: "420px",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  title: {
    textAlign: "center",
    color: "#2c3e50",
    fontWeight: "600",
    fontSize: "1.8rem",
    marginBottom: "0.5rem",
  },
  subtitle: {
    textAlign: "center",
    color: "#7f8c8d",
    marginTop: 0,
    marginBottom: "1rem",
  },
  formGroup: { display: "flex", flexDirection: "column", gap: "0.5rem" },
  label: { fontWeight: "500", color: "#34495e" },
  input: {
    padding: "0.9rem",
    border: "1px solid #bdc3c7",
    borderRadius: "4px",
    fontSize: "1rem",
  },
  button: {
    backgroundColor: "#3498db",
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
