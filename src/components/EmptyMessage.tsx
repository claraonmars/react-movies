import React, { FC } from "react";
import { Row, Col, Empty } from "antd";

const EmptyMessage: FC = () => (
  <Row style={{ justifyContent: "center" }}>
    <Col style={{ justifyContent: "center" }}>
      <Empty
        description={<span style={{ cursor: "pointer" }}>No data found</span>}
      />
    </Col>
  </Row>
);

export default EmptyMessage;
