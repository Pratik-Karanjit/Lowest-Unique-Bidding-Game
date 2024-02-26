import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { selectAdmin } from "./features/userSlice";

const PrivateAdminRoute = ({ path, element }) => {
  const admin = useSelector(selectAdmin);
  const navigate = useNavigate();

  if (!admin) {
    // If admin is not authenticated, navigate to the login page
    navigate("/login");
    return null; // Render nothing while navigating
  }

  return <Route path={path} element={element} />;
};

export default PrivateAdminRoute;
