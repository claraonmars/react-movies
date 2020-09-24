import React from "react";
import { Link } from "react-router-dom";
import { Card, List, Col, Row, Empty, Typography } from "antd";
import { Context } from "../types";

const { Text } = Typography;
const MovieList = (movies: Context): JSX.Element => {
  return (
    <>
      {movies.movies?.length ? (
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
          dataSource={movies.movies}
          renderItem={(movie) => (
            <List.Item>
              <Card
                title={
                  <span>
                    <Link to={`/${movie.name}`}>{movie.name}</Link>
                    <h5>
                      <Text type="secondary">{movie.productionYear}</Text>
                    </h5>
                  </span>
                }
              >
                {movie.synopsisShort}
              </Card>
            </List.Item>
          )}
        />
      ) : (
        <Row style={{ justifyContent: "center" }}>
          <Col style={{ justifyContent: "center" }}>
            <Empty
              description={
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => window.location.reload()}
                >
                  No data found
                </span>
              }
            />
          </Col>
        </Row>
      )}
    </>
  );
};

export default MovieList;
