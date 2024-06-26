import React, { useEffect } from 'react'

import { connect } from "react-redux";

import Layout from '../../hocs/Layout'
import { Helmet } from 'react-helmet';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { get_user_invoices, remove_invoice } from '../../redux/actions/Invoice';
import { InfinitySpin, Rings } from 'react-loader-spinner';
import { BuildingStorefrontIcon, CheckIcon, ExclamationCircleIcon, MapIcon, MapPinIcon, PaperAirplaneIcon, TrashIcon } from '@heroicons/react/24/outline';
import NoFoundCarts from '../Cart/NoFoundCarts';



function Invoices({
    isAuthenticated,
    get_user_invoices,
    invoices,
    loading,
    remove_invoice
}) {
    if (!isAuthenticated)
        return <Navigate to='/' />;

    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)
        get_user_invoices()
    }, [])

    const handleDelteInvoice = async (invoiceId,) => {
        console.log("Hola", invoiceId,)
        await remove_invoice(invoiceId)
        navigate(`/carts`);
    };

    return (
        <Layout>
            <Helmet>
                <title>Ruvlo | Ordenes</title>
            </Helmet>
            {loading ? (
                <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
                    <InfinitySpin width={250} height={250} color="#fff" radius="6" />
                </div>
            ) : (
                <div className="py-14 sm:py-14 font-estilo_letra">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl sm:text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-200 sm:text-4xl">Centro de ordenes</h2>
                        </div>
                        {invoices && invoices.map((invoice) => (
                            <div key={invoice.id} className="mx-auto mt-10 max-w-2xl rounded-3xl sm:mt-10 lg:mx-0 lg:flex lg:max-w-none bg-stone-900">
                                <div className="p-8 sm:p-10 lg:flex-auto">
                                    <div className="flex items-center">
                                        <Link className="flex items-center flex-grow">
                                            <h3 className="text-2xl font-semobold tracking-tight text-gray-300">#{invoice.transaction_number} -  $ {invoice.total_amount} </h3>
                                        </Link>
                                        <Link to={`/store/${invoice.store.slug}`} className='flex font-semibold'>
                                            <BuildingStorefrontIcon className="w-6 h-6 mr-2" />
                                            Visitar tienda

                                        </Link>
                                        {
                                            invoice.status.id === 1 && (
                                                <button onClick={() => handleDelteInvoice(invoice.id)} className="ml-2 text-gray-400">
                                                    <TrashIcon className="w-6 h-6" />
                                                </button>
                                            )
                                        }
                                    </div>
                                    <div className="mt-10 flex items-center gap-x-4">
                                        <h4 className="flex-none text-sm font-semibold leading-6 text-azul_corp_ho">Detalles</h4>
                                        <div className="h-px flex-auto bg-gray-100" />
                                    </div>
                                    <ul role="list" className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-400 sm:grid-cols-2 sm:gap-6">
                                        <li className="flex gap-x-3">
                                            <PaperAirplaneIcon className="h-6 w-5 flex-none text-azul_corp_ho" aria-hidden="true" />
                                            {invoice.shipping_method ? (
                                                <p>{invoice.shipping_method.name}, Precio ${invoice.shipping_method.price}, entrega {invoice.shipping_method.time_to_delivery}</p>
                                            ) : (
                                                <p>Eliminaron los datos del método de envío</p>
                                            )}
                                        </li>
                                        <li className="flex gap-x-3">
                                            <MapPinIcon className="h-6 w-5 flex-none text-azul_corp_ho" aria-hidden="true" />
                                            <p>{invoice.shipping_location.address_line_1}, {invoice.shipping_location.city.nombre} - {invoice.shipping_location.delivery_notes}</p>
                                        </li>
                                    </ul>
                                    <div className="inline-block mt-4 p-4">
                                        {
                                            invoice.status.id === 1 && (
                                                <div className="my-4 p-4 rounded-lg shadow-lg bg-gradient-to-r from-yellow-600 to-yellow-800 text-white ">
                                                    <h4 className="text-xl font-bold mb-3 border-b border-yellow-400 pb-1">Información importante</h4>
                                                    <p className="mb-2 ">
                                                        1- <span className="font-bold">¡Orden enviada!</span> Revisa tu correo para ver tu pedido y los productos seleccionados.
                                                    </p>
                                                    <p className="mt-2">
                                                        2- Puedes cancelar tu pedido mientras está en estado <span className="font-bold">Pendiente</span>.
                                                    </p>
                                                    <p className="mt-2 ">
                                                        3- Consulta las políticas de {invoice.store.name}.
                                                        <Link to={`/policies/${invoice.store.slug}`} className="ml-2 text-azul_corp font-bold">
                                                            Aquí
                                                        </Link>
                                                    </p>
                                                    <p className="mt-2">
                                                        3- Te notificaremos por correo cada vez que el estado de tu pedido cambie.
                                                    </p>
                                                </div>
                                            )
                                        }
                                        <li className="flex gap-x-3 mt-2">
                                            <ExclamationCircleIcon className="h-6 w-5 flex-none text-azul_corp_ho" aria-hidden="true" />
                                            <Link className='text-azul_corp_ho text-sm'>Reportar problema a {invoice.store.name}</Link>
                                        </li>
                                    </div>
                                </div>
                                <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0 flex">
                                    <div className="flex-1 rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 flex flex-col justify-center">
                                        <div className="mx-auto max-w-xs px-8">
                                            <p className="text-base font-semibold text-gray-600">{invoice.store.name}</p>
                                            <p className="mt-6 flex items-baseline justify-center gap-x-2">
                                                <span className="text-5xl font-bold tracking-tight text-gray-900">{invoice.status.name}</span>
                                            </p>
                                            <p className="mt-6 text-xs leading-5 text-gray-600">
                                                Factura o recibo disponible para facilitar el reembolso o problema con la tienda.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        ))}
                        {invoices && invoices.length === 0 && <NoFoundCarts />}
                    </div>
                </div>
            )}
        </Layout >
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    invoices: state.Invoice.invoices.invoices,
    loading: state.Invoice.loading

})

export default connect(mapStateToProps, {
    get_user_invoices,
    remove_invoice
})(Invoices)