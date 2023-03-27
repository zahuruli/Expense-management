import React, { useEffect, useState } from "react";
import Layout from "../components/Layouts/Layout";
import { Form, Input, message, Modal, Select, Table, DatePicker } from "antd";
import axios from "axios";
import LoadingSpinner from "../components/Spinner/LoadingSpinner";
import moment from "moment";
const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransections, setAlltransections] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState("all");
  //table data:
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Refrence",
      dataIndex: "refrence",
    },
    {
      title: "Actions",
    },
  ];

  //get all transections:
  const getAlltransections = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      const res = await axios.post("/transections/get-transection", {
        userId: user._id,
        frequency,
        selectedDate,
        type,
      });
      setLoading(false);
      setAlltransections(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      message.error(error.message);
    }
  };

  //useeffect of get Alltransection

  useEffect(() => {
    getAlltransections();
  }, [frequency, selectedDate, type]);

  //handle submit:
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      await axios.post("/transections/add-transection", {
        ...values,
        userId: user._id,
      });
      setLoading(false);
      message.success("transection Added successfully");
      setShowModal(false);
    } catch (error) {
      setLoading(false);
      message.error("Failed to add transection");
    }
  };

  return (
    <Layout>
      {loading && <LoadingSpinner />}
      <div className="filters">
        <div>
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(values) => setFrequency(values)}>
            <Select.Option value="7">Last 1 Week</Select.Option>
            <Select.Option value="30">Last 1 Month</Select.Option>
            <Select.Option value="365">Last 1 Year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => {
                setSelectedDate(values);
              }}
            />
          )}
        </div>
        <div>
          <h6>Select Type</h6>
          <Select value={type} onChange={(values) => setType(values)}>
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
        </div>

        <div>
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Add New
          </button>
        </div>
      </div>

      <div className="content">
        <Table columns={columns} dataSource={allTransections} />
      </div>

      {/* modal  starts from here */}
      <Modal
        title="Add Transection"
        open={showModal}
        onCancel={() => setShowModal(false)}
        // onOk={() => setShowModal(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Amount" name="amount">
            <Input type="text" />
          </Form.Item>

          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movies">Movies</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="tax">Tax</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Refrence" name="refrence">
            <Input type="text" />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>

          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-secondary "
              onClick={() => setShowModal(false)}
            >
              CANCEL
            </button>

            <button type="submit" className="btn btn-primary">
              SAVE
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
