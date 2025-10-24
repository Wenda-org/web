import { useEffect, useState } from "react";
import axios from "axios";
import ComponentCard from "../../../components/Admin/common/ComponentCard";
import PageMeta from "../../../components/Admin/common/PageMeta";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../../components/Admin/ui/table";

const apiUrl = import.meta.env.VITE_API_URL;
const pageSize = 8;

interface Video {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  createdAt: string;
  isActive?: boolean; // Optional, for toggle status
}

export default function VideoSee() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [filtered, setFiltered] = useState<Video[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [editForm, setEditForm] = useState({ title: "", description: "", youtubeUrl: "" });
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  
  // Fetch videos
  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get<Video[]>(`${apiUrl}/videos`, { timeout: 5000 });
      setVideos(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error("Erro ao buscar vídeos:", err);
      setError("Não foi possível carregar os vídeos. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  // Filter by search
  useEffect(() => {
    let list = [...videos];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          v.description.toLowerCase().includes(q)
      );
    }
    setFiltered(list);
    setCurrentPage(1);
  }, [search, videos]);

  const handleEdit = (video: Video) => {
    setEditingVideo(video);
    setEditForm({
      title: video.title,
      description: video.description,
      youtubeUrl: video.youtubeUrl,
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVideo) return;

    if (!editForm.title || !editForm.description || !editForm.youtubeUrl) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const res = await axios.put(`${apiUrl}/videos/${editingVideo.id}`, editForm);
      setVideos((prev) =>
        prev.map((v) => (v.id === editingVideo.id ? res.data : v))
      );
      setEditingVideo(null);
      alert("Vídeo atualizado com sucesso!");
    } catch (err: any) {
      console.error("Erro ao atualizar vídeo:", err);
      alert(err.response?.data?.error || "Erro ao atualizar vídeo.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este vídeo?")) return;

    try {
      await axios.delete(`${apiUrl}/videos/${id}`);
      setVideos((prev) => prev.filter((v) => v.id !== id));
      alert("Vídeo deletado com sucesso!");
    } catch (err: any) {
      console.error("Erro ao deletar vídeo:", err);
      alert(err.response?.data?.error || "Erro ao deletar vídeo.");
    }
  };

  const totalPages = Math.ceil(filtered.length / pageSize);
  const pageData = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="">
      {/* Main Content */}
      <div className="">
        <PageMeta title="Lista de Vídeos" description="Gerencie vídeos da plataforma" />
        {/* <PageBreadcrumb pageTitle="Gerencie o conteúdo educativo" /> */}
        <div className="space-y-6">
          <ComponentCard title="Buscar Vídeos" className="shadow-lg bg-white rounded-lg p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="relative">
                <span className="absolute -translate-y-1/2 pointer-events-none left-4 top-1/2">
                  <svg
                    className="fill-gray-500"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                      fill=""
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Buscar por título ou descrição..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-11 w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-12 pr-4 text-sm text-gray-800 shadow-sm placeholder:text-gray-400 focus:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-500/20 xl:w-[430px]"
                />
              </div>
            </div>
          </ComponentCard>
          <ComponentCard title="Gerencie os vídeos" className="shadow-lg bg-white rounded-lg p-6">
            {isLoading ? (
              <div className="flex flex-col items-center py-10">
                <svg
                  className="animate-spin h-8 w-8 text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                <span className="mt-2 text-gray-600 text-sm">Carregando vídeos...</span>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center py-10">
                <svg
                  className="h-8 w-8 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="mt-2 text-red-500 text-sm">{error}</span>
              </div>
            ) : pageData.length === 0 ? (
              <div className="flex flex-col items-center py-10">
                <svg
                  className="h-8 w-8 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                <span className="mt-2 text-gray-600 text-sm">Nenhum vídeo encontrado.</span>
              </div>
            ) : (
              <>
                <div className="max-w-full p-4 rounded-xl border border-gray-200 bg-white">
                  <Table>
                    <TableHeader className="border-b border-gray-100">
                      <TableRow>
                        <TableCell
                          isHeader
                          className="px-5 py-3 font-medium text-gray-500 text-start text-sm"
                        >
                          Título
                        </TableCell>
                        <TableCell
                          isHeader
                          className="px-5 py-3 font-medium text-gray-500 text-start text-sm"
                        >
                          Descrição
                        </TableCell>
                        <TableCell
                          isHeader
                          className="px-5 py-3 font-medium text-gray-500 text-start text-sm"
                        >
                          URL
                        </TableCell>
                        <TableCell
                          isHeader
                          className="px-5 py-3 font-medium text-gray-500 text-start text-sm"
                        >
                          Ações
                        </TableCell>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-gray-100">
                      {pageData.map((video) => (
                        <TableRow
                          key={video.id}
                          className="hover:bg-gray-50 transition-colors duration-150"
                        >
                          <TableCell className="px-5 py-4 text-start">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 overflow-hidden rounded-lg">
                                <img
                                  width={40}
                                  height={40}
                                  src={`https://img.youtube.com/vi/${video.youtubeUrl.split("v=")[1]}/0.jpg`}
                                  alt={video.title}
                                />
                              </div>
                              <span className="block font-medium text-gray-800 text-sm">
                                {video.title}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="px-5 py-4 text-gray-600 text-sm text-start line-clamp-2">
                            {video.description}
                          </TableCell>
                          <TableCell className="px-5 py-4 text-sm text-start">
                            <a
                              href={video.youtubeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              Ver vídeo
                            </a>
                          </TableCell>
                          <TableCell className="px-5 py-4 text-start flex items-center gap-2 flex-wrap">
                            <div className="relative inline-block text-left">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenDropdownId(openDropdownId === video.id ? null : video.id);
                                }}
                                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-2 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                              >
                                ⋮
                              </button>

                              {openDropdownId === video.id && (
                                <div className="origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                                  <div className="py-1 text-sm text-gray-700">
                                    <button
                                      onClick={() => handleEdit(video)}
                                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                    >
                                      Editar
                                    </button>
                                    <button
                                      onClick={() => handleDelete(video.id)}
                                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                    >
                                       Excluir
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                            {/* <button
                              onClick={() => handleEdit(video)}
                              className="px-2 py-1 text-xs font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors duration-200"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleDelete(video.id)}
                              className="px-2 py-1 text-xs font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors duration-200"
                            >
                              Excluir
                            </button> */}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-4 mt-6">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 text-sm font-medium text-white bg-red-400 rounded-lg hover:bg-red-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      Anterior
                    </button>
                    <span className="text-sm text-gray-600 font-medium">
                      {currentPage} / {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 text-sm font-medium text-white bg-red-400 rounded-lg hover:bg-red-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      Próxima
                    </button>
                  </div>
                )}
              </>
            )}
          </ComponentCard>
        </div>

        {/* Edit Modal */}
        {editingVideo && (
          <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-30">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md mx-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Editar Vídeo</h2>
              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Título</label>
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="w-full p-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 transition bg-white shadow-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Descrição</label>
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    className="w-full p-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 transition bg-white shadow-sm"
                    rows={4}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">URL do YouTube</label>
                  <input
                    type="url"
                    value={editForm.youtubeUrl}
                    onChange={(e) => setEditForm({ ...editForm, youtubeUrl: e.target.value })}
                    className="w-full p-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 transition bg-white shadow-sm"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingVideo(null)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-red-400 rounded-lg hover:bg-red-500 transition-colors duration-200"
                  >
                    Salvar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}