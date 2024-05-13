import React from 'react'
import Layout from '../../hocs/Layout'
import { Helmet } from 'react-helmet'
import Searcher from '../../components/searcher/Searcher'
import Sidebar from '../Home/Sidebar/Sidebar'
import SetnewPass from './SetnewPass';
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/24/outline'
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';


function DashboardAccount({
    isAuthenticated
}) {

    if (!isAuthenticated) return <Navigate to="/" />;

    return (
        <Layout>
            <Helmet>
                {/* Metadatos */}
            </Helmet>

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-200 pb-6 pt-10">
                    <Searcher className="flex-1" />
                    <div className="flex items-center mt-4 sm:mt-0">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white mb-2 sm:mb-0">
                            Datos de tu cuenta
                        </h2>
                    </div>
                </div>
                <section aria-labelledby="products-heading" className="pb-24 pt-6">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                        <Sidebar />
                        <div className="lg:col-span-3">


                            <div className="px-4 pt-2">
                                <div className="rounded-2xl bg-neutral-900 p-2">
                                    <Disclosure>
                                        {({ open }) => (
                                            <>
                                                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-800 px-4 py-2 text-left text-sm font-medium text-gray-200 hover:bg-gray-700 ">
                                                    <span>Cambiar contraseña</span>
                                                    <ChevronUpIcon
                                                        className={`${open ? 'rotate-180 transform' : ''
                                                            } h-5 w-5 text-gray-500`}
                                                    />
                                                </Disclosure.Button>
                                                <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                                                    <SetnewPass />
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                    <Disclosure as="div" className="mt-2">
                                        {({ open }) => (
                                            <>
                                                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-800 px-4 py-2 text-left text-sm font-medium text-gray-200 hover:bg-gray-700">
                                                    <span>Do you offer technical support?</span>
                                                    <ChevronUpIcon
                                                        className={`${open ? 'rotate-180 transform' : ''
                                                            } h-5 w-5 text-gray-500`}
                                                    />
                                                </Disclosure.Button>
                                                <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                                                    No.
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                </div>
                            </div>
                        </div>




                    </div>
                </section>
            </main>


        </Layout>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps, {
})(DashboardAccount);


