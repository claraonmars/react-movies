import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import App from "../App";
import MovieList from "../components/MovieList";
import { mockMovies } from "../utils/mockData";

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

const history = createMemoryHistory();

describe("Main movie list page", () => {
  test("should display list of movies", async () => {
    const { getByText } = render(
      <Router history={history}>
        <MovieList movies={mockMovies} />
      </Router>
    );
    expect(getByText("Deadpool")).toBeInTheDocument();
  });

  test("should display empty message", async () => {
    const { getByText } = render(<MovieList movies={[]} />);
    expect(getByText("No data found")).toBeInTheDocument();
  });

  test("should redirect to detail page on movie selection", async () => {
      const { getByText, container } = render(
      <Router history={history}>
        <App />
      </Router>);

      await waitForElement(() => getByText("Main"))
      fireEvent.click(getByText('Deadpool'))
      expect(container.querySelectorAll('.ant-typography')[2]).toHaveTextContent('Synopsis:')
  })
});
