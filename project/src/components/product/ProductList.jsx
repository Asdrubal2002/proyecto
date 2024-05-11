import React, { useState } from 'react'
import ProductCard from './ProductCard'
import PaginationProducts from '../pagination/PaginationProducts'

function ProductList({ products, get_products_list_page, storeSlug, count }) {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 21; // o cualquier otro número que prefieras

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo(0, 550);
        get_products_list_page(storeSlug, newPage);
    };

    return (
        <div className="mx-auto max-w-2xl lg:max-w-7xl lg:px-8 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
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

export default ProductList