import { useState } from "react";
import { FaCog, FaServer, FaDatabase, FaKey, FaBell, FaGlobe, FaSave, FaUndo } from "react-icons/fa";
import { useI18n } from "../../i18n/useI18n";

interface SystemConfig {
  platformName: string;
  maintenanceMode: boolean;
  registrationEnabled: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  maxFileSize: number;
  sessionTimeout: number;
  apiRateLimit: number;
  backupFrequency: string;
  logLevel: string;
  defaultLanguage: string;
  supportedLanguages: string[];
}

interface APIConfig {
  nasaApiKey: string;
  nasaEndpoint: string;
  databaseUrl: string;
  emailService: string;
  smsService: string;
  storageService: string;
}

const mockSystemConfig: SystemConfig = {
  platformName: "Farm Navigators Angola",
  maintenanceMode: false,
  registrationEnabled: true,
  emailNotifications: true,
  smsNotifications: true,
  maxFileSize: 100,
  sessionTimeout: 60,
  apiRateLimit: 1000,
  backupFrequency: "daily",
  logLevel: "info",
  defaultLanguage: "pt",
  supportedLanguages: ["pt", "en", "kimbundu", "umbundu", "kikongo"]
};

const mockAPIConfig: APIConfig = {
  nasaApiKey: "nasa_****_****_****",
  nasaEndpoint: "https://appeals.earthdata.nasa.gov",
  databaseUrl: "postgresql://****@ep-****.neon.tech",
  emailService: "SendGrid",
  smsService: "Twilio",
  storageService: "AWS S3"
};

