import { useState } from "react";
import { FaPlay, FaPlus, FaEdit, FaTrash, FaEye, FaUpload, FaFilter, FaSearch } from "react-icons/fa";
import { useI18n } from "../../i18n/useI18n";

interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  views: number;
  category: string;
  status: "published" | "draft" | "pending";
  thumbnail: string;
  uploadDate: string;
  language: string;
}

const mockVideos: Video[] = [
  {
    id: "1",
    title: "Técnicas de Irrigação Sustentável",
    description: "Aprenda métodos eficientes de irrigação que conservam água e aumentam a produtividade.",
    duration: "12:34",
    views: 2580,
    category: "Irrigação",
    status: "published",
    thumbnail: "/images/video-thumb/irrigation.jpg",
    uploadDate: "2024-01-15",
    language: "Português"
  },
  {
    id: "2",
    title: "Rotação de Culturas em Angola",
    description: "Como implementar rotação de culturas para melhorar a fertilidade do solo.",
    duration: "8:45",
    views: 1920,
    category: "Agricultura",
    status: "published",
    thumbnail: "/images/video-thumb/rotation.jpg",
    uploadDate: "2024-01-10",
    language: "Português"
  },
  {
    id: "3",
    title: "Previsão Meteorológica para Agricultores",
    description: "Como usar dados da NASA para planejar plantio e colheita.",
    duration: "15:22",
    views: 1456,
    category: "Meteorologia",
    status: "draft",
    thumbnail: "/images/video-thumb/weather.jpg",
    uploadDate: "2024-01-12",
    language: "Português"
  },
  {
    id: "4",
    title: "Controle Natural de Pragas",
    description: "Métodos orgânicos para proteger suas culturas sem pesticidas químicos.",
    duration: "10:18",
    views: 3240,
    category: "Proteção",
    status: "published",
    thumbnail: "/images/video-thumb/pest-control.jpg",
    uploadDate: "2024-01-08",
    language: "Português"
  }
];

const categories = ["Todos", "Irrigação", "Agricultura", "Meteorologia", "Proteção", "Solos", "Sementes"];
const statuses = ["Todos", "published", "draft", "pending"];

export default function EducationalContent() {
  const { t } = useI18n();
  const [videos, setVideos] = useState<Video[]>(mockVideos);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedStatus, setSelectedStatus] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);

  const filteredVideos = videos.filter(video => {
    const matchesCategory = selectedCategory === "Todos" || video.category === selectedCategory;
    const matchesStatus = selectedStatus === "Todos" || video.status === selectedStatus;
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "bg-green-100 text-green-800";
      case "draft": return "bg-yellow-100 text-yellow-800";
      case "pending": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "published": return t.ngo.educationalContent.status.published;
      case "draft": return t.ngo.educationalContent.status.draft;
      case "pending": return t.ngo.educationalContent.status.pending;
      default: return status;
    }
  };

  const totalViews = videos.reduce((sum, video) => sum + video.views, 0);
  const publishedVideos = videos.filter(v => v.status === "published").length;

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t.ngo.educationalContent.title}
        </h1>
        <p className="text-gray-600">
          {t.ngo.educationalContent.subtitle}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg mr-4">
              <FaPlay className="text-green-600 text-xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{videos.length}</h3>
              <p className="text-gray-600">{t.ngo.educationalContent.stats.totalVideos}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <FaEye className="text-blue-600 text-xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{totalViews.toLocaleString()}</h3>
              <p className="text-gray-600">{t.ngo.educationalContent.stats.totalViews}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg mr-4">
              <FaPlay className="text-purple-600 text-xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{publishedVideos}</h3>
              <p className="text-gray-600">{t.ngo.educationalContent.stats.publishedVideos}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-orange-100 p-3 rounded-lg mr-4">
              <FaFilter className="text-orange-600 text-xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{categories.length - 1}</h3>
              <p className="text-gray-600">{t.ngo.educationalContent.stats.categories}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={t.ngo.educationalContent.search.placeholder}
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
                <option key={category} value={category}>{category === "Todos" ? t.ngo.educationalContent.search.allCategories : category}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === "Todos" ? t.ngo.educationalContent.search.allStatuses : getStatusText(status)}
                </option>
              ))}
            </select>
          </div>

          {/* Upload Button */}
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
          >
            <FaUpload className="mr-2" />
            {t.ngo.educationalContent.upload.button}
          </button>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <div key={video.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                <FaPlay className="text-4xl text-gray-600" />
              </div>
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                {video.duration}
              </div>
              <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(video.status)}`}>
                {getStatusText(video.status)}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                {video.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {video.description}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span className="bg-gray-100 px-2 py-1 rounded">{video.category}</span>
                <span>{video.views.toLocaleString()} {t.ngo.educationalContent.video.views}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {new Date(video.uploadDate).toLocaleDateString('pt-BR')}
                </span>
                <div className="flex space-x-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                    <FaEye />
                  </button>
                  <button className="p-2 text-green-600 hover:bg-green-50 rounded">
                    <FaEdit />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="text-center py-12">
          <FaPlay className="text-6xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum vídeo encontrado</h3>
          <p className="text-gray-500">Tente ajustar os filtros ou adicione novos vídeos.</p>
        </div>
      )}

      {/* Upload Modal (placeholder) */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Enviar Novo Vídeo</h3>
            <p className="text-gray-600 mb-4">
              Funcionalidade de upload em desenvolvimento. Integração com sistema de armazenamento de vídeos.
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Entendi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}