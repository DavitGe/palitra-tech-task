import type { Meta, StoryObj } from "@storybook/react";
import SignUpForm from "../components/authorization/SignUpForm";

const meta: Meta<typeof SignUpForm> = {
  title: "Component Showcase",
  component: SignUpForm,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SignupForm: Story = {};
