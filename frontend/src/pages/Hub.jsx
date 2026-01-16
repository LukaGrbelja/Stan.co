import { Link } from "react-router";
import AptCard from "../components/main/AptCard";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import ReservationCard from "../components/main/ResCard";
import axios from "axios";

// koristi memo za spremanje liste stanova...

function Hub() {
    const [aptList, setAptList] = useState([]);
    const [reservations, setReservations] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user.userType == "Iznajmljivač") {
            axios({
                method: "GET",
                url: "http://localhost:4000/apt/list/",
                params: { userName: user.userName }
            })
                .then(response => response.data)
                .then(data => setAptList(data))
                .catch(error => console.error(error));
        }
        else if (user.userType == "Cimer") {
            axios({
                method: "GET",
                url: "http://localhost:4000/reserve/user/",
                params: { userId: user.userId, userType: user.userType }
            })
                .then(response => response.data)
                .then(data => setReservations(data))
                .catch(error => console.error(error));
        }
    }, [user]);

    const showReservations = (aptId) => {
        axios({
            method: "GET",
            url: "http://localhost:4000/reserve/user/",
            params: {
                userType: user.userType,
                apartmentId: aptId
            }
        })
            .then(response => response.data)
            .then(data => setReservations(data))
            .catch(error => console.error(error));
    }

    return (
        <>
            {user.userType !== "Cimer" ?
                <>
                    <h1>Sucelje za iznajmljivaca</h1>
                    <h2>Moji stanovi</h2>
                    {
                        aptList.length !== 0 ?
                            aptList.map(apt => <AptCard key={apt._id} aptData={apt} >
                                <button className="btn btn-primary mt-2 ms-2" type="button" data-bs-toggle="modal" data-bs-target="#reservationListModal" onClick={() => showReservations(apt._id)}>Rezervacije</button>
                            </AptCard>)
                            :
                            <li className="list-group-item bg-dark-subtle w-100 border border-primary-subtle round p-2">Trenutno nemate stanova</li>
                    }
                    <Link to="../appForm" className="btn btn-primary mt-2">
                        Dodaj novi stan
                    </Link>
                </>
                :
                <>
                    <h1>Sucelje za cimera</h1>
                    <h2>Moje rezervacije</h2>
                    {
                        reservations.length !== 0 ?
                            <ul className="list-group">
                                {reservations.map(res => (
                                    <li key={res._id} className="list-group-item">
                                        <p>Apartman ID: {res.apartmentId}</p>
                                        <p>Datum početka: {new Date(res.startDate).toLocaleDateString()}</p>
                                        <p>Datum završetka: {new Date(res.endDate).toLocaleDateString()}</p>
                                        <p>Cijena: ${res.price}</p>
                                        <p>Status: {res.status}</p>
                                    </li>
                                ))}
                            </ul>
                            :
                            <li className="list-group-item bg-dark-subtle w-100 border border-primary-subtle round p-2">Trenutno nemate rezervacija</li>
                    }
                </>
            }
            <div className="modal fade" id="reservationListModal" tabIndex="-1" aria-labelledby="reservationListModal" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="reservationModalLabel">Rezervacije</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Zatvori"></button>
                        </div>

                        <div className="modal-body">
                            {reservations.length > 0 ? (
                                reservations.map(res => (
                                    <ReservationCard key={res._id} reservation={res} currentUser={user} />
                                ))
                            ) : (<div className="alert alert-secondary"> Trenutno nemate rezervacija </div>)}
                        </div>

                        <div className="modal-footer">
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Hub;