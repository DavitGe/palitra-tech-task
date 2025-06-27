import Button from "../shared/Button/Button";
import Checkbox from "../shared/Inputs/Checkbox";
import TextInput from "../shared/Inputs/TextInput";
import Typography from "../shared/Typography";
import "./SignUpForm.scss";
import { signInHandler } from "./utils/signIn";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Constants
const FORM_FIELDS = {
  USERNAME: "username",
  PASSWORD: "password",
} as const;

const ERROR_MESSAGES = {
  REQUIRED_FIELDS: "Please enter both username and password",
  LOGIN_FAILED: "Login failed",
  UNEXPECTED_ERROR: "An unexpected error occurred",
} as const;

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const validateForm = (username: string, password: string): string | null => {
    if (!username.trim() || !password.trim()) {
      return ERROR_MESSAGES.REQUIRED_FIELDS;
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const username = formData.get(FORM_FIELDS.USERNAME) as string;
    const password = formData.get(FORM_FIELDS.PASSWORD) as string;

    const credentials = {
      username: username || "",
      password: password || "",
    };

    // Client-side validation
    const validationError = validateForm(
      credentials.username,
      credentials.password
    );
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    try {
      const result = await signInHandler(credentials);

      if (result.success) {
        navigate("/app/catalog");
      } else {
        setError(result.error || ERROR_MESSAGES.LOGIN_FAILED);
      }
    } catch (error) {
      setError(ERROR_MESSAGES.UNEXPECTED_ERROR);
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="sign-up-form">
      <header className="sign-up-form-header">
        <Typography size="xl" weight="medium">
          Welcome back
        </Typography>
        <Typography color="desc">
          Welcome back! Please enter your details.
        </Typography>
      </header>

      <form onSubmit={handleSubmit} noValidate>
        <TextInput
          name={FORM_FIELDS.USERNAME}
          label="Username"
          placeholder="Enter your username"
          autoComplete="username"
          required
          aria-describedby={error ? "error-message" : undefined}
        />

        <TextInput
          name={FORM_FIELDS.PASSWORD}
          type="password"
          label="Password"
          placeholder="Enter your password"
          autoComplete="current-password"
          required
          aria-describedby={error ? "error-message" : undefined}
        />

        {error && (
          <div
            id="error-message"
            className="error-message"
            role="alert"
            aria-live="polite"
          >
            {error}
          </div>
        )}

        <div className="sign-up-form-remember">
          <Checkbox label="Remember me" name="remember" />
          <Typography
            color="label"
            size="sm"
            weight="medium"
            clickable
            role="button"
            tabIndex={0}
          >
            Forgot password
          </Typography>
        </div>

        <Button
          type="submit"
          colorType="main"
          disabled={isLoading}
          aria-describedby={isLoading ? "loading-state" : undefined}
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <footer className="sign-up-form-footer">
        <Typography color="desc" size="sm" weight="medium">
          Don't have an account?
        </Typography>
        <Typography
          color="main"
          size="sm"
          weight="medium"
          clickable
          role="button"
          tabIndex={0}
        >
          Sign up for free
        </Typography>
      </footer>
    </div>
  );
};

export default SignUpForm;
