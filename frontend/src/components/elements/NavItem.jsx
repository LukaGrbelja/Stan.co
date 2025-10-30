import { Link } from "react-router";

function NavItem({ value, path }) {
    return (
        <li className="nav-item">
            <Link to={path} className="nav-link" aria-current="page">
                {value}
            </Link>
        </li>
    );
}

export default NavItem;