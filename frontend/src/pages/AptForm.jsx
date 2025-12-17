import axios from "axios";
import Form from "../components/elements/Form/Form";
import Input from "../components/elements/Form/Input";
import TextArea from "../components/elements/Form/TextArea";
import { useState } from "react";
import { useNavigate } from "react-router";

const validateFileAsPhoto = (file) => {
    return [
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

function AptForm() {

    const [formData, setFormData] = useState({
        address: "",
        hood: "",
        livingArea: 0,
        numOfBeds: 0,
        numOfRooms: 0,
        description: "",
        locationCode: []
    });

    const [formResponse, setFormResponse] = useState("");
    const [apartmentPictures, setAp] = useState([]);

    const navigate = useNavigate();

    const handleSubmit = () => {
        if (Object.keys(formData).toSpliced(
            Object.keys(formData).indexOf("description"), 1
        ).some(key => {
            try {
                return !Boolean(formData[key]?.trim());
            } catch (error) {
                return !Boolean(formData[key]);
            }
        })) {
            setFormResponse("Molimo unesite sve podatke");
        }
        else if (![...apartmentPictures].length) {
            setFormResponse("Molimo unesite sve slike");
        }
        else if (![...apartmentPictures].reduce((accumulator, currentValue) => accumulator && validateFileAsPhoto(currentValue), true)) {
            setFormResponse("Priložene datoteke nisu u obliku slike");
        }
        else {
            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${formData.address}`)
                .then(res => res.json())
                .then(data => {
                    switch (data.length) {
                        case 0:
                            setFormResponse("Ne postojeća adresa!");
                            break;
                        default:
                            setFormData({ ...formData, locationCode: [data[0].lat, data[0].lon] });
                            const params = new FormData();
                            [...apartmentPictures].forEach(picture => params.append("images", picture));
                            params.append("userData", JSON.stringify(formData));
                            axios.post("http://localhost:4000/apt/createApt", params)
                                .then(response => response.data)
                                .then(_data => {
                                    console.log(_data);
                                    navigate("/hub");
                                })
                                .catch(error => {
                                    console.error(error.response.data.message, error);
                                    //setFormResponse("Proces neuspjesan");
                                });
                            break;
                    }
                });
        }
    }

    return (
        <>
            <Form handleSubmit={handleSubmit}>
                <Input data={{
                    name: "address",
                    label: "Adresa",
                    type: "text",
                    placeholder: "Unesite adresu stana",
                    saveValue: (inputValue) => {
                        setFormData({ ...formData, address: inputValue });
                    }
                }} />
                <Input data={{// moze bit i select
                    name: "hood",
                    label: "Kvart",
                    type: "text",
                    placeholder: "Unesite kvart",
                    saveValue: (inputValue) => {
                        setFormData({ ...formData, hood: inputValue });
                    }
                }} />
                {/**grad???? */}
                <Input data={{
                    name: "livingArea",
                    label: "Kvadratura (m^2)",
                    type: "number",
                    placeholder: "Unesite površinu stana",
                    saveValue: (inputValue) => {
                        setFormData({ ...formData, livingArea: Number(inputValue) });
                    }
                }} />
                <Input data={{
                    name: "numOfBeds",
                    label: "Broj lezaja",
                    type: "number",
                    placeholder: "Unesite broj ležaja",
                    saveValue: (inputValue) => {
                        setFormData({ ...formData, numOfBeds: Number(inputValue) });
                    }
                }} />
                <Input data={{
                    name: "numOfRooms",
                    label: "Broj soba",
                    type: "number",
                    placeholder: "Unesite broj soba",
                    saveValue: (inputValue) => {
                        setFormData({ ...formData, numOfRooms: Number(inputValue) });
                    }
                }} />
                <div className="mb-3">
                    <label htmlFor="formFileMultiple" className="form-label">Multiple files input example</label>
                    <input
                        className="form-control" type="file" id="formFileMultiple" accept="image/*" multiple required
                        onChange={(e) => {
                            setAp(e.target.files);
                        }}
                    />
                </div>
                <TextArea data={{
                    name: "description",
                    label: "Opis",
                    saveValue: (inputValue) => {
                        setFormData({ ...formData, description: inputValue });
                    }

                }} />
                <button type="submit" className="btn btn-primary w-100">Dodaj stan</button>
                {formResponse}
            </Form>
        </>
    );
}

export default AptForm;