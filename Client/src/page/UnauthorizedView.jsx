import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

const UnauthorizedView = () => {
    return (
        <div className="flex flex-col gap-4 items-center justify-center h-[60vh]">
            <h1 className="text-2xl font-bold text-center">401 Unauthorized</h1>
            <p className="text-center">
                You are not authorized to access this page
            </p>
            <Link to="/" className="btn btn-primary">
                <FaArrowLeft /> Back to Homepage
            </Link>
        </div>
    );
};

export default UnauthorizedView;
