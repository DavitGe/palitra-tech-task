import React from "react";
import "./styles/textInput.styles.scss";

interface ITextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  bodyProps?: React.HTMLAttributes<HTMLDivElement>;
}

const TextInput: React.FC<ITextInputProps> = ({
  label,
  name,
  bodyProps,
  className = "",
  id,
  ...props
}) => {
  // Generate unique ID for accessibility if none provided
  const inputId = id || `${name}-input` || `input-${Date.now()}`;

  const containerClasses = `text-input-container ${
    bodyProps?.className || ""
  }`.trim();
  const inputClasses = `text-input ${className}`.trim();

  return (
    <div {...bodyProps} className={containerClasses}>
      {label && (
        <label htmlFor={inputId} className="text-input-label">
          {label}
        </label>
      )}
      <input {...props} id={inputId} name={name} className={inputClasses} />
    </div>
  );
};

export default TextInput;
