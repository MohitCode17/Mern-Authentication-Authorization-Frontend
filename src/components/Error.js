import React from 'react'
import { NavLink } from 'react-router-dom';

const Error = () => {
  const errorImg = "https://st.depositphotos.com/22302086/57457/v/600/depositphotos_574577042-stock-illustration-page-found-error-404-system.jpg";
  return (
    <div className="container">
      <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", marginTop: "50px"}}>
        <img src={errorImg} alt="Error 404" />
        <NavLink to="/" style={{color: "#fff", backgroundColor: "#00adb5", textDecoration: "none", padding: "15px", marginTop: "15px"}} >Back To Home</NavLink>
      </div>
    </div>
  )
}

export default Error;