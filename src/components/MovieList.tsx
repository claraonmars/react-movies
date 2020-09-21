import React from "react";
import { Link } from "react-router-dom";
import { Card, List, Col, Row, Empty } from "antd";
import { Context } from "../types";

const MovieList = (movies: Context) => {
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
              <Card>
                <Link to={`/${movie.name}`}>{movie.name}</Link>
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
                  Try Again
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
