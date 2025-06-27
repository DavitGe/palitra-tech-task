import React, { useEffect, useState } from "react";
import Typography from "../Typography";
import CheckCircle from "../icons/CheckCircle";
import XCircle from "../icons/XCircle";
import "./message.styles.scss";

interface IMessageProps {
  type: "success" | "error";
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const Message: React.FC<IMessageProps> = ({
  type,
  message,
  isVisible,
  onClose,
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const Icon = type === "success" ? CheckCircle : XCircle;
  const backgroundColor = type === "success" ? "#dcfce7" : "#fef2f2";
  const borderColor = type === "success" ? "#22c55e" : "#ef4444";
  const textColor = type === "success" ? "#166534" : "#dc2626";

  return (
    <div
      className={`message-container ${type}`}
      style={{
        backgroundColor,
        borderColor,
      }}
    >
      <div className="message-content">
        <Icon size={24} />
        <Typography size="md" weight="medium" style={{ color: textColor }}>
          {message}
        </Typography>
      </div>
    </div>
  );
};

export default Message;
