import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import LoadingSpinner from "../icons/LoadingSpinner";
import "./BackgroundImage.scss";

interface BackgroundImageProps {
  src: string;
  children?: ReactNode;
  className?: string;
  loadingSpinnerColor?: string;
  loadingSpinnerSize?: number;
  loadingBackgroundColor?: string;
  fallbackColor?: string;
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({
  src,
  children,
  className = "",
  loadingSpinnerColor = "#6c46aa",
  loadingSpinnerSize = 40,
  loadingBackgroundColor = "#f8f9fa",
  fallbackColor = "#e9ecef",
  style,
  onLoad,
  onError,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const img = new Image();

    img.onload = () => {
      setIsLoading(false);
      onLoad?.();
    };

    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
      onError?.();
    };

    img.src = src;

    // Cleanup function
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, onLoad, onError]);

  const backgroundImageStyle: React.CSSProperties = {
    ...style,
    backgroundImage: hasError ? "none" : `url(${src})`,
    backgroundColor: hasError ? fallbackColor : "transparent",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    opacity: isLoading ? 0 : 1,
    transition: "opacity 0.3s ease-in-out",
  };

  return (
    <div
      className={`background-image-container ${className}`}
      style={backgroundImageStyle}
    >
      {isLoading && (
        <div
          className="background-image-loading"
          style={{ backgroundColor: loadingBackgroundColor }}
        >
          <LoadingSpinner
            color={loadingSpinnerColor}
            size={loadingSpinnerSize}
          />
        </div>
      )}
      {children}
    </div>
  );
};

export default BackgroundImage;
