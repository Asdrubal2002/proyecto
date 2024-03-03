import React from 'react'
import { ArchiveBoxIcon, BuildingStorefrontIcon, MagnifyingGlassIcon, ShoppingCartIcon, UserCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'


function Sidebar({}) {
    return (
        <div className="hidden lg:block">
            <h3 className="sr-only">Categories</h3>
            <div className="bg-neutral-900 py-6 rounded-lg shadow">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="divide-y divide-gray-200">
                        {/* Noticia 1 */}
                        <div className="py-4">
                            <Link to={'/dashboard'}  className="text-lg font-medium text-gray-300 hover:text-gray-400">Centro de Información</Link>
                            <p className="text-sm text-gray-400 mt-1">Compra tus diversos productos en las tiendas que has seleccionado.</p>

                            <Link to={'/dashboard'} className="flex items-center justify-center text-sm font-medium text-azul_corp_ho hover:text-azul_corp mt-2 bg-stone-800 p-2 rounded-md">
                                <UserCircleIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                                Ir al perfil del usuario
                                {/* <span className="text-xs bg-red-500 text-white font-semibold rounded-full px-2 text-center ml-2">{cart_count}</span> */}
                            </Link>
                        </div>

                        <div className="py-4">
                            <Link to={'/wish_list'}  className="text-lg font-medium text-gray-300 hover:text-gray-400">Productos favoritos</Link>
                            <p className="text-sm text-gray-400 mt-1">Observa los productos que has seleccionado.</p>

                            <Link to={'/wish_list'} className="flex items-center justify-center text-sm font-medium text-azul_corp_ho hover:text-azul_corp mt-2 bg-stone-800 p-2 rounded-md">
                                <ArchiveBoxIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                                Ir al productos favoritos
                                {/* <span className="text-xs bg-red-500 text-white font-semibold rounded-full px-2 text-center ml-2">{cart_count}</span> */}
                            </Link>
                        </div>

                        <div className="py-4">
                            <Link to={'/wish_list_stores'} className="text-lg font-medium text-gray-300 hover:text-gray-400">Tiendas favoritas</Link>
                            <p className="text-sm text-gray-400 mt-1">Explora tus diversos productos en las tiendas que has seleccionado.</p>

                            <Link to={'/wish_list_stores'} className="flex items-center justify-center text-sm font-medium text-azul_corp_ho hover:text-azul_corp mt-2 bg-stone-800 p-2 rounded-md">
                                <BuildingStorefrontIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                                Ir al tiendas favoritos
                                {/* <span className="text-xs bg-red-500 text-white font-semibold rounded-full px-2 text-center ml-2">{cart_count}</span> */}
                            </Link>
                        </div>

                       
                    </div>
                    {/* <div className="divide-y divide-gray-200">
                                                <div className="py-4">
                                                    <a href="#" className="text-lg font-medium text-gray-300 hover:text-gray-400">Productos favoritos</a>
                                                    <p className="text-sm text-gray-400 mt-1">Observa los productos que has seleccionado.</p>
                                                    <Link to={'/wish_list'} className="flex items-center justify-center text-sm font-medium text-azul_corp_ho hover:text-azul_corp mt-2 bg-stone-800 p-2 rounded-md">
                                                        <ShoppingCartIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                                                        Ir al productos favoritos
                                                    </Link>
                                                </div>

                                                
                                                <div className="py-4">
                                                    <a href="#" className="text-base font-medium text-azul_corp_ho hover:text-indigo-500">Ver todas las noticias</a>
                                                </div>
                                            </div> */}
                </div>
            </div>
            {/* <LoadingStores /> */}
        </div>
    )
}

export default Sidebar