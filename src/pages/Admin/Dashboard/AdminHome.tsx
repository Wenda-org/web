import { useState } from "react";
import { FaUsers, FaVideo, FaMapMarkerAlt, FaChartLine, FaCog, FaExclamationTriangle, FaBell, FaDownload } from "react-icons/fa";
import { useI18n } from "../../../i18n/useI18n";

interface PlatformStats {
  totalUsers: number;
  activeUsers: number;
  totalNGOs: number;
  totalContent: number;
  systemHealth: number;
  apiCalls: number;
}

interface UserGrowth {
  month: string;
  farmers: number;
  ngos: number;
  admins: number;
}

const mockStats: PlatformStats = {
  totalUsers: 12456,
  activeUsers: 8920,
  totalNGOs: 23,
  totalContent: 156,
  systemHealth: 98.5,
  apiCalls: 45280
};

const userGrowthData: UserGrowth[] = [
  { month: "Jan", farmers: 2100, ngos: 18, admins: 8 },
  { month: "Fev", farmers: 3200, ngos: 19, admins: 9 },
  { month: "Mar", farmers: 4800, ngos: 20, admins: 10 },
  { month: "Abr", farmers: 6400, ngos: 21, admins: 11 },
  { month: "Mai", farmers: 8100, ngos: 22, admins: 12 },
  { month: "Jun", farmers: 9800, ngos: 23, admins: 12 }
];

export default function AdminDashboard() {
  const { t } = useI18n();
  const [timeRange, setTimeRange] = useState("30d");

  const systemAlerts = [
    { id: 1, type: "warning", message: t.admin.dashboard.alerts.high_latency, time: "15 min atrás" },
    { id: 2, type: "info", message: t.admin.dashboard.alerts.backup_completed, time: "1 hora atrás" },
    { id: 3, type: "success", message: `${t.admin.dashboard.alerts.new_ngo}: Verde Angola`, time: "2 horas atrás" },
    { id: 4, type: "warning", message: t.admin.dashboard.alerts.storage_warning, time: "3 horas atrás" }
  ];

  const recentActivity = [
    { action: t.admin.dashboard.activity.video_upload, user: "ONG Sementes do Futuro", detail: "Irrigação por gotejamento", time: "10 min" },
    { action: t.admin.dashboard.activity.new_registration, user: "João Silva", detail: "Agricultor - Luanda", time: "25 min" },
    { action: t.admin.dashboard.activity.report_generated, user: "Admin System", detail: "Relatório mensal", time: "1 hora" },
    { action: t.admin.dashboard.activity.content_approved, user: "Admin Maria", detail: "3 vídeos aprovados", time: "2 horas" }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning": return <FaExclamationTriangle className="text-yellow-500" />;
      case "error": return <FaExclamationTriangle className="text-red-500" />;
      case "success": return <FaBell className="text-green-500" />;
      default: return <FaBell className="text-blue-500" />;
    }
  };

  const getAlertBg = (type: string) => {
    switch (type) {
      case "warning": return "bg-yellow-50 border-yellow-200";
      case "error": return "bg-red-50 border-red-200";
      case "success": return "bg-green-50 border-green-200";
      default: return "bg-blue-50 border-blue-200";
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t.admin.dashboard.title}
        </h1>
        <p className="text-gray-600">
          {t.admin.dashboard.subtitle}
        </p>
      </div>

      {/* Time Range Selector */}
      <div className="mb-6 flex justify-between items-center">
        <div className="flex space-x-2">
          {(["24h", "7d", "30d", "90d"] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {t.admin.dashboard.timeRanges[range]}
            </button>
          ))}
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <FaDownload className="mr-2" />
          {t.admin.common.export}
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <FaUsers className="text-blue-600 text-xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{mockStats.totalUsers.toLocaleString()}</h3>
              <p className="text-gray-600">{t.admin.dashboard.stats.totalUsers}</p>
              <p className="text-sm text-green-600">+12% vs mês anterior</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg mr-4">
              <FaMapMarkerAlt className="text-green-600 text-xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{mockStats.totalNGOs}</h3>
              <p className="text-gray-600">{t.admin.dashboard.stats.totalNGOs}</p>
              <p className="text-sm text-green-600">+2 este mês</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg mr-4">
              <FaVideo className="text-purple-600 text-xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{mockStats.totalContent}</h3>
              <p className="text-gray-600">{t.admin.dashboard.stats.totalContent}</p>
              <p className="text-sm text-green-600">+8 esta semana</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-orange-100 p-3 rounded-lg mr-4">
              <FaChartLine className="text-orange-600 text-xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{mockStats.systemHealth}%</h3>
              <p className="text-gray-600">{t.admin.dashboard.stats.systemHealth}</p>
              <p className="text-sm text-green-600">Excelente</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* User Growth Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">{t.admin.dashboard.charts.userGrowth}</h2>
          </div>
          <div className="p-6">
            <div className="h-64 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <FaChartLine className="text-6xl text-green-600 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Gráfico de Crescimento</h3>
                <p className="text-gray-500 mb-4">Evolução de usuários ao longo do tempo</p>
                <div className="flex justify-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span>Agricultores: {userGrowthData[userGrowthData.length - 1].farmers}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span>ONGs: {userGrowthData[userGrowthData.length - 1].ngos}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">{t.admin.dashboard.charts.systemAlerts}</h2>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {systemAlerts.map((alert) => (
                <div key={alert.id} className={`p-3 rounded-lg border ${getAlertBg(alert.type)}`}>
                  <div className="flex items-start">
                    <div className="mr-3 mt-0.5">
                      {getAlertIcon(alert.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">{t.admin.dashboard.charts.recentActivity}</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <FaBell className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.user}</p>
                    <p className="text-xs text-gray-500">{activity.detail}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Ações Rápidas</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-blue-50 rounded-lg text-center hover:bg-blue-100 transition-colors">
                <FaUsers className="text-2xl text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">{t.admin.navigation.userManagement}</p>
              </button>
              <button className="p-4 bg-green-50 rounded-lg text-center hover:bg-green-100 transition-colors">
                <FaVideo className="text-2xl text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">{t.admin.navigation.contentModeration}</p>
              </button>
              <button className="p-4 bg-purple-50 rounded-lg text-center hover:bg-purple-100 transition-colors">
                <FaChartLine className="text-2xl text-purple-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">{t.admin.navigation.systemReports}</p>
              </button>
              <button className="p-4 bg-orange-50 rounded-lg text-center hover:bg-orange-100 transition-colors">
                <FaCog className="text-2xl text-orange-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">{t.admin.navigation.systemSettings}</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* API Performance */}
      <div className="mt-6 bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Performance da API</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-blue-600">{mockStats.apiCalls.toLocaleString()}</h3>
              <p className="text-gray-600">{t.admin.dashboard.stats.apiCalls}</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-green-600">1.2s</h3>
              <p className="text-gray-600">Tempo médio</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-orange-600">99.8%</h3>
              <p className="text-gray-600">Uptime</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-purple-600">2.1GB</h3>
              <p className="text-gray-600">Dados NASA hoje</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}