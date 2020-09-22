import React, { useContext, useState } from "react";
import { Typography, Row, Col, Empty } from "antd";
import { useLocation } from "react-router-dom";
import parse from "html-react-parser";
import MovieContext from "../contexts/MovieContext";

const { Paragraph } = Typography;

const MovieDetail = (): JSX.Element => {
  const [viewMore, setViewMore] = useState(false);

  const { movies } = useContext(MovieContext);
  const { pathname } = useLocation();
  const movie = movies?.find((movie) => movie.name === pathname.split("/")[1]);

  return (
    <>
      {movie ? (
        <div style={{padding: "0 20px"}}>
          <h3>{movie.name}</h3>
          <Paragraph>Production Year: {movie.productionYear}</Paragraph>
          <Paragraph>Genre: {movie.genre}</Paragraph>
          <Paragraph>Synopsis: {movie.synopsisShort}</Paragraph>
          <Paragraph>{viewMore && parse(movie.synopsis)}</Paragraph>
          <Paragraph>
            <span onClick={() => setViewMore(!viewMore)}>
              {viewMore ? "Read less..." : " Read more..."}
            </span>
          </Paragraph>
        </div>
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

export default MovieDetail;
