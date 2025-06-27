import Button from "../shared/Button/Button";
import Checkbox from "../shared/Inputs/Checkbox";
import TextInput from "../shared/Inputs/TextInput";
import Typography from "../shared/Typography";
import "./SignUpForm.scss";
import { signInHandler } from "./utils/signIn";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const credentials = {
      username: username || "",
      password: password || "",
    };

    // Client-side validation
    if (!credentials.username.trim() || !credentials.password.trim()) {
      setError("Please enter both username and password");
      setIsLoading(false);
      return;
    }

    try {
      const result = await signInHandler(credentials);

      if (result.success) {
        // Navigate to catalog page instead of reloading
        navigate("/app/catalog");
      } else {
        setError(result.error || "Login failed");
      }
    } catch (error) {
      setError("An unexpected error occurred");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
      <form onSubmit={handleSubmit}>
        <TextInput
          name="username"
          label="username"
          placeholder="Enter your username"
          required
        />
        <TextInput
          name="password"
          type="password"
          label="password"
          placeholder="Enter your password"
          required
        />
        {error && (
          <div style={{ color: "red", fontSize: "14px", marginBottom: "10px" }}>
            {error}
          </div>
        )}
        <div className="sign-up-form-remember">
          <Checkbox label="Remember me" />
          <Typography color="label" size="sm" weight="medium">
            Forgot password
          </Typography>
        </div>
        <Button
          colorType="main"
          style={{ marginTop: "-14px" }}
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
      <div className="sign-up-form-footer">
        <Typography color="desc" size="sm" weight="medium">
          Don't have an account?
        </Typography>
        <Typography color="main" size="sm" weight="medium" clickable>
          Sign up for free
        </Typography>
      </div>
    </div>
  );
};

export default SignUpForm;
