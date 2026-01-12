import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import axios from "axios";
import ChatHeader from "./ChatHeader";
import Form from "../../elements/Form/Form";

function ChatWindow({ chat, onBack }) {

    const [messages, setMessages] = useState([]);
    const [activeMessage, setActiveMessage] = useState("");
    const { user } = useContext(UserContext);

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
                {messages.map(message =>
                    <div key={message._id} className={`d-flex ${message.sender === user.userId ? "justify-content-end" : false}`}>
                        <div className={`d-flex ${message.sender === user.userId ? "bg-success text-white" : "bg-white"}`}>
                            {message.message}
                        </div>
                    </div>
                )}
            </div>

            <Form handleSubmit={handleSubmit} classStr="p-3 border-top bg-white">
                <div className="input-group">
                    <input
                        type="text" className="form-control" placeholder="Napiši poruku..."
                        onChange={(e) => setActiveMessage(e.currentTarget.value)}
                        value={activeMessage}
                    />
                    <button className="btn btn-primary">Pošalji</button>
                </div>
            </Form>

        </div>
    );
}



export default ChatWindow;