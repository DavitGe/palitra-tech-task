import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    colorType: {
      control: { type: "select" },
      options: ["main"],
    },
    children: {
      control: { type: "text" },
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
  args: {
    colorType: "main",
    children: "Button",
  },
};

export const MainDisabled: Story = {
  args: {
    colorType: "main",
    children: "Disabled Button",
    disabled: true,
  },
};

export const LongText: Story = {
  args: {
    colorType: "main",
    children: "This is a button with longer text",
  },
};
