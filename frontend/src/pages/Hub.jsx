import { Link } from "react-router";
import AptCard from "../components/elements/AptCard";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";

// koristi memo za spremanje liste stanova...

function Hub() {
    const [aptList, setAptList] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user.userType == "Iznajmljivac") {
            axios({
                method: "GET",
                url: "http://localhost:4000/apt/list/",
                params: { userName: user.userName }
            })
                .then(response => response.data)
                .then(data => setAptList(data))
                .catch(error => console.error(error));
        }
    }, []);

    return (
        <>
            {user.userType !== "Cimer" ?
                <>
                    <h1>Sucelje za iznajmljivaca</h1>
                    <h2>Moji stanovi</h2>
                    {
                        aptList.length !== 0 ?
                            aptList.map(apt => <AptCard key={apt._id} aptData={apt} />)
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
                </>
            }
        </>
    )
}

export default Hub;