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
    <div className="create-section p-7 flex justify-center align-center">
      <div className="bg-white w-2/5 p-10 rounded-md shadow-sm">
        <h1>Create Account</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(formik) => {
            return (
              <Form>
                <div className="flex flex-wrap">
                  <label className="w-full mt-4" htmlFor="userName">
                    Username
                  </label>
                  <input
                    type="text"
                    className="w-full py-3 ring-1 ring-inset ring-gray-300 rounded-md pl-3 mt-1"
                    id="userName"
                    {...formik.getFieldProps("userName")}
                    required
                  />
                </div>
                <ErrorMessage
                  name="userName"
                  component="div"
                  className="error-message text-sm text-red-600"
                />

                <div className="flex flex-wrap">
                  <label className="w-full mt-4" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full py-3 ring-1 ring-inset ring-gray-300 rounded-md pl-3 mt-1"
                    id="email"
                    {...formik.getFieldProps("email")}
                    required
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message text-sm text-red-600"
                />

                <div className="flex flex-wrap">
                  <label className="w-full mt-4" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    className="w-full py-3 ring-1 ring-inset ring-gray-300 rounded-md pl-3 mt-1"
                    id="password"
                    {...formik.getFieldProps("password")}
                    required
                  />
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message text-sm text-red-600"
                />

                <div className="flex flex-wrap">
                  <label className="w-full mt-4" htmlFor="role">
                    Role
                  </label>
                  <select
                    className="w-full py-4 ring-1 ring-inset ring-gray-300 rounded-md pl-3 pr-2 mt-1"
                    id="role"
                    {...formik.getFieldProps("role")}
                    required
                  >
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
                  className="error-message text-sm text-red-600"
                />
                <button
                  className="mt-7 px-7 py-4 w-full bg-primary rounded-md cursor-pointer text-center font-medium text-white"
                  type="submit"
                >
                  Create Account
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default CreateAccount;
