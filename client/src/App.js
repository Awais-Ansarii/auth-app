import Navbar from "./components/Navbar"
import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Profile from "./pages/Profile";
import { useState } from "react";
const App = () => {
  const[login, setlogin] = useState(false)
  return (
    <div className="w-screen min-h-screen">
      <Navbar login={ login} />
      <Routes className="mt-2">
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setlogin={setlogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<h1>404-Page not found</h1>} />
      </Routes>
    </div>
  );
}

export default App
