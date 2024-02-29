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
      dispatch(logoutAdmin());

      navigate(`/adminLogin`);
    } catch (error) {
      console.log("Unable to Logout");
    }
  };

  return (
    <div>
      <button
        className="mt-7 px-7 py-4 w-fit bg-primary rounded-md cursor-pointer font-medium text-white"
        onClick={() => {
          _logoutAdmin();
        }}
      >
        Logout
      </button>

      <h2>Create a New Product</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <div>
            <label>Title:</label>
            <Field type="text" name="title" />
          </div>
          <ErrorMessage name="title" component="div" />
          <div>
            <label>Price:</label>
            <Field type="number" name="price" />
          </div>
          <ErrorMessage name="price" component="div" />
          <div>
            <label>Time:</label>
            <Field type="text" name="time" />
          </div>
          <ErrorMessage name="time" component="div" />
          <div>
            <label>Image:</label>
            <Field type="file" name="image" onChange={handleFileChange} />
          </div>
          <ErrorMessage name="image" component="div" />

          <button type="submit">Create Product</button>
        </Form>
      </Formik>
    </div>
  );
};

export default AdminPanel;
