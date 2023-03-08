import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";
import "./css/mix.css";
import "react-toastify/dist/ReactToastify.css";


const Register = () => {

  const navigate = useNavigate();

  // 👇 Show and Hide Functionality
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  // 👇 Handle Form Data of Login Form
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: ""
  });

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setRegisterData((preData) => ({ ...preData, [name]: value }));
  };

  const submitRegisterData = async (e) => {
    e.preventDefault();

    // FORM VALIDATION
    const { name, email, password, cpassword } = registerData;

    if(name === ""){
      toast.warning("Name field are required");
    }else if(email === ""){
      toast.error("Email field are required");
    }else if(!email.includes("@")){
      toast.error("Email is not valid");
    }else if(password === ""){
      toast.warning("Password is required");
    }else if(password.length < 6){
      toast.warning("Password length are more than 6 character");
    }else if(cpassword === ""){
      toast.warning("Confirm Password is required");
    }else if(cpassword.length < 6){
      toast.warning("Password length are more than 6 character");
    }else if(password !== cpassword){
      toast.error("Invalid Details");
    }else{
      // CALL REGISTER API
      const res = await fetch("http://localhost:3001/api/register", {
        method: 'POST',
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          name, email, password, cpassword
        })
      })

      const data = await res.json();
      
      if(data.status === 201){
        toast.success("User Registered Successfully");
        navigate("/");
      }else{
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <section>
      <div className="form_data">
        <div className="form_heading">
          <h1>Register Form</h1>
        </div>
        <form>
          <div className="form_input">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              onChange={handleInputChange}
              value={registerData.name}
            />
          </div>
          <div className="form_input">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email address"
              onChange={handleInputChange}
              value={registerData.email}
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
                onChange={handleInputChange}
                value={registerData.password}
              />
              <div
                className="showpass"
                onClick={() => setShowPassword(!showPassword)}
              >
                {!showPassword ? <Visibility /> : <VisibilityOff />}
              </div>
            </div>
          </div>
          <div className="form_input">
            <label htmlFor="cpassword">Confirm password</label>
            <div className="two">
              <input
                type={!showCPassword ? "password" : "text"}
                name="cpassword"
                id="cpassword"
                placeholder="Confirm your password"
                onChange={handleInputChange}
                value={registerData.cpassword}
              />
              <div
                className="showpass"
                onClick={() => setShowCPassword(!showCPassword)}
              >
                {!showCPassword ? <Visibility /> : <VisibilityOff />}
              </div>
            </div>
          </div>
          <button className="btn" onClick={submitRegisterData} >Register</button>
          <p>
            Already have an Account? <NavLink to="/">Sign In</NavLink>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
