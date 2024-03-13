import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const { isLogin, currentUser } = useSelector((state) => state.user);
  // const { name, profilePicture } = currentUser.registeredUser;
  console.log("navbar - currenntUser : ",currentUser);
  // console.log(currentUser.user.profilePicture);
  let user;
  if (currentUser != null) {
    user = currentUser.registeredUser || currentUser.user;
  }  
  return (
    <nav className="flex  h-12 bg-slate-100 font-semibold p-2 w-screen justify-around items-center">
      <div className="flex gap-6">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </div>

      {isLogin  ? (
        <div className="flex gap-6">
          <Link to="/profile">
            {currentUser ? (
              <img
                src={user.profilePicture}
                alt={user.name}
                className="h-7 w-7 rounded-full object-cover"
              />
            ) : (
              "Profile"
            )}
          </Link>

          <Link to="/">Logout</Link>
        </div>
      ) : (
        <div className="flex gap-6">
          <Link to="/login">Login</Link>
          <Link to="/signup">SignUp</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
