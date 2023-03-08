import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./ContextProvider/Context";

const style = {
    display : "flex",
    flexDirection : "column",
    alignItems : "center",
    justifyContent : "center",
    marginTop: "5rem",
}

const Dashboard = () => {

    // Context Consume in Dashboard
    const { loginData, setLoginData } = useContext(LoginContext);

    const navigate = useNavigate();

    const dashboardValid = async () => {
        let token = localStorage.getItem("userAuthToken");

        const res = await fetch("http://localhost:3001/api/validUser", {
            method: "GET",
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : token
            }
        });

        const data = await res.json();
        
        if(data.status === 401 || !data){
            navigate("*");
        }else{
            setLoginData(data);
            navigate("/dash");
        }
    }

    useEffect(() => {
        dashboardValid();
    }, []);

    return(
        <div style={style} >
            <h1 style={{fontSize: "4rem"}}>Welcome { loginData ? loginData.validUser.name : "User" }</h1>
            <h3>Email: { loginData ? loginData.validUser.email : "" }</h3>
        </div>
    )
}

export default Dashboard;