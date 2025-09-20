// src/Components/PrivateRoute/PrivateRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const PrivateRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user, loading } = useAuth();

  // 1. Espera o contexto de autenticação terminar de carregar
  if (loading) {
    return <div>Verificando autenticação...</div>; // Ou um componente de Spinner
  }

  // 2. Se, após o carregamento, o usuário NÃO estiver autenticado, redireciona para o login
  // Esta verificação garante que 'user' não será nulo nas próximas linhas.
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 3. Agora que temos CERTEZA que 'user' existe, podemos verificar a role com segurança.
  const userRole = user.role.toLowerCase(); // Ex: "admin" ou "support"

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Se o usuário está logado mas tenta acessar uma rota que não pode,
    // o redirecionamos para o dashboard correto dele.
    const homePath =
      userRole === "admin" ? "/admin/dashboard" : "/support/dashboard";
    return <Navigate to={homePath} replace />;
  }

  // Se passou por todas as verificações, o usuário tem permissão. Renderiza a rota.
  return <Outlet />;
};

export default PrivateRoute;
