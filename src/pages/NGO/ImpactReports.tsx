import { useState } from "react";
import { FaChartLine, FaUsers, FaPlay, FaDownload, FaCalendarAlt, FaMapMarkerAlt, FaGraduationCap, FaTractor } from "react-icons/fa";
import { useI18n } from "../../i18n/useI18n";

interface ImpactData {
  period: string;
  farmersReached: number;
  videosWatched: number;
  completionRate: number;
  avgEngagement: number;
  provincesActive: number;
  topCategory: string;
}

const monthlyData: ImpactData[] = [
  {
    period: "Janeiro 2024",
    farmersReached: 2456,
    videosWatched: 8920,
    completionRate: 78,
    avgEngagement: 85,
    provincesActive: 12,
    topCategory: "Irrigação"
  },
  {
    period: "Dezembro 2023",
    farmersReached: 2280,
    videosWatched: 8150,
    completionRate: 75,
    avgEngagement: 82,
    provincesActive: 11,
    topCategory: "Agricultura"
  },
  {
    period: "Novembro 2023",
    farmersReached: 2010,
    videosWatched: 7340,
    completionRate: 73,
    avgEngagement: 79,
    provincesActive: 10,
    topCategory: "Solos"
  }
];

const provinceImpact = [
  { name: "Luanda", farmers: 1250, engagement: 88, videos: 2340 },
  { name: "Benguela", farmers: 2100, engagement: 92, videos: 3850 },
  { name: "Huambo", farmers: 3200, engagement: 85, videos: 4120 },
  { name: "Malanje", farmers: 1800, engagement: 79, videos: 2980 },
  { name: "Huíla", farmers: 2800, engagement: 91, videos: 4250 }
];

const categoryMetrics = [
  { category: "Irrigação", views: 12450, completion: 82, growth: 15 },
  { category: "Agricultura", views: 11280, completion: 78, growth: 8 },
  { category: "Meteorologia", views: 9840, completion: 85, growth: 22 },
  { category: "Proteção", views: 8920, completion: 76, growth: 12 },
  { category: "Solos", views: 7650, completion: 80, growth: 18 }
];

export default function ImpactReports() {
  const { t } = useI18n();
  const [selectedPeriod, setSelectedPeriod] = useState("Janeiro 2024");
  const [reportType, setReportType] = useState("monthly");

  const currentData = monthlyData.find(data => data.period === selectedPeriod) || monthlyData[0];

  const getGrowthColor = (growth: number) => {
    if (growth > 15) return "text-green-600";
    if (growth > 5) return "text-yellow-600";
    return "text-red-600";
  };

  const getEngagementColor = (engagement: number) => {
    if (engagement >= 85) return "bg-green-100 text-green-800";
    if (engagement >= 70) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t.ngo.impactReports.title}
        </h1>
        <p className="text-gray-600">
          {t.ngo.impactReports.subtitle}
        </p>
      </div>

      {/* Period and Type Selector */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <FaCalendarAlt className="text-gray-500" />
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {monthlyData.map(data => (
                  <option key={data.period} value={data.period}>{data.period}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-gray-700 font-medium">{t.ngo.impactReports.selector.type}:</span>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="monthly">{t.ngo.impactReports.reportTypes.monthly}</option>
                <option value="quarterly">{t.ngo.impactReports.reportTypes.quarterly}</option>
                <option value="annual">{t.ngo.impactReports.reportTypes.annual}</option>
              </select>
            </div>
          </div>

          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
            <FaDownload className="mr-2" />
            {t.ngo.impactReports.selector.export}
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <FaUsers className="text-blue-600 text-xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{currentData.farmersReached.toLocaleString()}</h3>
              <p className="text-gray-600">{t.ngo.impactReports.metrics.farmersReached}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg mr-4">
              <FaPlay className="text-green-600 text-xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{currentData.videosWatched.toLocaleString()}</h3>
              <p className="text-gray-600">{t.ngo.impactReports.metrics.videosWatched}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg mr-4">
              <FaGraduationCap className="text-purple-600 text-xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{currentData.completionRate}%</h3>
              <p className="text-gray-600">{t.ngo.impactReports.metrics.completionRate}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-orange-100 p-3 rounded-lg mr-4">
              <FaMapMarkerAlt className="text-orange-600 text-xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{currentData.provincesActive}</h3>
              <p className="text-gray-600">{t.ngo.impactReports.metrics.provincesActive}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Provincial Impact */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">{t.ngo.impactReports.sections.provinceBreakdown}</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {provinceImpact.map((province, index) => (
                <div key={province.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900">{province.name}</h3>
                    <p className="text-sm text-gray-600">{province.farmers.toLocaleString()} {t.ngo.impactReports.province.farmers}</p>
                  </div>
                  <div className="text-right">
                    <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getEngagementColor(province.engagement)}`}>
                      {province.engagement}% {t.ngo.impactReports.province.engagement}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{province.videos} {t.ngo.impactReports.province.videos}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Category Performance */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Performance por Categoria</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {categoryMetrics.map((category, index) => (
                <div key={category.category} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900">{category.category}</h3>
                    <p className="text-sm text-gray-600">{category.views.toLocaleString()} visualizações</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{category.completion}% conclusão</span>
                      <span className={`text-sm font-bold ${getGrowthColor(category.growth)}`}>
                        +{category.growth}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Engagement Trends */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Tendências de Engajamento</h2>
        </div>
        <div className="p-6">
          {/* Placeholder for Chart */}
          <div className="h-64 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <FaChartLine className="text-6xl text-green-600 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Gráfico de Tendências</h3>
              <p className="text-gray-500 mb-4">Visualização de engajamento ao longo do tempo</p>
              <p className="text-sm text-gray-400">Integração com Chart.js em desenvolvimento</p>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Summary */}
      <div className="mt-6 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg text-white p-6">
        <h2 className="text-2xl font-bold mb-4">Resumo do Impacto - {selectedPeriod}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <FaTractor className="text-3xl mb-2" />
            <h3 className="text-lg font-semibold">Alcance Rural</h3>
            <p className="text-green-100">
              {currentData.farmersReached.toLocaleString()} agricultores em {currentData.provincesActive} províncias
              receberam conhecimento técnico através da plataforma.
            </p>
          </div>
          <div>
            <FaGraduationCap className="text-3xl mb-2" />
            <h3 className="text-lg font-semibold">Educação Efetiva</h3>
            <p className="text-green-100">
              Taxa de conclusão de {currentData.completionRate}% demonstra alta qualidade do conteúdo
              e interesse dos agricultores no aprendizado.
            </p>
          </div>
          <div>
            <FaChartLine className="text-3xl mb-2" />
            <h3 className="text-lg font-semibold">Crescimento Sustentável</h3>
            <p className="text-green-100">
              Engajamento médio de {currentData.avgEngagement}% indica impacto positivo
              na comunidade agrícola angolana.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}