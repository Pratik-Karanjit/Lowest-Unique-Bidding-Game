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
      .positive("LUB Amount must be a positive number")
      .min(0.01, "The number must be greater than or equal to 0.01"),
  });

  return (
    <div className="main-wrapper p-7">
      <div className="flex gap-7">
        <div className="w-full rounded-lg p-8 bg-white shadow-sm">
          <h1>Your LUB Amount</h1>
          <p className="font-medium text-textGrey">
            Enter your LUB amount below (Amount is in Rs.)
          </p>

          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {(formik) => {
              return (
                <Form>
                  <div className="mt-6">
                    <div className="relative mt-2 rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-md">Rs.</span>
                      </div>
                      <input
                        type="number"
                        id="lubInput"
                        className="block w-full rounded-md border-0 py-5 pl-10 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                        placeholder="0.00"
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
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <label htmlFor="currency" className="sr-only">
                        Currency
                      </label>
                    </div>
                    <button className="mt-7 px-7 py-4 w-fit bg-primary rounded-md cursor-pointer font-medium text-white">
                      Submit
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
        <div className="h-72 w-full rounded-lg p-6 bg-white">
          <h1>Product on Auction</h1>
          <p className="font-medium text-textGrey">Apple iPhone 15 Pro Max</p>
        </div>
      </div>
    </div>
  );
};

export default Game;
