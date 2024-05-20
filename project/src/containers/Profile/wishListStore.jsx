import React, { useEffect } from 'react'
import Layout from '../../hocs/Layout'
import { connect } from "react-redux";
import { InfinitySpin, Rings } from 'react-loader-spinner';
import NoFoundCarts from '../Cart/NoFoundCarts';
import { Helmet } from 'react-helmet';
import { Link, Navigate } from 'react-router-dom';
import { BuildingStorefrontIcon } from '@heroicons/react/24/outline';
import Sidebar from '../Home/Sidebar/Sidebar';
import StoreCardHorizontal from '../../components/store/StoreCardHorizontal';
import Searcher from '../../components/searcher/Searcher';
import { add_like_dislike_store, get_user_wish_list_stores } from '../../redux/actions/stores';



const WishListStore = ({
    isAuthenticated,
    get_user_wish_list_stores,
    wishlist,
    loading,
    add_like_dislike_store,
    count_likes
}) => {
    useEffect(() => {
        get_user_wish_list_stores()
    }, [])

    if (!isAuthenticated) return <Navigate to="/" />;

    const getWishlist = async () => {
        await get_user_wish_list_stores();
    };

    const handleRemoveFromFavorites = async (storeSlug) => {
        await add_like_dislike_store(storeSlug);
        await getWishlist(); // Espera a que la acción get_user_wish_list_products se complete antes de continuar
    };


    return (
        <Layout>
            <Helmet>
                <title>Ruvlo | Tiendas guardados</title>
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
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-200 pb-6 pt-10">
                    <div className="hidden md:block">
                        <Searcher />
                    </div>
                    <div className="flex items-center mt-4 sm:mt-0">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white mb-2 sm:mb-0">
                            {count_likes} tiendas favoritas
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
                                    <div className="overflow-hidden px-8">
                                        <ul role="list" className="space-y-8 gap-8 ">
                                            {Array.isArray(wishlist) && wishlist.map((item, index) => (
                                                <div key={index} className="relative">
                                                    <StoreCardHorizontal data={item.store} key={index} index={index} />
                                                    <button
                                                        onClick={() => handleRemoveFromFavorites(item.store.slug)}
                                                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-full text-sm focus:outline-none"
                                                    >
                                                        Eliminar de favoritos
                                                    </button>
                                                </div>
                                            ))}
                                        </ul>
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
    wishlist: state.Stores.stores_liked ? state.Stores.stores_liked.stores : [],
    loading: state.Stores.loading,
    count_likes: state.Stores.stores_liked ? state.Stores.stores_liked.count || 0 : 0,

});
export default connect(mapStateToProps, {
    get_user_wish_list_stores,
    add_like_dislike_store
})(WishListStore);
