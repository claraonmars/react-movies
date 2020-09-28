import React, { useContext, useState, useEffect, FC } from "react";
import { PageHeader, Button } from "antd";
import MovieContext from "../contexts/MovieContext";
import MovieList from "../components/MovieList";
import { Movie } from "../types";
import FiltersModal from "../components/Filters";

const Main: FC = () => {
  const [visible, setVisible] = useState<boolean>(false);


  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

  const { state } = useContext(MovieContext);
  const { movies, filtersApplied } = state;

  useEffect(() => {
    let tempFilteredMovies = movies || [];
    if (filtersApplied.genre.length) {
      tempFilteredMovies = tempFilteredMovies.filter(
        (movie: Movie) =>
        filtersApplied.genre.findIndex(
            (genre: string) => movie.genre === genre
          ) > -1
      );
    }
    if (filtersApplied.year.length) {
      tempFilteredMovies = tempFilteredMovies.filter(
        (movie: Movie) =>
        filtersApplied.year.findIndex(
            (year: number) => movie.productionYear === year
          ) > -1
      );
    }

    setFilteredMovies(tempFilteredMovies)
  }, [filtersApplied, movies])


  return (
    <>
      <PageHeader
        title={"Movies List"}
        extra={<Button onClick={() => setVisible(true)} disabled={!movies?.length}>Filter By</Button>}
      >
        <MovieList movies={filtersApplied.genre.length || filtersApplied.year.length ? filteredMovies : movies || []}/>
      </PageHeader>
      <FiltersModal visible={visible} setVisible={setVisible} />
    </>
  );
};

export default Main;
