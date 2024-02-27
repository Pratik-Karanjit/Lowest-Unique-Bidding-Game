import React from "react";
import Logo from "../src/images/LogoLUB.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "./features/userSlice";

const UI = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //Extracting user token from userSlice
  //Optional chaining applied because the state of user could be null and would throw an error so ?. gives undefined and runs the code without errorhg
  const user = useSelector((state) => state.user.user?.token);

  let logout = async () => {
    try {
      await axios({
        url: `http://localhost:8000/users/logout?token=${user}`,
        method: "delete",
      });
      dispatch(logoutUser());

      navigate(`/login`);
    } catch (error) {
      console.log("Unable to Logout");
    }
  };

  return (
    <div>
      <nav class="bg-white border-gray-200">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto px-4 py-3">
          <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={Logo} class="h-12" alt="LUB Logo" />
          </a>
        </div>
        <div>
          {user ? (
            <button
              className="mt-7 px-7 py-4 w-fit bg-primary rounded-md cursor-pointer font-medium text-white"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </button>
          ) : null}
        </div>
      </nav>
    </div>
  );
};

export default UI;
