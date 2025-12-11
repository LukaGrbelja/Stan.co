import { useNavigate } from "react-router";
import { useEffect } from "react";

function RedirectComponent() {
    const nav = useNavigate();
    useEffect(() => {
        console.log("Redirected");
        nav("/PI");/// Provjeri jwt i preusmjeri na PI ili UI rutu ovisno o tome jeli korisnik prijavljen
    });
    return (<></>)
}

export default RedirectComponent;