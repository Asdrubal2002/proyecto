import React, { useState } from 'react'
import ProductCard from './ProductCard'
import PaginationProducts from '../pagination/PaginationProducts'

function ProductListOrder({ products, get_products_order_list_page, storeSlug, count, orderBy }) {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 24; // o cualquier otro número que prefieras

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo(0, 520);
        get_products_order_list_page(storeSlug, orderBy, newPage);
    };

    return (
        <div className="mx-auto max-w-2xl lg:max-w-7xl lg:px-8 py-2">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                {products && products.map((product, index) => (
                    <ProductCard data={product} key={index} index={index} storeSlug={storeSlug}/>
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

export default ProductListOrder