import NavItem from "./Navitem.jsx";

import home from "../../assets/pictures/home.png";
import search from "../../assets/pictures/search.png";
import add from "../../assets/pictures/add.png";
import chat from "../../assets/pictures/chat.png";
import person from "../../assets/pictures/person.png";

function Navbar() {

    const properties = [
        {
            value: home,
            to: ""
        },
        {
            value: search,
            to: "view"
        },
        {
            value: add,
            to: "hub"
        },
        {
            value: chat,
            to: "chat"
        },
        {
            value: person,
            to: "profile"
        },
    ];

    return (
        <nav className="navbar fixed-bottom bg-body-secondary">
            <ul className="nav nav-pills nav-fill w-100 nav-justified">
                {properties.map(element => 
                    <NavItem key={element.value} value={element.value} path={element.to} />
                )}
            </ul>
            {/* <small><a href="https://www.flaticon.com/free-icons/ui" title="ui icons">Ui icons created by Rifaldi Ridha Aisy - Flaticon</a></small> */}
        </nav>
    );
}

export default Navbar;