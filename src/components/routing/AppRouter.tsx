import { Routes, Route, Navigate } from "react-router-dom";
import Authorization from "../../pages/Authorization";
import Catalog from "../../pages/Catalog";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

const AppRouter = () => {
  return (
    <Routes>
      {/* Default route - redirect to auth */}
      <Route path="/" element={<Navigate to="/auth" replace />} />

      {/* Public route - Authorization page */}
      <Route
        path="/auth"
        element={
          <PublicRoute>
            <Authorization />
          </PublicRoute>
        }
      />

      {/* Protected route - Catalog page */}
      <Route
        path="/app/catalog"
        element={
          <ProtectedRoute>
            <Catalog />
          </ProtectedRoute>
        }
      />

      {/* Fallback route - redirect to auth */}
      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
};

export default AppRouter;
