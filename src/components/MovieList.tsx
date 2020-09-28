import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Card, List, Typography } from "antd";
import { Movie } from "../types";
import EmptyMessage from "./EmptyMessage";

const { Text } = Typography;
interface Props {
  movies: Movie[]
}
const MovieList: FC<Props> = ({ movies }) => (
  <>
    {movies?.length ? (
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
        dataSource={movies}
        renderItem={(movie) => (
          <List.Item>
            <Card
              title={
                <>
                  <Link to={`/${movie.name}`}>{movie.name}</Link>
                  <h5>
                    <Text type="secondary">{movie.productionYear}</Text>
                  </h5>
                </>
              }
            >
              {movie.synopsisShort}
            </Card>
          </List.Item>
        )}
      />
    ) : (
      <EmptyMessage />
    )}
  </>
);

export default MovieList;
