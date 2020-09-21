import React, {useContext } from "react";
import MovieContext from "../contexts/MovieContext";
import MovieList from "../components/MovieList";

const Main = (): JSX.Element => {
    const { movies } = useContext(MovieContext)
  return (
      <>
      <div>
        <h2>Movies List</h2>
        <MovieList movies={movies}/>
      </div>
    </>
  );
};

export default Main;
