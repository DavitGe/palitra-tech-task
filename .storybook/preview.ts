import type { Preview } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import "../src/index.scss";

const preview: Preview = {
  decorators: [
    (Story) =>
      React.createElement(BrowserRouter, null, React.createElement(Story)),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
