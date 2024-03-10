import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const { isLogin } = useSelector((state) => state.user);
  return (
    <nav className="flex  h-12 bg-slate-100 font-semibold p-2 w-screen justify-around items-center">
      <div className="flex gap-6">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </div>

      {isLogin ? (
        <div className="flex gap-6">
          <Link to="/profile">Profile</Link>
          <Link to="/" >Logout</Link>
        </div>
      ) : (
        <div className="flex gap-6">
          <Link to="/login">Login</Link>
          <Link to="/signup">SignUp</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar
