import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ticketService from "../../Services/ticketService"; // Importa o serviço de API
import { useAuth } from "../../hooks/useAuth";
import styles from "./styles"; // Seus estilos CSS-in-JS
import { useLoading } from "../../Context/LoadingContext";

// Componente interno para exibir o status visualmente
const TicketStatus = ({ status }) => {
  const getStatusInfo = (s) => {
    switch (s?.toLowerCase()) {
      case "pending":
        return { text: "Pendente", style: styles.statusPending };
      case "inprogress":
        return { text: "Em Andamento", style: styles.statusInProgress };
      case "completed":
        return { text: "Concluído", style: styles.statusCompleted };
      case "cancelled":
        return { text: "Cancelado", style: styles.statusCancelled };
      default:
        return { text: status, style: {} };
    }
  };

  const { text, style } = getStatusInfo(status);

  return <span style={{ ...styles.statusBadge, ...style }}>{text}</span>;
};

const TicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const { showLoading, hideLoading } = useLoading();

  // Usamos useCallback para evitar que a função seja recriada em cada renderização
  const fetchTicket = useCallback(async () => {
    if (!id) return;
    try {
      showLoading()
      setError("");
      setLoading(true);
      const data = await ticketService.getTicketById(id);
      setTicket(data);
      setNewStatus(data.status); // Define o status inicial para o select
    } catch (err) {
      setError(
        "Falha ao carregar os detalhes do ticket. Verifique se o ticket existe."
      );
      console.error(err);
    } finally {
      setLoading(false);
      hideLoading()
    }
  }, [id]);

  useEffect(() => {
    fetchTicket();
  }, [fetchTicket]);

  const handleStatusChange = async () => {
    if (!ticket) return;

    try {
      showLoading();
      const updatedTicket = await ticketService.updateTicketStatus(
        ticket.id,
        newStatus
      );
      // Atualiza o estado local com os dados frescos retornados pela API
      setTicket(updatedTicket);
      alert("Status do ticket atualizado com sucesso!");
    } catch (err) {
      alert("Ocorreu um erro ao atualizar o status. Tente novamente.");
      console.error(err);
    } finally{
      hideLoading()
    }
  };

  // Renderizações condicionais para loading e erro
  if (loading) {
    return <div>Carregando detalhes do ticket...</div>;
  }

  if (error) {
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  }

  // Se não estiver carregando, não tiver erro, mas o ticket for nulo
  if (!ticket) {
    return <p>Ticket não encontrado.</p>;
  }

  return (
    <div style={styles.container}>
      {/* CABEÇALHO */}
      <div style={styles.header}>
        <h2 style={styles.title}>
          Ticket #{ticket.id}: {ticket.title}
        </h2>
        <TicketStatus status={ticket.status} />
      </div>

      {/* CORPO DE INFORMAÇÕES */}
      <div style={styles.body}>
        <div style={styles.infoRow}>
          <span style={styles.infoLabel}>Criado por (ID do Usuário):</span>
          <span>{ticket.createdByUserId}</span>
        </div>
        <div style={styles.infoRow}>
          <span style={styles.infoLabel}>Data de Criação:</span>
          <span>{new Date(ticket.createdAt).toLocaleString()}</span>
        </div>
        <div style={styles.infoRow}>
          <span style={styles.infoLabel}>Última Atualização:</span>
          <span>{new Date(ticket.updatedAt).toLocaleString()}</span>
        </div>

        {/* Informações adicionais (opcionais) */}
        {ticket.clientId && (
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>ID do Cliente Afetado:</span>
            <span>{ticket.clientId}</span>
          </div>
        )}
        {ticket.contractId && (
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>ID do Contrato:</span>
            <span>{ticket.contractId}</span>
          </div>
        )}
        {ticket.withdrawalId && (
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>ID do Saque:</span>
            <span>{ticket.withdrawalId}</span>
          </div>
        )}
      </div>

      {/* DESCRIÇÃO DO PROBLEMA */}
      <div>
        <h3 style={{ ...styles.title, fontSize: "1.2rem", marginTop: "2rem" }}>
          Descrição do Problema
        </h3>
        <p style={styles.descriptionBox}>{ticket.description}</p>
      </div>

      {/* AÇÕES DO ADMINISTRADOR */}
      {user?.role?.toLowerCase() === "admin" && (
        <div style={styles.adminActions}>
          <h3 style={styles.adminTitle}>Ações do Administrador</h3>
          <div style={styles.adminFormGroup}>
            <label htmlFor="status" style={styles.infoLabel}>
              Alterar Status:
            </label>
            <select
              id="status"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              style={styles.adminSelect}
            >
              {/* Os valores correspondem exatamente ao Enum no backend C# */}
              <option value="Pending">Pendente</option>
              <option value="InProgress">Em Andamento</option>
              <option value="Completed">Concluído</option>
              <option value="Cancelled">Cancelado</option>
            </select>
            <button
              onClick={handleStatusChange}
              style={styles.adminButton}
              disabled={newStatus === ticket.status} // Desabilita se o status não mudou
            >
              Salvar Alteração
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketDetail;
