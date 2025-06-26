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
  className,
  ...props
}) => {
  return (
    <div {...bodyProps} className={`text-input-container ${className}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <input {...props} className={`text-input ${className}`} />
    </div>
  );
};

export default TextInput;
