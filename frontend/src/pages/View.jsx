import ToggleSwitch from "../components/elements/Form/ToggleSwitch";
import AptCard from "../components/elements/AptCard";
import Form from "../components/elements/Form/Form";
import Select from "../components/elements/Form/Select";
import Range from "../components/elements/Form/Range";
import { useState, useEffect } from "react";
import axios from "axios";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

function View() {
    const [aptList, setAptList] = useState([]);
    const [viewType, setViewType] = useState("list");
    const [formData, setFormData] = useState({
        options: {
            options: [],
            rangeMax: 0,
            rangeMaxTwo: 0
        },
        data: {
            hood: "",
            livingArea: 0,
            numOfRooms: 0
        }
    });

    useEffect(() => {
        axios.get("http://localhost:4000/apt/list/")
            .then(response => response.data)
            .then(data => {

                setAptList(data);

                let hoods = ["All"];
                data.forEach(apt => {
                    hoods.push(apt.hood);
                });

                setFormData({
                    data: {
                        hood: "",
                        livingArea: Math.max(...data.map(apt => apt.livingArea)),
                        numOfRooms: Math.max(...data.map(apt => apt.numOfRooms))
                    },
                    options: {
                        options: hoods,
                        rangeMax: Math.max(...data.map(apt => apt.livingArea)),
                        rangeMaxTwo: Math.max(...data.map(apt => apt.numOfRooms))
                    }
                });

            })
            .catch(error => console.error(error));
    }, []);

    const handleChange = () => {
        if (viewType == "list") {
            setViewType("map");
        }
        else if (viewType == "map") {
            setViewType("list");
        }
    }

    const handleSubmit = () => {
        axios({
            method: "GET",
            url: "http://localhost:4000/apt/list/",
            params: formData.data
        })
            .then(response => response.data)
            .then(data => setAptList(data))
            .catch(error => console.error(error));
    }

    return (
        <>
            <div className="card mb-3 p-3">
                <div className="row g-0">
                    <Form handleSubmit={handleSubmit}>
                        <Select data={{
                            name: "useValue",
                            label: "Odaberi način rada",
                            handleChange: (selectValue) => {
                                setFormData({ ...formData, data: { ...formData.data, hood: selectValue } });
                            },
                            options: formData.options.options
                        }} />
                        <Range data={{
                            name: "squareSurface",
                            label: "Kvadratura",
                            max: formData.options.rangeMax,
                            currentValue: formData.data.livingArea,
                            saveValue: (rangeValue) => {
                                setFormData({ ...formData, data: { ...formData.data, livingArea: Number(rangeValue) } });
                            }
                        }} />
                        <Range data={{
                            name: "numOfRooms",
                            label: "Broj soba",
                            max: formData.options.rangeMaxTwo,
                            currentValue: formData.data.numOfRooms,
                            saveValue: (rangeValue) => {
                                setFormData({ ...formData, data: { ...formData.data, numOfRooms: Number(rangeValue) } });
                            }
                        }} />
                        <button type="submit" className="btn btn-primary w-100">Prijavi se</button>
                    </Form>
                </div>
            </div>
            <ToggleSwitch data={{ label1: "Lista", label2: "Karta", saveValue: handleChange }} />
            {
                viewType === "list" ?
                    aptList.map(apt => <AptCard key={apt._id} aptData={apt} />)
                    :
                    <MapContainer center={[43.5089, 16.4392]} zoom={13} style={{ height: "500px", width: "100%" }}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {aptList.map(apt =>
                            <Marker key={apt._id} position={apt.locationCode}>
                                <Popup>{apt.address}</Popup>
                            </Marker>
                        )}
                    </MapContainer>
            }
        </>
    )
}

export default View;