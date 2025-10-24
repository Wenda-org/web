import { Routes, Route } from "react-router-dom";
import NGOLayout from "../layout/NGO/NGOLayout";
import Home from "./NGO/Dashboard/Home";
import RegionalMaps from "./NGO/RegionalMaps";
import EducationalContent from "./NGO/EducationalContent";
import ImpactReports from "./NGO/ImpactReports";
import RegionalStats from "./NGO/RegionalStats";

export default function NGODashboard() {
  return (
    <Routes>
      <Route element={<NGOLayout />}>
        <Route index element={<Home />} />
        <Route path="regional-maps" element={<RegionalMaps />} />
        <Route path="educational-content" element={<EducationalContent />} />
        <Route path="impact-reports" element={<ImpactReports />} />
        <Route path="regional-stats" element={<RegionalStats />} />
      </Route>
    </Routes>
  );
}