import { useState } from "react";
import type { ImgHTMLAttributes } from "react";
import LoadingSpinner from "../icons/LoadingSpinner";
import BrokenImage from "../icons/BrokenImage";
import "./Image.scss";

interface ImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "onLoad" | "onError"> {
  src: string;
  alt: string;
  loadingSpinnerColor?: string;
  loadingSpinnerSize?: number;
  loadingBackgroundColor?: string;
  showErrorIcon?: boolean;
  errorIconColor?: string;
  errorIconSize?: number;
  className?: string;
  containerClassName?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  loadingSpinnerColor = "#6c46aa",
  loadingSpinnerSize = 30,
  loadingBackgroundColor = "#f8f9fa",
  showErrorIcon = true,
  errorIconColor = "#afafaf",
  errorIconSize = 34,
  className = "",
  containerClassName = "",
  onLoad,
  onError,
  style,
  ...imgProps
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  if (hasError && showErrorIcon) {
    return (
      <div className={`image-container image-error ${containerClassName}`}>
        <BrokenImage color={errorIconColor} size={errorIconSize} />
      </div>
    );
  }

  return (
    <div className={`image-container ${containerClassName}`}>
      {isLoading && (
        <div
          className="image-loading"
          style={{ backgroundColor: loadingBackgroundColor }}
        >
          <LoadingSpinner
            color={loadingSpinnerColor}
            size={loadingSpinnerSize}
          />
        </div>
      )}
      <img
        {...imgProps}
        src={src}
        alt={alt}
        onLoad={handleImageLoad}
        onError={handleImageError}
        className={`image ${className}`}
        style={{
          ...style,
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.3s ease-in-out",
        }}
      />
    </div>
  );
};

export default Image;
