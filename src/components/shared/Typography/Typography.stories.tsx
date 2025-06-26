import type { Meta, StoryObj } from "@storybook/react";
import Typography from "./index";

const meta: Meta<typeof Typography> = {
  title: "Components/Typography",
  component: Typography,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "The text content to display",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Typography size",
    },
    weight: {
      control: "select",
      options: ["light", "regular", "medium"],
      description: "Font weight",
    },
    color: {
      control: "select",
      options: ["main", "primary", "label", "placeholder", "desc"],
      description: "Text color",
    },
    align: {
      control: "select",
      options: ["left", "center", "right"],
      description: "Text alignment",
    },
    font: {
      control: "select",
      options: ["Poppins", "FiraGO"],
      description: "Font family",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "This is default typography text",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Typography size="xs">Extra Small (10px)</Typography>
      <Typography size="sm">Small (12px)</Typography>
      <Typography size="md">Medium (14px)</Typography>
      <Typography size="lg">Large (16px)</Typography>
      <Typography size="xl">Extra Large (34px)</Typography>
    </div>
  ),
};

export const AllWeights: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Typography weight="light">Light Weight (300)</Typography>
      <Typography weight="regular">Regular Weight (400)</Typography>
      <Typography weight="medium">Medium Weight (500)</Typography>
    </div>
  ),
};

export const AllColors: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Typography color="main">Main Color (#ea454c)</Typography>
      <Typography color="primary">Primary Color (#030303)</Typography>
      <Typography color="label">Label Color (#181818)</Typography>
      <Typography color="placeholder">Placeholder Color (#636364)</Typography>
      <Typography color="desc">Description Color (#595959)</Typography>
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div
      style={{
        width: "300px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <Typography align="left">Left aligned text</Typography>
      <Typography align="center">Center aligned text</Typography>
      <Typography align="right">Right aligned text</Typography>
    </div>
  ),
};

export const Fonts: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Typography font="Poppins">Poppins Font Family</Typography>
      <Typography font="FiraGO">FiraGO Font Family</Typography>
    </div>
  ),
};

export const LargeHeading: Story = {
  args: {
    children: "Large Heading",
    size: "xl",
    weight: "medium",
    color: "primary",
  },
};

export const MainColorButton: Story = {
  args: {
    children: "Click me",
    size: "md",
    weight: "medium",
    color: "main",
  },
};

export const PlaceholderText: Story = {
  args: {
    children: "Enter your text here...",
    size: "sm",
    weight: "regular",
    color: "placeholder",
  },
};

export const CustomStyle: Story = {
  args: {
    children: "Custom styled text",
    size: "lg",
    weight: "medium",
    color: "primary",
    style: {
      textDecoration: "underline",
      letterSpacing: "0.5px",
    },
  },
};
