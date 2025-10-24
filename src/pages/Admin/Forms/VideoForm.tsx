import PageBreadcrumb from "../../../components/Admin/common/PageBreadCrumb";
import PageMeta from "../../../components/Admin/common/PageMeta";
import Label from "../../../components/Admin/form/Label";
import Input from "../../../components/Admin/form/input/InputField";
import ComponentCard from "../../../components/Admin/common/ComponentCard";
import { useState } from "react";
import { useUserData } from "../../../hooks/useUserData";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export default function VideoForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [youtubeUrl, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string>("");
    const { user } = useUserData();

    console.log(`olha o id: ${user?.id}`);
    const handleSubmit = async () => {
        if (!title || !description || !youtubeUrl) {
            setMessage("Preencha todos os campos obrigatórios!");
            return;
        }

        setLoading(true);

        try {
            await axios.post(`${apiUrl}/videos`, {
                createdBy : user?.id,
                title,
                description,
                youtubeUrl,
            });

            setMessage("Vídeo criado com sucesso!");
            setTitle("");
            setDescription("");
            setUrl("");
        } catch (err) {
            console.error(err);
            setMessage("Erro ao criar vídeo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <PageMeta title="Criar Vídeo" description="Criação de um novo vídeo" />
            <PageBreadcrumb pageTitle="Criar vídeo" />

            {message && (
                <div
                    className={`flex justify-between items-center p-4 mb-4 text-white rounded-lg ${message.includes("sucesso") ? "bg-green-500" : "bg-red-500"}`}
                >
                    <span>{message}</span>
                    <button onClick={() => setMessage("")} className="ml-4 hover:text-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-1">
                {/* Formulário */}
                <div className="space-y-6">
                    <ComponentCard title="">
                        <div className="space-y-6">
                            <div>
                                <Label>Título</Label>
                                <Input
                                    type="text"
                                    placeholder="Ex: Introdução à Plataforma"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div>
                                <Label>Descrição</Label>
                                <Input
                                    type="text"
                                    placeholder="Descrição do vídeo"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div>
                                <Label>Link do vídeo (YouTube, Vimeo...)</Label>
                                <Input
                                    type="url"
                                    placeholder="https://youtube.com/..."
                                    value={youtubeUrl}
                                    onChange={(e) => setUrl(e.target.value)}
                                />
                            </div>
                        </div>
                    </ComponentCard>
                </div>

                {/* Upload + Submit */}
                <div className="space-y-12">
                    <div className="flex justify-center">
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="px-8 py-3 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? "Enviando..." : "Criar vídeo"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
