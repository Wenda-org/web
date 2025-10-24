import { useModal } from "../../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { useUserData } from "../../../hooks/useUserData";
import { useEffect, useState } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const DEFAULT_IMAGE_URL = "https://i.ibb.co/TBRHBV8V/profile.webp";

export default function UserMetaCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const { user, loading } = useUserData();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState<number | "">(user?.phone || "");
  const [address, setAddress] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState(user?.profileImageUrl || DEFAULT_IMAGE_URL);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
      setProfileImageUrl(user.profileImageUrl || DEFAULT_IMAGE_URL);
    }
  }, [user, isOpen]);

  const handleSave = async () => {
    if (!name || !phone) {
      alert("Nome e telefone são obrigatórios.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone.toString());
    formData.append("address", address);
    if (oldPassword && newPassword) {
      formData.append("oldPassword", oldPassword);
      formData.append("newPassword", newPassword);
    }
    if (profileImage) {
      formData.append("profileImage", profileImage);
    } else {
      formData.append("profileImageUrl", profileImageUrl);
    }

    console.log("FormData enviado", formData);

    try {
      const response = await axios.put(
        `${apiUrl}/users/${user?.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Resposta do backend:", response.data);
      closeModal();
    } catch (error: any) {
      console.error("Erro ao atualizar:", error.response?.data || error.message);
      alert("Erro ao atualizar usuário.");
    }

    closeModal();
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    setProfileImageUrl(DEFAULT_IMAGE_URL);
  };

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
              <img src={user?.profileImageUrl} alt="user" />
            </div>
            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                {user?.name}
              </h4>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">Administrador</p>
                <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user?.address || "Sem endereço"}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={openModal}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
          >
            Edit
          </button>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">Editar</h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Atualize os detalhes do teu perfil
            </p>
          </div>
          <form className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              {/* Foto de perfil */}
              <div className="mt-7">
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Foto de Perfil
                </h5>
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
                    <img
                      src={profileImage ? URL.createObjectURL(profileImage) : profileImageUrl}
                      alt="Perfil"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Alterar foto</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setProfileImage(e.target.files?.[0] || null)}
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="mt-2 text-sm text-red-600 hover:underline"
                    >
                      Remover imagem
                    </button>
                  </div>
                </div>
              </div>

              {/* Informações Pessoais */}
              <div className="mt-10">
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Informações Pessoais
                </h5>
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2">
                    <Label>Nome *</Label>
                    <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <Label>Email</Label>
                    <Input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <Label>Telefone *</Label>
                    <Input
                      type="text"
                      value={phone.toString()}
                      onChange={(e) => setPhone(e.target.value === "" ? "" : Number(e.target.value))}
                    />
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <Label>Morada</Label>
                    <Input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                  </div>
                </div>
              </div>

              {/* Alteração de senha */}
              <div className="mt-10">
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6 border-t pt-6">
                  Alterar Senha
                </h5>
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div>
                    <Label>Senha atual</Label>
                    <Input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                  </div>
                  <div>
                    <Label>Nova senha</Label>
                    <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                  </div>
                </div>
              </div>
            </div>

            {/* Botões */}
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Cancelar
              </Button>
              <Button size="sm" onClick={handleSave}>
                Salvar alterações
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
