import React from "react";
import {
  render,
  fireEvent,
  waitForElement,
  screen,
} from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import App from "../App";
import Main from "../pages/Main";
import MovieList from "../components/MovieList";
import MovieContext from "../contexts/MovieContext";
import {
  mockMovies,
  initialState as state,
  mockDispatch as dispatch,
} from "./utils/mockData";
import FiltersModal from "../components/Filters";

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
const mockFn = jest.fn();

describe("Main movie list page", () => {
  test("should display list of movies", async () => {
    const { getByText } = render(
      <Router history={history}>
        <MovieList movies={mockMovies} />
      </Router>
    );
    expect(getByText("Deadpool")).toBeInTheDocument();
  });

  test("should display empty message", () => {
    const { getByText } = render(<MovieList movies={[]} />);
    expect(getByText("No data found")).toBeInTheDocument();
  });

  test("should redirect to detail page on movie selection", async () => {
    const { getByText, container } = render(
      <Router history={history}>
        <App />
      </Router>
    );

    await waitForElement(() => getByText("Main"));
    fireEvent.click(getByText("Deadpool"));
    expect(container.querySelectorAll(".ant-typography")[2]).toHaveTextContent(
      "Synopsis:"
    );
  });

  test("should open filters modal when Filter By button is clicked", async () => {
    const { getByText } = render(
      <Router history={history}>
        <MovieContext.Provider value={{ state, dispatch }}>
          <Main />
        </MovieContext.Provider>
      </Router>
    );
    fireEvent.click(getByText("Filter By"));
    const modal = await waitForElement(() => getByText("Animation"));
    expect(modal).toBeInTheDocument();
  });

  test("should close filters modal when Apply button is clicked", async () => {
    const { getByText } = render(
      <MovieContext.Provider value={{ state, dispatch }}>
        <FiltersModal visible={true} setVisible={mockFn} />
      </MovieContext.Provider>
    );

    const applyButton = getByText("Apply");
    fireEvent.click(applyButton);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test("should changed checkbox to checked when selected", async () => {
    const { getByLabelText } = render(
      <MovieContext.Provider value={{ state, dispatch }}>
        <FiltersModal visible={true} setVisible={mockFn} />
      </MovieContext.Provider>
    );

    const checkbox = getByLabelText("Animation") as HTMLInputElement;
    expect(checkbox.checked).toEqual(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(true);
  });

  test("should apply selected genre filters to list", async () => {
    const { getByText, getByLabelText, rerender } = render(
      <Router history={history}>
        <MovieContext.Provider value={{ state, dispatch }}>
          <Main />
        </MovieContext.Provider>
      </Router>
    );
    fireEvent.click(getByText("Filter By"));
    const modal = await waitForElement(() => getByText("Animation"));
    expect(modal).toBeInTheDocument();

    const checkbox = getByLabelText("Animation");
    fireEvent.click(checkbox);
    const applyButton = getByText("Apply");
    fireEvent.click(applyButton);

    rerender(
      <Router history={history}>
        <MovieContext.Provider
          value={{
            state: {
              ...state,
              filtersApplied: { genre: ["Animation"], year: [] },
            },
            dispatch,
          }}
        >
          <Main />
        </MovieContext.Provider>
      </Router>
    );

    expect(getByText("Barnyard")).toBeInTheDocument();

    const movieCard = screen.queryByText("Deadpool");
    expect(movieCard).toBeNull();
  });

  test("should render no data if filters return empty list", async () => {
    const { getByText, getByLabelText, rerender } = render(
      <Router history={history}>
        <MovieContext.Provider value={{ state, dispatch }}>
          <Main />
        </MovieContext.Provider>
      </Router>
    );
    fireEvent.click(getByText("Filter By"));
    const modal = await waitForElement(() => getByText("Animation"));
    expect(modal).toHaveTextContent("Animation");

    const genreCheckbox = getByLabelText("Animation");
    fireEvent.click(genreCheckbox);
    const yearCheckbox = getByLabelText("2016");
    fireEvent.click(yearCheckbox);
    const applyButton = getByText("Apply");
    fireEvent.click(applyButton);

    rerender(
      <Router history={history}>
        <MovieContext.Provider
          value={{
            state: {
              ...state,
              filtersApplied: { genre: ["Animation"], year: [2016] },
            },
            dispatch,
          }}
        >
          <Main />
        </MovieContext.Provider>
      </Router>
    );

    expect(getByText("No data found")).toBeInTheDocument();
  });

  test("should not filter movies if modal is closed without applying", async () => {
    const { getByText, getByLabelText, getByRole } = render(
      <Router history={history}>
        <MovieContext.Provider value={{ state, dispatch }}>
          <Main />
        </MovieContext.Provider>
      </Router>
    );
    fireEvent.click(getByText("Filter By"));
    const modal = await waitForElement(() => getByText("Animation"));
    expect(modal).toHaveTextContent("Animation");

    const genreCheckbox = getByLabelText("Animation");
    fireEvent.click(genreCheckbox);
    const yearCheckbox = getByLabelText("2016");
    fireEvent.click(yearCheckbox);
    const cancelButton = getByRole("img");
    fireEvent.click(cancelButton);

    expect(getByText("Deadpool")).toBeInTheDocument();
  });
});
