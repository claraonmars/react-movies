import React from "react";
import { render, fireEvent } from "@testing-library/react";
import MovieContext from "../contexts/MovieContext";
import { Router } from "react-router-dom";
import { createMemoryHistory } from 'history'

import MovieDetail from "../pages/MovieDetail";
import { mockMovies, initialState as state, mockDispatch as dispatch } from "./utils/mockData";

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

describe("Movie Detail page", () => {
    const history = createMemoryHistory()

  test("should display selected movie from route", () => {
    history.push('/Deadpool')
    const { container } = render(
      <Router history={history}>
        <MovieContext.Provider value={{ state, dispatch }}>
        <MovieDetail />
      </MovieContext.Provider>
      </Router>
    )
    expect(container.querySelectorAll('.ant-typography')[2]).toHaveTextContent('Synopsis:')
  });

  test("should render no data message if movie is not in database", () => {
    history.push('/Inception')

    const { getByText } = render(
      <Router history={history}>
        <MovieContext.Provider value={{ state, dispatch }}>
        <MovieDetail />
      </MovieContext.Provider>
      </Router>
    )
    expect(getByText('No data found')).toBeInTheDocument()
  });

  test("should toggle to display full synopsis", () => {
    history.push('/Deadpool')

    const { container, getByText } = render(
      <Router history={history}>
        <MovieContext.Provider value={{ state, dispatch }}>
        <MovieDetail />
      </MovieContext.Provider>
      </Router>
    )

    expect(getByText('Read more...')).toBeInTheDocument()

    fireEvent.click(getByText('Read more...'))
    const firstParagraph = mockMovies[0].synopsis.split('<br />')
    expect(container.querySelectorAll('.ant-typography')[3].innerHTML).toContain(firstParagraph[0])
  });
});
