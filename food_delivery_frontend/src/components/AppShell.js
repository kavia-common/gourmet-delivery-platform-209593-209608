import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./AppShell.css";

/**
 * PUBLIC_INTERFACE
 * App-wide shell with retro navbar and a responsive sidebar.
 */
export default function AppShell({ title, tabs, children }) {
  const { user, role, logout } = useAuth();

  return (
    <div className="Shell">
      <header className="ShellTopbar" role="banner">
        <div className="ShellBrand">
          <Link className="ShellLogo" to="/">
            Gourmet Delivery
          </Link>
          <span className="ShellTag">Retro Edition</span>
        </div>

        <div className="ShellTopRight">
          <div className="ShellUser">
            <span className="ShellUserName">{user?.name || "Guest"}</span>
            <span className="ShellUserRole">{role.toUpperCase()}</span>
          </div>
          <button className="Btn BtnGhost" onClick={logout}>
            Sign out
          </button>
        </div>
      </header>

      <div className="ShellBody">
        <aside className="ShellSidebar" aria-label="Primary">
          <h2 className="ShellSidebarTitle">{title}</h2>
          <nav className="ShellNav">
            {tabs.map((t) => (
              <NavLink
                key={t.to}
                to={t.to}
                className={({ isActive }) => (isActive ? "ShellNavItem active" : "ShellNavItem")}
              >
                <span className="ShellNavIcon" aria-hidden="true">
                  {t.icon}
                </span>
                <span className="ShellNavLabel">{t.label}</span>
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="ShellContent" role="main">
          {children}
        </main>
      </div>
    </div>
  );
}
