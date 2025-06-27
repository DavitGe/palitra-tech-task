import React from "react";
import "./Typography.scss";

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
  className = "",
  style,
  ...props
}) => {
  const typographyClasses = [
    "typography",
    `typography--size-${size}`,
    `typography--color-${color}`,
    `typography--weight-${weight}`,
    `typography--align-${align}`,
    `typography--font-${font.toLowerCase()}`,
    clickable && "typography--clickable",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span {...props} className={typographyClasses} style={style}>
      {children}
    </span>
  );
};

export default Typography;
