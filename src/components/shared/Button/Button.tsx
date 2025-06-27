import React from "react";
import "./button.styles.scss";

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  colorType?: "main";
}

const Button: React.FC<IButtonProps> = ({
  children,
  colorType = "main",
  className = "",
  ...props
}) => {
  const buttonClasses = `button button--${colorType} ${className}`.trim();

  return (
    <button {...props} className={buttonClasses}>
      {children}
    </button>
  );
};

export default Button;
