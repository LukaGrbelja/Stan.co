import person from "../assets/pictures/person.png";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router";

function Profile() {
    const { user, logOut } = useContext(UserContext);
    const nav = useNavigate();

    return (
        <div className="center">
            <img src={person} style={{ width: "25%" }} alt="Ikona" />
            <hr />
            <h2>{user.userName}</h2>
            <button className="btn btn-primary mt-2"
                onClick={() => {
                    logOut();
                    nav("/");
                }}>Odjavi se</button>
        </div>
    )
}

export default Profile;