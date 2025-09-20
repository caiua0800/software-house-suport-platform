// src/Components/Loading/styles.js

// As animações @keyframes precisam estar aqui para serem injetadas globalmente
const keyframes = `
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -35px;
    }
    100% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -124px;
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const styles = {
  // O container do overlay
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(10, 25, 47, 0.85)", // Um azul bem escuro, quase preto
    backdropFilter: "blur(5px)", // Efeito de vidro fosco no fundo
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999, // Para ficar acima de tudo
    animation: "fadeIn 0.3s ease-out forwards",
  },

  // O spinner em si
  spinner: {
    animation: "rotate 2s linear infinite",
    width: "100px",
    height: "100px",
  },

  // O caminho do SVG que será animado
  path: {
    stroke: "#64ffda", // Um verde/ciano tecnológico
    strokeLinecap: "round",
    animation: "dash 1.5s ease-in-out infinite",
  },

  // Para injetar os keyframes no <head>
  keyframes: keyframes,
};

export default styles;
