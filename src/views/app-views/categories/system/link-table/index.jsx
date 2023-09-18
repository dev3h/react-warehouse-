import React, { useState, useEffect } from "react";
import Flex from "@/components/shared-components/Flex";
import { CloseOutlined } from "@ant-design/icons";
import { Card, Button, message, Popconfirm, Table, Select } from "antd";

import { getSubSystemData } from "@/services/SubSystemService";
import {
  getSystemSubSystemData,
  createSystemSubSystemData,
  deleteSystemSubSystemData,
} from "@/services/SystemSubSystemService";

function SystemSubSystem({ data, onChanged }) {
  const [dropDownDatas, setDropDownDatas] = useState([]);
  const [tableDatas, setTableDatas] = useState([]);
  const [currentSelect, setCurrentSelect] = useState({});

  const subsystems = data.subsystems;
  const { id, name, code } = data;
  const { Option } = Select;

  useEffect(() => {
    const getDropDownData = async () => {
      const rs = await getSubSystemData();
      setDropDownDatas(rs);
    };
    getDropDownData();
  }, []);

  useEffect(() => {
    const SystemSubSystemData = async () => {
      const rs = await getSystemSubSystemData();
      const filterData = rs.filter((item) => item.systemId === id);
      setTableDatas(filterData);
    };
    SystemSubSystemData();
  }, [id]);

  const handleChange = (value) => {
    dropDownDatas.forEach((dropDownData) => {
      if (dropDownData.name === value) {
        setCurrentSelect(dropDownData);
      }
    });
  };
  const handleAdd = (system, subsystem) => () => {
    if (
      !(Object.keys(currentSelect).length === 0 && currentSelect.constructor === Object)
    ) {
      const systemId = system.id;
      const subsystemId = subsystem.id;
      const createData = async () => {
        const respond = await createSystemSubSystemData(systemId, subsystemId);
        if (!respond.message) {
          message.success("Thêm thành công");
          setTableDatas([...tableDatas, { system: data, subsystem: currentSelect }]);
          const newRowData = {
            ...data,
            subsystems: [...subsystems, currentSelect],
          };
          onChanged(newRowData);
        }
        return respond;
      };
      createData();
    } else {
      message.warning("Vui lòng chọn phân hệ để thêm");
    }
  };
  const confirm = (row) => () => {
    deleteRow(row);
  };

  const deleteRow = (row) => {
    const deleteData = async () => {
      const respond = await deleteSystemSubSystemData(row);
      if (respond) {
        message.success(respond.message);
        const newTableDatas = tableDatas.filter((tableData) => tableData.id !== row.id);
        setTableDatas(newTableDatas);
        const filterDataDeleted = data.subsystems.filter(
          (item) => item.id !== row.subsystemId
        );
        const newRowData = { ...data, subsystems: [...filterDataDeleted] };
        onChanged(newRowData);
      }
    };
    deleteData();
  };

  const Manipulations = ({ row }) => (
    <>
      <Popconfirm
        title="bạn có muốn xóa phân hệ này không?"
        onConfirm={confirm(row)}
        okText="Có"
        cancelText="Khồng"
      >
        <Button type="link">
          <Flex alignItems="center">
            <CloseOutlined />
          </Flex>
        </Button>
      </Popconfirm>
    </>
  );

  const columns = [
    {
      title: "tên hệ thống",
      dataIndex: "system",
      render: (item) => <>{item.name}</>,
    },
    {
      title: "tên phân hệ",
      dataIndex: "subsystem",
      render: (item) => (item !== null ? item.name : ""),
    },
    {
      title: "hành động",
      dataIndex: "manipulation",
      render: (_, row) => (
        <div className="d-flex justify-content-end">
          <Manipulations row={row} />
        </div>
      ),
    },
  ];
  return (
    <div>
      <Flex className="justify-content-between">
        <Card style={{ flex: 1 }} title="chi tiết hệ thống">
          <ul>
            <li>id: {id}</li>
            <li>tên: {name}</li>
            <li>mã: {code}</li>
          </ul>
        </Card>
        <Card style={{ flex: 1, marginLeft: "20px" }} title="phân hệ">
          <Select
            placeholder="chọn phân hệ để thêm"
            style={{
              width: "100%",
            }}
            onChange={handleChange}
          >
            {dropDownDatas.map((dropDownData) => {
              return data.subsystems.find(
                (subsystem) => subsystem.id === dropDownData.id
              ) !== undefined ? (
                <Option value={dropDownData.name} key={dropDownData.id} disabled>
                  {dropDownData.name}
                </Option>
              ) : (
                <Option value={dropDownData.name} key={dropDownData.id}>
                  {dropDownData.name}
                </Option>
              );
            })}
          </Select>
          <div className="d-flex justify-content-end" style={{ marginTop: "20px" }}>
            <Button type="primary" onClick={handleAdd(data, currentSelect)}>
              Thêm
            </Button>
          </div>
        </Card>
      </Flex>
      <Card>
        <Table columns={columns} dataSource={tableDatas} rowKey="id" />
      </Card>
    </div>
  );
}

export default SystemSubSystem;
