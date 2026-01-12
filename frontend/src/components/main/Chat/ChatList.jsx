import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import personPlaceholder from "../../../assets/pictures/person.png";
import axios from "axios";

function ChatList({ onSelect }) {

    const { user } = useContext(UserContext);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        if (user.userId) {
            axios({
                method: "GET",
                url: "http://localhost:4000/comms/getHeaders/",
                params: { id: user.userId }
            })
                .then(response => response.data)
                .then(data => setChats(data))
                .catch(error => console.log(error));
        }
    }, [user]);

    return (
        <div className="list-group list-group-flush">
            {
                chats.length ?
                    chats.map(header => (
                        <button
                            key={header.id}
                            className="list-group-item list-group-item-action"
                            onClick={() => onSelect(header)}
                        >
                            <img
                                src={header.profilePicture || personPlaceholder}
                                className="rounded-circle me-2"
                                alt="avatar"
                            />
                            <div className="fw-bold">{header.userName}</div>
                        </button>
                    ))
                    :
                    <button key="nochats" className="list-group-item list-group-item-action">
                        <div className="fw-bold">Nema razgovora</div>
                    </button>
            }
        </div>
    );
}

export default ChatList;