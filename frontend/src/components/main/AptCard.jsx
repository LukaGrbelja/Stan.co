import imgPlaceholder from "../../assets/pictures/aptPlaceholderImg.webp";
import { Link } from "react-router";

import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import axios from "axios";

function AptCard({ aptData, children }) {

    let {
        _id,
        address,
        hood,
        livingArea,
        numOfBeds,
        numOfRooms,
        pictures,
        description
    } = aptData;

    const { user, setUser } = useContext(UserContext);

    const onDelete = () => {
        axios({
            method: "DELETE",
            url: `http://localhost:4000/apt/${_id}`
        })
        .then(response => response.data)
        .then(data => {
            console.log(data);
            setUser(user);
        })
    }

    return (
        <div className="card mb-3 position-relative">
            {
                user.userType === "Administrator" &&
                <button className="btn btn-link p-0 m-0 position-absolute top-0 end-0 me-2 mt-2" onClick={onDelete} >
                    <i className="bi bi-trash-fill text-danger fs-4"></i>
                </button>
            }
            <div className="row g-0">
                <div className="col-md-4">
                    <img
                        src={pictures[0] || imgPlaceholder}
                        className="img-fluid rounded-start"
                        alt={address}
                    />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{address}</h5>
                        <p className="card-text">
                            Kvart: {hood} <br />
                            Površina: {livingArea} m² <br />
                            Broj soba: {numOfRooms} <br />
                            Broj kreveta: {numOfBeds}
                        </p>
                        <p className="card-text">
                            <small className="text-body-secondary">
                                <Link to={"/UI/apartmentView/" + _id} className="btn btn-primary mt-2">
                                    Detalji
                                </Link>
                                {children}
                            </small>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AptCard;