import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import NGODashboard from "../pages/NGODashboard";
import Admin from "../pages/Admin";
import NotFound from "../pages/NotFound";
import RedirectToHTML from "../pages";
import ProtectedRoute from "./ProtectedRoute";
import VideoPublicList from "../pages/Videos";
import Home from "../pages/Home";
import FarmNavigatorsLanding from "../pages/FarmNavigatorsLanding";
import FarmTinderDemo from "../pages/FarmTinderDemo";
import AgriFlixDemo from "../pages/AgriFlixDemo";
import SeriousGameDemo from "../pages/SeriousGameDemo";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<FarmNavigatorsLanding />} />
      <Route path="/farm-tinder" element={<FarmTinderDemo />} />
      <Route path="/agriflix" element={<AgriFlixDemo />} />
      <Route path="/serious-game" element={<SeriousGameDemo />} />
      <Route path="/old-landing" element={<RedirectToHTML />} />
      <Route path="/teste" element={<Home />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/videos" element={<VideoPublicList />} />
      
      {/* Rotas de Admin - Para administradores da plataforma */}
      <Route path="/admin/*" element={<ProtectedRoute><Admin/></ProtectedRoute>}>
        <Route index element={<Admin />} />
      </Route>

      {/* Rotas de ONGs - Para organizações parceiras */}
      <Route path="/ngo/*" element={<ProtectedRoute><NGODashboard /></ProtectedRoute>}>
        <Route index element={<NGODashboard />} />
      </Route>
      
      {/* Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
