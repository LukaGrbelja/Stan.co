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

    const logOut = () => {
        setUser({
            userName: "",
            userType: ""
        });
    }

    return (
        <UserContext.Provider value={{ user, logIn, logOut }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;