import person from "../assets/pictures/person.png";
import { UserContext } from "../contexts/UserContext";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import Form from "../components/elements/Form/Form";
import axios from "axios";

function Profile() {

    const [formData, setFormData] = useState({
        age: 0,
        gender: "",
        interests: "",
        shortBio: "",
        livingAdress: "",
        tenantChars: ""
    });

    const { user, logOut } = useContext(UserContext);
    const nav = useNavigate();

    useEffect(() => {
        axios({
            method: "GET",
            url: "http://localhost:4000/auth/data/",
            params: { userName: user.userName }
        })
            .then(response => response.data)
            .then(data => setFormData(data))
            .catch(error => console.log(error))
    }, [user]);

    const handleSubmit = () => {
        axios.patch("http://localhost:4000/auth/update/", {
            userName: user.userName,
            data: formData
        })
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }

    return (
        <>
            <div className="row">
                <div className="col-md-4">
                    <img src={user.profilePicture || person} style={{ width: "100%", borderRadius: "12px" }} alt="Ikona" />
                </div>
                <div className="col-md-8">
                    <Form handleSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="dob" className="form-label">Dob</label>
                            <input type="number" name="dob" id="dob" className="form-control" value={formData.age}
                                onChange={(e) => {
                                    setFormData({ ...formData, age: e.target.value });
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="spol" className="form-label">Spol</label>
                            <input type="text" name="spol" id="spol" className="form-control" value={formData.gender}
                                onChange={(e) => {
                                    setFormData({ ...formData, gender: e.target.value });
                                }}
                            />
                        </div>
                        {
                            user.userType === "cimer" ?
                                <>
                                    <div className="form-floating mb-3">
                                        <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2Disabled"  value={formData.interests}
                                            onChange={(e) => {
                                                setFormData({ ...formData, interests: e.target.value });
                                            }}
                                        />
                                        <label htmlFor="floatingTextarea2Disabled">Zanimanja i hobiji</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2Disabled2"  value={formData.shortBio}
                                            onChange={(e) => {
                                                setFormData({ ...formData, shortBio: e.target.value });
                                            }}
                                        />
                                        <label htmlFor="floatingTextarea2Disabled2">Kratka biografija</label>
                                    </div>
                                </>
                                :
                                <>
                                    <div className="mb-3">
                                        <label htmlFor="ms" className="form-label">Mjesto stanovanja</label>
                                        <input type="text" name="ms" id="ms" className="form-control"  value={formData.livingAdress}
                                            onChange={(e) => {
                                                setFormData({ ...formData, livingAdress: e.target.value });
                                            }}
                                        />
                                    </div>
                                    <div className="form-floating mb-3">
                                        <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2Disabled"  value={formData.tenantChars}
                                            onChange={(e) => {
                                                setFormData({ ...formData, tenantChars: e.target.value });
                                            }}
                                        />
                                        <label htmlFor="floatingTextarea2Disabled">Opis traženih karakteristika stanara</label>
                                    </div>
                                </>
                        }
                        <button type="submit" className="btn btn-primary w-100">Dodaj podatke</button>
                    </Form>
                </div>
            </div>
            <hr />
            <h2>{user.userName}</h2>
            <div className="center">
                <button className="btn btn-primary mt-2"
                    onClick={() => {
                        logOut();
                        nav("/");
                    }}>Odjavi se</button>
            </div>
        </>
    )
}

export default Profile;