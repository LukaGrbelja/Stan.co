import axios from "axios";
import Form from "../components/elements/Form/Form";
import Input from "../components/elements/Form/Input";
import TextArea from "../components/elements/Form/TextArea";
import { useState } from "react";
import { useNavigate } from "react-router";

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
                            axios.post("http://localhost:4000/apt/createApt", formData)
                                .then(response => response.data)
                                .then(_data => {
                                    console.log(_data);
                                    navigate("../hub");
                                })
                                .catch(error => {
                                    console.error(error.response.data.message, error);
                                    setFormResponse("Proces neuspjesan");
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
                    placeholder: "Unesite povrsinu stana",
                    saveValue: (inputValue) => {
                        setFormData({ ...formData, livingArea: Number(inputValue) });
                    }
                }} />
                <Input data={{
                    name: "numOfBeds",
                    label: "Broj lezaja",
                    type: "number",
                    placeholder: "Unesite broj lezaja",
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
                <TextArea data={{
                    name: "description",
                    label: "Opis",
                    saveValue: (inputValue) => {
                        setFormData({ ...formData, description: inputValue });
                    }

                }} />
                <button type="submit" className="btn btn-primary w-100">Prijavi se</button>
                {formResponse}
            </Form>
        </>
    );
}

export default AptForm;