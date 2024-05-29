import React, { useState } from 'react'
import LoadingCategoriesStores from '../../components/store/LoadingCategoriesStores'
import { Link } from 'react-router-dom'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import ListCategoryProducts from '../../components/store/ListCategoryProducts';

function CategoriesStore({ categories, loading_categories, storeSlug }) {

    return (
        <div className="hidden lg:block">
           <ListCategoryProducts categories={categories} loading_categories={loading_categories} storeSlug={storeSlug}/>
        </div>
    )
}

export default CategoriesStore