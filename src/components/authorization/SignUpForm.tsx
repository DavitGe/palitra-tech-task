import Button from "../shared/Button/Button";
import Checkbox from "../shared/Inputs/Checkbox";
import TextInput from "../shared/Inputs/TextInput";
import Typography from "../shared/Typography";
import "./SignUpForm.scss";

const SignUpForm = () => {
  return (
    <div className="sign-up-form">
      <div className="sign-up-form-header">
        <Typography size="xl" weight="medium">
          Welcome back
        </Typography>
        <Typography color="desc">
          Welcome back! Please enter your details.
        </Typography>
      </div>
      <form>
        <TextInput label="username" placeholder="Enter your username" />
        <TextInput label="password" placeholder="Enter your password" />
        <div className="sign-up-form-remember">
          <Checkbox label="Remember me" />
          <Typography color="label" size="sm" weight="medium">
            Forgot password
          </Typography>
        </div>
        <Button colorType="main" style={{ marginTop: "-14px" }}>
          Sign in
        </Button>
      </form>
      <div className="sign-up-form-footer">
        <Typography color="desc" size="sm" weight="medium">
          Don't have an account?
        </Typography>
        <Typography color="main" size="sm" weight="medium">
          Sign up for free
        </Typography>
      </div>
    </div>
  );
};

export default SignUpForm;
