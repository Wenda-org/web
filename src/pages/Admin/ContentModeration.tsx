import { useState } from "react";
import { FaVideo, FaCheck, FaTimes, FaEye, FaFlag, FaClock, FaSearch, FaFilter } from "react-icons/fa";
import { useI18n } from "../../i18n/useI18n";

interface Content {
  id: string;
  title: string;
  description: string;
  uploader: string;
  uploaderOrg: string;
  uploadDate: string;
  duration: string;
  status: "pending" | "approved" | "rejected" | "flagged";
  category: string;
  views: number;
  flags: number;
  thumbnail: string;
  reason?: string;
}

const mockContent: Content[] = [
  {
    id: "1",
    title: "Técnicas de Irrigação por Gotejamento",
    description: "Como implementar sistema de irrigação eficiente para economizar água",
    uploader: "Prof. João Silva",
    uploaderOrg: "ONG Verde Angola",
    uploadDate: "2024-01-20",
    duration: "8:45",
    status: "pending",
    category: "Irrigação",
    views: 0,
    flags: 0,
    thumbnail: "/images/video-thumb/irrigation.jpg"
  },
  {
    id: "2", 
    title: "Rotação de Culturas em Solo Angolano",
    description: "Estratégias para manter a fertilidade do solo através da rotação",
    uploader: "Dr. Maria Santos",
    uploaderOrg: "Instituto Agrícola Nacional",
    uploadDate: "2024-01-18",
    duration: "12:30",
    status: "approved",
    category: "Agricultura",
    views: 2340,
    flags: 0,
    thumbnail: "/images/video-thumb/rotation.jpg"
  },
  {
    id: "3",
    title: "Controle de Pragas Sem Químicos",
    description: "Métodos naturais para proteger plantações",
    uploader: "Ana Costa",
    uploaderOrg: "Sementes do Futuro",
    uploadDate: "2024-01-15",
    duration: "6:20",
    status: "flagged",
    category: "Proteção",
    views: 1250,
    flags: 3,
    thumbnail: "/images/video-thumb/pest-control.jpg",
    reason: "Informação científica questionável"
  },
  {
    id: "4",
    title: "Previsão do Tempo com Dados NASA",
    description: "Como usar dados satelitais para planejar plantio",
    uploader: "Carlos Neto", 
    uploaderOrg: "TechAgro Angola",
    uploadDate: "2024-01-22",
    duration: "15:45",
    status: "pending",
    category: "Meteorologia",
    views: 0,
    flags: 0,
    thumbnail: "/images/video-thumb/weather.jpg"
  },
  {
    id: "5",
    title: "Compostagem para Pequenos Agricultores",
    description: "Criando fertilizante orgânico com restos de culturas",
    uploader: "Pedro Martins",
    uploaderOrg: "Cooperativa Rural Benguela",
    uploadDate: "2024-01-10",
    duration: "9:15",
    status: "rejected",
    category: "Solos",
    views: 0,
    flags: 0,
    thumbnail: "/images/video-thumb/compost.jpg",
    reason: "Qualidade de vídeo insuficiente"
  }
];

const categories = ["Todos", "Irrigação", "Agricultura", "Proteção", "Meteorologia", "Solos", "Sementes"];
const statuses = [
  { value: "all", label: "Todos os Status" },
  { value: "pending", label: "Pendente" },
  { value: "approved", label: "Aprovado" },
  { value: "rejected", label: "Rejeitado" },
  { value: "flagged", label: "Sinalizado" }
];

