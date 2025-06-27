import SignUpForm from "../components/authorization/SignUpForm";
import "./styles/authorization.styles.scss";

const Authorization = () => {
  return (
    <div className="authorization-container">
      <div className="form-container">
        <div className="form-wrapper">
          <SignUpForm />
        </div>
      </div>
      <div className="image-container" />
    </div>
  );
};

export default Authorization;
