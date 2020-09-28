import React, { useContext, useState, FC } from "react";
import uniqby from "lodash.uniqby";
import cloneDeep from "lodash.clonedeep";
import { Row, Checkbox, List, Modal, Button } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import MovieContext from "../contexts/MovieContext";
import { Movie, Filters } from "../types";

type Props = {
  visible: boolean;
  setVisible(value: boolean): void;
};

const FiltersModal: FC<Props> = ({
  visible,
  setVisible,
}) => {
  const { state, dispatch } = useContext(MovieContext);
  const { movies, filtersApplied } = state;
  const [filtersSelected, setFiltersSelected] = useState<Filters>(filtersApplied);

  const genres = uniqby(movies, "genre")
    .map((movie: Movie) => movie.genre)
    .sort((prev, current) => (prev < current ? -1 : prev > current ? 1 : 0));
  const year = uniqby(movies, "productionYear")
    .map((movie: Movie) => movie.productionYear)
    .sort((prev, current) => (prev < current ? -1 : prev > current ? 1 : 0));

  const handleOk = (): void => {
    setVisible(false);
    dispatch({ type: "SET_FILTERS", payload: filtersSelected });
  };

  const handleCancel = (): void => {
    setFiltersSelected(filtersApplied);
    setVisible(false);
  };

  const onChange = (event: CheckboxChangeEvent, type: string): void => {
    if (event.target.checked) {
      setFiltersSelected({
        ...filtersSelected,
        [type]: [...filtersSelected[type], event.target.value],
      });
    } else {
      const filterList = cloneDeep(filtersSelected[type]);
      const filterIndex = filterList.findIndex(
        (filter: string | number) => filter === event.target.value
      );
      filterList.splice(filterIndex, 1);
      setFiltersSelected({ ...filtersSelected, [type]: filterList });
    }
  };
  return (
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
      <Row>
        <h4>Genres</h4>
        <List
          grid={{
            gutter: 16,
          }}
          dataSource={genres}
          renderItem={(item) => (
            <List.Item>
              <Checkbox
                value={item}
                checked={
                  !!filtersSelected.genre.find(
                    (genre: string) => genre === item
                  )
                }
                onChange={(e: CheckboxChangeEvent) => onChange(e, "genre")}
              >
                {item}
              </Checkbox>
            </List.Item>
          )}
        />
      </Row>
      <Row>
        <h4>Production Year</h4>
        <List
          grid={{
            gutter: 16,
          }}
          dataSource={year}
          renderItem={(item) => (
            <List.Item>
              <Checkbox
                value={item}
                checked={
                  !!filtersSelected.year.find((year: number) => year === item)
                }
                onChange={(e: CheckboxChangeEvent) => onChange(e, "year")}
              >
                {item}
              </Checkbox>
            </List.Item>
          )}
        />
      </Row>
    </Modal>
  );
};

export default FiltersModal;
