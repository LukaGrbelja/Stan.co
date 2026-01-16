import { useState } from "react";
import { Link } from "react-router";
import axios from "axios";

const ReservationCard = ({ reservation, currentUser }) => {
    const [roommates, setRoommates] = useState([]);
    const [showRoommates, setShowRoommates] = useState(false);

    const cancelReservation = async () => {
        await axios.patch(`/reservations/${reservation._id}/cancel`);
        alert("Rezervacija otkazana");
    };

    const leaveReservation = async () => {
        await axios.patch(`/reservations/${reservation._id}/leave`);
        alert("Napustili ste rezervaciju");
    };

    const loadRoommates = async () => {

        const targetId = reservation.type === "Header" ? reservation._id : reservation.threadId;

        axios.get(`http://localhost:4000/reserve/${targetId}/roommates`)
            .then(response => response.data)
            .then(data => setRoommates(data));
    };

    return (
        <div className="card mb-3 shadow-sm">
            <div className="card-body">

                <h5 className="card-title">Rezervacija</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                    Apartman ID: {reservation.apartmentId}
                </h6>

                <ul className="list-group list-group-flush mb-3">
                    <li className="list-group-item">
                        <strong>Početak:</strong> {new Date(reservation.startDate).toLocaleDateString()}
                    </li>
                    <li className="list-group-item">
                        <strong>Kraj:</strong> {new Date(reservation.endDate).toLocaleDateString()}
                    </li>
                    <li className="list-group-item">
                        <strong>Cijena:</strong> ${reservation.price}
                    </li>
                    <li className="list-group-item">
                        <strong>Status:</strong> {reservation.status}
                    </li>
                </ul>

                <div className="d-flex gap-2">

                    {
                        reservation.type === "Header" && reservation.roommateId === currentUser.userId ? (
                            <>
                                <button className="btn btn-danger btn-sm" onClick={cancelReservation}>
                                    Otkaži rezervaciju
                                </button>
                            </>
                        ) : (
                            currentUser.userType === "Cimer" &&
                            <button className="btn btn-outline-danger btn-sm" onClick={leaveReservation}>
                                Napusti rezervaciju
                            </button>
                        )
                    }

                    <button className="btn btn-secondary btn-sm" onClick={loadRoommates}>
                        {showRoommates ? "Sakrij cimere" : "Prikaži cimere"}
                    </button>

                </div>

                {Boolean(roommates.length) && (
                    <div className="mt-3">
                        <h6>Cimeri:</h6>
                        <ul className="list-group">
                            {roommates.map(roommate => (
                                <li key={roommate._id} onClick={() => console.log(roommate)} className="list-group-item">
                                    <Link className="btn btn-primary" to={"/"}>{roommate.userName}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ReservationCard;
