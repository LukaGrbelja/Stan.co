import { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {

    // jwt token???

    const [user, setUser] = useState({
        userName: "",
        userType: ""
    });

    const logIn = ({ userData }) => {
        const { userName, userType } = userData;
        setUser({
            userName: userName,
            userType: userType
        })
    }

    return (
        <UserContext.Provider value={{ user, logIn }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;