import React, { useState } from 'react'
import LoadingCategoriesStores from '../../components/store/LoadingCategoriesStores'
import { Link } from 'react-router-dom'
import { MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import ListCategoryProducts from '../../components/store/ListCategoryProducts';



function CategoriesStoreMobile({ categories, loading_categories, storeSlug, closeCategories }) {

    
    return (
        <div className="lg:block">
           <ListCategoryProducts  categories={categories} loading_categories={loading_categories} storeSlug={storeSlug} closeCategories={closeCategories}/>
        </div>
    )
}

export default CategoriesStoreMobile