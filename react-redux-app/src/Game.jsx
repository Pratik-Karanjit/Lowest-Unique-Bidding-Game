import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";

const Game = () => {
  let initialValues = {
    lubInput: "",
  };

  let onSubmit = async (info) => {
    try {
      let result = await axios({
        url: `http://localhost:8000/users`,
        method: "post",
        data: info,
      });
    } catch (error) {
      console.log("unable to function.");
    }
  };

  const validationSchema = yup.object().shape({
    lubInput: yup
      .number()
      .typeError("Must be a number")
      .required("LUB Amount is required")
      .positive("LUB Amount must be a positive number")
      .min(0.01, "The number must be greater than or equal to 0.01"),
  });

  return (
    <div>
      <h1>Your LUB Amount</h1>
      <h2>Enter your LUB amount below (Amount is in Rs.)</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(formik) => {
          return (
            <Form>
              <div>
                <input
                  type="number"
                  placeholder="LUB Amount"
                  id="lubInput"
                  {...formik.getFieldProps("lubInput")}
                  required
                />
                {/* <p>{lubInput === 0 ? "Wow" : "not wow"}</p> */}
              </div>
              <ErrorMessage
                name="lubInput"
                component="div"
                className="error-message"
              />

              <button type="submit">Submit</button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Game;
