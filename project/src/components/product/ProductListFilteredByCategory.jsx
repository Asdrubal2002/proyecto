import React, { useState } from 'react'
import ProductCard from './ProductCard'
import PaginationProducts from '../pagination/PaginationProducts'

function ProductListFilteredByCategory({ products, get_products_filtered_category_page, storeSlug, categorySlug, name, minPrice, maxPrice, count }) {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 24; // o cualquier otro número que prefieras

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo(0, 0);
        get_products_filtered_category_page(storeSlug, categorySlug, name, minPrice, maxPrice, newPage);
    };

    return (
        <div className="mx-auto max-w-2xl lg:max-w-7xl lg:px-8 py-4">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 gap-2">
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

export default ProductListFilteredByCategory
