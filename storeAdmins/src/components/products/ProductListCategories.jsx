import React, { useState } from 'react'
import ProductCard from './ProductCard'
import PaginationProducts from '../pagination/PaginationProducts'

function ProductListCategories({ products, get_products_list_page, storeSlug,categorySlug, count }) {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 24; // o cualquier otro número que prefieras

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo(0, 670);
        get_products_list_page(storeSlug, categorySlug, newPage);
    };

    return (
        <div className="mx-auto max-w-2xl lg:max-w-7xl lg:px-8 py-4">
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {products && products.map((product, index) => (
                    <ProductCard data={product} key={index} index={index} />
                ))}
            </div>
            <PaginationProducts 
                currentPage={currentPage}
                totalCount={count}
                pageSize={pageSize}
                onPageChange={handlePageChange}
            />
        </div>
    )
}

export default ProductListCategories