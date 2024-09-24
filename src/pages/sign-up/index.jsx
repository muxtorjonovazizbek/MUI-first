// import React, { useState } from "react";
// import { Button, TextField, Typography } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import { Formik, Field, Form, ErrorMessage } from "formik";
// import { signUpValidationScheme } from "@utils/validations";
// import Notification from "../../utils/notification";
// import axios from "axios";


// const Index = () => {
//   // const [form, setForm] = useState({});
//   const navigate = useNavigate();

//   // const handleChange = (evt) => {
//   //   const { name, value } = evt.target;
//   //   setForm({ ...form, [name]: value });
//   // };
  
//   const initialValues = {
//     first_name:"",
//     last_name:"",
//     phone_number:"",
//     email:"",
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
//       const res = await axios.post("https://texnoark.ilyosbekdev.uz/auth/admin/sign-up", value)
//       console.log(res);

//       if (res.status === 201) {
//           navigate('/')
//       }
      
//     } catch (error) {
//       console.log(error);
//       Notification({title: "Error has found", type: "error"})
//     }
    
//   };

//   return (
//     <div style={{ textAlign: "center" }} className="container">
//       <ToastContainer />
//       <div className="row mt-4">
//         <div className="col-md-6 offset-3">
//           <div className="card">
//             <div className="card-header">
//               <Typography variant="h3">Sign Up</Typography>
//             </div>
//             <div className="card-body">
//              <Formik 
//               initialValues={initialValues} 
//               onSubmit={handleSubmit} 
//               validationSchema={signUpValidationScheme}
//              > 
//                 <Form id="sign-up">
//                   <Field
//                     name="first_name"
//                     as={TextField}
//                     type="text"
//                     fullWidth
//                     // margin="normal"
//                     variant="outlined"
//                     label="First name"
//                     helperText={
//                       <ErrorMessage
//                         name="first_name"
//                         component="p"
//                         className="fs-4 text-danger"
//                       />
//                     }
//                   />
//                   <Field
//                     name="last_name"
//                     as={TextField}
//                     type="text"
//                     fullWidth
//                     margin="normal"
//                     variant="outlined"
//                     label="Last name"
//                     helperText={
//                       <ErrorMessage
//                         name="last_name"
//                         component="p"
//                         className="fs-4 text-danger"
//                       />
//                     }
//                   />
//                   <Field
//                     name="phone_number"
//                     as={TextField}
//                     type="text"
//                     fullWidth
//                     // margin="normal"
//                     variant="outlined"
//                     label="Phone number"
//                     helperText={
//                       <ErrorMessage
//                         name="phone_number"
//                         component="p"
//                         className="fs-4 text-danger"
//                       />
//                     }
//                   />
//                   <Field
//                     name="email"
//                     as={TextField}
//                     type="email"
//                     fullWidth
//                     margin="normal"
//                     variant="outlined"
//                     label="Email"
//                     helperText={
//                       <ErrorMessage
//                         name="email"
//                         component="p"
//                         className="fs-4 text-danger"
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
//                   form="sign-up"
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


import React from "react";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import bgImg from "@assets/bg.jpg";

const { Title, Text } = Typography;

const LoginForm = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Success:", values);
    navigate("/");
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
        <Title level={2}  className="text-center font-bold fs-1">Sign Up</Title>
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
            label="First Name"
            name="first_name"
            rules={[
              {
                required: true,
                message: "Please input your first name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[
              {
                required: true,
                message: "Please input your last name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone number"
            name="phone"
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
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
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
              Sign Up
            </Button>
          </Form.Item>

          <div style={{ textAlign: "center" }}>
            <Text>Already have an account? </Text>
            <NavLink to="/">
              <Text strong style={{ color: "#d35400" }}>
                Login
              </Text>
            </NavLink>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;

