import React, { useState } from 'react'
import LoadingCategoriesStores from '../../components/store/LoadingCategoriesStores'
import { Link } from 'react-router-dom'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';


function ListCategoryProducts({ categories, loading_categories, storeSlug,closeCategories }) {

    const [expandedCategories, setExpandedCategories] = useState([]);

    const toggleCategory = categoryId => {
        if (expandedCategories.includes(categoryId)) {
            setExpandedCategories(expandedCategories.filter(id => id !== categoryId));
        } else {
            setExpandedCategories([...expandedCategories, categoryId]);
        }
    };

    return (
        
            <ul role="list" className="space-y-4 text-sm font-estilo_letra text-gray-100">
                {loading_categories ? (
                    <LoadingCategoriesStores />
                ) : categories && categories.length > 0 ? (
                    categories.map(category => (
                        <div key={category.id} className="space-y-2 border-b border-gray-600">
                            <h3
                                className="flex w-full items-center justify-between py-3 text-md text-gray-100 cursor-pointer hover:bg-gray-700 transition-all duration-300 ease-in-out rounded-t-md pl-4 shadow-sm"
                                onClick={() => toggleCategory(category.id)}
                            >
                                <span>{category.name}</span>
                                {expandedCategories.includes(category.id) ? (
                                    <MinusIcon className="h-6 w-6 text-gray-400" />
                                ) : (
                                    <PlusIcon className="h-6 w-6 text-gray-400" />
                                )}
                            </h3>

                            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${expandedCategories.includes(category.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <ul className="bg-stone-900 p-4 rounded-b-md shadow-inner">
                                    {category.sub_categories.map(subCategory => (
                                        <li key={subCategory.id} className="mb-2">
                                            <Link
                                                to={`/products_by_category/${storeSlug}/${subCategory.slug}`}
                                                className="block rounded-md py-2 px-4 bg-gray-600 text-center text-gray-200 hover:bg-gray-500 transition-all duration-300 ease-in-out"
                                                onClick={closeCategories} // Llama a closeCategories() al hacer clic en la subcategoría

                                            >
                                                {subCategory.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))
                ) : (
                    <li className="rounded-md py-2 px-6 bg-gray-700 text-center text-gray-200">No hay categorías disponibles</li>
                )}
            </ul>
    )
}

export default ListCategoryProducts