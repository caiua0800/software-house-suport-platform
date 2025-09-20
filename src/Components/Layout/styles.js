// src/Components/Layout/styles.js

// ✨ 1. Definimos as animações @keyframes como uma string para injetar no CSS
const keyframes = `
  @keyframes logoGlow {
    0% {
      filter: drop-shadow(0 0 5px rgba(100, 255, 218, 0.4));
      transform: scale(1);
    }
    50% {
      filter: drop-shadow(0 0 15px rgba(100, 255, 218, 0.8));
      transform: scale(1.03);
    }
    100% {
      filter: drop-shadow(0 0 5px rgba(100, 255, 218, 0.4));
      transform: scale(1);
    }
  }
`;

const styles = {
  // --- Container Geral ---
  appContainer: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
  },

  // --- Sidebar ---
  sidebar: {
    width: "250px",
    backgroundColor: "#0a192f", // Tom de azul espacial, mais escuro
    color: "#ecf_of1",
    display: "flex",
    flexDirection: "column",
    transition: "width 0.3s ease",
    borderRight: "1px solid #1c3d5d", // Borda sutil
  },
  sidebarHeader: {
    padding: "2rem 1.5rem", // Aumenta o espaçamento vertical
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderBottom: "1px solid #1c3d5d", // Linha divisória sutil
    cursor: "pointer", // Adiciona um cursor para indicar que é clicável (ex: levar para a home)
  },

  // ✨ 2. Estilos da LOGO totalmente reformulados ✨
  logo: {
    height: "auto", // Altura automática para manter proporção
    width: "80%", // Aumenta a largura para 80% da sidebar
    maxWidth: "150px", // Limite máximo para não ficar gigante
    transition: "transform 0.3s ease-in-out, filter 0.3s ease-in-out",
    // Aplica a animação 'logoGlow' que definimos nos keyframes
    animation: "logoGlow 4s ease-in-out infinite",
  },

  // Para injetar os keyframes no <head>
  keyframes: keyframes,

  // --- Navegação ---
  nav: {
    flex: 1,
    padding: "1.5rem 1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  navLink: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    padding: "0.8rem 1rem",
    borderRadius: "6px",
    color: "#8892b0", // Cor de texto mais suave
    textDecoration: "none",
    transition:
      "background-color 0.2s ease, color 0.2s ease, letter-spacing 0.2s ease",
  },

  // ... (o resto do arquivo de estilos permanece o mesmo) ...

  userProfile: {
    padding: "1.5rem",
    borderTop: "1px solid #1c3d5d",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
  },
  userName: {
    color: "#ccd6f6",
    fontWeight: "500",
    fontSize: "0.95rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  userEmail: {
    color: "#8892b0",
    fontSize: "0.8rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  logoutButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.8rem",
    width: "100%",
    backgroundColor: "transparent",
    color: "#e74c3c",
    border: "1px solid #e74c3c",
    padding: "0.6rem",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "background-color 0.2s ease, color 0.2s ease",
  },
  contentWrapper: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  header: {
    backgroundColor: "#ffffff",
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #dee2e6",
  },
  pageTitle: {
    margin: 0,
    fontSize: "1.5rem",
    color: "#34495e",
    fontWeight: 500,
  },
  mainContent: {
    flex: 1,
    padding: "2rem",
    overflowY: "auto",
    backgroundColor: "#f8f9fa",
  },
};

export default styles;
