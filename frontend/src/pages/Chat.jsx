import "../assets/styles/chat.css";
import { useEffect, useState } from "react";
import ChatList from "../components/main/Chat/ChatList";
import ChatWindow from "../components/main/Chat/ChatWindow";

function Chat() {
    const [activeChat, setActiveChat] = useState(null);
    useEffect(() => {

    }, []);
    return (
        <div className="container-fluid h-100 chat-page">
            <div className="row h-100">
                <div className="col-12 col-lg-4 border-end p-0" style={{ display: activeChat && window.innerWidth < 992 ? "none" : "block" }}>
                    <ChatList onSelect={setActiveChat} />
                </div>
                <div className="col-12 col-lg-8 p-0" style={{ display: !activeChat && window.innerWidth < 992 ? "none" : "block" }}>
                    <ChatWindow chat={activeChat} onBack={() => setActiveChat(null)} />
                </div>
            </div>
        </div>
    );
}

export default Chat;