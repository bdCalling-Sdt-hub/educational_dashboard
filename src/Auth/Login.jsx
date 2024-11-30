import login from "../assets/auth/login.png";
import { Checkbox, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import UseAxios from "../hook/UseAxios";
import { useState } from "react";
import Swal from "sweetalert2";
const Login = () => {
  const [loading, setLoading] = useState(false);
  // const axiosUrl = UseAxios();
  // const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log(values);
    setLoading(true);
    //   try {
    //     const response = await axiosUrl.post("/dashboard/login", values);
    //     if (response.status === 200) {
    //       localStorage.setItem("token", response.data.token);

    //       Swal.fire({
    //         title: "Login Successful!",
    //         text: "Welcome back!",
    //         icon: "success",
    //         confirmButtonText: "OK"
    //       });

    //       navigate("/");
    //     }
    //   } catch (error) {
    //     console.error("Login failed:", error.response?.data?.message || error.message);

    //     Swal.fire({
    //       title: "Login Failed",
    //       text: error.response?.data?.message || "Login failed. Please try again.",
    //       icon: "error",
    //       confirmButtonText: "Try Again"
    //     });
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // const onFinishFailed = (errorInfo) => {
    //   console.log("Failed:", errorInfo);

    //   Swal.fire({
    //     title: "Form Validation Failed",
    //     text: "Please fill all required fields correctly.",
    //     icon: "warning",
    //     confirmButtonText: "OK"
    //   });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);

    Swal.fire({
      title: "Form Validation Failed",
      text: "Please fill all required fields correctly.",
      icon: "warning",
      confirmButtonText: "OK",
    });
  };

  return (
    <div className="items-center justify-center flex min-h-screen bg-[#2F799E]">
      <div className=" ">
      <div className="lg:grid grid-cols-2">
        <div>
          <div className="bg-white md:w-[500px] md:px-16 px-5 py-16 rounded-lg shadow-lg ">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
            Welcome back!
            </h2>
            <p className="pb-7">Please log in to continue access</p>
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                name="email"
                label='Email'
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
                  },
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                ]}
              >
                <Input
                
                  placeholder="Enter your Email"
                  className="w-full px-4 py-2 border  rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </Form.Item>

              <div className="flex items-center justify-between mb-4">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox className="text-gray-700">Remember me</Checkbox>
                </Form.Item>
                <Link
                  to={"/forgetpassword"}
                  className="text-sm text-[#2F799E] hover:underline focus:outline-none"
                >
                  Forget password?
                </Link>
              </div>

              <Form.Item>
                <button
                  type="submit"
                  className="w-full py-2 bg-[#2F799E] text-white rounded hover:bg-gray-800 focus:ring-2 focus:ring-gray-500"
                  loading={loading}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div>
          <img className="w-[320px]" src={login} alt="" />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
