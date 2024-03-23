// Pagination.js
import React from 'react';

const PaginationProducts = ({ currentPage, totalCount, pageSize, onPageChange }) => {
    const totalPages = Math.ceil(totalCount / pageSize);

    return (
        <nav className="flex justify-center items-center pt-6">
        <div className="flex -mt-px">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(number => (
                <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    aria-current={currentPage === number ? 'page' : undefined}
                    className={`mx-1 border-gray-700 text-gray-700 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium ${currentPage === number ? 'font-bold' : ''}`}
                >
                    {number}
                </button>
            ))}
        </div>
    </nav>
    


    );
};

export default PaginationProducts;
