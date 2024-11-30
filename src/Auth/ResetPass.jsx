import login from "../assets/auth/login.png";
import { Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import UseAxios from "../hook/UseAxios";
import Swal from "sweetalert2";  
import { useState } from "react"; 

const ResetPass = () => {
  // const navigate = useNavigate();
  // const axiosUrl = UseAxios();
  const [isLoading, setIsLoading] = useState(false);  

  const onFinish = async (values) => {
    setIsLoading(true);  
    console.log(values)

    // try {
    //   const token = localStorage.getItem("recoveryToken");
    //   console.log("Token retrieved:", token);

    //   if (!token) {
    //     Swal.fire({
    //       title: "Error",
    //       text: "Not Verifyed. Please verify OTP again.",
    //       icon: "error",
    //       confirmButtonText: "OK",
    //     });
    //     navigate("/verify"); 
    //     return;
    //   }

    //   const response = await axiosUrl.post(
    //     "/auth/change-password",
    //     {
    //       password: values.password,
    //       confirmPassword: values.confirmPassword,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   );

    //   console.log(response.data);

    //   if (response.data) {
    //     Swal.fire({
    //       title: "Success",
    //       text: "Password reset successful!",
    //       icon: "success",
    //       confirmButtonText: "OK",
    //     });
    //     localStorage.removeItem("recoveryToken");  
    //     navigate("/login");  
    //   }
    // } catch (error) {
    //   console.error("Error:", error);
    //   Swal.fire({
    //     title: "Error",
    //     text: "Failed to reset password. Please try again.",
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
      <div className="bg-white md:w-[500px] md:px-16 px-5 py-16 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Set a new password</h2>
        <h3 className="text-[#333333] text-center mb-5">
        Create a new password. Ensure it differs from
        previous ones for security
        </h3>

        <Form
          name="reset-password"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
        
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please set your password!" },
              { min: 8, max: 10, message: "Password must be 8-10 characters long!" },
            ]}
          >
            <Input.Password
              placeholder="Enter your password"
              className="w-full px-4 py-2 border  rounded-md"
            />
          </Form.Item>

          
          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("The two passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Re-enter your password"
              className="w-full px-4 py-2 border  rounded-md"
            />
          </Form.Item>

         
          <Form.Item>
            <button
              type="submit"
              className="w-full py-2 bg-[#2F799E] text-white rounded-md"
              disabled={isLoading}  
            >
              {isLoading ? "Resetting..." : "Reset Password"}  
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

export default ResetPass;
