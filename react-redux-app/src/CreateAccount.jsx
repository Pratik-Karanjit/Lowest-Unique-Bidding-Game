import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const navigate = useNavigate();
  let initialValues = {
    userName: "",
    email: "",
    password: "",
    role: "player",
  };

  let onSubmit = async (info) => {
    try {
      let result = await axios({
        url: `http://localhost:8000/users`,
        method: "post",
        data: info,
      });

      navigate("/registration-success");
    } catch (error) {
      console.log("unable to create");
    }
  };

  let validationSchema = yup.object({
    userName: yup.string().required("Username is required. "),
    email: yup.string().required("Email is required. "),
    password: yup.string().required("Password is required. "),
    role: yup.string(),
  });

  let roleOptions = [
    {
      label: "Select Role",
      value: "",
      disabled: true,
    },
    {
      label: "Player",
      value: "player",
    },
    {
      label: "Admin",
      value: "admin",
    },
  ];

  return (
    <div>
      <h2>Create Account</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(formik) => {
          return (
            <Form>
              <div>
                <label htmlFor="userName">User Name:</label>
                <input
                  type="text"
                  id="userName"
                  {...formik.getFieldProps("userName")}
                  required
                />
              </div>
              <ErrorMessage
                name="userName"
                component="div"
                className="error-message"
              />

              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  {...formik.getFieldProps("email")}
                  required
                />
              </div>
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />

              <div>
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  {...formik.getFieldProps("password")}
                  required
                />
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />

              <div>
                <label htmlFor="role">Role:</label>
                <select id="role" {...formik.getFieldProps("role")} required>
                  {roleOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      disabled={option.disabled}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <ErrorMessage
                name="role"
                component="div"
                className="error-message"
              />

              <button type="submit">Create Account</button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CreateAccount;
