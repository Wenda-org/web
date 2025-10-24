import { FaBell, FaUser, FaSignOutAlt, FaBars } from "react-icons/fa";

interface NGOHeaderProps {
  toggleSidebar: () => void;
}

export default function NGOHeader({ toggleSidebar }: NGOHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Mobile menu button */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
        >
          <FaBars className="text-xl" />
        </button>
        
        <div className="flex-1 lg:ml-0 ml-4">
          <h1 className="text-xl lg:text-2xl font-semibold text-gray-900">
            Farm Navigators Angola
          </h1>
          <p className="text-sm text-gray-600 hidden sm:block">
            Plataforma de Gestão Agrícola com Dados NASA
          </p>
        </div>

        <div className="flex items-center space-x-2 lg:space-x-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
            <FaBell className="text-lg lg:text-xl" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">ONG Agricultura Sustentável</p>
              <p className="text-xs text-gray-600">admin@ongagricultura.ao</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <FaUser className="text-lg" />
              </button>
              
              <button className="p-2 text-gray-600 hover:text-red-600 transition-colors">
                <FaSignOutAlt className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}