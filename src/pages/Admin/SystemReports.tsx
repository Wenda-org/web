import { useState } from "react";
import { FaChartLine, FaDownload, FaUsers, FaVideo, FaMapMarkerAlt, FaCalendarAlt, FaCog, FaServer } from "react-icons/fa";
import { useI18n } from "../../i18n/useI18n";

interface SystemMetrics {
  period: string;
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  contentUploaded: number;
  contentViewed: number;
  apiCalls: number;
  dataTransfer: string;
  uptime: number;
}

interface RegionalMetrics {
  province: string;
  users: number;
  growth: number;
  engagement: number;
  contentViews: number;
}

const systemData: SystemMetrics[] = [
  {
    period: "Janeiro 2024",
    totalUsers: 12456,
    activeUsers: 8920,
    newUsers: 1240,
    contentUploaded: 23,
    contentViewed: 45680,
    apiCalls: 892340,
    dataTransfer: "2.8TB",
    uptime: 99.8
  },
  {
    period: "Dezembro 2023",
    totalUsers: 11216,
    activeUsers: 7980,
    newUsers: 980,
    contentUploaded: 18,
    contentViewed: 38920,
    apiCalls: 756280,
    dataTransfer: "2.1TB",
    uptime: 99.5
  },
  {
    period: "Novembro 2023",
    totalUsers: 10236,
    activeUsers: 7120,
    newUsers: 820,
    contentUploaded: 15,
    contentViewed: 32450,
    apiCalls: 645190,
    dataTransfer: "1.9TB",
    uptime: 99.9
  }
];

const regionalData: RegionalMetrics[] = [
  { province: "Luanda", users: 3200, growth: 15.2, engagement: 88, contentViews: 12450 },
  { province: "Benguela", users: 2800, growth: 22.1, engagement: 92, contentViews: 10380 },
  { province: "Huambo", users: 2400, growth: 18.7, engagement: 85, contentViews: 9120 },
  { province: "Huíla", users: 1900, growth: 25.3, engagement: 91, contentViews: 7890 },
  { province: "Malanje", users: 1600, growth: 12.8, engagement: 79, contentViews: 6540 },
  { province: "Bié", users: 1200, growth: 16.4, engagement: 83, contentViews: 5210 }
];

