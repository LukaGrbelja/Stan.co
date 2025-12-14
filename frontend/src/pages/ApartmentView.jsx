import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import imgPlaceholder from "../assets/pictures/aptPlaceholderImg.webp";

function ApartmentView() {

    const { id } = useParams();
    const [aptData, setAptData] = useState({});

    useEffect(() => {
        axios({
            method: "GET",
            url: "http://localhost:4000/apt/list/",
            params: { _id: id }
        })
            .then(response => response.data)
            .then(data => setAptData(data[0]))
            .catch(error => console.error(error));
    }, []);
    return (
        <>
            <div className="col-12">
                <img
                    src={imgPlaceholder || aptData.pictures[0]}
                    className="img-fluid rounded-start"
                    alt={aptData.address}
                />
            </div>
            <div className="col-12 mt-5" onClick={()=>{console.log(aptData);
            }}>
                <div className="card-body">
                    <h5 className="card-title">{aptData.address}</h5>
                    <p className="card-text">
                        Kvart: {aptData.hood} <br />
                        Površina: {aptData.livingArea} m² <br />
                        Broj soba: {aptData.numOfRooms} <br />
                        Broj kreveta: {aptData.numOfBeds}
                    </p>
                </div>
            </div>
        </>)
}

export default ApartmentView;