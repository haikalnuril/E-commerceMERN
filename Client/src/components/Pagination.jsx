import React from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const Pagination = () => {
    const { pagination } = useLoaderData();
    const { totalPage, page } = pagination;
    const navigation = useNavigate();
    const {search, pathname} = useLocation();

    const handlePageChange = (number)=> {
        const searchParams = new URLSearchParams(search);
        searchParams.set("page", number);
        navigation(`${pathname}?${searchParams.toString()}`);
    }

    const pages = Array.from({ length: totalPage }, (_, i) => i + 1);
    return (
        <>
            <div className="join">
                {pages.map((pageNumber) => {
                    return (
                        <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                            className={`btn btn-xs border-none join-item ${
                                pageNumber === page ? "bg-primary" : ""
                            }`}
                        >
                            {pageNumber}
                        </button>
                    );
                })}
            </div>
        </>
    );
};

export default Pagination;
