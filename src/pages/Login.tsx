import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaLeaf, FaUserTie, FaArrowLeft } from "react-icons/fa";
import { useI18n } from "../i18n/useI18n";

export default function LoginPage() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("/images/conclusion-background.jpg");
  const navigate = useNavigate();

  const backgroundImages = [
    "/images/others/back4.jpg",
    "/images/others/back4.jpg",
    "/images/others/back4.jpg"
  ];

  const changeBackground = () => {
    const currentIndex = backgroundImages.indexOf(backgroundImage);
    const nextIndex = (currentIndex + 1) % backgroundImages.length;
    setBackgroundImage(backgroundImages[nextIndex]);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulação de login (substitua pela sua API real)
    try {
      // Credenciais de demonstração
      if (email === "admin@farmnavigators.ao" && password === "admin123") {
        localStorage.setItem("userType", "ADMIN");
        localStorage.setItem("token", "admin-token");
        navigate("/admin");
      } else if (email === "ong@farmnavigators.ao" && password === "ong123") {
        localStorage.setItem("userType", "NGO");
        localStorage.setItem("token", "ngo-token");
        navigate("/ngo");
      } else {
        setError(t.login.errors.invalidCredentials);
      }
    } catch (err) {
      setError(t.login.errors.loginError);
    } finally {
      setIsLoading(false);
    }
  };

  const quickLogin = (type: 'admin' | 'ngo') => {
    if (type === 'admin') {
      setEmail("admin@farmnavigators.ao");
      setPassword("admin123");
    } else {
      setEmail("ong@farmnavigators.ao");
      setPassword("ong123");
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4"
         style={{
        //    backgroundImage: `url('${backgroundImage}')`,
           backgroundImage: `url('/images/others/back4.jpg')`,
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundRepeat: 'no-repeat'
         }}>
      {/* Overlay escurecido com gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-green-900/40"></div>
      
      {/* Botão Voltar - Canto Superior Esquerdo */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 z-20 inline-flex items-center text-white hover:text-green-300 transition-colors font-medium"
      >
        <FaArrowLeft className="mr-2" />
        {t.login.header.backButton}
      </Link>

      {/* Botão trocar fundo - Canto Superior Direito */}
      <button
        onClick={changeBackground}
        className="absolute top-6 right-6 z-20 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
        title={t.login.header.changeBackground}
      >
        🖼️
      </button>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-lg">
            <img src="public/images/others/logo.png"></img>
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-2">
            {t.login.header.title}
          </h1>
          <p className="text-green-100">
            {t.login.header.subtitle}
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.login.form.emailLabel}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                placeholder={t.login.form.emailPlaceholder}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.login.form.passwordLabel}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors pr-12"
                  placeholder={t.login.form.passwordPlaceholder}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? t.login.form.loginButtonLoading : t.login.form.loginButton}
            </button>
          </form>

          {/* Quick Login Demo */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center mb-4">
              {t.login.quickLogin.title}
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => quickLogin('admin')}
                className="flex items-center justify-center px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
              >
                <FaUserTie className="mr-2" />
                {t.login.quickLogin.adminButton}
              </button>
              
              <button
                onClick={() => quickLogin('ngo')}
                className="flex items-center justify-center px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium"
              >
                <FaLeaf className="mr-2" />
                {t.login.quickLogin.ngoButton}
              </button>
            </div>

            <div className="mt-4 text-xs text-gray-500 space-y-1">
              <p>• <strong>{t.login.quickLogin.credentials.admin}</strong></p>
              <p>• <strong>{t.login.quickLogin.credentials.ngo}</strong></p>
            </div>
          </div>
        </div>

        {/* Footer */}
        {/* <div className="text-center mt-6 text-sm text-white/80">
          <p>© 2025 Farm Navigators Angola. Todos os direitos reservados.</p>
        </div> */}
      </div>
    </div>
  );
}