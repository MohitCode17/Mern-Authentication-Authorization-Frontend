import { useContext, useState } from "react";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { LoginContext } from "./ContextProvider/Context";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./css/header.css";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {

  const navigate = useNavigate();

  // Context Consume
  const { loginData, setLoginData } = useContext(LoginContext);

  // For Header Menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Call User Logout API
  const logoutUser = async () => {
    const token = localStorage.getItem("userAuthToken");

    const res = await fetch("http://localhost:3001/api/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();

    if(data.status === 200) {
      console.log("User Logout");
      localStorage.removeItem("userAuthToken");
      setLoginData(false);
      navigate("/");
    }else{
      toast.error("Something went wrong");
    }
  };

  const goDashboard = () => {
    navigate("/dash");
  };

  const goError = () => {
    navigate("*");
  };

  return (
    <>
      <header>
        <nav>
          <NavLink
            to="/"
            style={{ color: "#eee", textDecoration: "none", fontSize: "22px" }}
          >
            Authentication
          </NavLink>
          <div className="avatar">
            {loginData.validUser ? (
              <Avatar style={{backgroundColor: "lightsalmon", border: "2px solid #fff"}} onClick={handleClick}>
                {loginData.validUser.name[0].toUpperCase()}
              </Avatar>
            ) : (
              <Avatar style={{backgroundColor: "lightsalmon", border: "2px solid #fff"}} onClick={handleClick} />
            )}
          </div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {loginData.validUser ? (
              <div>
                <MenuItem
                  onClick={() => {
                    goDashboard();
                    handleClose();
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    logoutUser();
                    handleClose();
                  }}
                >
                  Logout
                </MenuItem>
              </div>
            ) : (
              <MenuItem
                onClick={() => {
                  goError();
                  handleClose();
                }}
              >
                Profile
              </MenuItem>
            )}
          </Menu>
        </nav>
      </header>
    </>
  );
};

export default Header;
