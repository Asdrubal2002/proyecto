// import React, { useState } from 'react';
// import ProductCard from './ProductCard';
// import PaginationProducts from '../pagination/PaginationProducts';

// function ProductListByCategory({ products, get_products_list_page, categorySlug, storeSlug, count }) {
//     const [currentPage, setCurrentPage] = useState(1);
//     const [searchTerm, setSearchTerm] = useState('');
//     const pageSize = 21; // o cualquier otro número que prefieras

//     const handlePageChange = (newPage) => {
//         setCurrentPage(newPage);
//         window.scrollTo(0, 510);
//         get_products_list_page(storeSlug, categorySlug, newPage);
//     };

//     const filteredProducts = products.filter(product =>
//         product.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     const handleSearchChange = (event) => {
//         setSearchTerm(event.target.value);
//     };

//     return (
//         <div className="mx-auto max-w-2xl lg:max-w-7xl lg:px-8 py-4">
//             <div>
//                 <input
//                     type="text"
//                     placeholder="Buscar producto por nombre..."
//                     className="block w-full bg-gray-200 outline-none rounded-md p-2 bg-stone-800 text-sm"
//                     value={searchTerm}
//                     onChange={handleSearchChange}
//                 />
//             </div>
//             {filteredProducts.length === 0 && (
//                 <p className="text-gray-400 mt-4">No se encontraron productos que coincidan con la búsqueda.</p>
//             )}
//             {filteredProducts.length > 0 && (
//                 <div className="mt-6 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 ">
//                     {filteredProducts.map((product, index) => (
//                         <ProductCard data={product} key={index} index={index} />
//                     ))}
//                 </div>
//             )}
//             <PaginationProducts
//                 currentPage={currentPage}
//                 totalCount={count}
//                 pageSize={pageSize}
//                 onPageChange={handlePageChange}
//             />
//         </div>
//     );
// }

// export default ProductListByCategory;


import React, { useState } from 'react'
import ProductCard from './ProductCard'
import PaginationProducts from '../pagination/PaginationProducts'

function ProductListByCategory({ products, get_products_list_page,categorySlug, storeSlug, count }) {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 21; // o cualquier otro número que prefieras

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo(0, 600);
        get_products_list_page(storeSlug,categorySlug, newPage);
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

export default ProductListByCategory
