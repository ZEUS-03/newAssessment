import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state);
  return !isLoggedIn ? <Navigate to="/login" /> : children;
};

export default PrivateRoute;
