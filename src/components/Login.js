import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";
import "./css/mix.css";
import "react-toastify/dist/ReactToastify.css";


const Login = () => {

  const navigate = useNavigate();


  // 👇 Show & Hide Password Functioanlity
  const [showPassword, setShowPassword] = useState(false);

  // 👇 Handle Form Data of Login Form
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setLoginData((preData) => ({ ...preData, [name]: value }));
  };

  const submitFormData = async (e) => {
    e.preventDefault();
    
    // Form Validation
    const { email, password } = loginData;

    if(email === ""){
      toast.warning("Email is required")
    }else if(!email.includes("@")){
      toast.error("Email is not valid")
    }else if(password === ""){
      toast.warning("Password is required")
    }else{
      // Call Login User API
      const data = await fetch("http://localhost:3001/api/login", {
        method: 'POST',
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          email, password
        })
      })

      const res = await data.json();
      if(res.status === 201){
        // Store Token in localstorage
        localStorage.setItem("userAuthToken", res.result.token);
        toast.success("Login Successful");
        // If user valid redirect to dashboard page
        navigate("/dash")
      }else{
        toast.error("Invalid Details");
      }
    }
  };

  return (
    <section>
      <div className="form_data">
        <div className="form_heading">
          <h1>Welcome Back</h1>
        </div>
        <form>
          <div className="form_input">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email address"
              value={loginData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form_input">
            <label htmlFor="password">Password</label>
            <div className="two">
              <input
                type={!showPassword ? "password" : "text"}
                name="password"
                id="password"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={handleInputChange}
              />
              <div
                className="showpass"
                onClick={() => setShowPassword(!showPassword)}
              >
                {!showPassword ? <Visibility /> : <VisibilityOff />}
              </div>
            </div>
          </div>
          <button className="btn" onClick={submitFormData}>
            Login
          </button>
          <p>
            Don't have an Account? <NavLink to="/register">Sign Up</NavLink>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
