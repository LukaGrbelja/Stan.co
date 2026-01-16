import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {

    const [user, setUser] = useState({
        userName: "",
        userType: "",
        userId: "",
        profilePicture: ""
    });

    const logIn = ({ userData }) => {

        const { userName, userType, userId, profilePicture, token } = userData;
        localStorage.setItem("token", token);

        setUser({
            userName: userName,
            userType: userType,
            userId: userId,
            profilePicture: profilePicture
        });
    }

    const logOut = () => {
        setUser({
            userName: "",
            userType: "",
            userId: "",
            profilePicture: ""
        });
        localStorage.removeItem("token");
    }

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            return;;
        }
        axios({
            method: "GET",
            url: "http://localhost:4000/auth/decode/",
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
            .then(response => response.data)
            .then(data => setUser(data))
            .catch(error => console.log(error))
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, logIn, logOut }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;