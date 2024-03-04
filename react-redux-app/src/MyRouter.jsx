import React from "react";
import { useSelector } from "react-redux";
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
import AdminPanel from "./AdminPanel.jsx";
import ImageSend from "./ImageSend.jsx";
import AdminDash from "./AdminDash.jsx";

const MyRouter = () => {
  // Use the useSelector hook to get the user's role from the Redux state
  const userRole = useSelector((state) => state.user.user);
  const adminRole = useSelector((state) => state.user.admin);

  //To see user's role
  const roleOfUser = userRole && userRole.role;
  // console.log("userRole", roleOfUser);

  //To see admin's role
  // console.log("adminRole", adminRole);

  //Extract role only
  const extractedRole = adminRole && adminRole.role;
  // console.log("******", extractedRole);

  return (
    <div className="bg-off-white h-screen">
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <NavBar />
              <Outlet />
            </div>
          }
        >
          <Route index element={<Game />} />
          <Route path="create" element={<CreateAccount />} />
          <Route path="login" element={<CreateLogin />} />
          <Route path="adminLogin" element={<AdminLogin />} />
          <Route path="uploadImage" element={<ImageSend />} />
          <Route path="adminDash" element={<AdminDash />} />

          {extractedRole === "admin" && (
            <Route path="adminPanel" element={<AdminPanel />} />
          )}

          <Route
            path="registration-success"
            element={<RegistrationSuccess />}
          />
          <Route path="*" element={<ErrorPage />} />
          <Route path="verify" element={<VerifyEmail />} />
          <Route
            path="verify-email"
            element={<VerifyEmailPage />}
            querystring
          />
        </Route>
      </Routes>
    </div>
  );
};

export default MyRouter;