export default function SystemSettings() {
  const { t } = useI18n();
  const [systemConfig, setSystemConfig] = useState<SystemConfig>(mockSystemConfig);
  const [apiConfig, setAPIConfig] = useState<APIConfig>(mockAPIConfig);
  const [activeTab, setActiveTab] = useState("general");
  const [hasChanges, setHasChanges] = useState(false);

  const tabs = [
    { id: "general", label: t.admin.systemSettings.sections.general, icon: <FaCog /> },
    { id: "api", label: t.admin.systemSettings.sections.api, icon: <FaKey /> },
    { id: "notifications", label: t.admin.systemSettings.sections.notifications, icon: <FaBell /> },
    { id: "system", label: "Sistema", icon: <FaServer /> },
    { id: "localization", label: "Localização", icon: <FaGlobe /> }
  ];

  const updateSystemConfig = (key: keyof SystemConfig, value: any) => {
    setSystemConfig(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const updateAPIConfig = (key: keyof APIConfig, value: string) => {
    setAPIConfig(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const saveChanges = () => {
    // Here would be the API call to save changes
    console.log("Saving changes...", { systemConfig, apiConfig });
    setHasChanges(false);
    // Show success message
  };

  const resetChanges = () => {
    setSystemConfig(mockSystemConfig);
    setAPIConfig(mockAPIConfig);
    setHasChanges(false);
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t.admin.systemSettings.title}
        </h1>
        <p className="text-gray-600">
          {t.admin.systemSettings.subtitle}
        </p>
      </div>

      {/* Save/Reset Actions */}
      {hasChanges && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaBell className="text-blue-600 mr-2" />
              <span className="text-blue-800 font-medium">Você tem alterações não salvas</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={resetChanges}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center"
              >
                <FaUndo className="mr-2" />
                Descartar
              </button>
              <button
                onClick={saveChanges}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
              >
                <FaSave className="mr-2" />
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center transition-colors ${
                  activeTab === tab.id
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* General Settings */}
          {activeTab === "general" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome da Plataforma
                </label>
                <input
                  type="text"
                  value={systemConfig.platformName}
                  onChange={(e) => updateSystemConfig("platformName", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Modo de Manutenção</h3>
                    <p className="text-sm text-gray-600">Bloqueia acesso de usuários</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={systemConfig.maintenanceMode}
                      onChange={(e) => updateSystemConfig("maintenanceMode", e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Registros Habilitados</h3>
                    <p className="text-sm text-gray-600">Permite novos cadastros</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={systemConfig.registrationEnabled}
                      onChange={(e) => updateSystemConfig("registrationEnabled", e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* API Settings */}
          {activeTab === "api" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    NASA API Key
                  </label>
                  <input
                    type="password"
                    value={apiConfig.nasaApiKey}
                    onChange={(e) => updateAPIConfig("nasaApiKey", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    NASA Endpoint
                  </label>
                  <input
                    type="url"
                    value={apiConfig.nasaEndpoint}
                    onChange={(e) => updateAPIConfig("nasaEndpoint", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Database URL
                  </label>
                  <input
                    type="password"
                    value={apiConfig.databaseUrl}
                    onChange={(e) => updateAPIConfig("databaseUrl", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Serviço de Email
                  </label>
                  <select
                    value={apiConfig.emailService}
                    onChange={(e) => updateAPIConfig("emailService", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="SendGrid">SendGrid</option>
                    <option value="AWS SES">AWS SES</option>
                    <option value="Mailgun">Mailgun</option>
                  </select>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex">
                  <FaKey className="text-yellow-600 mr-2 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-yellow-800">Segurança das APIs</h3>
                    <p className="text-sm text-yellow-700 mt-1">
                      Todas as chaves de API são criptografadas e armazenadas de forma segura. 
                      Altere as credenciais regularmente para manter a segurança.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Notificações por Email</h3>
                    <p className="text-sm text-gray-600">Enviar alertas e atualizações por email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={systemConfig.emailNotifications}
                      onChange={(e) => updateSystemConfig("emailNotifications", e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Notificações por SMS</h3>
                    <p className="text-sm text-gray-600">Enviar alertas críticos por SMS</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={systemConfig.smsNotifications}
                      onChange={(e) => updateSystemConfig("smsNotifications", e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* System Settings */}
          {activeTab === "system" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tamanho Máximo de Arquivo (MB)
                  </label>
                  <input
                    type="number"
                    value={systemConfig.maxFileSize}
                    onChange={(e) => updateSystemConfig("maxFileSize", parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timeout de Sessão (minutos)
                  </label>
                  <input
                    type="number"
                    value={systemConfig.sessionTimeout}
                    onChange={(e) => updateSystemConfig("sessionTimeout", parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Limite de Rate API (req/min)
                  </label>
                  <input
                    type="number"
                    value={systemConfig.apiRateLimit}
                    onChange={(e) => updateSystemConfig("apiRateLimit", parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Frequência de Backup
                  </label>
                  <select
                    value={systemConfig.backupFrequency}
                    onChange={(e) => updateSystemConfig("backupFrequency", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="hourly">A cada hora</option>
                    <option value="daily">Diário</option>
                    <option value="weekly">Semanal</option>
                    <option value="monthly">Mensal</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Localization */}
          {activeTab === "localization" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Idioma Padrão
                </label>
                <select
                  value={systemConfig.defaultLanguage}
                  onChange={(e) => updateSystemConfig("defaultLanguage", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="pt">Português</option>
                  <option value="en">English</option>
                  <option value="kimbundu">Kimbundu</option>
                  <option value="umbundu">Umbundu</option>
                  <option value="kikongo">Kikongo</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Idiomas Suportados
                </label>
                <div className="space-y-2">
                  {["pt", "en", "kimbundu", "umbundu", "kikongo"].map((lang) => (
                    <label key={lang} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={systemConfig.supportedLanguages.includes(lang)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            updateSystemConfig("supportedLanguages", [...systemConfig.supportedLanguages, lang]);
                          } else {
                            updateSystemConfig("supportedLanguages", systemConfig.supportedLanguages.filter(l => l !== lang));
                          }
                        }}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {lang === "pt" ? "Português" : 
                         lang === "en" ? "English" : 
                         lang.charAt(0).toUpperCase() + lang.slice(1)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex">
                  <FaGlobe className="text-blue-600 mr-2 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-blue-800">Suporte Multilíngue</h3>
                    <p className="text-sm text-blue-700 mt-1">
                      A plataforma Farm Navigators suporta múltiplos idiomas para aumentar 
                      a acessibilidade aos agricultores rurais de Angola.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}