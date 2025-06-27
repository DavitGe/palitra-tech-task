import React from "react";
import {
  TypographySize,
  TypographyColor,
  TypographyWeight,
} from "./TypographyEnums";

interface ITypographyProps extends React.HTMLAttributes<HTMLSpanElement> {
  weight?: "light" | "regular" | "medium";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?: "main" | "primary" | "label" | "placeholder" | "desc";
  align?: "left" | "center" | "right";
  font?: "Poppins" | "FiraGO";
  clickable?: boolean;
}

const Typography: React.FC<ITypographyProps> = ({
  children,
  weight = "regular",
  size = "md",
  color = "primary",
  align = "left",
  font = "Poppins",
  clickable = false,
  style,
  ...props
}) => {
  const typographyStyle: React.CSSProperties = {
    fontSize: TypographySize[size],
    color: TypographyColor[color],
    fontWeight: TypographyWeight[weight],
    cursor: clickable ? "pointer" : "default",
    textAlign: align,
    fontFamily:
      font === "Poppins" ? "Poppins, sans-serif" : "FiraGO, sans-serif",
    letterSpacing: "0.03em",
    ...style,
  };

  return (
    <span {...props} style={typographyStyle}>
      {children}
    </span>
  );
};

export default Typography;
