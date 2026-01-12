import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
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
            <div className="row mb-5">
                <div className="col-md-8">
                    <div id="carouselExample" className="carousel slide">
                        <div className="carousel-inner">
                            {
                                aptData.pictures ?
                                    <>
                                        <div key={aptData.pictures[0]} className="carousel-item active">
                                            <img
                                                src={aptData.pictures[0]}
                                                className="d-block w-100 rounded"
                                                alt={aptData.address}
                                            />
                                        </div>
                                        {
                                            aptData.pictures.slice(1).map(img =>
                                                <div key={img} className="carousel-item">
                                                    <img
                                                        src={img}
                                                        className="d-block w-100 rounded"
                                                        alt={aptData.address}
                                                    />
                                                </div>
                                            )
                                        }
                                    </>
                                    :
                                    <img
                                        src={imgPlaceholder}
                                        className="d-block w-100 rounded-start"
                                        alt={aptData.address}
                                    />
                            }
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div className="col-md-4" onClick={() => {
                    console.log(aptData);
                }}>
                    <div className="card-body">
                        <center>
                            <h5 className="card-title mb-3">{aptData.address}</h5>
                        </center >
                        <table className="table table-secondary">
                            <tbody>
                                <tr>
                                    <th>Kvart</th>
                                    <td>{aptData.hood}</td>
                                </tr>
                                <tr>
                                    <th>Površina</th>
                                    <td>{aptData.livingArea} m²</td>
                                </tr>
                                <tr>
                                    <th>Broj soba</th>
                                    <td>{aptData.numOfRooms}</td>
                                </tr>
                                <tr>
                                    <th>Broj kreveta</th>
                                    <td>{aptData.numOfBeds}</td>
                                </tr>
                            </tbody>
                        </table>
                        <h5 className="card-title mb-3">{aptData.address}</h5>
                    </div>
                </div >
            </div>
            <div className="mb-5 row">
                <div className="form-floating mb-3 col-12">
                    <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2Disabled" defaultValue={aptData.description} disabled></textarea>
                    <label className="ms-2" htmlFor="floatingTextarea2Disabled">Opis</label>
                </div>
                <div className="col-4">
                    <h5>Ocjena:</h5>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                </div>
                <div className="col-4">
                    <Link to={"/UI/userView/" + aptData.owner} className="btn btn-primary mt-2">
                        Profil stanodavca
                    </Link>
                </div>
                <div className="col-4">
                    <Link to="" className="btn btn-primary mt-2">
                        Pošalji rezervaciju
                    </Link>
                </div>
            </div>
        </>
    );
}

export default ApartmentView;