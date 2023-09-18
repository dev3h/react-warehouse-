import React, { useState, useEffect } from "react";

import { Card, Table, Button, Modal, message, Popconfirm } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import Flex from "@/components/shared-components/Flex";
import utils from "@/utils";

import { getSystemData, deleteSystemData } from "@/services/SystemService";
import AddSystem from "../form-add";
import EditSystem from "../form-edit";
import SystemSubSystem from "../link-table";

const SystemList = () => {
  const [list, setList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [typeOfModal, setTypeOfModal] = useState("");
  const [currentRow, setCurrentRow] = useState({});

  useEffect(() => {
    const getData = async () => {
      const data = await getSystemData();
      data && setList(data);
    };
    getData();
  }, []);

  const showModal = (mode) => {
    setIsModalVisible(true);
    setTypeOfModal(mode);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setTypeOfModal("");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleActions = (value) => {
    let obj = list.filter((item) => item.id === value.id);
    if (obj.length === 0) {
      setList([...list, value]);
    } else {
      obj[0].name = value.name;
      obj[0].code = value.code;
      setList([...list]);
    }
    setIsModalVisible(false);
  };
  const handleSubActions = (value) => {
    let obj = list.filter((item) => item.id === value.id);
    obj[0].subsystems = value.subsystems;
    setList([...list]);
  };

  const confirm = (row) => () => {
    deleteRow(row);
  };

  const Manipulations = ({ row }) => (
    <>
      <Button
        type="link"
        style={{ cursor: "pointer" }}
        onClick={() => handleSystemSubSystem(row)}
      >
        <Flex alignItems="center">
          <PlusOutlined />
        </Flex>
      </Button>
      <Button type="link" style={{ cursor: "pointer" }} onClick={() => viewDetails(row)}>
        <Flex alignItems="center">
          <EditOutlined />
        </Flex>
      </Button>
      <Popconfirm
        title="Bạn có muốn xóa hệ thống này không"
        onConfirm={confirm(row)}
        okText="Có"
        cancelText="Không"
      >
        <Button type="link">
          <Flex alignItems="center">
            <DeleteOutlined />
          </Flex>
        </Button>
      </Popconfirm>
    </>
  );

  const add = () => {
    showModal("ADD");
  };

  const viewDetails = (row) => {
    showModal("EDIT");
    setCurrentRow(row);
  };
  const handleSystemSubSystem = (row) => {
    showModal("ADD_SUB");
    setCurrentRow(row);
  };

  const deleteRow = (row) => {
    const deleteData = async () => {
      const respond = await deleteSystemData(row);
      if (respond.message.includes("successfully")) {
        message.success("Xóa thành công");
        const newData = list.filter((elm) => elm.id !== row.id);
        setList(newData);
      }
    };
    deleteData();
  };

  const tableColumns = [
    {
      title: "ID",
      dataIndex: "id",
      width: "10%",
    },
    {
      title: "Tên",
      dataIndex: "name",
      sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
      width: "30%",
    },
    {
      title: "Mã",
      dataIndex: "code",
      sorter: (a, b) => utils.antdTableSorter(a, b, "code"),
      width: "20%",
    },
    {
      title: "Phân hệ",
      dataIndex: "subsystems",
      width: "30%",
      render: (item) => {
        return (
          <ul>
            {item.map((elm) => (
              <li key={elm.id}>{elm.name}</li>
            ))}
          </ul>
        );
      },
    },
    {
      title: "Thao tác",
      dataIndex: "manipulations",
      render: (_, row) => (
        <div className="d-flex justify-content-end">
          <Manipulations row={row} />
        </div>
      ),
    },
  ];

  return (
    <>
      <Card>
        <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
          <div>
            <Button
              onClick={add}
              type="primary"
              icon={<PlusCircleOutlined />}
              block
              style={{ marginBottom: "15px" }}
            >
              Thêm
            </Button>
          </div>
        </Flex>
        <div className="table-responsive">
          <Table
            bordered
            columns={tableColumns}
            dataSource={list}
            rowKey="id"
            className="table-category"
          />
        </div>
      </Card>
      <Modal
        centered
        destroyOnClose={true}
        footer={null}
        title={
          typeOfModal === "ADD"
            ? "Thêm mới"
            : typeOfModal === "EDIT"
            ? "Sửa"
            : "chỉnh sửa phân hệ"
        }
        visible={isModalVisible}
        onCancel={handleCancel}
        width={typeOfModal === "ADD" || typeOfModal === "EDIT" ? 600 : "90%"}
      >
        {typeOfModal === "ADD" ? (
          <AddSystem onChanged={handleActions} onClosed={closeModal} />
        ) : typeOfModal === "EDIT" ? (
          <EditSystem data={currentRow} onChanged={handleActions} onClosed={closeModal} />
        ) : (
          <SystemSubSystem data={currentRow} onChanged={handleSubActions} />
        )}
      </Modal>
    </>
  );
};

export default SystemList;
