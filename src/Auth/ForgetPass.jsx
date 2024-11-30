import login from "../assets/auth/login.png";
import { Form, Input } from "antd";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import UseAxios from "../hook/UseAxios";
import Swal from "sweetalert2";  
import { useState } from "react";

const ForgetPass = () => {
  // const axiosUrl = UseAxios();
  // const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);  

  const onFinish = async (values) => {
    setIsLoading(true); 
    console.log(values)
    // try {
    //   const response = await axiosUrl.post("/auth/forgot-password", {
    //     email: values.email,
    //   });

    //   console.log(response.data);

    //   if (response.data.message) {
    //     Swal.fire({
    //       title: "OTP Sent!",
    //       text: "Check your email for the OTP to reset your password.",
    //       icon: "success",
    //       confirmButtonText: "OK",
    //     });

    //     localStorage.setItem("email", values.email);
    //     navigate("/verify");
    //   }
    // } catch (error) {
    //   console.error("Error:", error);
    //   Swal.fire({
    //     title: "Error",
    //     text: "Failed to send OTP. Please try again.",
    //     icon: "error",
    //     confirmButtonText: "Try Again",
    //   });
    // } finally {
    //   setIsLoading(false);  
    // }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="items-center justify-center flex min-h-screen bg-[#2F799E]">
      <div className="lg:grid grid-cols-2">
      <div className="bg-white md:w-[500px] md:px-16 px-5 py-16 rounded-lg shadow-lg ">
        <h2 className="text-2xl font-bold flex justify-center mb-6 text-gray-800">
          
          Forget Password
        </h2>
        
        <Form
          name="basic"
          
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            name="email"
            label="Email adress"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
          >
            <Input
              placeholder="Email"
              className="w-full px-4 py-2 border  rounded-md"
            />
          </Form.Item>
          <Form.Item>
            <button
              type="submit"
              className="w-full py-2 bg-[#2F799E] text-white rounded-md"
              disabled={isLoading}  
            >
              {isLoading ? "Sending OTP..." : "Send OTP"}  
            </button>
          </Form.Item>
        </Form>
      </div>
      <div className="flex justify-center items-center">
          <div>
          <img className="w-[320px]" src={login} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPass;
