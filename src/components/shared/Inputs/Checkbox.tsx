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
  className = "",
  name,
  id,
  ...props
}) => {
  // Generate a predictable ID if none provided
  const inputId =
    id ||
    `${name}-checkbox` ||
    `checkbox-${label.toLowerCase().replace(/\s+/g, "-")}`;

  const containerClasses = `checkbox-container ${
    bodyProps?.className || ""
  }`.trim();
  const checkboxClasses = `checkbox-input ${className}`.trim();

  return (
    <div {...bodyProps} className={containerClasses}>
      <input
        type="checkbox"
        name={name}
        id={inputId}
        className={checkboxClasses}
        {...props}
      />
      <label htmlFor={inputId} className="checkbox-label">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
