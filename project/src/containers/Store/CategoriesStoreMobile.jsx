import React, { useState } from 'react'
import LoadingCategoriesStores from '../../components/store/LoadingCategoriesStores'
import { Link } from 'react-router-dom'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';



function CategoriesStoreMobile({ categories, loading_categories, storeSlug }) {

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
            <h2>Categorias disponibles</h2>
            <ul role="list" className="space-y-4 text-sm font-medium text-gray-200">
                {loading_categories ? (
                    <LoadingCategoriesStores />
                ) : categories && categories.length > 0 ? (
                    categories.map(category => (
                        <div key={category.id} className="mt-4 space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-200">
                            <h3
                                className="flex w-full items-center justify-between py-3 text-md text-gray-200 hover:text-gray-400 cursor-pointer"
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
                                <ul className="space-y-2">
                                    {category.sub_categories.map(subCategory => (
                                        <li key={subCategory.id} className="mb-2">
                                            <Link
                                                to={`/products_by_category/${storeSlug}/${subCategory.slug}`}
                                                className="block rounded-md py-2 px-9 bg-stone-900 text-center text-gray-200 pt-4"
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