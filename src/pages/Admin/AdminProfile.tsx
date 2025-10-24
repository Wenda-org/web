import { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaKey, FaSave } from "react-icons/fa";
import PageBreadcrumb from "../../components/Admin/common/PageBreadCrumb";
import PageMeta from "../../components/Admin/common/PageMeta";
import { useI18n } from "../../i18n/useI18n";

export default function AdminProfile() {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    name: "Admin Farm Navigators",
    email: "admin@farmnavigators.ao",
    phone: "+244 900 000 000",
    role: "Administrador da Plataforma",
    location: "Luanda, Angola",
    lastLogin: "2024-01-20 14:30:00"
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Here would be the API call to save profile changes
    console.log("Saving profile:", formData);
    setIsEditing(false);
    // Show success message
  };

  const handlePasswordSave = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
    // Here would be the API call to change password
    console.log("Changing password");
    setIsChangingPassword(false);
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    // Show success message
  };

  return (
    <>
      <PageMeta
        title={t.admin.profile.title}
        description={t.admin.profile.subtitle}
      />
      <PageBreadcrumb pageTitle={t.admin.profile.title} />
      
      <div className="space-y-6">
        {/* Profile Information Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">{t.admin.profile.sections.personalInfo}</h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                isEditing 
                  ? "bg-gray-600 text-white hover:bg-gray-700" 
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {isEditing ? "Cancelar" : "Editar"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <FaUser className="mr-2 text-gray-500" />
                Nome Completo
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{formData.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <FaEnvelope className="mr-2 text-gray-500" />
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{formData.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <FaPhone className="mr-2 text-gray-500" />
                Telefone
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{formData.phone}</p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <FaMapMarkerAlt className="mr-2 text-gray-500" />
                Localização
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{formData.location}</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <FaUser className="mr-2 text-gray-500" />
                Função
              </label>
              <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{formData.role}</p>
            </div>

            {/* Last Login */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <FaKey className="mr-2 text-gray-500" />
                Último Login
              </label>
              <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
                {new Date(formData.lastLogin).toLocaleString('pt-BR')}
              </p>
            </div>
          </div>

          {isEditing && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
              >
                <FaSave className="mr-2" />
                Salvar Alterações
              </button>
            </div>
          )}
        </div>

        {/* Password Change Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Alterar Senha</h2>
            <button
              onClick={() => setIsChangingPassword(!isChangingPassword)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                isChangingPassword 
                  ? "bg-gray-600 text-white hover:bg-gray-700" 
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {isChangingPassword ? "Cancelar" : "Alterar Senha"}
            </button>
          </div>

          {isChangingPassword && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Senha Atual
                </label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Digite sua senha atual"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nova Senha
                </label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Digite a nova senha"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar Nova Senha
                </label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Confirme a nova senha"
                />
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={handlePasswordSave}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <FaKey className="mr-2" />
                  Alterar Senha
                </button>
              </div>
            </div>
          )}

          {!isChangingPassword && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 text-sm">
                <strong>Segurança:</strong> Recomendamos alterar sua senha regularmente para manter a segurança da conta administrativa.
              </p>
            </div>
          )}
        </div>

        {/* System Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Informações do Sistema</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-medium text-green-800">Permissões</h3>
              <p className="text-sm text-green-600">Acesso total à plataforma</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-800">Sessão</h3>
              <p className="text-sm text-blue-600">Ativa há 2 horas</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-medium text-purple-800">Versão</h3>
              <p className="text-sm text-purple-600">Farm Navigators v2.0</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}