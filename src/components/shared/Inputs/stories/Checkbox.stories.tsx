import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Checkbox from "../Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Label text for the checkbox",
    },
    checked: {
      control: "boolean",
      description: "Whether the checkbox is checked",
    },
    disabled: {
      control: "boolean",
      description: "Whether the checkbox is disabled",
    },
    id: {
      control: "text",
      description: "ID for the checkbox element",
    },
    onChange: {
      action: "changed",
      description: "Callback function when checkbox state changes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Default checkbox",
  },
};

export const Checked: Story = {
  args: {
    label: "Checked checkbox",
    checked: true,
  },
};

export const Unchecked: Story = {
  args: {
    label: "Unchecked checkbox",
    checked: false,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled checkbox",
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: "Disabled checked checkbox",
    checked: true,
    disabled: true,
  },
};

export const LongLabel: Story = {
  args: {
    label:
      "This is a checkbox with a very long label that demonstrates how the component handles longer text content",
  },
};

export const AcceptTerms: Story = {
  args: {
    label: "I accept the terms and conditions",
    id: "terms",
  },
};

export const Newsletter: Story = {
  args: {
    label: "Subscribe to newsletter",
    id: "newsletter",
  },
};

export const Interactive: Story = {
  args: {
    label: "Click to toggle",
  },
  render: (args) => {
    const [checked, setChecked] = React.useState(false);

    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={(newChecked) => setChecked(newChecked)}
      />
    );
  },
};
