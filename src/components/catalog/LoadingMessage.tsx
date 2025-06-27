import LoadingSpinner from "../shared/icons/LoadingSpinner";

interface LoadingMessageProps {
  message: string;
  showSpinner?: boolean;
  className?: string;
}

const LoadingMessage: React.FC<LoadingMessageProps> = ({
  message,
  showSpinner = true,
  className = "",
}) => {
  return (
    <div className={`loading-message ${className}`}>
      {showSpinner && <LoadingSpinner size={24} />}
      <span>{message}</span>
    </div>
  );
};

export default LoadingMessage;
