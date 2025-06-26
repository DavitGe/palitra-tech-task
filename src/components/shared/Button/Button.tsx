import React from "react";
import { getButtonColor } from "./utils/getButtonColor";
import "./button.styles.scss";

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  colorType?: "main";
}

const Button: React.FC<IButtonProps> = ({
  children,
  colorType = "main",
  style,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`button ${props.className}`}
      style={{ ...getButtonColor(colorType), ...style }}
    >
      {children}
    </button>
  );
};

export default Button;
