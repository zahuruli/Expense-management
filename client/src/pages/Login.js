import React, { useEffect, useState } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../components/Spinner/LoadingSpinner";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  //form submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/users/login", values);
      message.success("login successful");
      setLoading(false);
      navigate("/");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };

  //prevent for login:
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <div className="register-page ">
        {loading && <LoadingSpinner />}
        <Form layout="vertical" onFinish={submitHandler}>
          <h1>Login Form</h1>
          <Form.Item label="Email" name="email">
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" />
          </Form.Item>
          <div className="d-flex justify-content-between">
            <Link to={"/register"}>Not a user ? Click here to register</Link>
            <button type="submit" className="btn btn-primary">
              Log in
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;
