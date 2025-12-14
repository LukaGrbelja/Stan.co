import Form from "../components/elements/Form/Form";
import Input from "../components/elements/Form/Input";
import Select from "../components/elements/Form/Select";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const validateFileAsPhoto = (file) => {
    const isFilePhoto = [
        "image/apng",
        "image/bmp",
        "image/gif",
        "image/jpeg",
        "image/pjpeg",
        "image/png",
        "image/svg+xml",
        "image/tiff",
        "image/webp",
        "image/x-icon",
    ].includes(file.type);
}

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

    const [profilePictureFile, setPfp] = useState({});

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
        if (!profilePictureFile.name || Object.keys(formData).some(key => !formData[key]?.trim())) {
            setFormResponse("Molimo unesite sve podatke");
        }
        else if (![
            "image/apng",
            "image/bmp",
            "image/gif",
            "image/jpeg",
            "image/jpg",
            "image/pjpeg",
            "image/png",
            "image/svg+xml",
            "image/tiff",
            "image/webp",
            "image/x-icon",
        ].includes(profilePictureFile.type)) {
            setFormResponse("Datoteka triba biti slika.");
        }
        else if (profilePictureFile.size > 5 * 1024 * 1024) {
            setFormResponse("Slika ne smije biti veća od 5MB.");
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
            setFormResponse("GG");
            const params = new FormData();
            params.append("image", profilePictureFile);
            params.append("userData", JSON.stringify(formData));
            axios.post("http://localhost:4000/auth/signup", params)
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
            <div className="mb-3">
                <label htmlFor="formFile" className="form-label">Default file input example</label>
                <input
                    className="form-control" type="file" id="formFile" accept="image/*"
                    onChange={(e) => {
                        setPfp(e.target.files[0] || {});
                        validateFileAsPhoto(e.target.files[0]);

                    }}
                />
            </div>
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