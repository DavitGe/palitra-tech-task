import "./styles/header.styles.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUser,
  logoutWithRedirect,
} from "../../components/authorization/utils/auth";
import type { UserInfo } from "../../components/authorization/types/auth.types";
import Typography from "../shared/Typography";

const Header = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    logoutWithRedirect(navigate);
  };

  return (
    <div className="header">
      <div className="account-info-container">
        {user && (
          <>
            <Typography weight="medium" className="header-user-name">
              {user.firstName}
            </Typography>
            <Typography onClick={handleLogout} className="logout-button">
              Logout
            </Typography>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
