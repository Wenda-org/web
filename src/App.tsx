import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { Layout } from './components/layout/Layout';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Destinations } from './pages/Destinations';
import { MapView } from './pages/Map';
import { Users } from './pages/Users';
import { ML } from './pages/ML';
import { Monitoring } from './pages/Monitoring';
import { Notifications } from './pages/Notifications';
import { Settings } from './pages/Settings';
import { Toaster } from './components/ui/sonner';
import './styles/globals.css';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
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
