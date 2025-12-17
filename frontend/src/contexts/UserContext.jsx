import { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {

    // jwt token???

    const [user, setUser] = useState({
        userName: "",
        userType: "",
        profilePicture: ""
    });

    const logIn = ({ userData }) => {
        const { userName, userType, profilePicture } = userData;
        setUser({
            userName: userName,
            userType: userType,
            profilePicture: profilePicture
        })
    }

    const logOut = () => {
        setUser({
            userName: "",
            userType: "",
            profilePicture: ""
        });
    }

    return (
        <UserContext.Provider value={{ user, logIn, logOut }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;