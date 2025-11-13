import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notifyError } from "./components/ui/notification";
import { useAuth } from "./hooks/useAuth";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Layout } from "./components/layout/Layout";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Destinations } from "./pages/Destinations";
import { MapView } from "./pages/Map";
import { Users } from "./pages/Users";
import DebugApi from "./pages/DebugApi";
import { ML } from "./pages/ML";
import { Monitoring } from "./pages/Monitoring";
import { Notifications } from "./pages/Notifications";
import { Settings } from "./pages/Settings";
import { Toaster } from "./components/ui/sonner";
import "./styles/globals.css";

export default function App() {
  function AuthExpiredHandler() {
    const navigate = useNavigate();
    const { logout } = useAuth();
    useEffect(() => {
      const handler = async (e: any) => {
        try {
          // Run the shared logout flow which clears tokens and notifies the app
          await logout();
        } catch (err) {
          // ignore
        }
        try {
          notifyError("Session expired. Please login again.");
        } catch (err) {
          // ignore
        }
        // Ensure user lands on the login page
        try {
          navigate("/login");
        } catch (err) {
          // ignore
        }
      };
      window.addEventListener("auth:expired", handler as EventListener);
      const logoutHandler = (e: any) => {
        try {
          notifyError("You have been logged out.");
        } catch (err) {}
        try {
          navigate("/login");
        } catch (err) {}
      };
      window.addEventListener("auth:logout", logoutHandler as EventListener);
      return () => {
        window.removeEventListener("auth:expired", handler as EventListener);
        window.removeEventListener(
          "auth:logout",
          logoutHandler as EventListener
        );
      };
    }, [navigate, logout]);
    return null;
  }
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthExpiredHandler />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="/destinations"
            element={
              <Layout>
                <Destinations />
              </Layout>
            }
          />
          <Route
            path="/map"
            element={
              <Layout>
                <MapView />
              </Layout>
            }
          />
          <Route
            path="/users"
            element={
              <Layout>
                <Users />
              </Layout>
            }
          />
          <Route
            path="/debug"
            element={
              <Layout>
                <DebugApi />
              </Layout>
            }
          />
          <Route
            path="/ml"
            element={
              <Layout>
                <ML />
              </Layout>
            }
          />
          <Route
            path="/monitoring"
            element={
              <Layout>
                <Monitoring />
              </Layout>
            }
          />
          <Route
            path="/notifications"
            element={
              <Layout>
                <Notifications />
              </Layout>
            }
          />
          <Route
            path="/settings"
            element={
              <Layout>
                <Settings />
              </Layout>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </ThemeProvider>
  );
}
