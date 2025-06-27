import SignUpForm from "../components/authorization/SignUpForm";
import BackgroundImage from "../components/shared/BackgroundImage";
import "./styles/authorization.styles.scss";

const Authorization = () => {
  return (
    <div className="authorization-container">
      <div className="form-container">
        <div className="form-wrapper">
          <SignUpForm />
        </div>
      </div>
      <BackgroundImage
        src="/images/auth-img.jpg"
        className="image-container"
        loadingSpinnerColor="#6c46aa"
        loadingSpinnerSize={50}
      />
    </div>
  );
};

export default Authorization;