export default function SystemReports() {
  const { t } = useI18n();
  const [selectedPeriod, setSelectedPeriod] = useState("Janeiro 2024");
  const [selectedReport, setSelectedReport] = useState("system");

  const reportTypes = [
    { value: "system", label: t.admin.systemReports.reportTypes.systemPerformance, icon: <FaServer /> },
    { value: "users", label: t.admin.systemReports.reportTypes.userActivity, icon: <FaUsers /> },
    { value: "content", label: t.admin.systemReports.reportTypes.contentAnalytics, icon: <FaVideo /> },
    { value: "regional", label: "Relatório Regional", icon: <FaMapMarkerAlt /> }
  ];

  const currentData = systemData.find(data => data.period === selectedPeriod) || systemData[0];
  const previousData = systemData[systemData.indexOf(currentData) + 1];

  const calculateGrowth = (current: number, previous: number) => {
    if (!previous) return 0;
    return ((current - previous) / previous * 100);
  };

  const getGrowthColor = (growth: number) => {
    if (growth > 0) return "text-green-600";
    if (growth < 0) return "text-red-600";
    return "text-gray-600";
  };

  const getGrowthIcon = (growth: number) => {
    if (growth > 0) return "↗";
    if (growth < 0) return "↘";
    return "→";
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t.admin.systemReports.title}
        </h1>
        <p className="text-gray-600">
          {t.admin.systemReports.subtitle}
        </p>
      </div>

      {/* Report Type and Period Selector */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Report Type */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-700 font-medium">Tipo de Relatório:</span>
              <select
                value={selectedReport}
                onChange={(e) => setSelectedReport(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {reportTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            {/* Period */}
            <div className="flex items-center space-x-2">
              <FaCalendarAlt className="text-gray-500" />
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {systemData.map(data => (
                  <option key={data.period} value={data.period}>{data.period}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex space-x-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
              <FaDownload className="mr-2" />
              Exportar PDF
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
              <FaDownload className="mr-2" />
              Exportar Excel
            </button>
          </div>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{currentData.totalUsers.toLocaleString()}</h3>
              <p className="text-gray-600">Usuários Totais</p>
              {previousData && (
                <p className={`text-sm ${getGrowthColor(calculateGrowth(currentData.totalUsers, previousData.totalUsers))}`}>
                  {getGrowthIcon(calculateGrowth(currentData.totalUsers, previousData.totalUsers))} 
                  {Math.abs(calculateGrowth(currentData.totalUsers, previousData.totalUsers)).toFixed(1)}%
                </p>
              )}
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <FaUsers className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{currentData.activeUsers.toLocaleString()}</h3>
              <p className="text-gray-600">Usuários Ativos</p>
              {previousData && (
                <p className={`text-sm ${getGrowthColor(calculateGrowth(currentData.activeUsers, previousData.activeUsers))}`}>
                  {getGrowthIcon(calculateGrowth(currentData.activeUsers, previousData.activeUsers))} 
                  {Math.abs(calculateGrowth(currentData.activeUsers, previousData.activeUsers)).toFixed(1)}%
                </p>
              )}
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <FaChartLine className="text-green-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{currentData.contentViewed.toLocaleString()}</h3>
              <p className="text-gray-600">Visualizações</p>
              {previousData && (
                <p className={`text-sm ${getGrowthColor(calculateGrowth(currentData.contentViewed, previousData.contentViewed))}`}>
                  {getGrowthIcon(calculateGrowth(currentData.contentViewed, previousData.contentViewed))} 
                  {Math.abs(calculateGrowth(currentData.contentViewed, previousData.contentViewed)).toFixed(1)}%
                </p>
              )}
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <FaVideo className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{currentData.uptime}%</h3>
              <p className="text-gray-600">Uptime</p>
              {previousData && (
                <p className={`text-sm ${getGrowthColor(calculateGrowth(currentData.uptime, previousData.uptime))}`}>
                  {getGrowthIcon(calculateGrowth(currentData.uptime, previousData.uptime))} 
                  {Math.abs(calculateGrowth(currentData.uptime, previousData.uptime)).toFixed(2)}%
                </p>
              )}
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <FaServer className="text-orange-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Performance Metrics */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Métricas de Performance</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Chamadas API</p>
                  <p className="text-sm text-gray-600">Total no período</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">{currentData.apiCalls.toLocaleString()}</p>
                  {previousData && (
                    <p className={`text-sm ${getGrowthColor(calculateGrowth(currentData.apiCalls, previousData.apiCalls))}`}>
                      {getGrowthIcon(calculateGrowth(currentData.apiCalls, previousData.apiCalls))} 
                      {Math.abs(calculateGrowth(currentData.apiCalls, previousData.apiCalls)).toFixed(1)}%
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Transferência de Dados</p>
                  <p className="text-sm text-gray-600">Dados NASA processados</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">{currentData.dataTransfer}</p>
                  <p className="text-sm text-gray-500">Este mês</p>
                </div>
              </div>

              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Novos Usuários</p>
                  <p className="text-sm text-gray-600">Cadastros no período</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-purple-600">{currentData.newUsers.toLocaleString()}</p>
                  {previousData && (
                    <p className={`text-sm ${getGrowthColor(calculateGrowth(currentData.newUsers, previousData.newUsers))}`}>
                      {getGrowthIcon(calculateGrowth(currentData.newUsers, previousData.newUsers))} 
                      {Math.abs(calculateGrowth(currentData.newUsers, previousData.newUsers)).toFixed(1)}%
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Conteúdo Enviado</p>
                  <p className="text-sm text-gray-600">Novos vídeos no período</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-orange-600">{currentData.contentUploaded}</p>
                  {previousData && (
                    <p className={`text-sm ${getGrowthColor(calculateGrowth(currentData.contentUploaded, previousData.contentUploaded))}`}>
                      {getGrowthIcon(calculateGrowth(currentData.contentUploaded, previousData.contentUploaded))} 
                      {Math.abs(calculateGrowth(currentData.contentUploaded, previousData.contentUploaded)).toFixed(1)}%
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Regional Performance */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Performance Regional</h2>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {regionalData.map((region, index) => (
                <div key={region.province} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-bold text-green-600">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{region.province}</h3>
                      <p className="text-sm text-gray-600">{region.users.toLocaleString()} usuários</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{region.engagement}% engajamento</p>
                    <p className={`text-xs ${getGrowthColor(region.growth)}`}>
                      {getGrowthIcon(region.growth)} {region.growth.toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Tendências Temporais</h2>
        </div>
        <div className="p-6">
          <div className="h-64 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <FaChartLine className="text-6xl text-green-600 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Gráfico de Tendências</h3>
              <p className="text-gray-500 mb-4">Visualização temporal das métricas do sistema</p>
              <p className="text-sm text-gray-400">Integração com Chart.js em desenvolvimento</p>
            </div>
          </div>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="mt-6 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg text-white p-6">
        <h2 className="text-2xl font-bold mb-4">Resumo Executivo - {selectedPeriod}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <FaUsers className="text-3xl mb-2" />
            <h3 className="text-lg font-semibold">Crescimento de Usuários</h3>
            <p className="text-green-100">
              A plataforma alcançou {currentData.totalUsers.toLocaleString()} usuários, 
              com {currentData.newUsers.toLocaleString()} novos cadastros no período.
            </p>
          </div>
          <div>
            <FaVideo className="text-3xl mb-2" />
            <h3 className="text-lg font-semibold">Engajamento de Conteúdo</h3>
            <p className="text-green-100">
              {currentData.contentViewed.toLocaleString()} visualizações de conteúdo educativo, 
              demonstrando alta adoção da plataforma AgriFlix.
            </p>
          </div>
          <div>
            <FaCog className="text-3xl mb-2" />
            <h3 className="text-lg font-semibold">Estabilidade do Sistema</h3>
            <p className="text-green-100">
              Uptime de {currentData.uptime}% e {currentData.apiCalls.toLocaleString()} chamadas API 
              processadas com sucesso.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}