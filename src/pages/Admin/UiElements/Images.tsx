import { useEffect, useState } from "react";
import axios from "axios";
import PageBreadcrumb from "../../../components/Admin/common/PageBreadCrumb";
import ComponentCard from "../../../components/Admin/common/ComponentCard";
import PageMeta from "../../../components/Admin/common/PageMeta";
import { useUserData } from "../../../hooks/useUserData";

const apiUrl = import.meta.env.VITE_API_URL;

type RiskZone = {
  id: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
  status: string;
  createdAt: string;
  user?: {
    name: string;
    phone: string;
  };
};


const pageSize = 6;

export default function Images() {
  const [data, setData] = useState<RiskZone[]>([]);
  const [filteredData, setFilteredData] = useState<RiskZone[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormVisible, setIsFormVisible] = useState<{ [key: string]: boolean }>({});
  const [isLoading, setIsLoading] = useState(true);
  const { user, loading } = useUserData();

  const handleDeleteReport = async (id: string) => {
    const confirmDelete = confirm("Tem certeza que deseja eliminar este reporte?");
    if (!confirmDelete) return;
    try {
      await axios.delete(`${apiUrl}/report/${id}`);
      const updated = data.filter((r) => r.id !== id);
      setData(updated);
    } catch (error) {
      console.error("Erro ao eliminar reporte:", error);
      alert("Não foi possível eliminar o reporte.");
    }
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get<RiskZone[]>(`${apiUrl}/report`)
      .then((res) => {
        setData(res.data);
        setFilteredData(res.data);
      })
      .catch((err) => console.error("Erro ao buscar dados:", err))
      .finally(() => setIsLoading(false));
  }, []);

  // Atualiza os filtros
  useEffect(() => {
    let results = [...data];

    if (search) {
      results = results.filter(r =>
        r.description.toLowerCase().includes(search.toLowerCase()) ||
        r.address.toLowerCase().includes(search.toLowerCase()) ||
        r.user?.name.toLowerCase().includes(search.toLowerCase()) ||
        r.user?.phone?.includes(search)
      );
    }

    if (statusFilter !== "ALL") {
      results = results.filter(r => r.status === statusFilter);
    }

    setFilteredData(results);
    setCurrentPage(1); // volta pra primeira página quando filtrar
  }, [search, statusFilter, data]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleCompleteReport = async (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await axios.post(`${apiUrl}/report/${id}/complete`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      // Atualiza a lista com o novo status
      if (user?.id) {
        formData.append("userId", user.id);
      }
      console.log(formData);
      const updatedData = data.map(r =>
        r.id === id ? { ...r, status: "CONFIRMED" } : r
      );
      setData(updatedData);
    } catch (error) {
      console.error("Erro ao enviar conclusão:", error);
      alert("Erro ao concluir o reporte.");
    }
  };

  const toggleFormVisibility = (id: string) => {
    setIsFormVisible((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <>
      <PageMeta title="Reportes" description="Visualização de reportes registrados." />
      <PageBreadcrumb pageTitle="Reportes" />

      <div className="space-y-6">
        <ComponentCard title="Buscar e filtrar reportes">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative">
              <span className="absolute -translate-y-1/2 pointer-events-none left-4 top-1/2">
                <svg
                  className="fill-gray-500 dark:fill-gray-400"
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
                placeholder="Buscar por descrição ou endereço..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-11 w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-12 pr-4 text-sm text-gray-800 shadow-sm placeholder:text-gray-400 focus:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-500/20 xl:w-[430px]"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-md bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600"
            >
              <option value="ALL">Todos os status</option>
              <option value="PENDING">PENDENTE</option>
              <option value="CONFIRMED">RESOLVIDO</option>
              <option value="HIGH">ALTO RISCO</option>
              <option value="MEDIUM">MÉDIO RISCO</option>
              <option value="LOW">BAIXO RISCO</option>
            </select>
          </div>
        </ComponentCard>

        <ComponentCard title="Visualização dos casos">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-10">
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
              <span className="mt-2 text-gray-600">Carregando reportes...</span>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {paginatedData.map((report) => (
                  <div key={report.id} className="bg-white border rounded-lg shadow-md overflow-hidden">
                    <img
                      src={report.imageUrl}
                      alt={report.description}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h2 className="font-bold text-lg text-gray-800">{report.description}</h2>
                      <p className="text-sm text-gray-600">{report.address}</p>
                      {report.user && (
                        <p className="text-xs text-gray-500 mt-1">
                          Reportado por: <span className="font-medium">{report.user.name}</span> ({report.user.phone})
                        </p>
                      )}
                      {/* <p className="mt-1 text-xs text-gray-500">Status: <span className="font-semibold">{report.status}</span></p> */}
                      <p className="text-xs text-gray-400">Criado em: {new Date(report.createdAt).toLocaleDateString()}</p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        <button
                          onClick={() => handleDeleteReport(report.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
                        >
                          Eliminar Reporte
                        </button>

                        {report.status === "PENDING" && (
                          <button
                            onClick={() => toggleFormVisibility(report.id)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
                          >
                            Concluir Reporte
                          </button>
                        )}
                      </div>

                      {isFormVisible[report.id] && (
                        <form
                          className="mt-4 space-y-2"
                          onSubmit={(e) => handleCompleteReport(e, report.id)}
                        >
                          <textarea
                            required
                            name="method"
                            placeholder="Descreva como foi resolvido..."
                            className="w-full border rounded px-3 py-2 text-sm"
                          />
                          <input
                            required
                            type="date"
                            name="date"
                            className="w-full border rounded px-3 py-2 text-sm"
                          />
                          <input
                            required
                            type="file"
                            name="image"
                            accept="image/*"
                            className="w-full text-sm"
                          />
                          <button
                            type="submit"
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
                          >
                            Enviar conclusão
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-6 gap-2">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    className="px-3 py-1 border rounded disabled:opacity-50 bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600"
                    disabled={currentPage === 1}
                  >
                    Anterior
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 border rounded ${page === currentPage
                        ? "bg-blue-500 text-white"
                        : "bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600"
                        }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    className="px-3 py-1 border rounded disabled:opacity-50 bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600"
                    disabled={currentPage === totalPages}
                  >
                    Próxima
                  </button>
                </div>
              )}
            </>
          )}
        </ComponentCard>
      </div>
    </>
  );
}
