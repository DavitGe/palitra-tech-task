import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../authorization";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const authenticated = isAuthenticated();

  if (authenticated) {
    // Redirect to catalog page if already authenticated
    return <Navigate to="/app/catalog" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
