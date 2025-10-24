import PageBreadcrumb from "../../../components/Admin/common/PageBreadCrumb";
import PageMeta from "../../../components/Admin/common/PageMeta";
import Label from "../../../components/Admin/form/Label";
import Input from "../../../components/Admin/form/input/InputField";
import { EnvelopeIcon, EyeCloseIcon, EyeIcon } from "../../../icons";
import ComponentCard from "../../../components/Admin/common/ComponentCard";
import PhoneInput from "../../../components/Admin/form/group-input/PhoneInput";
import { useState, useEffect, useRef, KeyboardEvent } from "react";
import FileInput from "../../../components/Admin/form/input/FileInput";
import axios from "axios";
// import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const apiUrl = import.meta.env.VITE_API_URL;
// const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const imgBBApiKey = import.meta.env.VITE_IMGBB_API_KEY;

export default function AdminForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [file, setFile] = useState<File | null>(null);
    // const [latitude, setLatitude] = useState<number | null>(-8.839988);
    // const [longitude, setLongitude] = useState<number | null>(13.289437);
    const [address, setAddress] = useState<string>("");
    const [loading, setLoading] = useState(false);
    // const searchInputRef = useRef<HTMLInputElement>(null);
    const [message, setMessage] = useState<string>("");  // Novo estado para a mensagem

    // const { isLoaded } = useLoadScript({
    //     googleMapsApiKey: googleMapsApiKey,
    // });

    const countries = [{ code: "AO", label: "244" }];

    const handlePhoneNumberChange = (phoneNumber: string) => {
        setPhone(phoneNumber);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    // const handleMapClick = (e: google.maps.MapMouseEvent) => {
    //     if (e.latLng) {
    //         const lat = e.latLng.lat();
    //         const lng = e.latLng.lng();
    //         setLatitude(lat);
    //         setLongitude(lng);
    //     }
    // };

    // const fetchAddress = async (lat: number, lng: number) => {
    //     try {
    //         const res = await axios.get(
    //             `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleMapsApiKey}`
    //         );
    //         const results = res.data.results;
    //         if (results.length > 0) {
    //             setAddress(results[0].formatted_address);
    //         } else {
    //             setAddress("Endereço não encontrado");
    //         }
    //     } catch (error) {
    //         console.error("Erro ao buscar endereço:", error);
    //         setAddress("Erro ao buscar endereço");
    //     }
    // };

    // useEffect(() => {
    //     if (latitude && longitude) {
    //         fetchAddress(latitude, longitude);
    //     }
    // }, [latitude, longitude]);

    // const handleSearch = async () => {
    //     const query = searchInputRef.current?.value;
    //     if (!query) return;

    //     try {
    //         const res = await axios.get(
    //             `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    //                 query
    //             )}&key=${googleMapsApiKey}`
    //         );
    //         const results = res.data.results;
    //         if (results.length > 0) {
    //             const location = results[0].geometry.location;
    //             setLatitude(location.lat);
    //             setLongitude(location.lng);
    //             setAddress(results[0].formatted_address);
    //         } else {
    //             setMessage("Endereço não encontrado");
    //         }
    //     } catch (error) {
    //         console.error("Erro ao buscar local:", error);
    //         setMessage("Erro ao buscar local");
    //     }
    // };

    // const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    //     if (e.key === "Enter") {
    //         e.preventDefault();
    //         handleSearch();
    //     }
    // };

    const handleSubmit = async () => {   
        if (!name || !email || !password || !phone) {
            setMessage("Preencha todos os campos obrigatórios! (Nome, Email, Senha, Telefone)");
            return;
        } 
        setLoading(true);
        try {
            const formData = new FormData();
            let imageUrl = "https://i.ibb.co/TBRHBV8V/profile.webp"; // URL padrão
    
            if (file) {
                formData.append("image", file);
                const uploadRes = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${imgBBApiKey}`,
                    formData
                );
                imageUrl = uploadRes.data.data.url;
            }
    
            console.log({
                name,
                email,
                password,
                phone,
                profileImageUrl: imageUrl,
                address,
                role: "ADMIN",
            });
    
            await axios.post(`${apiUrl}/register`, {
                name,
                email,
                password,
                phone,
                profileImageUrl: imageUrl,
                address,
                role: "ADMIN",
            });
    
            setMessage("Administrador cadastrada com sucesso!");
            setName("");
            setEmail("");
            setPassword("");
            setPhone("");
            setFile(null);
            setAddress("");
        } catch (err) {
            console.error(err);
            setMessage("Erro ao cadastrar instituição.");
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div>
            <PageMeta title="Cadastrar Administradores" description="Cadastro de administradores" />
            <PageBreadcrumb pageTitle="Cadastrar Administradores" />
            {/* Exibindo a mensagem */}
            {message && (
                <div
                    className={`flex justify-between items-center p-4 mb-4 text-white rounded-lg ${message.includes("sucesso") ? "bg-green-500" : "bg-red-500"}`}
                >
                    <span>{message}</span>
                    <button
                        onClick={() => setMessage("")} // Limpa a mensagem ao clicar no ícone
                        className="ml-4 text-white hover:text-gray-200"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                {/* Formulário */}
                <div className="space-y-6">
                    <ComponentCard title="">
                        <div className="space-y-6">
                            {/* Nome */}
                            <div>
                                <Label htmlFor="inputNome">Nome da instituição</Label>
                                <Input
                                    type="text"
                                    id="inputNome"
                                    placeholder="Nome"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            {/* Senha */}
                            <div>
                                <Label>Senha</Label>
                                <div className="relative">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Senha"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 cursor-pointer"
                                    >
                                        {showPassword ? (
                                            <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                                        ) : (
                                            <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                                        )}
                                    </button>
                                </div>
                            </div>
                            {/* Email */}
                            <div>
                                <Label>Email</Label>
                                <div className="relative">
                                    <Input
                                        placeholder="info@gmail.com"
                                        type="email"
                                        className="pl-[62px]"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                                        <EnvelopeIcon className="size-6" />
                                    </span>
                                </div>
                            </div>
                            {/* Telefone */}
                            <div>
                                <Label>Telefone</Label>
                                <PhoneInput
                                    selectPosition="start"
                                    countries={countries}
                                    placeholder="(DDD)(TEL)"
                                    onChange={handlePhoneNumberChange}
                                />
                            </div>
                        </div>
                    </ComponentCard>
                </div>

                {/* Upload + Mapa */}
                <div className="space-y-6">
                    <ComponentCard title="Foto de perfil">
                        <div>
                            <Label>Carregar foto</Label>
                            <FileInput onChange={handleFileChange} />
                        </div>
                    </ComponentCard>
                    {/* Botão Submit */}
                    <div className="flex justify-center">
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="px-8 py-3 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? "Enviando..." : "Cadastrar Administrador"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
