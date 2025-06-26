import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import TextInput from "../components/shared/Inputs/TextInput";
import Typography from "../components/shared/Typography";

const ComponentShowcase: React.FC = () => {
  return (
    <div style={{ padding: "24px", maxWidth: "400px" }}>
      <Typography size="xl" weight="medium" color="primary" align="center">
        Login Form
      </Typography>

      <div style={{ marginTop: "24px" }}>
        <Typography size="sm" weight="medium" color="label">
          Email Address
        </Typography>
        <div style={{ marginTop: "8px" }}>
          <TextInput type="email" placeholder="Enter your email" name="email" />
        </div>
      </div>

      <div style={{ marginTop: "16px" }}>
        <Typography size="sm" weight="medium" color="label">
          Password
        </Typography>
        <div style={{ marginTop: "8px" }}>
          <TextInput
            type="password"
            placeholder="Enter your password"
            name="password"
          />
        </div>
      </div>

      <div style={{ marginTop: "8px" }}>
        <Typography size="xs" color="placeholder">
          Forgot your password?
        </Typography>
      </div>

      <div
        style={{
          marginTop: "24px",
          padding: "12px 24px",
          backgroundColor: "#ea454c",
          borderRadius: "4px",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <Typography
          size="md"
          weight="medium"
          color="primary"
          style={{ color: "white" }}
        >
          Sign In
        </Typography>
      </div>

      <div style={{ marginTop: "16px", textAlign: "center" }}>
        <Typography size="sm" color="desc">
          Don't have an account?{" "}
        </Typography>
        <Typography
          size="sm"
          weight="medium"
          color="main"
          style={{ cursor: "pointer" }}
        >
          Sign up here
        </Typography>
      </div>
    </div>
  );
};

const meta: Meta<typeof ComponentShowcase> = {
  title: "Examples/Component Showcase",
  component: ComponentShowcase,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LoginForm: Story = {};

export const SignupForm: Story = {
  render: () => (
    <div style={{ padding: "24px", maxWidth: "400px" }}>
      <Typography size="xl" weight="medium" color="primary" align="center">
        Create Account
      </Typography>

      <div style={{ marginTop: "24px" }}>
        <Typography size="sm" weight="medium" color="label">
          Full Name
        </Typography>
        <div style={{ marginTop: "8px" }}>
          <TextInput
            type="text"
            placeholder="Enter your full name"
            name="fullName"
          />
        </div>
      </div>

      <div style={{ marginTop: "16px" }}>
        <Typography size="sm" weight="medium" color="label">
          Email Address
        </Typography>
        <div style={{ marginTop: "8px" }}>
          <TextInput type="email" placeholder="Enter your email" name="email" />
        </div>
      </div>

      <div style={{ marginTop: "16px" }}>
        <Typography size="sm" weight="medium" color="label">
          Password
        </Typography>
        <div style={{ marginTop: "8px" }}>
          <TextInput
            type="password"
            placeholder="Create a password"
            name="password"
          />
        </div>
      </div>

      <div style={{ marginTop: "8px" }}>
        <Typography size="xs" color="placeholder">
          Password must be at least 8 characters long
        </Typography>
      </div>

      <div
        style={{
          marginTop: "24px",
          padding: "12px 24px",
          backgroundColor: "#ea454c",
          borderRadius: "4px",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <Typography size="md" weight="medium" style={{ color: "white" }}>
          Create Account
        </Typography>
      </div>

      <div style={{ marginTop: "16px", textAlign: "center" }}>
        <Typography size="sm" color="desc">
          Already have an account?{" "}
        </Typography>
        <Typography
          size="sm"
          weight="medium"
          color="main"
          style={{ cursor: "pointer" }}
        >
          Sign in here
        </Typography>
      </div>
    </div>
  ),
};
