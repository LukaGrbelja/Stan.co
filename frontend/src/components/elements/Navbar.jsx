import NavItem from "./Navitem.jsx";

function Navbar() {

    const properties = [
        {
            value: "home",
            to: ""
        },
        {
            value: "view",
            to: "view"
        },
        {
            value: "hub",
            to: "hub"
        },
        {
            value: "chat",
            to: "chat"
        },
        {
            value: "profile",
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
        </nav>
    );
}

export default Navbar;