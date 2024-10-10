// import React, { useState } from "react";
// import { Button, TextField, Typography } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import { Formik, Field, Form, ErrorMessage } from "formik";
// import { signInValidationScheme } from "@utils/validations";
// import Notification from "../../utils/notification";
// import { auth } from "@service";
// import axios from "axios";

// const Index = () => {
//   // const [form, setForm] = useState({});
//   const navigate = useNavigate();

//   // const handleChange = (evt) => {
//   //   const { name, value } = evt.target;
//   //   setForm({ ...form, [name]: value });
//   // };

//   const initialValues = {
//     phone_number: "",
//     password: ""
//   };

//   const handleSubmit = async (value) => {
//     console.log(value);

//     // value.preventDefault();

//     // if (value.name === "admin") {
//     //   navigate("/owner");
//     // } else if (value.name === "user") {
//     //   navigate("/user");
//     // } else {
//     //   // notifyError()
//     //   Notification({title: "Xatolik mavjud", type: "error"})
//     // }

//     try {
//       const res = await auth.sign_in(value)
//       // console.log(res);
//       let access_token = res.data.data.tokens.access_token
//       localStorage.setItem("access_token", access_token)
//       console.log(access_token);
//       navigate("/owner")

//       // if (access_token.status === 200) {
//       //   Notification({ title: "Successfully signed in", type: "success" });
//       // }

//     } catch (error) {
//       console.log(error);
//       Notification({title: "Password or Phone number is wrong!", type: "error"})
//     }
//   };

//   return (
//     <div style={{ textAlign: "center" }} className="container">
//       <ToastContainer />
//       <div className="row mt-4">
//         <div className="col-md-6 offset-3">
//           <div className="card">
//             <div className="card-header">
//               <Typography variant="h3">Material UI Design</Typography>
//             </div>
//             <div className="card-body">
//              <Formik
//               initialValues={initialValues}
//               onSubmit={handleSubmit}
//               validationSchema={signInValidationScheme}
//              >
//                 <Form id="sign-in">
//                   <Field
//                     name="phone_number"
//                     as={TextField}
//                     type="text"
//                     fullWidth
//                     margin="normal"
//                     variant="outlined"
//                     label="Phone number"
//                     helperText={
//                       <ErrorMessage
//                         name="phone_number"
//                         component="p"
//                         className="fs-4, text-danger"
//                       />
//                     }
//                   />
//                   <Field
//                     name="password"
//                     as={TextField}
//                     type="password"
//                     fullWidth
//                     variant="outlined"
//                     label="Password"
//                     helperText={
//                       <ErrorMessage
//                         name="password"
//                         component="p"
//                         className="fs-4, text-danger"
//                       />
//                     }
//                   />

//                 </Form>
//              </Formik>
//             </div>
//             <div className="card-footer">
//               <Button
//                   type='submit'
//                   variant='contained'
//                   color="success"
//                   form="sign-in"
//                   style={{marginTop: '12px'}}
//                   className='d-flex flex-column align-items-start'
//               >
//                   Save All Changes
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Index;

// ======================  Ant Design Log In  ===========================

import React from "react";
import { Button, Checkbox, Form, Input, Typography, message } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "@service";
import bgImg from "@assets/bg.jpg";

const { Title, Text } = Typography;

const LoginForm = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await auth.sign_in(values)
     
      if (res.status === 201) {
        let access_token = res?.data?.data?.tokens?.access_token
        localStorage.setItem("access_token", access_token)  
        message.success("Muvaffaqiyatli kirdingiz!");
        navigate("/owner");
      }
    } catch (error) {
        
      console.error("Login xatolik:", error);
    }
   
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center',padding: "0px" }}>
      <div style={{ width: "50%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={bgImg} alt="bg-img" />
      </div>
      <div style={{width: "30%", display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: "150px" }}>
        <Title level={2}  className="text-center font-bold fs-1">Login</Title>
        <Form
          name="basic"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Phone number"
            name="phone_number"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: "100%",
                backgroundColor: "#d35400",
                borderColor: "#d35400",
                height: "40px",
                fontSize: "16px",
              }}
            >
              Login
            </Button>
          </Form.Item>

          <div style={{ textAlign: "center" }}>
            <Text>Don’t you have an account? </Text>
            <NavLink to="/sign-up">
              <Text strong style={{ color: "#d35400" }}>
                Register
              </Text>
            </NavLink>
          </div>
        </Form>
      </div>
    </div>  
  );
};

export default LoginForm;
