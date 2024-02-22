"use client";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { ErrorMessage, Form, Formik } from "formik";

const Register = () => {
  interface FormValues {
    name: string;
    location: string;
    number: number;
    email: string;
    password: string;
    description: string;
  }

  let router = useRouter();
  let [CompanyName, setCompanyName] = useState();
  let [location, setLocation] = useState();
  let [number, setNumber] = useState();
  let [description, setDescription] = useState();

  const initialValues: FormValues = {
    name: "",
    location: "",
    number: 0,
    email: "",
    password: "",
    description: "",
  };
  let onSubmit = async (values: FormValues) => {
    try {
      let result = await axios({
        url: "",
        method: "post",
        data: values,
      });
      console.log(result);
      router.push("/products");
    } catch (error) {
      console.log(error);
    }
  };

  let validationSchema = yup.object({
    name: yup.string().required("Name is required. "),
    location: yup.string().required("Location is required. "),
    number: yup.number().required("Number is required. "),
    description: yup.string().required("Description is required. "),
    email: yup.string().required("Email is required. "),
    password: yup.string().required("Password is required. "),
  });

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
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  {...formik.getFieldProps("name")}
                  required
                />
              </div>
              <ErrorMessage name="name" component="div" />

              <div>
                <label htmlFor="location">Location:</label>
                <input
                  type="text"
                  id="location"
                  {...formik.getFieldProps("location")}
                  required
                />
              </div>
              <ErrorMessage name="location" component="div" />

              <div>
                <label htmlFor="number">Number:</label>
                <input
                  type="number"
                  id="number"
                  {...formik.getFieldProps("number")}
                  required
                />
              </div>
              <ErrorMessage name="number" component="div" />

              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  {...formik.getFieldProps("email")}
                  required
                />
              </div>
              <ErrorMessage name="email" component="div" />

              <div>
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  {...formik.getFieldProps("password")}
                  required
                />
              </div>
              <ErrorMessage name="password" component="div" />

              <div>
                <label htmlFor="description">Description:</label>
                <input
                  type="text"
                  id="description"
                  {...formik.getFieldProps("description")}
                  required
                />
              </div>
              <ErrorMessage name="description" component="div" />

              <button type="submit">Create Account</button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Register;
