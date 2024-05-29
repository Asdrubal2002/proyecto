import React, { useEffect } from 'react'
import Layout from '../../hocs/Layout'
import { connect } from "react-redux";
import ProductCard from '../../components/product/ProductCard'
import { InfinitySpin, Rings } from 'react-loader-spinner';
import NoFoundCarts from '../Cart/NoFoundCarts';
import { Helmet } from 'react-helmet';
import { Link, Navigate } from 'react-router-dom';
import { ArchiveBoxIcon, BuildingStorefrontIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import Sidebar from '../Home/Sidebar/Sidebar';
import Searcher from '../../components/searcher/Searcher';
import { add_like_dislike_product, get_user_wish_list_products } from '../../redux/actions/products';


const WishList = ({

    isAuthenticated,
    get_user_wish_list_products,
    loading,
    wishlist,
    count,
    add_like_dislike_product


}) => {
    useEffect(() => {
        get_user_wish_list_products()
    }, [get_user_wish_list_products,])

    if (!isAuthenticated) return <Navigate to="/" />;

    const getWishlist = async () => {
        await get_user_wish_list_products();
    };

    const handleRemoveFromWishlist = async (productSlug) => {
        await add_like_dislike_product(productSlug);
        await getWishlist(); // Espera a que la acción get_user_wish_list_products se complete antes de continuar
    };

    return (
        <Layout>
            <Helmet>
                <title>Ruvlo | Productos Favoritos</title>
                <meta name="description" content="Lo que sale en google" />
                <meta name="keywords" content='palabras para google' />
                <meta name="robots" content='all' />
                <link rel="canonical" href="https://www.ruvlo.com/" />
                <meta name="author" content='Ruvlo' />
                <meta name="publisher" content='Ruvlo' />

                {/* Social Media Tags */}
                <meta property="og:title" content='Ruvlo |  Busqueda tiendas' />
                <meta property="og:description" content='descripcion.' />
                <meta property="og:url" content="https://www.ruvlo.com/" />
                <meta property="og:image" content='https://bafybeicwrhxloesdlojn3bxyjqnxgsagtd4sl53a7t4cn4vfe2abmybzua.ipfs.w3s.link/lightbnuilbg.jpg' />

                <meta name="twitter:title" content='Ruvlo |  Busqueda tiendas' />
                <meta
                    name="twitter:description"
                    content='descripcion.'
                />
                <meta name="twitter:image" content='https://bafybeicwrhxloesdlojn3bxyjqnxgsagtd4sl53a7t4cn4vfe2abmybzua.ipfs.w3s.link/lightbnuilbg.jpg' />
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 font-estilo_letra">
                <div className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-200 pb-6 pt-10">
                    <div className="hidden md:block">
                        <Searcher />
                    </div>
                    <div className="flex items-center mt-4 sm:mt-0">
                        <h2 className="flex items-center text-lg font-semibold text-gray-300 mb-2 sm:mb-0 mr-4 sm:mr-6 lg:mr-0">
                            {count && count} Productos favoritos
                        </h2>
                    </div>
                </div>
                <section aria-labelledby="products-heading" className="pb-24 pt-6">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                        <Sidebar />
                        <div className="lg:col-span-3">
                            {loading ? (
                                <InfinitySpin width={200} height={200} color="#fff" radius="6" />
                            ) : (
                                <>
                                    <div className="mx-auto max-w-2xl lg:max-w-7xl lg:px-8">
                                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:gap-x-8">
                                            {Array.isArray(wishlist) && wishlist.map((item, index) => (

                                                <div key={index} className="relative">
                                                    <ProductCard data={item} index={index} />
                                                    <button
                                                        onClick={() => handleRemoveFromWishlist(item.slugProduct)}
                                                        className="absolute top-2 right-2 px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 "
                                                    >
                                                        Eliminar de favoritos
                                                    </button>
                                                </div>

                                            ))}
                                        </div>
                                    </div>
                                    {wishlist && wishlist.length === 0 && <NoFoundCarts />}
                                </>
                            )}
                        </div>
                    </div>
                </section>
            </main>
        </Layout>
    )
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.Auth.isAuthenticated,
    loading: state.Products.loading_products,
    wishlist: state.Products.products_liked ? state.Products.products_liked.products : [],
    count: state.Products.products_liked?.count || 0,

});
export default connect(mapStateToProps, {
    get_user_wish_list_products,
    add_like_dislike_product
})(WishList);
