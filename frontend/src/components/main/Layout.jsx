import { Outlet } from "react-router";
import Navbar from "../elements/Navbar";

function Layout() {
    return (
        <>
            <Outlet />
            <div className="clear"></div>
            <Navbar />
        </>
    );
}

export default Layout;