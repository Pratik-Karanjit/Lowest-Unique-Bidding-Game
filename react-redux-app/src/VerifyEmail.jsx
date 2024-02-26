import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Verify from "../src/images/verifyEmailIcon.png";

const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      verifyEmail(token);
    } else {
      setVerificationStatus("Invalid verification token.");
    }
  }, []);
  const verifyEmail = async (token) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/users/verify-email",
        { isVerify: true },
        {
          params: {
            token: token,
          },
        }
      );

      const { data } = response;
      if (data.success && !data.isVerify) {
        setVerificationStatus("Email verification successful!");
      } else {
        setVerificationStatus(`Email verification failed: ${data.message}`);
      }
    } catch (error) {
      console.error(error);
      setVerificationStatus(
        "An error occurred during email verification. Error: " + error.message
      );
    }
  };

  return (
    <div className="create-section p-7 flex justify-center align-center">
      <div className="bg-white w-2/5 p-10 rounded-md shadow-sm text-center flex flex-col justify-center items-center gap-6">
        <img src={Verify} class="h-24 w-24" alt="LUB Logo" />
        <h1>Email Verification Page</h1>
        <p>{verificationStatus}</p>
        <button
          onClick={() => navigate("/login")}
          className="verify-email-button mt-7 px-7 py-4 w-full bg-primary rounded-md cursor-pointer text-center font-medium text-white"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
