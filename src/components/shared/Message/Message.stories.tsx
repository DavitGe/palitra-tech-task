import type { Meta, StoryObj } from "@storybook/react";
import Message from "./index";

const meta: Meta<typeof Message> = {
  title: "Components/Message",
  component: Message,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["success", "error"],
    },
    message: {
      control: { type: "text" },
    },
    isVisible: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    type: "success",
    message: "Operation completed successfully!",
    isVisible: true,
    onClose: () => {},
  },
};

export const Error: Story = {
  args: {
    type: "error",
    message: "Something went wrong. Please try again.",
    isVisible: true,
    onClose: () => {},
  },
};

export const Hidden: Story = {
  args: {
    type: "success",
    message: "This message is hidden",
    isVisible: false,
    onClose: () => {},
  },
};
