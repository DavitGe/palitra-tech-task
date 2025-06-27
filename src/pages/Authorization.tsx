import SignUpForm from "../components/authorization/SignUpForm";
import { useEffect, useState } from "react";
import "./styles/authorization.styles.scss";

const Authorization = () => {
  const [showImage, setShowImage] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setShowImage(window.innerWidth >= 700);
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="authorization-container">
      <div
        className={`form-container ${
          showImage ? "with-image" : "without-image"
        }`}
      >
        <div className="form-wrapper">
          <SignUpForm />
        </div>
      </div>
      {showImage && <div className="image-container" />}
    </div>
  );
};

export default Authorization;
