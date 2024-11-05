import React from "react";
import { NavLink } from "react-router-dom";

const links = [
    { id:1, url: "about", text: "About" },
    { id:2, url: "products", text: "Products" },
    { id:3, url: "orders", text: "Orders" },
]

const NavList = () => {
    return (
        <>
            {links.map((link) => {
                const { id, url, text } = link;
                return(
                    <li key={id}>
                        <NavLink className="capitalize" to={url}>
                            {text}
                        </NavLink>
                    </li>
                )
            })}
        </>
    )
};

export default NavList;
