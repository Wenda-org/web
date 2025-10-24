import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard,
  MapPin,
  Map,
  Users,
  Brain,
  Activity,
  Bell,
  Settings,
} from 'lucide-react';
import '../../i18n/config';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'nav.dashboard' },
  { to: '/destinations', icon: MapPin, label: 'nav.destinations' },
  { to: '/map', icon: Map, label: 'nav.map' },
  { to: '/users', icon: Users, label: 'nav.users' },
  { to: '/ml', icon: Brain, label: 'nav.ml' },
  { to: '/monitoring', icon: Activity, label: 'nav.monitoring' },
  { to: '/notifications', icon: Bell, label: 'nav.notifications' },
  { to: '/settings', icon: Settings, label: 'nav.settings' },
];

export function Sidebar() {
  const { t } = useTranslation();

  return (
    <aside className="w-64 h-screen bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-[#136F63]">Wenda Admin</h1>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{t(item.label)}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-8 h-8 rounded-full bg-[#136F63] flex items-center justify-center text-white">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate">Admin User</p>
            <p className="text-muted-foreground truncate">admin@wenda.ao</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
