import { Outlet } from "react-router";

function Content() {
    return (
        <div className="container">
            <div className="row p-2">
                <div className="col-md-1" />
                <div className="col-md-10 bg-dark-subtle round p-5">
                    <Outlet />
                </div>
                <div className="col-md-1" />
            </div>
        </div>
    )
}

export default Content;