export default function ContentModeration() {
  const { t } = useI18n();
  const [content, setContent] = useState<Content[]>(mockContent);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedContentId, setSelectedContentId] = useState<string | null>(null);

  const categories = [t.admin.contentModeration.tabs.all, "Irrigação", "Agricultura", "Proteção", "Meteorologia", "Solos", "Sementes"];
  const statuses = [
    { value: "all", label: t.admin.contentModeration.tabs.all },
    { value: "pending", label: t.admin.contentModeration.tabs.pending },
    { value: "approved", label: t.admin.contentModeration.tabs.approved },
    { value: "rejected", label: t.admin.contentModeration.tabs.rejected },
    { value: "flagged", label: t.admin.contentModeration.tabs.flagged }
  ];

  const filteredContent = content.filter(item => {
    const matchesCategory = selectedCategory === "Todos" || item.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || item.status === selectedStatus;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.uploader.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.uploaderOrg.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "approved": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      case "flagged": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending": return t.admin.contentModeration.tabs.pending;
      case "approved": return t.admin.contentModeration.tabs.approved;
      case "rejected": return t.admin.contentModeration.tabs.rejected;
      case "flagged": return t.admin.contentModeration.tabs.flagged;
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <FaClock className="text-yellow-600" />;
      case "approved": return <FaCheck className="text-green-600" />;
      case "rejected": return <FaTimes className="text-red-600" />;
      case "flagged": return <FaFlag className="text-orange-600" />;
      default: return null;
    }
  };

  const approveContent = (id: string) => {
    setContent(content.map(item => 
      item.id === id ? { ...item, status: "approved" as const } : item
    ));
  };

  const rejectContent = (id: string, reason: string) => {
    setContent(content.map(item => 
      item.id === id ? { ...item, status: "rejected" as const, reason } : item
    ));
    setShowRejectModal(false);
    setSelectedContentId(null);
  };

  const contentStats = {
    total: content.length,
    pending: content.filter(c => c.status === "pending").length,
    approved: content.filter(c => c.status === "approved").length,
    flagged: content.filter(c => c.status === "flagged").length
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t.admin.contentModeration.title}
        </h1>
        <p className="text-gray-600">
          {t.admin.contentModeration.subtitle}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-gray-100 p-3 rounded-lg mr-4">
              <FaVideo className="text-gray-600 text-xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{contentStats.total}</h3>
              <p className="text-gray-600">Total de Conteúdos</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-lg mr-4">
              <FaClock className="text-yellow-600 text-xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{contentStats.pending}</h3>
              <p className="text-gray-600">Aguardando Revisão</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg mr-4">
              <FaCheck className="text-green-600 text-xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{contentStats.approved}</h3>
              <p className="text-gray-600">Aprovados</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-orange-100 p-3 rounded-lg mr-4">
              <FaFlag className="text-orange-600 text-xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{contentStats.flagged}</h3>
              <p className="text-gray-600">Sinalizados</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar conteúdo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            {statuses.map(status => (
              <option key={status.value} value={status.value}>{status.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContent.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
            {/* Video Thumbnail */}
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                <FaVideo className="text-4xl text-gray-600" />
              </div>
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                {item.duration}
              </div>
              <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(item.status)}`}>
                <span className="mr-1">{getStatusIcon(item.status)}</span>
                {getStatusLabel(item.status)}
              </div>
              {item.flags > 0 && (
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  {item.flags} flags
                </div>
              )}
            </div>

            {/* Content Info */}
            <div className="p-4">
              <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {item.description}
              </p>

              {/* Uploader Info */}
              <div className="border-t border-gray-200 pt-3 mb-3">
                <p className="text-sm font-medium text-gray-900">{item.uploader}</p>
                <p className="text-xs text-gray-500">{item.uploaderOrg}</p>
                <p className="text-xs text-gray-500">{new Date(item.uploadDate).toLocaleDateString('pt-BR')}</p>
              </div>

              {/* Category and Stats */}
              <div className="flex items-center justify-between mb-4">
                <span className="bg-gray-100 px-2 py-1 rounded text-sm">{item.category}</span>
                <div className="flex items-center text-sm text-gray-500">
                  <FaEye className="mr-1" />
                  {item.views.toLocaleString()}
                </div>
              </div>

              {/* Rejection Reason */}
              {item.reason && (
                <div className="bg-red-50 border border-red-200 rounded p-2 mb-3">
                  <p className="text-xs text-red-700">
                    <strong>Motivo:</strong> {item.reason}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-100 text-blue-700 py-2 px-3 rounded hover:bg-blue-200 transition-colors flex items-center justify-center">
                  <FaEye className="mr-1" />
                  Ver
                </button>
                
                {item.status === "pending" || item.status === "flagged" ? (
                  <>
                    <button 
                      onClick={() => approveContent(item.id)}
                      className="flex-1 bg-green-100 text-green-700 py-2 px-3 rounded hover:bg-green-200 transition-colors flex items-center justify-center"
                    >
                      <FaCheck className="mr-1" />
                      Aprovar
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedContentId(item.id);
                        setShowRejectModal(true);
                      }}
                      className="flex-1 bg-red-100 text-red-700 py-2 px-3 rounded hover:bg-red-200 transition-colors flex items-center justify-center"
                    >
                      <FaTimes className="mr-1" />
                      Rejeitar
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredContent.length === 0 && (
        <div className="text-center py-12">
          <FaVideo className="text-6xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum conteúdo encontrado</h3>
          <p className="text-gray-500">Tente ajustar os filtros para ver mais conteúdo.</p>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Rejeitar Conteúdo</h3>
            <p className="text-gray-600 mb-4">
              Por favor, informe o motivo da rejeição:
            </p>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              rows={4}
              placeholder="Motivo da rejeição..."
            />
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  if (selectedContentId) {
                    rejectContent(selectedContentId, "Conteúdo rejeitado pelo moderador");
                  }
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Rejeitar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}