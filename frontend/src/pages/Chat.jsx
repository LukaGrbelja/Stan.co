import "../assets/styles/chat.css";
import { useEffect, useState } from "react";
import ChatHeader from "../components/elements/Chat/ChatHeader";

// Ovo će tribat uredit

function Chat() {
    const [activeChat, setActiveChat] = useState(null);
    useEffect(() => {

    }, [])
    return (
        <div className="container-fluid h-100 chat-page">
            <div className="row h-100">
                <div className="col-12 col-lg-4 border-end p-0" style={{ display: activeChat && window.innerWidth < 992 ? "none" : "block" }}>
                    <ChatList onSelect={setActiveChat} />
                </div> {/* Chat window */}
                <div className="col-12 col-lg-8 p-0" style={{ display: !activeChat && window.innerWidth < 992 ? "none" : "block" }}>
                    <ChatWindow chatId={activeChat} onBack={() => setActiveChat(null)} />
                </div>
            </div>
        </div>
    );
}

function ChatList({ onSelect }) {
    const users = [
        { id: 1, name: "Ana", lastMsg: "Vidimo se sutra!" },
        { id: 2, name: "Marko", lastMsg: "Može!" },
        { id: 3, name: "Petra", lastMsg: "Hvala ti!" }
    ];

    return (
        <div className="list-group list-group-flush">
            {users.map(u => (
                <button
                    key={u.id}
                    className="list-group-item list-group-item-action"
                    onClick={() => onSelect(u.id)}
                >
                    <div className="fw-bold">{u.name}</div>
                    <small className="text-muted">{u.lastMsg}</small>
                </button>
            ))}
        </div>
    );
}

function ChatWindow({ chatId, onBack }) {
    if (!chatId) {
        return (
            <div className="d-flex justify-content-center align-items-center h-100 text-muted">
                Odaberite razgovor
            </div>
        );
    }

    return (
        <div className="d-flex flex-column h-100">

            <ChatHeader chatId={chatId} onBack={onBack} />

            {/* Messages */}
            <div className="flex-grow-1 overflow-auto p-3 bg-light">
                <div className="d-flex mb-2">
                    <div className="p-2 bg-white rounded shadow-sm">
                        Hej! Kako si?
                    </div>
                </div>

                <div className="d-flex justify-content-end mb-2">
                    <div className="p-2 bg-success text-white rounded shadow-sm">
                        Super, radim na projektu!
                    </div>
                </div>
            </div>

            {/* Input */}
            <div className="p-3 border-top bg-white">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Napiši poruku..." />
                    <button className="btn btn-primary">Pošalji</button>
                </div>
            </div>

        </div>
    );
}



export default Chat;