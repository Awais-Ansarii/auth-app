import { useState } from "react";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { signInStart, signInSuccess, signInFail } from "../redux/user/userSlice"
const Signup = () => {

  const [formData, setFormData] = useState({});
  // const [isError, setIsError] = useState(false);
  // const [msg, setmsg] = useState("");
  // const [loading, setLoading] = useState(false);
 
  const dispatch = useDispatch()
  
  const { signMsg, loading, isError, signinErr } = useSelector(
    (state) => state.user
  );

  const handleChange = (e) => {
  setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  
  // console.log(formData)
  const handleSubmit = async (e) => {
   e.preventDefault();
   try {
    dispatch(signInStart());
    
     const res = await fetch("http://localhost:4000/api/auth/signup",
       {
         method: "POST",
         headers: {
           "Content-Type" : "application/json"
         },
         body: JSON.stringify(formData)
       }
       
     );
    const data = await res.json()
    //  console.log(data);
     dispatch(signInSuccess(data));
     
      //  setmsg(data.message)
     
    
   }
   catch (error) {
     
    dispatch(signInFail(error));
     
     console.log(error.message)
   }
};
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="name"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
        {/* <OAuth /> */}
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/login">
          <span className="text-blue-500">Login</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">
        {signMsg ? signMsg :  signinErr}
      </p>
    </div>
  );
};

export default Signup;
