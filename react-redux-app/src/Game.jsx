import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLub } from "./features/lubSlice";
import { loginUser } from "./features/userSlice";
import { getLoginInfo } from "./utils/loginInfo";

const Game = () => {
  const [products, setProducts] = useState([]);
  const [remainingTime, setRemainingTime] = useState("");
  const [consoleResult, setConsoleResult] = useState("");
  const [consoleNumber, setConsoleNumber] = useState("");
  const [bidHistory, setBidHistory] = useState([]);
  let dispatch = useDispatch();

  const userRole = useSelector((state) => state.user.user?.role);
  const token = getLoginInfo()?.token;
  const user = getLoginInfo()?.userName;

  //When useEffect runs, it takes the token and userName from localStorage
  //If it is there then it dispatches token and userName to userSlice
  //This is needed so that the user is not logged out when page is re rendered
  useEffect(() => {
    const userLogged = localStorage.getItem("token");
    const user = localStorage.getItem("userName");
    if (userLogged) {
      dispatch(loginUser({ token, user }));
    }
  }, [dispatch]);

  let initialValues = {
    lubInput: "",
  };

  //To dispatch userName, amount, time and status I have ran the dispatch code twice, once inside of try block and another inside of catch block
  //This ensures to provide correct information (status and amount) which is received from different responses (success and failure response middleware in backend)

  let onSubmit = async (info) => {
    let result;
    try {
      info.lubInput = Number(info.lubInput);
      result = await axios({
        url: `http://localhost:8000/lub/amount`,
        method: "post",
        data: info,
      });
      let amount = result.data.result;
      let time = new Date().toLocaleString();
      let status = result.data.message;
      const user = localStorage.getItem("userName");

      {
        status === "Lowest Unique Bid amount added successfully"
          ? (status = "LUB")
          : (status = "Not LUB");
      }
      dispatch(setLub({ userName: user, amount, time, status }));

      const storedEntries =
        JSON.parse(localStorage.getItem("lubEntries")) || [];

      // Add the new entry to the array
      storedEntries.push({ user, amount, time, status });

      // Save the updated Lub entries array back to localStorage
      localStorage.setItem("lubEntries", JSON.stringify(storedEntries));

      setBidHistory((prevBidHistory) => [
        {
          amount: info.lubInput,
          result: result.data.message,
          timestamp: new Date().toLocaleString(),
        },
        ...prevBidHistory,
      ]);

      console.log(result.data.message);
      setConsoleResult(result.data.message);
      setConsoleNumber(result.data.result);
    } catch (error) {
      console.log(error.response.data.message);
      setConsoleResult(error.response.data.message);

      let amount = error.response.data.result;
      let time = new Date().toLocaleString();
      let status = error.response.data.message;
      {
        status === "Lowest Unique Bid amount added successfully"
          ? (status = "LUB")
          : (status = "Not LUB");
      }
      dispatch(setLub({ user, amount, time, status }));
      localStorage.setItem("user", user);
      localStorage.setItem("amount", amount);
      localStorage.setItem("time", time);
      localStorage.setItem("status", status);

      setBidHistory((prevBidHistory) => [
        {
          amount: info.lubInput,
          result: `Error: ${error.response.data.message}`,
          timestamp: new Date().toLocaleString(),
        },
        ...prevBidHistory,
      ]);
    }
  };

  const validationSchema = yup.object().shape({
    lubInput: yup
      .number()
      .typeError("Must be a number")
      .positive("LUB Amount must be a positive number")
      .min(0.01, "The number must be greater than or equal to 0.01"),
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/users/products");
      console.log("API Response:", response.data);
      setProducts(response.data.result);

      // Start the countdown timer of the first product's time
      if (response.data.result.length > 0) {
        startCountdown(response.data.result[0].time);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const startCountdown = (time) => {
    // Extract the number of days from the 'time' field
    const days = parseInt(time);

    // Calculate the end time by adding the days to the current date
    const endDateTime = new Date();
    endDateTime.setDate(endDateTime.getDate() + days);

    // Update the remaining time every second
    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const timeDifference = endDateTime - now;

      if (timeDifference > 0) {
        // Format the remaining time as per your requirement
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        setRemainingTime(
          `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`
        );
      } else {
        // Stop the countdown when time is up
        clearInterval(intervalId);
        setRemainingTime("Auction Ended");
      }
    }, 1000);
  };

  //Function to extract the response data and show it in user panel
  const renderProductInfo = () => {
    if (products.length > 0) {
      const product = products[0]; // Assuming there's only one product in the array

      return (
        <>
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-secondary">Product on Auction</h1>
              <p className="font-medium text-textGrey">{product.title}</p>
            </div>
            <h1 className="text-black">Worth Rs. {product.price}</h1>
            <div>
              <h1>Time Remaining</h1>
              <p className="font-medium text-textGrey">{remainingTime}</p>
            </div>
          </div>
          <img
            src={`http://localhost:8000/${product.image}`}
            className="product-img"
            alt="Product"
          />
        </>
      );
    } else {
      return null; // Handle the case when there are no products
    }
  };

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
                    {getLoginInfo()?.token ? (
                      <button className="mt-7 px-7 py-4 w-fit bg-primary rounded-md cursor-pointer font-medium text-white">
                        Submit
                      </button>
                    ) : (
                      <h2>Login to submit your LUB</h2>
                    )}
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
        <div className="flex flex-row justify-between w-full rounded-lg p-8 bg-white shadow-sm">
          {renderProductInfo()}
          {/* <div>
              <h1 className="text-secondary">Product on Auction</h1>
              <p className="font-medium text-textGrey">
                Apple iPhone 15 Pro Max
              </p>
            </div>
            <h1 className="text-black">Worth Rs. 2,00,000</h1>
            <div>
              <h1>Time Remaining</h1>
              <p className="font-medium text-textGrey">
                3 days 21 hours 13 minutes
              </p>
            </div> */}
        </div>
      </div>

      <div className="bg-white w-full my-5 p-6 rounded-md shadow-sm flex flex-col gap-6">
        <p>{consoleResult}</p>
      </div>

      <div className="bg-white w-full p-6 my-5 rounded-md shadow-sm flex flex-col gap-6">
        <h2 className="font-bold text-primaryDark">Bid History</h2>
        <div className="flex flex-col gap-3">
          {bidHistory.map((bid, index) => (
            <div
              key={index}
              className="flex flex-row justify-between py-3 px-4 bg-background rounded-md"
            >
              <p>
                You bid Rs.{bid.amount} which was {bid.result}.
              </p>
              <p>{bid.timestamp}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Game;
