import { Routes, Route } from "react-router-dom";
import NotFound from "./Admin/OtherPage/NotFound";
import AppLayout from "../layout/Admin/AppLayout";
import { ScrollToTop } from "../components/Admin/common/ScrollToTop";
import AdminDashboard from "./Admin/Dashboard/AdminHome";
import UserManagement from "./Admin/UserManagement";
import ContentModeration from "./Admin/ContentModeration";
import SystemReports from "./Admin/SystemReports";
import SystemSettings from "./Admin/SystemSettings";
import AdminProfile from "./Admin/AdminProfile";

export default function Admin() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Dashboard Layout */}
        <Route element={<AppLayout />}>
          <Route index path="/" element={<AdminDashboard />} />

          {/* Core Admin Pages */}
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="content-moderation" element={<ContentModeration />} />
          <Route path="system-reports" element={<SystemReports />} />
          <Route path="system-settings" element={<SystemSettings />} />

          {/* Profile */}
          <Route path="profile" element={<AdminProfile />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
