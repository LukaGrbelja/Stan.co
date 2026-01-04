function ChatHeader({ chatId, onBack }) {
    return (
        <div className="d-flex align-items-center p-3 border-bottom bg-white">
            <button className="btn btn-link d-lg-none" onClick={onBack}>
                ←
            </button>

            <img
                src="https://via.placeholder.com/40"
                className="rounded-circle me-2"
                alt="avatar"
            />

            <div>
                <div className="fw-bold">Korisnik {chatId}</div>
                <small className="text-success">Online</small>
            </div>
        </div>
    );
}

export default ChatHeader;