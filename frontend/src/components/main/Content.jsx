import { Outlet } from "react-router";

function Content() {
    return (
        <div className="container"
            style={{ maxWidth: "none" }}
        >
            <div className="row p-2">
                <div className="col-xl-1" />
                <div className="col-xl-10 bg-dark-subtle round p-5">
                    <Outlet />
                </div>
                <div className="col-xl-1" />
            </div>
        </div>
    )
}

export default Content;