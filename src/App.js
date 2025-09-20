import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import { LoadingProvider, useLoading } from "./Context/LoadingContext";
import { useAuth } from "./hooks/useAuth";

// Importando componentes
import LoginAdmin from "./Components/LoginAdmin/LoginAdmin";
import LoginClient from "./Components/LoginClient/LoginClient";
import Layout from "./Components/Layout/Layout";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";
import SupportDashboard from "./Components/SupportDashboard/SupportDashboard";
import CreateTicket from "./Components/CreateTicket/CreateTicket";
import TicketDetail from "./Components/TicketDetail/TicketDetail";
import NotFound from "./Components/NotFound/NotFound";
import Loading from "./Components/Loading/Loading";

// --- Componentes de Controle de Rota ---

// Redireciona o usuário para a página inicial correta após o login
function HomeRedirect() {
  const { user, loading } = useAuth();

  // Usa o componente de loading global enquanto o AuthContext verifica o token
  if (loading) {
    return <Loading />;
  }

  // Se, após o carregamento, não houver usuário, manda para a tela de login
  if (!user) {
    return <Navigate to="/login/client" replace />;
  }

  // Redireciona com base na role do usuário
  return user.role.toLowerCase() === "admin" ? (
    <Navigate to="/admin/dashboard" replace />
  ) : (
    <Navigate to="/support/dashboard" replace />
  );
}

// Impede que um usuário já logado acesse as páginas de login novamente
function LoggedInRedirect() {
  const { isAuthenticated, loading } = useAuth();

  // Também espera o AuthContext carregar
  if (loading) {
    return <Loading />;
  }

  // Se estiver autenticado, redireciona para a home, que por sua vez redirecionará para o dashboard correto
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
}

// --- Componente Principal de Conteúdo ---

// Este componente é o "miolo" da aplicação, onde as rotas são definidas
// e o componente de Loading é exibido condicionalmente.
const AppContent = () => {
  const { isLoading } = useLoading(); // Pega o estado do LoadingContext

  return (
    <>
      {/* O overlay de loading será exibido aqui se isLoading for true */}
      {isLoading && <Loading />}

      <Routes>
        {/* Rotas Públicas (Login) */}
        <Route element={<LoggedInRedirect />}>
          <Route path="/login/admin" element={<LoginAdmin />} />
          <Route path="/login/client" element={<LoginClient />} />
          <Route
            path="/login"
            element={<Navigate to="/login/client" replace />}
          />
        </Route>

        {/* Rota Raiz (controlada pelo HomeRedirect) */}
        <Route path="/" element={<HomeRedirect />} />

        {/* Rotas Protegidas (Dashboards e páginas internas) */}
        <Route element={<PrivateRoute allowedRoles={["admin", "support"]} />}>
          <Route element={<Layout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/support/dashboard" element={<SupportDashboard />} />
            <Route path="/support/new-ticket" element={<CreateTicket />} />
            <Route path="/ticket/:id" element={<TicketDetail />} />
          </Route>
        </Route>

        {/* Rota para páginas não encontradas */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

// --- Componente Raiz da Aplicação ---

// O componente App envolve tudo com os provedores de contexto necessários.
function App() {
  return (
    <AuthProvider>
      <LoadingProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </LoadingProvider>
    </AuthProvider>
  );
}

export default App;
