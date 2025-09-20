import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useLoading } from "../../Context/LoadingContext";
import styles from "./styles";

const LoginClient = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { loginClient } = useAuth();
  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const attemptLogin = useCallback(
    async (emailToLogin, passwordToLogin) => {
      setError("");
      showLoading();

      try {
        const user = await loginClient(emailToLogin, passwordToLogin);

        // ✨ AQUI ESTÁ A MUDANÇA CRUCIAL ✨
        // A navegação agora acontece DENTRO do try, APÓS o login ter sucesso.
        // E usamos um pequeno timeout para dar tempo ao React de atualizar tudo.
        if (user) {
          setTimeout(() => {
            navigate("/support/dashboard", { replace: true });
            hideLoading(); // Escondemos o loading APÓS a navegação ter sido iniciada
          }, 100); // 100ms é suficiente para o navegador processar as atualizações
        } else {
          // Se o loginClient retornar null por algum motivo
          throw new Error("Falha ao processar o token de autenticação.");
        }
      } catch (err) {
        setError(err.message || "Credenciais inválidas ou erro no servidor.");
        hideLoading(); // Esconde o loading em caso de erro
      }
    },
    [loginClient, showLoading, hideLoading, navigate]
  );

  useEffect(() => {
    const emailFromUrl = searchParams.get("email");
    const passwordFromUrl = searchParams.get("password");

    if (emailFromUrl && passwordFromUrl) {
      attemptLogin(emailFromUrl, passwordFromUrl);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = (e) => {
    e.preventDefault();
    attemptLogin(email, password);
  };

  return (
    <div style={styles.container}>
      {/* ...O resto do seu JSX do formulário permanece o mesmo... */}
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
          />
        </div>
        <button type="submit" style={styles.button}>
          Acessar
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
