import React, { useState, useEffect } from "react";
import {
  Outlet,
  NavLink,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom"; // Adicionado Link
import { useAuth } from "../../hooks/useAuth";
import styles from "./styles";

// --- Ícones SVG ---
const DashboardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);
const TicketIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 10V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12"></path>
    <path d="m16 16 6 6"></path>
    <path d="M15 6v4"></path>
    <path d="M8 6v4"></path>
    <path d="M12 10.5c-4.5 0-8 3.5-8 3.5s3.5 3.5 8 3.5 8-3.5 8-3.5-3.5-3.5-8-3.5Z"></path>
  </svg>
);
const AddTicketIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 5v14"></path>
    <path d="M5 12h14"></path>
  </svg>
);
const LogoutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

// --- Mapeamento de Títulos ---
const pageTitles = {
  "/admin/dashboard": "Dashboard do Administrador",
  "/support/dashboard": "Meus Tickets de Suporte",
  "/support/new-ticket": "Criar Novo Ticket",
};

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("");
  const [logoutHover, setLogoutHover] = useState(false);
  const [logoHover, setLogoHover] = useState(false); // ✨ Estado para o hover da logo

  useEffect(() => {
    const currentPath = location.pathname;
    const titleKey = Object.keys(pageTitles).find((path) =>
      currentPath.startsWith(path)
    );
    setPageTitle(pageTitles[titleKey] || "Detalhes do Ticket");
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/login/client");
  };

  // Estilo dinâmico para o hover do logout
  const logoutButtonStyle = {
    ...styles.logoutButton,
    ...(logoutHover ? { backgroundColor: "#e74c3c", color: "#ffffff" } : {}),
  };

  // ✨ Estilo dinâmico para o hover da logo
  const logoStyle = {
    ...styles.logo,
    ...(logoHover ? { transform: "scale(1.08)" } : {}),
  };

  // Mapeamento de links
  const adminLinks = [
    { to: "/admin/dashboard", icon: <DashboardIcon />, text: "Dashboard" },
  ];
  const supportLinks = [
    { to: "/support/dashboard", icon: <TicketIcon />, text: "Meus Tickets" },
    {
      to: "/support/new-ticket",
      icon: <AddTicketIcon />,
      text: "Criar Ticket",
    },
  ];
  const linksToRender =
    user?.role?.toLowerCase() === "admin" ? adminLinks : supportLinks;
  const homeLink =
    user?.role?.toLowerCase() === "admin"
      ? "/admin/dashboard"
      : "/support/dashboard";

  return (
    <div style={styles.appContainer}>
      {/* ✨ Injeta os keyframes das animações no <head> da página */}
      <style>{styles.keyframes}</style>

      <aside style={styles.sidebar}>
        <Link
          to={homeLink}
          style={styles.sidebarHeader}
          onMouseEnter={() => setLogoHover(true)}
          onMouseLeave={() => setLogoHover(false)}
        >
          <img src="/imgs/logo.png" alt="Logo da Empresa" style={logoStyle} />
        </Link>

        <nav style={styles.nav}>
          {linksToRender.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              style={({ isActive }) => ({
                ...styles.navLink,
                ...(isActive
                  ? {
                      backgroundColor: "#3498db",
                      color: "#ffffff",
                      fontWeight: "500",
                      letterSpacing: "0.5px",
                    }
                  : {}),
              })}
            >
              {link.icon}
              <span>{link.text}</span>
            </NavLink>
          ))}
        </nav>

        <div style={styles.userProfile}>
          <div style={styles.userInfo}>
            <span style={styles.userName}>{user?.name || user?.email}</span>
            <span style={styles.userEmail}>{user?.email}</span>
          </div>
          <button
            onClick={handleLogout}
            style={logoutButtonStyle}
            onMouseEnter={() => setLogoutHover(true)}
            onMouseLeave={() => setLogoutHover(false)}
          >
            <LogoutIcon />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      <div style={styles.contentWrapper}>
        <header style={styles.header}>
          <h2 style={styles.pageTitle}>{pageTitle}</h2>
        </header>
        <main style={styles.mainContent}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
