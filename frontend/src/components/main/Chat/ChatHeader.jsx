import personPlaceholder from "../../../assets/pictures/person.png";
import { Link } from "react-router";

function ChatHeader({ chat, onBack }) {
    return (
        <div className="d-flex align-items-center p-3 border-bottom bg-white">
            <button className="btn btn-link d-lg-none" onClick={onBack}>
                ←
            </button>
            <img
                src={chat.profilePicture || personPlaceholder}
                className="rounded-circle me-2"
                alt="avatar"
            />
            <div className="fw-bold">Korisnik {chat.userName}</div>
        </div>
    );
}

export default ChatHeader;