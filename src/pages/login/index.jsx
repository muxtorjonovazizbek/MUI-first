import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { signInValidationScheme } from "@utils/validations";
import Notification from "../../utils/notification";


const Index = () => {
  // const [form, setForm] = useState({});
  const navigate = useNavigate();

  // const handleChange = (evt) => {
  //   const { name, value } = evt.target;
  //   setForm({ ...form, [name]: value });
  // };
  
  const initialValues = {
    name:"",
    password: ""
  };

 

  const handleSubmit = async (value) => {
    // value.preventDefault();

    if (value.name === "admin") {
      navigate("/owner");
    } else if (value.name === "user") {
      navigate("/user");
    } else {
      // notifyError()
      Notification({title: "Xatolik mavjud", type: "error"})
    }
  };

  return (
    <div style={{ textAlign: "center" }} className="container">
      <ToastContainer />
      <div className="row mt-4">
        <div className="col-md-6 offset-3">
          <div className="card">
            <div className="card-header">
              <Typography variant="h3">Material UI Design</Typography>
            </div>
            <div className="card-body">
             <Formik 
              initialValues={initialValues} 
              onSubmit={handleSubmit} 
              validationSchema={signInValidationScheme}
             > 
                <Form id="sign-in">
                  <Field
                    name="name"
                    as={TextField}
                    type="text"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    label="Name"
                    helperText={
                      <ErrorMessage
                        name="name"
                        component="p"
                        className="fs-4, text-danger"
                      />
                    }
                  />
                  <Field
                    name="password"
                    as={TextField}
                    type="text"
                    fullWidth
                    variant="outlined"
                    label="Password"
                    helperText={
                      <ErrorMessage
                        name="password"
                        component="p"
                        className="fs-4, text-danger"
                      />
                    }
                  />

                </Form>
             </Formik>
            </div>
            <div className="card-footer">
              <Button 
                  type='submit' 
                  variant='contained' 
                  color="success" 
                  form="sign-in"
                  style={{marginTop: '12px'}} 
                  className='d-flex flex-column align-items-start'
              >
                  Save All Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
