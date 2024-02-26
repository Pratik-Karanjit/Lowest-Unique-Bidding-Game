import React from "react";
import Error from "../src/images/errorIcon.png";

const ErrorPage = () => {
  return (
    <div className="create-section p-7 flex justify-center align-center">
      <div className="bg-white w-2/5 p-10 rounded-md shadow-sm text-center flex flex-col justify-center items-center gap-6">
        <img src={Error} class="h-24 w-24" alt="LUB Logo" />
        <h1>404 Error Page.</h1>
        <p>Oops! Looks like you have entered a page that is not available.</p>
      </div>
    </div>
  );
};

export default ErrorPage;
