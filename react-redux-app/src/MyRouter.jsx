import React from "react";
import CreateAccount from "./CreateAccount";
import Game from "./Game";
import { Routes, Route, Outlet } from "react-router-dom";
import RegistrationSuccess from "./RegistrationSuccess";

const MyRouter = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              {/* <NavBar></NavBar> */}
              <Outlet></Outlet>
            </div>
          }
        >
          <Route index element={<Game></Game>}></Route>

          <Route
            path="create"
            element={<CreateAccount></CreateAccount>}
          ></Route>
          <Route
            path="registration-success"
            element={<RegistrationSuccess></RegistrationSuccess>}
          />
          {/* <Route path="verify" element={<VerifyEmail></VerifyEmail>}></Route>
          <Route path="login" element={<CreateLogin></CreateLogin>}></Route>
          <Route
            path="logout"
            element={<LogoutAccount></LogoutAccount>}
          ></Route>
          <Route
            path="verify-email"
            element={<VerifyEmailPage />}
            querystring
          /> */}
        </Route>
      </Routes>
    </div>
  );
};

export default MyRouter;
