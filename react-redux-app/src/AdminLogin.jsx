import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { loginAdmin } from "./features/userSlice";
import { useDispatch } from "react-redux";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);
  let dispatch = useDispatch();

  const initialValues = {
    userName: "",
    password: "",
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/users/adminLogin",
        values
      );
      const token = response.data.token;
      const role = response.data.role;
      dispatch(loginAdmin({ token, role }));
      navigate("/adminPanel");
    } catch (error) {
      console.log("Unable to submit:", error);
      setLoginError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = yup.object({
    userName: yup.string().required("Username is required. "),
    password: yup.string().required("Password is required. "),
  });

  const handleDeleteAlert = () => {
    Swal.fire({
      title: "Login Error",
      text: "Incorrect user name or password.",
      icon: "error",
      confirmButtonText: "OK",
    });
  };

  return (
    <div className="create-section p-7 flex justify-center align-center">
      <div className="bg-white w-2/5 p-10 rounded-md shadow-sm">
        <h1>ADMIN LOGIN &&&&&&&&&&&&&&&&</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(formik) => (
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

              <div className="mt-7 px-7 py-4 w-full bg-primary rounded-md cursor-pointer  text-center">
                <button className="font-medium text-white" type="submit">
                  Log In
                </button>
              </div>
            </Form>
          )}
        </Formik>

        {loginError && handleDeleteAlert()}
      </div>
    </div>
  );
};

export default AdminLogin;
