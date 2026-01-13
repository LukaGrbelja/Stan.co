import person from "../assets/pictures/person.png";
import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router";
import Form from "../components/elements/Form/Form";
import TextArea from "../components/elements/Form/TextArea";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

function UserView() {

    const { id } = useParams();
    const [userData, setuserData] = useState({
        age: '',
        gender: '',
        livingAdress: '',
        tenantChars: '',
        userType: '',
        profilePicture: "",
    });

    const [communication, setCommunication] = useState({
        status: "none",
        message: ""
    });

    const [report, setReport] = useState({
        reason: "",
        description: "",
        status: "pending"
    });

    const reportReasons = [
        { value: "spam", label: "Spam ili neželjene poruke" },
        { value: "harassment", label: "Uznemiravanje ili uvredljivo ponašanje" },
        { value: "inappropriate", label: "Neprimjeren sadržaj" },
        { value: "fake", label: "Lažni profil ili lažne informacije" },
        { value: "other", label: "Nešto drugo" }
    ];

    const { user } = useContext(UserContext);

    useEffect(() => {
        axios({
            method: "GET",
            url: "http://localhost:4000/auth/data/",
            params: { id: id }
        })
            .then(response => response.data)
            .then(data => setuserData(data))
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        if (user.userId !== "") {
            axios({
                method: "GET",
                url: "http://localhost:4000/comms/check/",
                params: {
                    sender: user.userId,
                    receiver: id
                }
            })
                .then(response => response.data)
                .then(data => {
                    if (data !== "No communication header found") {
                        setCommunication({
                            ...communication,
                            status: communication.status === "blocked" ? "blocked" : "established"
                        });
                    }
                })
                .catch(error => console.log(error));
        }
    }, [communication.status, user]);

    const handleSubmit = () => {
        axios.post("http://localhost:4000/comms/newMessage/", {
            type: "first",
            sender: user.userId,
            receiver: id,
            data: communication.message
        })
            .then(response => response.data)
            .then(() => {
                setCommunication({
                    ...communication,
                    status: "established"
                });
            })
            .catch(error => console.log(error));
    }

    const handleBlock = () => {
        axios.put("http://localhost:4000/comms/changeHeader/", {
            sender: user.userId,
            receiver: id,
            data: communication.status === "blocked" ? "true" : "blocked"
        })
            .then(response => response.data)
            .then(() => {
                setCommunication({
                    ...communication,
                    status: communication.status === "blocked" ? "true" : "blocked"
                });
            })
            .catch(error => console.log(error));
    }

    const handleReport = () => {
        axios.post("http://localhost:4000/report/createReport", {
            reporter: user.userId,
            reportedUser: id,
            reason: report.reason,
            description: report.description
        })
            .then(response => response.status)
            .then(status => {
                if (status === 201) {
                    console.log("Report submitted successfully.");
                    setReport({
                        reason: "",
                        description: "",
                        status: "success"
                    });
                }
                else {
                    console.log("Report submission failed.");
                    setReport({
                        reason: "",
                        description: "",
                        status: "failed"
                    });
                }

            })
            .catch(error => console.log(error));
    }

    return (
        <>
            <img src={userData.profilePicture || person} className="p-5 rounded-circle" style={{ width: "100%", borderRadius: "12px" }} alt="Ikona" />
            <div className="mb-3">
                <label htmlFor="dob" className="form-label">Dob</label>
                <input type="number" name="dob" id="dob" className="form-control" value={userData.age} disabled />
            </div>
            <div className="mb-3">
                <label htmlFor="spol" className="form-label">Spol</label>
                <input type="text" name="spol" id="spol" className="form-control" value={userData.gender} disabled />
            </div>
            {
                userData.userType === "cimer" ?
                    <>
                        <div className="form-floating mb-3">
                            <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2Disabled" value={userData.interests} disabled />
                            <label htmlFor="floatingTextarea2Disabled">Zanimanja i hobiji</label>
                        </div>
                        <div className="form-floating mb-3">
                            <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2Disabled2" value={userData.shortBio} disabled />
                            <label htmlFor="floatingTextarea2Disabled2">Kratka biografija</label>
                        </div>
                    </>
                    :
                    <>
                        <div className="mb-3">
                            <label htmlFor="ms" className="form-label">Mjesto stanovanja</label>
                            <input type="text" name="ms" id="ms" className="form-control" value={userData.livingAdress} disabled />
                        </div>
                        <div className="form-floating mb-3">
                            <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2Disabled" value={userData.tenantChars} disabled />
                            <label htmlFor="floatingTextarea2Disabled">Opis traženih karakteristika stanara</label>
                        </div>
                    </>
            }
            <div className="d-flex gap-2 my-3">
                <button className="btn btn-danger flex-fill" onClick={handleBlock}>
                    {communication.status === "blocked" ? "Odblokiraj korisnika" : "Blokiraj korisnika"}
                </button>
                <button className="btn btn-outline-danger flex-fill" data-bs-toggle="modal" data-bs-target="#reportModal">
                    Prijavi kršenje smjernica
                </button>
            </div>
            <div className="modal fade" id="reportModal" tabIndex="-1" aria-labelledby="reportModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="reportModalLabel">Prijavi kršenje smjernica</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Zatvori"></button>
                        </div>

                        <div className="modal-body">

                            <p className="text-muted mb-3">
                                Odaberite razlog prijave. Vaša prijava ostaje anonimna.
                            </p>

                            <div className="list-group mb-3">

                                {
                                    reportReasons.map((reason) => (
                                        <label className="list-group-item" key={reason.value}>
                                            <input
                                                className="form-check-input me-2" type="radio" name="reportReason" value={reason.value}
                                                onClick={(e) => setReport({ ...report, reason: e.target.value })} />
                                            {reason.label}
                                        </label>
                                    ))
                                }


                            </div>

                            <div className="form-floating">
                                <textarea
                                    className="form-control"
                                    placeholder="Opišite problem"
                                    id="reportDescription"
                                    style={{ height: "120px" }}
                                    onChange={(e) => setReport({ ...report, description: e.target.value })}
                                ></textarea>
                                <label htmlFor="reportDescription">Dodatni opis (opcionalno)</label>
                            </div>

                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Odustani
                            </button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#responseModal" onClick={handleReport}>
                                Pošalji prijavu
                            </button>
                        </div>

                    </div>
                </div>
            </div>
            <div className="modal fade" id="responseModal" tabIndex="-1" aria-labelledby="responseModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="reportModalLabel">Status prijave</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Zatvori"></button>
                        </div>

                        <div className="modal-body">
                            {report.status === "pending" &&
                                <p>Slanje prijave...</p>
                            }
                            {
                                report.status === "success" &&
                                <div className="alert alert-success" role="alert">
                                    Vaša prijava je uspješno poslana. Hvala vam što pomažete u održavanju naše zajednice sigurnom i ugodnom za sve korisnike.
                                </div>
                            }
                            {
                                report.status === "failed" &&
                                <div className="alert alert-danger" role="alert">
                                    Došlo je do pogreške prilikom slanja vaše prijave. Molimo pokušajte ponovno kasnije.
                                </div>
                            }
                        </div>

                    </div>
                </div>
            </div>

            {
                communication.status === "blocked" ? <></> :
                    <>
                        {
                            communication.status === "none" ?
                                <Form handleSubmit={handleSubmit}>
                                    <TextArea data={{
                                        name: "commStart",
                                        label: "Započnite komunikaciju",
                                        saveValue: (inputValue) => setCommunication({
                                            ...communication,
                                            message: inputValue
                                        })
                                    }} />
                                    <button type="submit" className="btn btn-primary w-100">Start</button>
                                </Form>
                                :
                                <Link to="/" className="btn btn-primary mt-2">
                                    Idi na chat
                                </Link>
                        }
                    </>
            }
        </>
    );
}

export default UserView;