import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setlogin}) => {
  const [formData, setFormData] = useState({});
  const [isError, setIsError] = useState(false);
  const [msg, setmsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // console.log(formData)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setIsError(false);

      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      //  console.log(data);
      setLoading(false);

      setmsg(data.message);
      setlogin(true);
    } catch (error) {
      setLoading(false);
      setIsError(true);

      console.log(error.message);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
       
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
          {loading ? "Loading..." : "Login"}
        </button>
        {/* <OAuth /> */}
      </form>
      <div className="flex gap-2 mt-5">
        <p>Register new user!</p>
        <Link to="/signup">
          <span className="text-blue-500">Signup</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">
        {isError && `Something went wrong! `}
        {msg}
      </p>
    </div>
  );
};

export default Login;
