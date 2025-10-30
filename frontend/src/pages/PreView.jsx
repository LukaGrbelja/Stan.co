import Form from "../components/elements/Form/Form";
import Input from "../components/elements/Form/Input";
import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { useEffect } from "react";

function PreView() {

    const [formData, setFormData] = useState({
        userName: "",
        password: ""
    });

    const [formResponse, setFormResponse] = useState("");
    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (formData.userName == "" || formData.password == "") {
            setFormResponse("Molimo unesite sve podatke");
        }
        else {
            axios.post("http://localhost:4000/auth/login", formData)
                .then(response => response.data)
                .then(data => {
                    userContext.logIn({ userData: data });
                })
                .catch(error => {
                    console.error(error.response.data.message, error);
                    setFormResponse("Prijava neuspjesna");
                });
        }
    }

    useEffect(() => {
        userContext.user.userName !== "" ? navigate("/UI") : false;
    }, [userContext]);

    return (
        <div className="row">
            <div className="col-lg-6 col-12 p-3">
                <Form handleSubmit={handleSubmit}>
                    <Input data={{
                        name: "username",
                        label: "Korisničko ime",
                        type: "text",
                        placeholder: "Unesite korisničko ime",
                        saveValue: (inputValue) => {
                            setFormData({ ...formData, userName: inputValue });
                        }
                    }} />
                    <Input data={{
                        name: "password",
                        label: "Lozinka",
                        type: "password",
                        placeholder: "Unesite lozinku",
                        saveValue: (inputValue) => {
                            setFormData({ ...formData, password: inputValue });
                        }
                    }} />
                    <button type="submit" className="btn btn-primary w-100">Prijavi se</button>
                    {formResponse}
                </Form>
            </div>
            {window.innerWidth < 992 ? <hr /> : false}
            <div className="col-lg-6 col-12 p-3 text-center mt-5">
                <h4>Nemate korisnički račun?</h4>
                <Link to="registration" className="btn btn-primary mt-2">
                    Stvori račun
                </Link>
            </div>
        </div>
    )
}

export default PreView;