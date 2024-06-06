import Layout from "../../hocs/Layout"
import { useEffect, useState, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link, useParams } from "react-router-dom";

import { get_search_stores, get_search_stores_page } from '../../redux/actions/stores';
import StoreList from "../../components/store/StoreList";

import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { FunnelIcon } from '@heroicons/react/24/solid'

import Loader from "../../components/home/Loader";
import { Helmet } from "react-helmet";
import { InfinitySpin, Rings } from "react-loader-spinner";
import Sidebar from "./Sidebar/Sidebar";
import Searcher from "../../components/searcher/Searcher";



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Mall = ({
    get_search_stores,
    get_search_stores_page,
    stores,
    count,
    next,
    previous,
    loading,
}) => {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const params = useParams()
    const search = params.search
    const slug = params.slug
    useEffect(() => {
        window.scrollTo(0, 0)
        const modifiedSlug = slug === 'categories' ? '' : slug;

        get_search_stores(modifiedSlug, search)
    }, [slug, search])
    return (
        <Layout>
            <Helmet>
                <title>Ruvlo | {search}</title>
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
            <div>
                <div>
                    {/* Mobile filter dialog */}
                    {/* <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                        <Dialog as="div" className="relative z-[100] lg:hidden" onClose={setMobileFiltersOpen}>
                            <Transition.Child
                                as={Fragment}
                                enter="transition-opacity ease-linear duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition-opacity ease-linear duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0 bg-black bg-opacity-25" />
                            </Transition.Child>

                            <div className="fixed inset-0 z-40 flex">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transition ease-in-out duration-300 transform"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transition ease-in-out duration-300 transform"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                        <div className="flex items-center justify-between px-4">
                                            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                            <button
                                                type="button"
                                                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                                onClick={() => setMobileFiltersOpen(false)}
                                            >
                                                <span className="sr-only">Close menu</span>
                                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                            </button>
                                        </div>
                                        <Loader />
                                        <Loader />
                                        <Loader />
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </Dialog>
                    </Transition.Root> */}
                    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-200 pb-6 pt-10">
                            <Searcher className="flex-1" />
                            <div className="flex items-center mt-4 sm:mt-0">
                                <h2 className="text-lg md:text-xl font-estilo_letra font-bold text-gray-800 dark:text-white mb-2 sm:mb-0">
                                 {count} Resultados
                                </h2>
                                {/* <button
                                    type="button"
                                    className="ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                    onClick={() => setMobileFiltersOpen(true)}>
                                    <span className="sr-only">Filters</span>
                                    <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                                </button> */}
                            </div>
                        </div>
                        <section aria-labelledby="products-heading" className="pb-24 pt-6">
                            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                                {/* Filters */}
                                <Sidebar/>
                                {/* Product grid */}
                                <div className="lg:col-span-3">
                                    {loading ? (
                                        <InfinitySpin width={200} height={200} color="#fff" radius="6" />                                    ) : stores && stores.length > 0 ? (
                                        <StoreList stores={stores} get_store_list_page={get_search_stores_page} slug={slug} search={search} count={count} />
                                    ) : (
                                        <>
                                            <div className="bg-gray-800 text-gray-200 rounded-md p-4 font-estilo_letra ">
                                                <p className="text-center text-gray-300 mb-2">No se encontraron tiendas que coincidan con la búsqueda: <strong>{search}</strong></p>
                                                <p className="text-center text-gray-300 mb-4">Pero no te preocupes, ¡pronto habrá más tiendas disponibles!</p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </Layout >
    )
}
const mapStateToProps = state => ({
    stores: state.Stores.search_stores,
    count: state.Stores.count,
    next: state.Stores.next,
    previous: state.Stores.previous,
    loading: state.Stores.loading,
})
export default connect(mapStateToProps, {
    get_search_stores,
    get_search_stores_page
})(Mall)