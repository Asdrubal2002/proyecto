import React, { useState } from 'react'
import LoadingCategoriesStores from '../../components/store/LoadingCategoriesStores'
import { Link } from 'react-router-dom'
import { MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';



function CategoriesStoreMobile({ categories, loading_categories, storeSlug, closeCategories }) {

    const [expandedCategories, setExpandedCategories] = useState([]);

    const toggleCategory = categoryId => {
        if (expandedCategories.includes(categoryId)) {
            setExpandedCategories(expandedCategories.filter(id => id !== categoryId));
        } else {
            setExpandedCategories([...expandedCategories, categoryId]);
        }
    };

    return (
        <div className="lg:block">
            <button
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                onClick={closeCategories}
            >
                <XMarkIcon className="h-8 w-8" aria-hidden="true" />
            </button>

            <ul role="list" className="space-y-4 text-sm font-medium text-gray-200">
                {loading_categories ? (
                    <LoadingCategoriesStores />
                ) : categories && categories.length > 0 ? (
                    categories.map(category => (
                        <div key={category.id} className="mt-4 space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-200">
                            <h3
                                className="flex w-full items-center justify-between py-3 text-md text-gray-200 hover:text-gray-400 cursor-pointer rounded-t-xl pl-4 text-base"
                                onClick={() => toggleCategory(category.id)}
                            >
                                <span>{category.name}</span>
                                {expandedCategories.includes(category.id) ? (
                                    <MinusIcon className="h-6 w-6 text-gray-500" />
                                ) : (
                                    <PlusIcon className="h-6 w-6 text-gray-500" />
                                )}
                            </h3>

                            {expandedCategories.includes(category.id) && (
                                <ul className="bg-stone-600 p-2 rounded-b-xl">
                                    {category.sub_categories.map(subCategory => (
                                        <li key={subCategory.id} className="mb-2">
                                            <Link
                                                to={`/products_by_category/${storeSlug}/${subCategory.slug}`}
                                                className="block rounded-md py-2 px-9 bg-gray-200 text-center text-gray-900 text-base"
                                                onClick={closeCategories} // Llama a closeCategories() al hacer clic en la subcategoría
                                            >
                                                {subCategory.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))
                ) : (
                    <li className="rounded-md py-2 px-9 bg-stone-900 text-center text-gray-200">No hay categorías disponibles</li>
                )}
            </ul>

        </div>
    )
}

export default CategoriesStoreMobile