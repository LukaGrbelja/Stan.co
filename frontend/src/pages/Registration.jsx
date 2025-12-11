import Form from "../components/elements/Form/Form";
import Input from "../components/elements/Form/Input";
import Select from "../components/elements/Form/Select";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function Registration() {

    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        userName: "",
        email: "",
        password: "",
        passwordAgain: "",
        userType: "Cimer"

    });

    const [formResponse, setFormResponse] = useState("");
    const [passwordResponse, setPasswordResponse] = useState({
        lowerCaseLetter: false,
        upperCaseLetter: false,
        number: false,
        length: 0
    });

    useEffect(() => {
        const password = formData.password || "";

        setPasswordResponse({
            lowerCaseLetter: /[a-z]/.test(password),
            upperCaseLetter: /[A-Z]/.test(password),
            number: /[0-9]/.test(password),
            length: password.length,
        });
    }, [formData.password]);


    const navigate = useNavigate();

    const handleSubmit = () => {//validiraj email
        if (Object.keys(formData).some(key => !formData[key]?.trim())) {
            setFormResponse("Molimo unesite sve podatke");
        }
        else if (
            !Object.entries(passwordResponse).every(([key, value]) => {
                if (key === "length") return value >= 8;
                return value;
            })
        ) {
            setFormResponse("Pravila lozinke");
        }
        else if (formData.password != formData.passwordAgain) {
            setFormResponse("Lozinke se ne podudaraju");
        }
        else {
            setFormResponse("");
            axios.post("http://localhost:4000/auth/signup", formData)
                .then(response => response.data)
                .then(data => {
                    console.log(data);
                    navigate("/UI");
                })
                .catch(error => {
                    console.error(error.response.data.message, error);
                    setFormResponse("Prijava neuspjesna");
                });
        }
    }

    return (
        <Form handleSubmit={handleSubmit}>
            <Input data={{
                name: "name",
                label: "Ime",
                type: "text",
                placeholder: "Unesite Ime",
                saveValue: (inputValue) => {
                    setFormData({ ...formData, name: inputValue });
                }
            }} />
            <Input data={{
                name: "surname",
                label: "Prezime",
                type: "text",
                placeholder: "Unesite prezime",
                saveValue: (inputValue) => {
                    setFormData({ ...formData, surname: inputValue });
                }
            }} />
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
                name: "email",
                label: "Email",
                type: "email",
                placeholder: "Unesite email",
                saveValue: (inputValue) => {
                    setFormData({ ...formData, email: inputValue });
                }
            }} />
            <Input data={{
                name: "password",
                label: "Lozinka",
                type: "password",
                placeholder: "Unesite lozinku",
                minlength: 8,
                saveValue: (inputValue) => {
                    setFormData({ ...formData, password: inputValue });
                }
            }} />
            <Input data={{
                name: "passwordAgain",
                label: "Lozinka ponovo",
                type: "password",
                placeholder: "Unesite lozinku",
                saveValue: (inputValue) => {
                    setFormData({ ...formData, passwordAgain: inputValue });
                }
            }} />
            <Select data={{
                name: "useValue",
                label: "Odaberi način rada",
                handleChange: (selectValue) => {
                    setFormData({ ...formData, userType: selectValue });
                },
                options: ["Cimer", "Iznajmljivac"]
            }} />
            <button type="submit" className="btn btn-primary w-100">Prijavi se</button>
            <span>
                Lozinka bi trebala sadržavati
                <span className={passwordResponse.lowerCaseLetter ? "success" : "fail"}> malo slovo,</span>
                <span className={passwordResponse.upperCaseLetter ? "success" : "fail"}> veliko slovo,</span>
                <span className={passwordResponse.number ? "success" : "fail"}> broj </span> i
                <span className={passwordResponse.length >= 8 ? "success" : "fail"}> minimalno 8 znakova.</span>
            </span>
            {formResponse}
        </Form>
    )
}

export default Registration;