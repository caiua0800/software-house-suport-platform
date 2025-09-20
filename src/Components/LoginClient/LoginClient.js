// src/Components/LoginClient/LoginClient.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useLoading } from "../../Context/LoadingContext"; // ✨ Importa o hook de loading
import styles from "./styles";

const LoginClient = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loginClient } = useAuth();
  const { showLoading, hideLoading } = useLoading(); // ✨ Pega as funções do contexto
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false); // Adicionado para desabilitar o botão

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    showLoading(); // ✨ Mostra o overlay de loading global

    try {
      await loginClient(email, password);
      navigate("/support/dashboard"); // Redireciona para o dashboard de suporte
      // hideLoading() não é necessário aqui, pois a página vai mudar
    } catch (err) {
      setError(err.message);
      hideLoading(); // ✨ Esconde o loading APENAS se der erro
      setIsSubmitting(false); // Habilita o botão novamente se der erro
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Portal de Suporte</h2>
        <p style={styles.subtitle}>
          Acesse seus tickets ou abra um novo chamado.
        </p>

        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>
            Seu Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
            disabled={isSubmitting}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>
            Sua Senha
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
            disabled={isSubmitting}
          />
        </div>

        <button
          type="submit"
          style={{
            ...styles.button,
            ...(isSubmitting
              ? { backgroundColor: "#bdc3c7", cursor: "not-allowed" }
              : {}),
          }}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Autenticando..." : "Acessar"}
        </button>
        <p
          style={{ textAlign: "center", fontSize: "0.9rem", marginTop: "1rem" }}
        >
          É da equipe? <Link to="/login/admin">Acessar painel de admin</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginClient;
