import Typography from "../shared/Typography";
import Button from "../shared/Button/Button";

interface ErrorMessageProps {
  error: string;
  onRetry?: () => void;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  error,
  onRetry,
  className = "",
}) => {
  return (
    <div className={`error-message ${className}`}>
      <Typography color="main" size="md" weight="medium">
        Error: {error}
      </Typography>
      {onRetry && (
        <Button onClick={onRetry} style={{ marginTop: "1rem" }}>
          Retry
        </Button>
      )}
    </div>
  );
};

export default ErrorMessage;
