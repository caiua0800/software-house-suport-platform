// src/Components/CreateTicket/CreateTicket.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ticketService from "../../Services/ticketService";
import { useLoading } from "../../Context/LoadingContext"; // Importa o hook de loading

// Estilos do componente (mantidos para consistência)
const formStyles = {
  container: {
    backgroundColor: "#ffffff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  title: {
    marginBottom: "2rem",
    color: "#2c3e50",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    marginBottom: "1.5rem",
  },
  label: { fontWeight: "500" },
  input: {
    padding: "0.8rem",
    border: "1px solid #bdc3c7",
    borderRadius: "4px",
    fontSize: "1rem",
  },
  textarea: {
    padding: "0.8rem",
    border: "1px solid #bdc3c7",
    borderRadius: "4px",
    fontSize: "1rem",
    minHeight: "120px",
    resize: "vertical",
  },
  button: {
    backgroundColor: "#3498db",
    color: "white",
    padding: "0.8rem 1.5rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
  },
  buttonDisabled: {
    backgroundColor: "#95a5a6",
    cursor: "not-allowed",
  },
  error: {
    color: "#e74c3c",
    backgroundColor: "#fdd",
    padding: "1rem",
    borderRadius: "4px",
    marginBottom: "1rem",
    textAlign: "center",
  },
};

const CreateTicket = () => {
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading(); // Pega as funções do contexto

  // Estados do formulário
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState("");
  const [contractId, setContractId] = useState("");
  const [withdrawalId, setWithdrawalId] = useState("");

  // Estado de UI
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Adicionado para desabilitar o botão

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    showLoading(); // Mostra o overlay de loading global

    const ticketData = {
      title,
      description,
      clientId: clientId ? parseInt(clientId, 10) : null,
      contractId: contractId ? parseInt(contractId, 10) : null,
      withdrawalId: withdrawalId ? parseInt(withdrawalId, 10) : null,
      // O CreatedByUserId agora é pego do token JWT no backend, não precisa enviar
    };

    try {
      await ticketService.createTicket(ticketData);
      alert("Ticket criado com sucesso!");
      // A role será "Support" para clientes, redirecionamos para o dashboard deles
      navigate("/support/dashboard");
    } catch (err) {
      setError(err.toString());
    } finally {
      hideLoading(); // Esconde o overlay de loading
      setIsSubmitting(false);
    }
  };

  return (
    <div style={formStyles.container}>
      <h2 style={formStyles.title}>Abrir Novo Chamado de Suporte</h2>

      {error && <p style={formStyles.error}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div style={formStyles.formGroup}>
          <label htmlFor="title" style={formStyles.label}>
            Título do Chamado*
          </label>
          <input
            id="title"
            type="text"
            style={formStyles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Dificuldade para realizar saque"
            required
          />
        </div>

        <div style={formStyles.formGroup}>
          <label htmlFor="description" style={formStyles.label}>
            Descrição Detalhada*
          </label>
          <textarea
            id="description"
            style={formStyles.textarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Por favor, descreva o problema com o máximo de detalhes possível..."
            required
          />
        </div>

        <h3
          style={{
            color: "#34495e",
            borderTop: "1px solid #ecf0f1",
            paddingTop: "1rem",
            marginTop: "1rem",
          }}
        >
          Informações Adicionais (Se aplicável)
        </h3>

        <div style={formStyles.formGroup}>
          <label htmlFor="clientId" style={formStyles.label}>
            ID do Cliente (se o problema for com um terceiro)
          </label>
          <input
            id="clientId"
            type="number"
            style={formStyles.input}
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            placeholder="Digite o ID numérico do cliente"
          />
        </div>

        <div style={formStyles.formGroup}>
          <label htmlFor="contractId" style={formStyles.label}>
            ID do Contrato
          </label>
          <input
            id="contractId"
            type="number"
            style={formStyles.input}
            value={contractId}
            onChange={(e) => setContractId(e.target.value)}
            placeholder="Digite o ID numérico do contrato"
          />
        </div>

        <div style={formStyles.formGroup}>
          <label htmlFor="withdrawalId" style={formStyles.label}>
            ID do Saque
          </label>
          <input
            id="withdrawalId"
            type="number"
            style={formStyles.input}
            value={withdrawalId}
            onChange={(e) => setWithdrawalId(e.target.value)}
            placeholder="Digite o ID numérico do saque"
          />
        </div>

        <button
          type="submit"
          style={{
            ...formStyles.button,
            ...(isSubmitting ? formStyles.buttonDisabled : {}),
          }}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "Enviar Chamado"}
        </button>
      </form>
    </div>
  );
};

export default CreateTicket;
