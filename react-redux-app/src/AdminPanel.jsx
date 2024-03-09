import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAdmin } from "./features/userSlice";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const AdminPanel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);

  const admin = useSelector((state) => state.user.admin?.token);

  const initialValues = {
    title: "",
    price: "",
    time: "",
    image: null,
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // const onSubmit = async (info) => {
  //   try {
  //     const result = await axios({
  //       url: "http://localhost:8000/users/products/create",
  //       formData,
  //       method: "post",
  //       data: info,
  //     });

  //     console.log("Product created successfully");
  //     navigate("/admin");
  //   } catch (error) {
  //     console.log("Unable to create product:", error);
  //   }
  // };

  const onSubmit = async (info) => {
    try {
      const formData = new FormData();
      formData.append("img", file);

      // Append other fields from info to formData
      formData.append("title", info.title);
      formData.append("price", info.price);
      formData.append("time", info.time);

      const result = await axios.post(
        "http://localhost:8000/users/products/create",
        formData
      );

      console.log("Product created successfully");
      navigate("/admin");
    } catch (error) {
      console.log("Unable to create product:", error);
    }
  };

  const validationSchema = yup.object({
    title: yup.string().required("Title is required. "),
    price: yup.string().required("Price is required. "),
    time: yup.string().required("Time is required. "),
  });

  let _logoutAdmin = async () => {
    try {
      await axios({
        url: `http://localhost:8000/users/logoutAdmin?token=${admin}`,
        method: "delete",
      });
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminRole");
      dispatch(logoutAdmin());

      navigate(`/adminLogin`);
    } catch (error) {
      console.log("Unable to Logout");
    }
  };

  return (
    <div className="create-section p-7 flex justify-center align-center">
      <div className="bg-white w-2/5 p-10 rounded-md shadow-sm">
        <h1>Create a New Product</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <div className="flex flex-wrap">
              <label className="w-full mt-4">Title:</label>
              <Field
                className="w-full py-3 ring-1 ring-inset ring-gray-300 rounded-md pl-3 mt-1"
                type="text"
                name="title"
              />
            </div>
            <ErrorMessage
              className="error-message text-sm text-red-600"
              name="title"
              component="div"
            />
            <div className="flex flex-wrap">
              <label className="w-full mt-4">Price:</label>
              <Field
                className="w-full py-3 ring-1 ring-inset ring-gray-300 rounded-md pl-3 mt-1"
                type="number"
                name="price"
              />
            </div>
            <ErrorMessage
              className="error-message text-sm text-red-600"
              name="price"
              component="div"
            />
            <div className="flex flex-wrap">
              <label className="w-full mt-4">Time:</label>
              <Field
                className="w-full py-3 ring-1 ring-inset ring-gray-300 rounded-md pl-3 mt-1"
                type="text"
                name="time"
              />
            </div>
            <ErrorMessage
              className="error-message text-sm text-red-600"
              name="time"
              component="div"
            />
            <div className="flex flex-wrap">
              <label className="w-full mt-4">Image:</label>
              <Field
                className="w-full py-3 ring-1 ring-inset ring-gray-300 rounded-md pl-3 mt-1"
                type="file"
                name="image"
                onChange={handleFileChange}
              />
            </div>
            <ErrorMessage
              className="error-message text-sm text-red-600"
              name="image"
              component="div"
            />

            <button
              className="mt-7 px-7 py-4 w-full bg-primary rounded-md cursor-pointer text-center font-medium text-white"
              type="submit"
            >
              Create Product
            </button>

            <button
              className="mt-7 px-7 py-4 w-full bg-textGrey rounded-md cursor-pointer font-medium text-white"
              onClick={() => {
                _logoutAdmin();
              }}
            >
              Logout
            </button>
            <button
              className="mt-7 px-7 py-4 w-full bg-textGrey rounded-md cursor-pointer font-medium text-white"
              onClick={() => {
                navigate("/adminDash");
              }}
            >
              Go to Dashboard
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AdminPanel;
