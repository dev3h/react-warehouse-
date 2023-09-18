import React from "react";
import { Row } from "antd";
import { withRouter } from "react-router-dom";

export const DefaultDashboard = () => {
  return (
    <>
      <Row gutter={16}>
        <h1>Welcome to dashboard!</h1>
      </Row>
    </>
  );
};

export default withRouter(DefaultDashboard);
