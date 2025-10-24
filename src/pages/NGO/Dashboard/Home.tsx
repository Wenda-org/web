import { FaEye, FaMapMarkerAlt, FaVideo, FaUsers, FaChartLine, FaLeaf } from "react-icons/fa";
import { useI18n } from "../../../i18n/useI18n";

export default function Home() {
  const { t } = useI18n();
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t.ngo.dashboard.title}
        </h1>
        <p className="text-gray-600">
          {t.ngo.dashboard.subtitle}
        </p>
      </div>

      {/* Stats Cards - Foco em IMPACTO da ONG */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="flex items-center">
            <FaUsers className="text-blue-500 text-2xl mr-4" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{t.ngo.dashboard.stats.farmersReached}</h3>
              <p className="text-3xl font-bold text-blue-600">2,456</p>
              <p className="text-sm text-gray-500">{t.ngo.dashboard.stats.monthlyGrowth}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="flex items-center">
            <FaVideo className="text-green-500 text-2xl mr-4" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{t.ngo.dashboard.stats.agriflixVideos}</h3>
              <p className="text-3xl font-bold text-green-600">89</p>
              <p className="text-sm text-gray-500">{t.ngo.dashboard.stats.newThisMonth}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
          <div className="flex items-center">
            <FaEye className="text-yellow-500 text-2xl mr-4" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{t.ngo.dashboard.stats.totalViews}</h3>
              <p className="text-3xl font-bold text-yellow-600">45,789</p>
              <p className="text-sm text-gray-500">{t.ngo.dashboard.stats.vsLastMonth}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-emerald-500">
          <div className="flex items-center">
            <FaMapMarkerAlt className="text-emerald-500 text-2xl mr-4" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{t.ngo.dashboard.stats.provincesCovered}</h3>
              <p className="text-3xl font-bold text-emerald-600">12/18</p>
              <p className="text-sm text-gray-500">{t.ngo.dashboard.stats.nationalCoverage}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Regional Impact Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">{t.ngo.dashboard.sections.regionalImpact}</h2>
          <div className="h-64 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <FaMapMarkerAlt className="text-4xl text-green-600 mb-2 mx-auto" />
              <p className="text-gray-600">Mapa de Angola com dados de engajamento</p>
              <p className="text-sm text-gray-500 mt-2">Integração com dados da NASA em desenvolvimento</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">{t.ngo.dashboard.sections.mostWatchedContent}</h2>
          <div className="space-y-4">
            {[
              { title: "Técnicas de Irrigação Sustentável", views: "8,456", category: t.ngo.dashboard.categories.water },
              { title: "Rotação de Culturas em Angola", views: "6,789", category: t.ngo.dashboard.categories.planting },
              { title: "Combate Natural a Pragas", views: "5,234", category: t.ngo.dashboard.categories.protection },
              { title: "Conservação do Solo", views: "4,567", category: t.ngo.dashboard.categories.soil }
            ].map((video, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{video.title}</h4>
                  <p className="text-sm text-gray-500">{video.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">{video.views}</p>
                  <p className="text-xs text-gray-500">visualizações</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions for NGOs */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">{t.ngo.dashboard.sections.quickActions}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
            <FaVideo className="text-blue-600 text-xl mb-2" />
            <h3 className="font-semibold text-gray-900">{t.ngo.dashboard.actions.uploadVideo}</h3>
            <p className="text-sm text-gray-600">Criar conteúdo educativo</p>
          </button>

          <button className="p-4 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors">
            <FaChartLine className="text-green-600 text-xl mb-2" />
            <h3 className="font-semibold text-gray-900">{t.ngo.dashboard.actions.createReport}</h3>
            <p className="text-sm text-gray-600">Gerar relatório mensal</p>
          </button>

          <button className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 hover:bg-yellow-100 transition-colors">
            <FaMapMarkerAlt className="text-yellow-600 text-xl mb-2" />
            <h3 className="font-semibold text-gray-900">{t.ngo.dashboard.actions.viewMaps}</h3>
            <p className="text-sm text-gray-600">Ver dados climativos por província</p>
          </button>
        </div>
      </div>
    </div>
  );
}