import { createContext, useState } from "react"

// Create Context
export const LoginContext = createContext("");

const Context = ({ children }) => {
    const [loginData, setLoginData] = useState("");
    return(
        <>
            {/* Context Provide */}
            <LoginContext.Provider value={{loginData, setLoginData}} >
                {children}
            </LoginContext.Provider>
        </>
    )
}

export default Context;