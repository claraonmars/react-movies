import React from "react";
import { render, waitForElement } from "@testing-library/react";
import App from "../App";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe("On App load", () => {
  test("should render spinner", () => {
    const { container } = render(<App />);
    const spinner = container.querySelector(".ant-spin-spinning");
    expect(spinner).toBeInTheDocument();
  });

  test("should render navbar", async () => {
    const { getByText } = render(<App />);

    const navBar = await waitForElement(() => getByText("Main"))
    expect(navBar).toBeInTheDocument()
  })
});
