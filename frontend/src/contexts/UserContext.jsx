import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {

    const [user, setUser] = useState({
        userName: "",
        userType: "",
        profilePicture: ""
    });

    const logIn = ({ userData }) => {

        const { userName, userType, profilePicture, token } = userData;
        localStorage.setItem("token", token);

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
            profilePicture: "",
            token: ""
        });
    }

    useEffect(() => {
        axios({
            method: "GET",
            url: "http://localhost:4000/auth/decode/",
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
            .then(response => response.data)
            .then(data => setUser(data))
            .catch(error => console.log(error))
    });

    return (
        <UserContext.Provider value={{ user, logIn, logOut }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;