// src/Components/AdminDashboard/styles.js
const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
  },
  title: { margin: 0 },
  filterContainer: {
    backgroundColor: "white",
    padding: "1rem",
    borderRadius: "8px",
    marginBottom: "2rem",
    display: "flex",
    gap: "1rem",
    alignItems: "center",
  },
  filterButton: {
    backgroundColor: "#ecf0f1",
    color: "#2c3e50",
    border: "1px solid #bdc3c7",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
  },
  activeFilterButton: {
    backgroundColor: "#3498db",
    color: "white",
    borderColor: "#3498db",
  },
  ticketList: { display: "grid", gap: "1.5rem" },
};
export default styles;
