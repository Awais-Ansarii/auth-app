import React from "react";
import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {logout} from "../redux/user/userSlice"
import { useDispatch } from "react-redux";
const Profile = () => {
  const { currentUser, loading, loginErr } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  console.log("profile - currenntUser : ", currentUser);
  let user = currentUser.registeredUser || currentUser.user;

  const handleSignOut = async() => {
    try {
      await fetch("http://localhost:4000/api/auth/logout");
      dispatch(logout());
    }
    catch (err) {
      console.log(err.message)
    }
  }
  return (
    <div className=" w-10/12 mx-auto">
      <div className="flex flex-col w-[80%] justify-center items-center mx-auto gap-1  m-2">
        <h1 className="text-3xl font-semibold text-center ">Profile</h1>
        <img
          src={user.profilePicture}
          alt="profile"
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover "
        />
        <h2 className="mx-auto text-xl font-semibold">{user.name}</h2>
      </div>
      <form
        // onSubmit={handleSubmit}
        className="flex flex-col  gap-3 rounded-xl bg-gray-200 w-[60%] mx-auto px-5 py-2"
      >
        <input
          type="file"
          ref={fileRef}
          // hidden
          placeholder="upload your pic"
          accept="image/*"
          // onChange={(e) => setImage(e.target.files[0])}
        />
        {/* 
      firebase storage rules:  
      allow read;
      allow write: if
      request.resource.size < 2 * 1024 * 1024 &&
      request.resource.contentType.matches('image/.*') */}
        <img
          src={formData.profilePicture || user.profilePicture}
          alt="profile"
          className="h-16 w-16 self-center cursor-pointer rounded-full object-cover mt-2"
          // onClick={() => fileRef.current.click()}
        />
        <p className="text-sm self-center">
          {imageError ? (
            <span className="text-red-700">
              Error uploading image (file size must be less than 2 MB)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className="text-slate-700">{`Uploading: ${imagePercent} %`}</span>
          ) : imagePercent === 100 ? (
            <span className="text-green-700">Image uploaded successfully</span>
          ) : (
            ""
          )}
        </p>
        <input
          defaultValue={user.name}
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3"
          // onChange={handleChange}
        />
        <input
          defaultValue={user.email}
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3"
          // onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3"
          // onChange={handleChange}
        />

        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? "Loading..." : "Update"}
        </button>
      </form>

      <div className="flex justify-between mt-5 w-[60%] mx-auto px-5 py-2">
        <span
          // onClick={handleDeleteAccount}
          className="text-red-700 cursor-pointer"
        >
          Delete Account
        </span>
        <span
          onClick={handleSignOut}
          className="text-red-700 cursor-pointer"
        >
          Log out
        </span>
      </div>
      <p className="text-red-700 mt-5">{loginErr && "Something went wrong!"}</p>
      <p className="text-green-700 mt-5">
        {/* {updateSuccess && "User is updated successfully!"} */}
      </p>
    </div>
  );
};

export default Profile;
