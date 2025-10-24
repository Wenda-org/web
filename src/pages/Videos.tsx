import { useEffect, useState } from "react";
import axios from "axios";
import Input from "../components/Admin/form/input/InputField";
import ComponentCard from "../components/Admin/common/ComponentCard";
import { useNavigate } from "react-router-dom";
import logo from "../../public/images/others/logo.png"; // Adjust the path to your logo file


const apiUrl = import.meta.env.VITE_API_URL;
interface Video {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
}


export default function VideoPublicList() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videosPerPage = 6;
  const navigate = useNavigate();
  const [filtered, setFiltered] = useState<Video[]>([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  useEffect(() => {
    filterVideos();
  }, [search, videos]);

  const fetchVideos = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${apiUrl}/videos`, {
        timeout: 5000,
      });
      setVideos(res.data);
    } catch (err) {
      console.error("Erro ao buscar vídeos", err);
      setError("Não foi possível carregar os vídeos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const filterVideos = () => {
    const filtered = videos.filter((video) =>
      video.title.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(filtered);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filtered.length / videosPerPage);
  const paginatedVideos = filtered.slice(
    (currentPage - 1) * videosPerPage,
    currentPage * videosPerPage
  );

  const changePage = (direction: 'next' | 'prev') => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 relative overflow-hidden">
      {/* Subtle animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-100 via-white to-red-50 animate-gradient"></div>
      
      <style>
        {`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradient 15s ease infinite;
          }
        `}
      </style>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-20">
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between py-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center px-3 py-1.5 text-sm font-medium text-white bg-red-400 rounded-lg hover:bg-red-500 transition-colors duration-200"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Voltar
          </button>
          {/* <div className="flex-1 flex justify-center">
            <img
              src={logo}
              alt="Logo"
              width={70}
              height={150}
              className="h-8 sm:h-10 cursor-pointer"
              onClick={() => navigate("/")}
            />
          </div> */}
          <div className="flex-1 max-w-xs sm:max-w-sm mx-2 sm:mx-5">
            <Input
              type="text"
              placeholder="Buscar por título..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 transition bg-white"
            />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 pt-20 pb-8 relative z-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-8">
          Conteúdos Educativos
        </h1>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-red-400 border-r-transparent"></div>
            <p className="mt-2 text-gray-600 text-sm">Carregando vídeos...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-8 text-red-500 text-sm">{error}</div>
        )}

        {/* Empty State */}
        {!loading && !error && paginatedVideos.length === 0 && (
          <div className="text-center py-8 text-gray-600 text-sm">
            Nenhum vídeo encontrado.
          </div>
        )}

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {paginatedVideos.map((video) => (
            <ComponentCard
              key={video.id}
              title={video.title}
              className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white"
            >
              <iframe
                className="w-full h-44 sm:h-56 md:h-64 rounded-lg"
                src={video.youtubeUrl.replace("watch?v=", "embed/")}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <p className="mt-3 text-gray-600 text-sm line-clamp-3">
                {video.description}
              </p>
            </ComponentCard>
          ))}
        </div>

        {/* Pagination */}
        {paginatedVideos.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-center items-center mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => changePage("prev")}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-white bg-red-400 rounded-lg hover:bg-red-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Anterior
            </button>
            <span className="text-gray-700 text-sm">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => changePage("next")}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium text-white bg-red-400 rounded-lg hover:bg-red-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Próxima
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
