import React from "react";
import Success from "../src/images/check-success.webp";

const RegistrationSuccess = () => {
  return (
    <div className="create-section p-7 flex justify-center align-center">
      <div className="bg-white w-2/5 p-10 rounded-md shadow-sm text-center flex flex-col justify-center items-center gap-6">
        <img src={Success} class="h-24 w-24" alt="LUB Logo" />
        <h1>Successfully Registered.</h1>
        <p>Check your email for verification process.</p>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
