import type { IButtonProps } from "../Button";

export const getButtonColor = (colorType: IButtonProps["colorType"]) => {
  switch (colorType) {
    case "main":
      return {
        color: "white",
        backgroundColor: "#ea454c",
      };
    default:
      return {};
  }
};
