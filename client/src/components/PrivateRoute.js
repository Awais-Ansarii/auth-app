import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
const PrivateRoute = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user);
  // return currentUser ? children : <Navigate to='/login' />;
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
