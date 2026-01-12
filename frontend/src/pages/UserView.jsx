import person from "../assets/pictures/person.png";
import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router";
import Form from "../components/elements/Form/Form";
import TextArea from "../components/elements/Form/TextArea";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

function UserView() {

    const { id } = useParams();
    const [userData, setuserData] = useState({
        age: '',
        gender: '',
        livingAdress: '',
        tenantChars: '',
        userType: '',
        profilePicture: "",
    });

    const [communication, setCommunication] = useState({
        status: true,
        message: ""
    });

    const { user } = useContext(UserContext);

    useEffect(() => {
        axios({
            method: "GET",
            url: "http://localhost:4000/auth/data/",
            params: { id: id }
        })
            .then(response => response.data)
            .then(data => setuserData(data))
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        if (user.userId !== "") {
            axios({
                method: "GET",
                url: "http://localhost:4000/comms/check/",
                params: {
                    sender: user.userId,
                    receiver: id
                }
            })
                .then(response => response.data)
                .then(data => {
                    console.log(data);
                    if (data !== "No communication header found") {
                        setCommunication({
                            ...communication,
                            status: false
                        });
                    }
                })
                .catch(error => console.log(error));
        }
    }, [communication.status, user]);

    const handleSubmit = () => {
        axios.post("http://localhost:4000/comms/newMessage/", {
            type: "first",
            sender: user.userId,
            receiver: id,
            data: communication.message
        })
            .then(response => response.data)
            .then(data => {
                setCommunication({
                    ...communication,
                    status: false
                });
            })
            .catch(error => console.log(error));
    }

    return (
        <>
            <img src={userData.profilePicture || person} className="p-5 rounded-circle" style={{ width: "100%", borderRadius: "12px" }} alt="Ikona" />
            <div className="mb-3">
                <label htmlFor="dob" className="form-label">Dob</label>
                <input type="number" name="dob" id="dob" className="form-control" value={userData.age} disabled />
            </div>
            <div className="mb-3">
                <label htmlFor="spol" className="form-label">Spol</label>
                <input type="text" name="spol" id="spol" className="form-control" value={userData.gender} disabled />
            </div>
            {
                userData.userType === "cimer" ?
                    <>
                        <div className="form-floating mb-3">
                            <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2Disabled" value={userData.interests} disabled />
                            <label htmlFor="floatingTextarea2Disabled">Zanimanja i hobiji</label>
                        </div>
                        <div className="form-floating mb-3">
                            <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2Disabled2" value={userData.shortBio} disabled />
                            <label htmlFor="floatingTextarea2Disabled2">Kratka biografija</label>
                        </div>
                    </>
                    :
                    <>
                        <div className="mb-3">
                            <label htmlFor="ms" className="form-label">Mjesto stanovanja</label>
                            <input type="text" name="ms" id="ms" className="form-control" value={userData.livingAdress} disabled />
                        </div>
                        <div className="form-floating mb-3">
                            <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2Disabled" value={userData.tenantChars} disabled />
                            <label htmlFor="floatingTextarea2Disabled">Opis traženih karakteristika stanara</label>
                        </div>
                    </>
            }
            {
                communication.status === true ?
                    <Form handleSubmit={handleSubmit}>
                        <TextArea data={{
                            name: "commStart",
                            label: "Započnite komunikaciju",
                            saveValue: (inputValue) => setCommunication({
                                ...communication,
                                message: inputValue
                            })
                        }} />
                        <button type="submit" className="btn btn-primary w-100">Start</button>
                    </Form>
                    :
                    <Link to="/" className="btn btn-primary mt-2">
                        Idi na chat
                    </Link>
            }

        </>
    );
}

export default UserView;