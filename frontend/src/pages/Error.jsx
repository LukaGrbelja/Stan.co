import { Link } from "react-router";

function ErrorPage() {
    return (
        <>
            <h1>Error</h1>
            <Link to="/" className="btn btn-primary mt-2">
                Povratak na po;etnu
            </Link>
        </>
    )
}

export default ErrorPage