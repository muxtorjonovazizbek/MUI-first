import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { teacherValidatioinScheme } from "@utils/validations";
import { Formik, Field, Form, ErrorMessage } from "formik";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #0D6EFD",
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal({
  open,
  handleClose,
  course,
  setOpen,
  data,
  setData,
}) {
  const initialValue = {
    course: "",
    name: "",
  };

  const handleSubmit = async (value) => {
    try {
      const res = await axios.post("http://localhost:3000/teacher", value);
      setData([...data, res.data]);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Formik
              initialValues={initialValue}
              onSubmit={handleSubmit}
              validationSchema={teacherValidatioinScheme}
            >
              

              {({handleChange, values}) => (
                <Form>
                <FormControl fullWidth className="d-flex gap-3">
                  <InputLabel id="demo-simple-select-label">Course</InputLabel>
                
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="course"
                      label="Course"
                      value={values.course}
                      onChange={handleChange}
                    >
                      {course.map((val, ind) => (
                        <MenuItem value={val.name} key={ind}>
                          {val.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <ErrorMessage name="course" component="div" className="text-danger" />

                  <Field
                      as={TextField}
                      fullWidth
                      label="Teacher name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                    />
                    <ErrorMessage name="name" component="div" className="text-danger" />

                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      style={{ marginTop: "12px" }}
                    >
                      Save
                    </Button>
                  

                  {/* <TextField
                    fullWidth
                    label="Teacher name"
                    name="name"
                    // value={form.name}
                    // onChange={handleChange}
                  />
                  <Button
                    // type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                  >
                    Save
                  </Button> */}
                </FormControl>
              </Form>
              )}
            </Formik>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
