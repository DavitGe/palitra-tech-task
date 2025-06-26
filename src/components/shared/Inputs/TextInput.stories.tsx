import type { Meta, StoryObj } from "@storybook/react";
import TextInput from "./TextInput";

const meta: Meta<typeof TextInput> = {
  title: "Components/TextInput",
  component: TextInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Optional label for the input field",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the input",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
    },
    type: {
      control: "select",
      options: ["text", "password", "email", "number", "tel", "url"],
      description: "Input type",
    },
    name: {
      control: "text",
      description: "Name attribute for the input",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
    style: {
      width: "300px",
    },
  },
};

export const WithLabel: Story = {
  args: {
    label: "Username",
    placeholder: "Enter your username",
    name: "username",
    style: {
      width: "300px",
    },
  },
};

export const Password: Story = {
  args: {
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    name: "password",
    style: {
      width: "300px",
    },
  },
};

export const Email: Story = {
  args: {
    label: "Email Address",
    placeholder: "Enter your email",
    type: "email",
    name: "email",
    style: {
      width: "300px",
    },
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Field",
    placeholder: "This field is disabled",
    disabled: true,
    style: {
      width: "300px",
    },
  },
};

export const WithValue: Story = {
  args: {
    label: "Name",
    value: "John Doe",
    name: "name",
    style: {
      width: "300px",
    },
  },
};

export const Required: Story = {
  args: {
    label: "Required Field",
    placeholder: "This field is required",
    required: true,
    name: "required",
    style: {
      width: "300px",
    },
  },
};
