import React from "react";
import CreateAccount from "./CreateAccount";
import Game from "./Game";
import { Routes, Route, Outlet } from "react-router-dom";
import RegistrationSuccess from "./RegistrationSuccess";
import NavBar from "./Navbar";
import ErrorPage from "./ErrorPage";
import CreateLogin from "./CreateLogin";
import VerifyEmail from "./VerifyEmail";
import VerifyEmailPage from "./VerifyEmail";
import AdminLogin from "./AdminLogin";
import AdminPanel from "./AdminPanel";

const MyRouter = () => {
  return (
    <div className="bg-off-white h-screen">
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <NavBar></NavBar>
              <Outlet></Outlet>
            </div>
          }
        >
          <Route index element={<Game></Game>}></Route>

          <Route
            path="create"
            element={<CreateAccount></CreateAccount>}
          ></Route>

          <Route path="login" element={<CreateLogin></CreateLogin>}></Route>
          <Route path="adminLogin" element={<AdminLogin></AdminLogin>}></Route>
          <Route path="adminPanel" element={<AdminPanel></AdminPanel>}></Route>
          <Route
            path="registration-success"
            element={<RegistrationSuccess></RegistrationSuccess>}
          />
          <Route path="*" element={<ErrorPage />} />
          <Route path="verify" element={<VerifyEmail></VerifyEmail>}></Route>
          <Route
            path="verify-email"
            element={<VerifyEmailPage />}
            querystring
          />

          {/* <Route path="login" element={<CreateLogin></CreateLogin>}></Route>
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
