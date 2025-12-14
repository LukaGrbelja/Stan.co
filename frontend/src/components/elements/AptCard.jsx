import imgPlaceholder from "../../assets/pictures/aptPlaceholderImg.webp";
import { Link } from "react-router";

function AptCard({ aptData }) {

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

    return (
        <div className="card mb-3">
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
                            </small>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AptCard;