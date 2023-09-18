import React, { useState, useEffect } from "react";
import { Form, Button, message } from "antd";
import Flex from "@/components/shared-components/Flex";
import { createSystemData, updateSystemData } from "@/services/SystemService";
import Content from "./Content";


const ADD = "ADD";
const EDIT = "EDIT";

const ManipulationForm = ({ mode = ADD, data, onChanged, onClosed }) => {
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    if (mode === EDIT) {
      const { id, name, code } = data;
      form.setFieldsValue({
        id,
        name,
        code,
      });
    }
  }, [form, mode, data]);

  const onFinish = () => {
    setSubmitLoading(true);
    form
      .validateFields()
      .then((values) => {
        if (mode === ADD) {
          const create = async () => {
            const data = await createSystemData(values);
            if (data) {
              if (!data.message) {
                message.success(`Thêm thành công ${values.name}`);
                const handleData = { ...data, subsystems: [] };
                onChanged(handleData);
              }
            }
            form.resetFields();
            setSubmitLoading(false);
          };
          create();
        }
        if (mode === EDIT) {
          const getMessage = async () => {
            const respond = await updateSystemData(values);
            if (respond.message.includes("successfully")) {
              message.success(`Sửa thành cồng ${values.name}`);
              onChanged(values);
              values = {};
            }
            setSubmitLoading(false);
          };
          getMessage();
        }
      })
      .catch((info) => {
        setSubmitLoading(false);
        console.log("info", info);
        message.error("Yêu cầu nhập đầy đủ thông tin");
      });
  };

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
      >
        <Flex
          className="py-2"
          mobileFlex={false}
          justifyContent="between"
          alignItems="center"
        >
          <h2 className="mb-3">{mode === "ADD" ? "Thêm mới" : "Sửa"} </h2>
          <div className="mb-3">
            <Button className="mr-2" onClick={() => onClosed()}>
              Hủy
            </Button>
            <Button
              type="primary"
              onClick={() => onFinish()}
              htmlType="submit"
              loading={submitLoading}
            >
              {mode === "ADD" ? "Thêm" : `Lưu`}
            </Button>
          </div>
        </Flex>
        <div className="container">
          <Content mode={mode} />
        </div>
      </Form>
    </>
  );
};

export default ManipulationForm;
