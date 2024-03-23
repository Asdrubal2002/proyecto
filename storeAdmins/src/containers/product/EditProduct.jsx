import React, { useEffect } from 'react'
import { connect } from "react-redux"
import Layout from '../../hocs/Layout'
import { useParams } from 'react-router-dom';

import { get_product } from '../../redux/actions/products/products';
import { Rings } from 'react-loader-spinner';
import { PaperClipIcon } from '@heroicons/react/24/outline';


function EditProduct({
    get_product,
    loading_product,
    product
}) {

    const params = useParams()
    const slug = params.slug

    useEffect(() => {
        window.scrollTo(0, 0)
        get_product(slug)
    }, []);

    return (
        <Layout>
            {loading_product ? <Rings width={30} height={30} color="#fff" radius="6" />
                : <>
                    <div className=" px-4 py-5 sm:px-6">
                        <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                            <div className="ml-4 mt-4">
                                <h3 className="text-3xl font-medium leading-6 text-gray-300">{product && product.name}</h3>
                                {/* <p className="mt-1 max-w-2xl text-sm text-gray-500">Información de tu producto</p> */}

                            </div>
                            <div className="ml-4 mt-4 flex-shrink-0">
                                <button
                                    // onClick={e => setOpenDelete(true)}
                                    className="relative mx-1 inline-flex items-center rounded-md border border-transparent bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                                >
                                    Elimiar de tu tienda
                                </button>
                                <a
                                    href={`${import.meta.env.VITE_REACT_APP_API_URL}/${product && product.slugProduct}/detail`}
                                    target="_blank"
                                    className="relative mx-1 inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                >
                                    Ver producto
                                </a>
                                <button
                                    // onClick={e => setOpen(true)}
                                    className="relative mx-1 inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                >
                                    {
                                        product && product.is_active ?
                                            <>Desactivar de tu tienda</> : <>Publicarlo en tu tienda</>
                                    }
                                </button>
                            </div>
                        </div>
                    </div>

                    <>
                        <div>
                            <h3 className="text-lg font-medium leading-6 text-gray-300">Información de tu producto 1:56:24</h3>
                        </div>
                        <div className="mt-5 border-t border-gray-200">
                            <dl className="divide-y divide-gray-200">
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                    <dt className="text-sm font-medium text-gray-500">Full name</dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        <span className="flex-grow">Margot Foster</span>
                                        <span className="ml-4 flex-shrink-0">
                                            <button
                                                type="button"
                                                className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            >
                                                Update
                                            </button>
                                        </span>
                                    </dd>
                                </div>
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                    <dt className="text-sm font-medium text-gray-500">Application for</dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        <span className="flex-grow">Backend Developer</span>
                                        <span className="ml-4 flex-shrink-0">
                                            <button
                                                type="button"
                                                className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            >
                                                Update
                                            </button>
                                        </span>
                                    </dd>
                                </div>
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                    <dt className="text-sm font-medium text-gray-500">Email address</dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        <span className="flex-grow">margotfoster@example.com</span>
                                        <span className="ml-4 flex-shrink-0">
                                            <button
                                                type="button"
                                                className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            >
                                                Update
                                            </button>
                                        </span>
                                    </dd>
                                </div>
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                    <dt className="text-sm font-medium text-gray-500">Salary expectation</dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        <span className="flex-grow">$120,000</span>
                                        <span className="ml-4 flex-shrink-0">
                                            <button
                                                type="button"
                                                className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            >
                                                Update
                                            </button>
                                        </span>
                                    </dd>
                                </div>
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                    <dt className="text-sm font-medium text-gray-500">About</dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        <span className="flex-grow">
                                            Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur
                                            qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure
                                            nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
                                        </span>
                                        <span className="ml-4 flex-shrink-0">
                                            <button
                                                type="button"
                                                className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            >
                                                Update
                                            </button>
                                        </span>
                                    </dd>
                                </div>
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                    <dt className="text-sm font-medium text-gray-500">Attachments</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        <ul role="list" className="divide-y divide-gray-200 rounded-md border border-gray-200">
                                            <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                                                <div className="flex w-0 flex-1 items-center">
                                                    <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                                    <span className="ml-2 w-0 flex-1 truncate">resume_back_end_developer.pdf</span>
                                                </div>
                                                <div className="ml-4 flex flex-shrink-0 space-x-4">
                                                    <button
                                                        type="button"
                                                        className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                    >
                                                        Update
                                                    </button>
                                                    <span className="text-gray-300" aria-hidden="true">
                                                        |
                                                    </span>
                                                    <button
                                                        type="button"
                                                        className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </li>
                                            <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                                                <div className="flex w-0 flex-1 items-center">
                                                    <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                                    <span className="ml-2 w-0 flex-1 truncate">coverletter_back_end_developer.pdf</span>
                                                </div>
                                                <div className="ml-4 flex flex-shrink-0 space-x-4">
                                                    <button
                                                        type="button"
                                                        className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                    >
                                                        Update
                                                    </button>
                                                    <span className="text-gray-300" aria-hidden="true">
                                                        |
                                                    </span>
                                                    <button
                                                        type="button"
                                                        className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </li>
                                        </ul>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </>



                </>}

        </Layout>

    )
}

const mapStateToProps = state => ({
    loading_product: state.Products.loading_product,
    product: state.Products.product
})

export default connect(mapStateToProps, {
    get_product
})(EditProduct)
