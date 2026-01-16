import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import axios from "axios";
import ChatHeader from "./ChatHeader";
import Form from "../../elements/Form/Form";

function ChatWindow({ chat, onBack }) {

    const [messages, setMessages] = useState([]);
    const [activeMessage, setActiveMessage] = useState("");
    const { user } = useContext(UserContext);
    const [reservation, setReservation] = useState({
        apartmentId: '',
        startDate: '',
        endDate: '',
        number: 1
    });
    const [selectOptions, setSelectOptions] = useState([]);

    useEffect(() => {
        if (chat) {
            axios({
                method: "GET",
                url: "http://localhost:4000/comms/getMessages/",
                params: { _id: chat.id }
            })
                .then(response => response.data)
                .then(data => setMessages(data));
        }
    }, [chat]);

    const handleSubmit = () => {
        axios.post("http://localhost:4000/comms/newMessage/", {
            type: "message",
            sender: user.userId,
            chatId: chat.id,
            data: activeMessage
        })
            .then(response => response.data)
            .then(data => setMessages([...messages, data]))
            .catch(error => console.log(error));
        setActiveMessage("");
    }

    const setOptions = () => {
        axios({
            method: "GET",
            url: "http://localhost:4000/apt/list/",
            params: { userName: user.userName }
        })
            .then(response => response.data)
            .then(data => setSelectOptions(data))
            .catch(error => console.error(error));
    }

    const handleReservation = () => {
        if (!reservation.apartmentId || !reservation.startDate || !reservation.endDate || !reservation.number) {
            return;
        }
        if (new Date(reservation.endDate) <= new Date(reservation.startDate)) {
            alert("Datum završetka mora biti kasniji od datuma početka.");
            return;
        }
        if (reservation.number <= 0) {
            alert("Broj mora biti veći od 0.");
            return;
        }

        axios.post("http://localhost:4000/comms/newMessage/", {
            type: "reservation",
            sender: user.userId,
            chatId: chat.id,
            data: reservation
        })
            .then(response => response.data)
            .then(data => setMessages([...messages, data]))
            .catch(error => console.log(error));
    }

    const reactToReservation = (messageId, newStatus) => {
        axios.put("http://localhost:4000/comms/changeReservationStatus/",
            { messageId, newStatus }
        )
            .then(() => {
                
                const updatedMessages = messages.map(message => {
                    if (message._id === messageId && message.type === "Reservation") {
                        return { ...message, additionalData: { ...message.additionalData, status: newStatus } };
                    }
                    return message;
                });
                setMessages(updatedMessages);
                
                const data = messages.filter(message => message.type === "Reservation").reverse()[0];
                
                if (newStatus === "approved") {
                    axios.post("http://localhost:4000/reserve/newReservation/", {
                        type: "Header",
                        apartmentId: data.additionalData.apartmentId,
                        roomateId: user.userId,
                        startDate: data.additionalData.startDate,
                        endDate: data.additionalData.endDate,
                        price: data.additionalData.number
                    })
                        .catch(error => console.log(error));
                }
            })
            .catch(error => console.log(error));
    }

    if (!chat) {
        return (
            <div className="d-flex justify-content-center align-items-center h-100 text-muted">
                Odaberite razgovor
            </div>
        );
    }

    return (
        <div className="d-flex flex-column h-100">

            <ChatHeader chat={chat} onBack={onBack} />

            <div className="flex-grow-1 overflow-auto p-3 bg-light">
                {messages.map(message => {
                    return message.type === "Message" ?
                        <div key={message._id} className={`d-flex ${message.sender === user.userId ? "justify-content-end" : false}`}>
                            <div className="d-flex">
                                {message.message}
                            </div>
                        </div>
                        : message.type === "Reservation" ?
                            <div key={message._id} className={`d-flex ${message.sender === user.userId ? "justify-content-end" : false}`}>
                                <div className="card mb-2">
                                    <div className="card-body">
                                        <h5 className="card-title">Rezervacija</h5>
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">Apartman ID: {message.additionalData.apartmentId}</li>
                                        <li className="list-group-item">Datum početka: {message.additionalData.startDate}</li>
                                        <li className="list-group-item">Datum završetka: {message.additionalData.endDate}</li>
                                        <li className="list-group-item">Cijena: ${message.additionalData.number}.00</li>
                                    </ul>
                                    <div className="card-body">
                                        {message.sender === user.userId || message.additionalData.status !== "pending" ? (
                                            <p className="card-text">Status: {message.additionalData.status}</p>
                                        ) : (
                                            <div>
                                                <button className="btn btn-success me-2" onClick={() => reactToReservation(message._id, "approved")}>Prihvati</button>
                                                <button className="btn btn-danger" onClick={() => reactToReservation(message._id, "rejected")}>Odbij</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            : null
                }
                )}
            </div>

            <Form handleSubmit={handleSubmit} classStr="p-3 border-top bg-white">
                <div className="input-group">
                    {
                        user.userType === "Iznajmljivač" ?
                            <button className="btn btn-outline-secondary" type="button" id="button-addon1" data-bs-toggle="modal" data-bs-target="#reservationModal" onClick={setOptions}>+</button>
                            : null
                    }
                    <input
                        type="text" className="form-control" placeholder="Napiši poruku..."
                        onChange={(e) => setActiveMessage(e.currentTarget.value)}
                        value={activeMessage}
                    />
                    <button className="btn btn-primary">Pošalji</button>
                </div>
            </Form>



            <div className="modal fade" id="reservationModal" tabIndex="-1" aria-labelledby="reservationModal" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="reservationModalLabel">Rezervacija</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Zatvori"></button>
                        </div>

                        <div className="modal-body">
                            <label htmlFor="apartmentId" className="form-label">Odaberi apartman za rezervaciju</label>
                            <select name="apartmentId" id="apartmentId" className="form-select form-select-lg mb-3" aria-label="Large select example" onChange={(e) => setReservation({ ...reservation, apartmentId: e.target.value })}>
                                {selectOptions.map(option => (
                                    <option key={option._id} value={option._id}>{option.address}</option>
                                ))}
                            </select>
                            <label htmlFor="startDate" className="form-label">Datum početka</label>
                            <input
                                type="date"
                                className="form-control"
                                id="startDate"
                                min={new Date().toISOString().split('T')[0]}
                                value={reservation.startDate}
                                onChange={(e) => setReservation({ ...reservation, startDate: e.target.value })}
                            />
                            <label htmlFor="endDate" className="form-label">Datum završetka</label>
                            <input
                                type="date"
                                className="form-control"
                                id="endDate"
                                min={reservation.startDate}
                                value={reservation.endDate}
                                onChange={(e) => setReservation({ ...reservation, endDate: e.target.value })}
                            />
                            <label htmlFor="number" className="form-label">Cijena</label>
                            <div className="input-group">
                                <span className="input-group-text">$</span>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="number"
                                    min="1"
                                    value={reservation.number}
                                    onChange={(e) => setReservation({ ...reservation, number: parseInt(e.target.value) || 1 })}
                                />
                                <span className="input-group-text">.00</span>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Odustani
                            </button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleReservation}>
                                Rezerviraj
                            </button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}



export default ChatWindow;