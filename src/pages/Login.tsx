import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Mail, Lock, Globe, Moon, Sun } from "lucide-react";
import { Button } from "../components/ui/button";
import { LoadingButton } from "../components/ui/loading-button";
import "../i18n/config";
import LogoFull from "../public/images/logo/logo.png";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../hooks/useAuth";
import { notifySuccess, notifyError } from "../components/ui/notification";

export function Login() {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error: authError } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const { theme, setTheme, toggleTheme, effectiveTheme } = useTheme();

  // no remembered email behaviour (removed at user's request)

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    try {
      localStorage.setItem("i18nextLng", lng);
    } catch {
      // ignore localStorage errors
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes("@")) {
      const msg = t("auth_errors.invalid_email");
      setError(msg);
      notifyError(msg);
      return;
    }
    if (!password || password.length < 4) {
      const msg = t("auth_errors.short_password");
      setError(msg);
      notifyError(msg);
      return;
    }
    try {
      await login({ email: email, password });
      // Debug: log stored auth token so we can verify persistence during development
      try {
        const token = localStorage.getItem("authToken");
        // eslint-disable-next-line no-console
        console.log("[auth] saved token:", token);
      } catch (e) {
        // ignore console/storage errors
      }
      notifySuccess(t("auth.login") + " " + "successful");
      window.location.href = "/dashboard";
    } catch (err) {
      console.log(err);
      const msg = t("auth_errors.login_failed");
      setError(msg);
      notifyError(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center login-bg p-6">
      <div className="login-content w-full max-w-md">
        <div className="text-center mb-8">
          <img src={LogoFull} alt="Wenda" className="mx-auto w-16 h-16 mb-2" />
          <p className="text-muted-foreground">{t("auth.welcome")}</p>
        </div>

        <Card className="rounded-2xl shadow-card animate-fade-in-up login-card">
          <CardHeader>
            <CardTitle>{t("auth.login")}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t("auth.email")}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@wenda.ao"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 rounded-xl"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t("auth.password")}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 rounded-xl"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <a href="#" className="text-[#136F63] hover:underline text-sm">
                  {t("auth.forgot_password")}
                </a>
              </div>

              {error && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="text-destructive text-sm"
                >
                  {error}
                </div>
              )}

              <LoadingButton
                type="submit"
                className="w-full bg-[#136F63] hover:bg-[#0F5A51] text-white rounded-xl"
                isLoading={loading}
              >
                {t("auth.login")}
              </LoadingButton>

              <div className="mt-4 flex items-center gap-2 justify-center">
                <button
                  type="button"
                  aria-label="Toggle language"
                  title={
                    i18n.language === "en"
                      ? "Switch to Português"
                      : "Switch to English"
                  }
                  className="p-2 rounded-full bg-input-background border border-border hover:bg-muted-foreground/5"
                  onClick={() =>
                    changeLanguage(i18n.language === "en" ? "pt" : "en")
                  }
                >
                  <Globe className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  aria-label="Toggle theme"
                  title={
                    effectiveTheme === "dark"
                      ? "Switch to light"
                      : "Switch to dark"
                  }
                  className="p-2 rounded-full bg-input-background border border-border hover:bg-muted-foreground/5"
                  onClick={() => toggleTheme()}
                >
                  {effectiveTheme === "dark" ? (
                    <Moon className="w-5 h-5" />
                  ) : (
                    <Sun className="w-5 h-5" />
                  )}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
