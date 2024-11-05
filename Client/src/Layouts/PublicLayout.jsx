import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const PublicLayout = () => {
    return (
        <>
        <Header/>
        <main className="mx-auto max-w-6xl px-8 py-20 min-h-80">
        <Outlet />
        </main>
        <footer>Footer</footer>
        </>
    )
};

export default PublicLayout;
