import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  MapPin,
  Map,
  Users,
  Brain,
  Activity,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "../../i18n/config";
import LogoBola from "../../public/images/logo/logo-bola.png";
import LogoFull from "../../public/images/logo/logo.png";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "nav.dashboard" },
  { to: "/destinations", icon: MapPin, label: "nav.destinations" },
  { to: "/map", icon: Map, label: "nav.map" },
  { to: "/users", icon: Users, label: "nav.users" },
  { to: "/ml", icon: Brain, label: "nav.ml" },
  { to: "/monitoring", icon: Activity, label: "nav.monitoring" },
  { to: "/notifications", icon: Bell, label: "nav.notifications" },
  { to: "/settings", icon: Settings, label: "nav.settings" },
];

export function Sidebar() {
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    try {
      const raw = localStorage.getItem("sidebar-collapsed");
      return raw === "true";
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("sidebar-collapsed", String(collapsed));
    } catch (e) {
      // ignore
    }
  }, [collapsed]);

  return (
    <aside
      className={`h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-200 ${
        collapsed ? "w-20" : "w-64"
      }`}
      aria-expanded={!collapsed}
    >
      <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
        <div
          className={`flex items-center gap-3 ${
            collapsed ? "justify-center w-full" : ""
          }`}
        >
          <img
            src={LogoFull}
            alt="Wenda"
            className={`w-10 h-10 ${collapsed ? "mx-auto" : ""}`}
          />
        </div>

        <button
          onClick={() => setCollapsed((s) => !s)}
          aria-label={
            collapsed
              ? t("nav.expand", "Expand sidebar")
              : t("nav.collapse", "Collapse sidebar")
          }
          className="p-2 rounded-md hover:bg-sidebar-accent/50"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      <nav className="flex-1 p-2 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            title={t(item.label)}
            className={({ isActive }) =>
              `flex items-center ${
                collapsed ? "justify-center" : "gap-3"
              } px-4 py-3 rounded-xl transition-colors ${
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            {!collapsed && (
              <span className="transition-opacity transition-transform duration-200 ease-in-out opacity-100 translate-x-0">
                {t(item.label)}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div
          className={`flex items-center gap-3 px-4 py-3 ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <img src={LogoBola} alt="avatar" className="w-8 h-8 rounded-full" />
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="truncate">{t("nav.admin_user")}</p>
              <p className="text-muted-foreground truncate">
                {t("nav.admin_email")}
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
