import React from "react";
import { Input, Row, Col, Card, Form } from "antd";

const rules = {
  name: [
    {
      required: true,
      message: "Vui lòng nhập tên hệ thống",
    },
  ],
  code: [
    {
      required: true,
      message: "Vui lòng nhập code hệ thống",
    },
  ],
};

const Content = ({ mode }) => {
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={24} lg={24}>
        <Card title="">
          {mode === "EDIT" && (
            <Form.Item name="id" label="id">
              <Input placeholder="id" disabled />
            </Form.Item>
          )}
          <Form.Item name="name" label="tên" rules={rules.name}>
            <Input autoFocus placeholder="tên" />
          </Form.Item>
          <Form.Item name="code" label="mã" rules={rules.code}>
            <Input placeholder="mã" />
          </Form.Item>
        </Card>
      </Col>
    </Row>
  );
};

export default Content;
