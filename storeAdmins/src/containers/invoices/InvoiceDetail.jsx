import React, { useEffect, useState } from 'react';
import { Rings } from 'react-loader-spinner';
import { connect } from 'react-redux';
import Layout from '../../hocs/Layout';
import { Link, useParams } from 'react-router-dom';
import { get_invoice } from '../../redux/actions/invoices/invoices';
import { PaperClipIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { CalendarDaysIcon, HandRaisedIcon } from '@heroicons/react/24/outline'



function InvoiceDetail({
    get_invoice,
    invoice,
    loading_invoice,
    statusOptions
}) {
    const params = useParams()
    const transaction_number = params.transaction_number
    const [selectedStatus, setSelectedStatus] = useState('');

    useEffect(() => {
        get_invoice(transaction_number)

    }, []);


    const handleStatusChange = (e) => {
        const selectedId = e.target.value;
        setSelectedStatus(selectedId);

        const selectedOption = statusOptions.find(option => option.id.toString() === selectedId);
        if (selectedOption) {
            console.log('Selected Status ID:', selectedOption.id);
            console.log('Selected Status Name:', selectedOption.name);
        }
    };

    return (
        <Layout>
            {
                loading_invoice ? <Rings width={20} height={20} color="#fff" radius="6" /> :
                    <>
                        <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
                            <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                                <div className="ml-4 mt-2">
                                    <h3 className="text-lg font-medium leading-6 text-gray-200">Pedido # {transaction_number}</h3>
                                </div>
                                <div className="ml-4 mt-2 flex-shrink-0">
                                    <select
                                        value={selectedStatus}
                                        onChange={handleStatusChange}
                                        className="relative inline-flex items-center rounded-md border border-transparent bg-azul_corp px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-azul_corp_ho focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        <option value="" className="p-2">Seleccionar Estado</option>
                                        {statusOptions&&statusOptions.map((status) => (
                                            <option key={status.id} value={status.id} className="p-2">
                                                {status.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="mt-6  border-gray-100">
                                <dl className="divide-y divide-gray-100">
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-300">Cliente</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-200 sm:col-span-2 sm:mt-0">{invoice && invoice.buyer.firs_name} {invoice && invoice.buyer.last_name} {invoice && invoice.buyer.phone}</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-300">Método de entrega</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-200 sm:col-span-2 sm:mt-0">{invoice && invoice.shipping_method.name} - {invoice && invoice.shipping_location.city.nombre} {invoice && invoice.shipping_location.city.estado_o_departamento.pais.nombre} - {invoice && invoice.shipping_location.address_line_1}  {invoice && invoice.shipping_location.delivery_notes}</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-300">Detalles del pedido</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-200 sm:col-span-2 sm:mt-0">

                                            <table className="min-w-full divide-y divide-gray-700 rounded-md">
                                                <thead className="bg-gray-800">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Sin impuestos + </th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Impuestos +</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Con Impuestos +</th>

                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Método de entrega </th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">= Total</th>

                                                    </tr>
                                                </thead>
                                                <tbody className="bg-gray-900 divide-y divide-gray-700">
                                                    <tr className="hover:bg-gray-700">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                            {invoice && invoice.cart.total_sin_impuestos}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                            {invoice && invoice.cart.total_impuestos}
                                                        </td>

                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                            {invoice && invoice.cart.total_con_impuestos_formateado}
                                                        </td>


                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                            {invoice && invoice.shipping_method.price}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                            {invoice && invoice.total_amount}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-300">Productos</dt>
                                        <dd className="mt-2 text-sm text-gray-200 sm:col-span-2 sm:mt-0">
                                            {
                                                invoice && invoice.cart && invoice.cart.items &&
                                                invoice.cart.items !== null &&
                                                invoice.cart.items !== undefined &&
                                                invoice.cart.items.length !== 0 &&
                                                invoice.cart.items.map((item, index) => {
                                                    return (
                                                        <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6 my-4 " key={index}>
                                                            <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                                                <div>
                                                                    <div className="flex justify-between">
                                                                        <h3 className="text-sm">
                                                                            <Link to={`/product/${item.product_option.product.slugProduct}`} className="font-medium text-gray-300 hover:text-gray-400">
                                                                                {index + 1}. {item.product_option.product.name} -  {item.product_option.option && item.product_option.option.value}
                                                                            </Link>
                                                                        </h3>
                                                                    </div>
                                                                    <div className="mt-1 flex text-sm">
                                                                        <p className="text-gray-500">{item.product_option.product.category.name}</p>
                                                                        <p className="ml-4 pl-4 border-l border-gray-200 text-gray-500">$ {item.product_option.product.formatted_price}</p>
                                                                    </div>
                                                                    <p className="mt-1 text-sm text-gray-300">$ {item.product_option.product.price * item.quantity}</p>
                                                                    <p className="mt-1 text-sm text-gray-500">impuesto {item.product_option.product.tax} %</p>
                                                                    <p className="mt-1 text-sm text-gray-300">$ {item.subtotal}</p>
                                                                </div>
                                                                <div className="mt-4 sm:mt-0 sm:pr-9">
                                                                    <div className="flex items-center">
                                                                        Cantidad: {item.quantity}
                                                                    </div>
                                                                    <div className="absolute top-0 right-0">
                                                                        <button
                                                                            type="button"
                                                                            className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500">
                                                                            <span className="sr-only">Remove</span>
                                                                            asd
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            }

                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </>
            }
        </Layout>
    );
}

const mapStateToProps = state => ({
    invoice: state.Invoices.invoice,
    loading_invoice: state.Invoices.loading_invoice,
    statusOptions: state.Invoices.status

});

export default connect(mapStateToProps, {
    get_invoice
})(InvoiceDetail);
