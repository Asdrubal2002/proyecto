import React, { useEffect, useState } from 'react'
import { connect } from "react-redux"
import { CheckCircleIcon, ChevronRightIcon, ClipboardDocumentCheckIcon, CurrencyDollarIcon, EnvelopeIcon, FlagIcon, PhotoIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline'

function CategoriesAdminProducts({
    categories,
    userStore
}) {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    const [expandedCategories, setExpandedCategories] = useState([]);

    const toggleCategory = categoryId => {
        if (expandedCategories.includes(categoryId)) {
            setExpandedCategories(expandedCategories.filter(id => id !== categoryId));
        } else {
            setExpandedCategories([...expandedCategories, categoryId]);
        }
    };

    return (
        <div className="flex flex-wrap gap-4 mt-2">
            {categories && categories.map(category => (
                <div key={category.id} className="max-w-sm rounded-lg shadow-md overflow-hidden ">
                    <div
                        className="flex items-center justify-between px-4 py-3 bg-gray-800 text-white cursor-pointer"
                        onClick={() => toggleCategory(category.id)}
                    >
                        <span className="text-sm font-medium">{category.name}</span>
                        <button
                            onClick={() => toggleCategory(category.id)}
                            className="focus:outline-none"
                        >
                            {expandedCategories.includes(category.id) ? (
                                <MinusIcon className="h-4 w-4 text-gray-300" />
                            ) : (
                                <PlusIcon className="h-4 w-4 text-gray-300" />
                            )}
                        </button>
                    </div>
                    {expandedCategories.includes(category.id) && (
                        <div className="px-4 py-2">
                            <div className="grid grid-cols-2 gap-2">
                                {category.sub_categories.map(subCategory => (
                                    <Link
                                        key={subCategory.id}
                                        to={`/products_by_category/${userStore.slug}/${subCategory.slug}`}
                                        className="py-2 px-3 bg-gray-900 text-white rounded-md hover:bg-gray-700 text-sm"
                                    >
                                        {subCategory.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {

})(CategoriesAdminProducts)
