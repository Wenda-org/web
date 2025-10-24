import { Link, useLocation } from "react-router";
import { 
  FaHome, 
  FaMap, 
  FaVideo, 
  FaChartLine, 
  FaChartBar,
  FaUser,
  FaTimes
} from "react-icons/fa";
import { useI18n } from "../../i18n/useI18n";

interface NGOSidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const NGOSidebar: React.FC<NGOSidebarProps> = ({ isOpen, setIsOpen }) => {
  const { t } = useI18n();
  const location = useLocation();

  const navItems: NavItem[] = [
    { name: t.ngo.navigation.dashboard, path: "/ngo", icon: <FaHome /> },
    { name: t.ngo.navigation.regionalMaps, path: "/ngo/regional-maps", icon: <FaMap /> },
    { name: t.ngo.navigation.educationalContent, path: "/ngo/educational-content", icon: <FaVideo /> },
    { name: t.ngo.navigation.impactReports, path: "/ngo/impact-reports", icon: <FaChartLine /> },
    { name: t.ngo.navigation.regionalStats, path: "/ngo/regional-stats", icon: <FaChartBar /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <Link to="/ngo" className="flex items-center">
              <img
                src="/images/others/logo.png"
                alt="Farm Navigators"
                className="h-8 w-auto"
              />
              <span className="ml-2 text-lg font-bold text-green-600">
                Farm Navigators
              </span>
            </Link>
            
            {/* Close button for mobile */}
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center px-3 py-2 rounded-lg transition-colors duration-200
                  ${isActive(item.path) 
                    ? 'bg-green-100 text-green-700 font-medium' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }
                `}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Profile section */}
          <div className="p-4 border-t border-gray-200">
            <Link
              to="/ngo/profile"
              onClick={() => setIsOpen(false)}
              className={`
                flex items-center px-3 py-2 rounded-lg transition-colors duration-200
                ${isActive("/ngo/profile")
                  ? 'bg-green-100 text-green-700 font-medium' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }
              `}
            >
              <FaUser className="mr-3 text-lg" />
              <span>{t.ngo.navigation.profile}</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NGOSidebar;