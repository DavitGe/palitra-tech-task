import React from "react";
import "./styles/checkbox.styles.scss";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
  bodyProps?: React.HTMLAttributes<HTMLDivElement>;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  bodyProps,
  className,
  name,
  id,
  ...props
}) => {
  // Generate a unique ID if none provided
  const inputId =
    id || name || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div
      {...bodyProps}
      className={`checkbox-container ${bodyProps?.className || ""}`}
    >
      <input type="checkbox" name={name} id={inputId} {...props} />
      <label htmlFor={inputId}>{label}</label>
    </div>
  );
};

export default Checkbox;
