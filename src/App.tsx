import React, { useEffect, useReducer, useState, FC } from "react";
import axios from "axios";
import { notification, Spin } from "antd";
import { BrowserRouter, Route } from "react-router-dom";
import MovieContext from "./contexts/MovieContext";
import NavBar from "./components/NavBar";
import Main from "./pages/Main";
import { reducer } from "./reducer";
import MovieDetail from "./pages/MovieDetail";

const openNotification = (message: string) => {
  notification.error({
    message: "Error",
    description: message,
  });
};

const maxTries = 3

const App: FC = () => {
  const [state, dispatch] = useReducer(reducer, { isLoading: false, filtersApplied: {
    genre: [],
    year: [],
  } });
  const [tries, setTries] = useState<number>(0)

  const getMovies = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    setTries((prev) => prev + 1)
    try {
      const { data } = await axios.get(
        "https://sometimes-maybe-flaky-api.gdshive.io/"
      );
      dispatch({ type: "SET_MOVIES", payload: data });
      dispatch({ type: "SET_LOADING", payload: false });
    } catch (e) {
      if(tries <= maxTries){
        getMovies()
      }
      else{
       openNotification(e.response.data.message);
       dispatch({ type: "SET_LOADING", payload: false });
      }
    }
  };

  useEffect(() => {
    if (state.isLoading) return;
    getMovies();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MovieContext.Provider value={{ state, dispatch }}>
      {state.isLoading ? (
        <Spin style={{transform: "translate(50vw, 10px)"}}/>
      ) : (
            <BrowserRouter>
              <NavBar />
              <div style={{ padding: "10px 50px 0", alignItems: "center" }}>

              <Route exact path="/" component={Main} />
              <Route path="/:movie" component={MovieDetail} />
              </div>
            </BrowserRouter>
      )}
    </MovieContext.Provider>
  );
};

export default App;
