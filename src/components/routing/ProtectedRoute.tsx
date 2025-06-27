import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../authorization";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const authenticated = isAuthenticated();

  if (!authenticated) {
    // Redirect to authorization page if not authenticated
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
