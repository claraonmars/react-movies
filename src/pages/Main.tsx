import React, { useContext, useState } from "react";
import lodash from "lodash.uniqby";
import { Row, Checkbox, List, Modal, PageHeader, Button } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import MovieContext from "../contexts/MovieContext";
import MovieList from "../components/MovieList";
import { Movie, Filters } from "../types";

const Main = (): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false);
  const [filtersApplied, setFiltersApplied] = useState<Filters>({
    genre: [],
    year: [],
  });
  const [filtersSelected, setFiltersSelected] = useState<Filters>({
    genre: [],
    year: [],
  });
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

  const { movies } = useContext(MovieContext);

  const genres = lodash(movies, "genre").map((movie: Movie) => movie.genre).sort();
  const year = lodash(movies, "productionYear").map(
    (movie: Movie) => movie.productionYear
  ).sort();

  const handleOk = (): void => {
    let tempFilteredMovies = movies || [];
    if (filtersSelected.genre.length) {
      tempFilteredMovies = tempFilteredMovies.filter(
        (movie: Movie) =>
        filtersSelected.genre.findIndex(
            (genre: string) => movie.genre === genre
          ) > -1
      );
    }
    if (filtersSelected.year.length) {
      tempFilteredMovies = tempFilteredMovies.filter(
        (movie: Movie) =>
        filtersSelected.year.findIndex(
            (year: number) => movie.productionYear === year
          ) > -1
      );
    }
    setVisible(false);
    setFiltersApplied(filtersSelected)
    setFilteredMovies(tempFilteredMovies);
  };

  const handleCancel = ():void => {
    setFiltersSelected(filtersApplied)
    setVisible(false);
  }

  const onChange = (event: CheckboxChangeEvent, type: string): void => {
    if (event.target.checked) {
      setFiltersSelected({...filtersSelected, [type]: [...filtersSelected[type], event.target.value]})
    } else {
      const filterList = filtersSelected[type]
      const filterIndex = filterList.findIndex(
         (filter: string | number) => filter === event.target.value
      );
      filterList.splice(filterIndex, 1);
      setFiltersSelected({...filtersSelected, [type]: filterList})
    }
  };

  const content = (
    <>
      <Row>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 6,
            xxl: 3,
          }}
          dataSource={genres}
          renderItem={(item) => (
            <List.Item>
              <Checkbox
                value={item}
                checked={!!filtersSelected.genre.find((genre: string) => genre === item)}
                onChange={(e: CheckboxChangeEvent) => onChange(e, "genre")}
              >
                {item}
              </Checkbox>
            </List.Item>
          )}
        />
      </Row>
      <Row>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 6,
            xxl: 3,
          }}
          dataSource={year}
          renderItem={(item) => (
            <List.Item>
              <Checkbox
                value={item}
                checked={!!filtersSelected.year.find((year: number) => year === item)}
                onChange={(e: CheckboxChangeEvent) => onChange(e, "year")}
              >
                {item}
              </Checkbox>
            </List.Item>
          )}
        />
      </Row>
    </>
  );
  return (
    <>
      <PageHeader
        title={"Movies List"}
        extra={<Button onClick={() => setVisible(true)} disabled={!movies?.length}>Filter By</Button>}
      >
        <MovieList movies={filtersApplied.genre.length || filtersApplied.year.length ? filteredMovies : movies} />
      </PageHeader>
      <Modal
        title="Filters"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            Apply
          </Button>,
        ]}
      >
        {content}
      </Modal>
    </>
  );
};

export default Main;
