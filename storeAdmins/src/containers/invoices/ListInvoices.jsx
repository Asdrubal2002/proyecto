import React, { useEffect, useState } from 'react';
import { Rings } from 'react-loader-spinner';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function ListInvoices({
    loading_invoices,
    invoices,
    statusOptions
}) {
    const [filteredInvoices, setFilteredInvoices] = useState(invoices);
    const [selectedMethod, setSelectedMethod] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [searchNumber, setSearchNumber] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        filterInvoices();
    }, [selectedMethod, selectedCity, selectedStatus, searchNumber, selectedDate, invoices]);

    const navigate = useNavigate();

    const handleRowClick = (transactionNumber) => {
        navigate(`/invoice/${transactionNumber}`);
    };


    const handleMethodChange = (e) => {
        setSelectedMethod(e.target.value);
    };

    const handleCityChange = (e) => {
        setSelectedCity(e.target.value);
    };

    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
    };

    const handleSearchNumberChange = (e) => {
        setSearchNumber(e.target.value);
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const filterInvoices = () => {
        let filtered = invoices;

        if (selectedMethod) {
            filtered = filtered.filter(invoice => invoice.shipping_method?.name === selectedMethod);
        }

        if (selectedCity) {
            filtered = filtered.filter(invoice => invoice.shipping_location?.city?.nombre === selectedCity);
        }

        if (selectedStatus) {
            filtered = filtered.filter(invoice => invoice.status?.name === selectedStatus);
        }

        if (searchNumber) {
            filtered = filtered.filter(invoice => invoice.transaction_number.includes(searchNumber));
        }

        if (selectedDate) {
            const selectedDateObj = new Date(selectedDate);
            filtered = filtered.filter(invoice => {
                const invoiceDate = new Date(invoice.created_at);
                return (
                    invoiceDate.getFullYear() === selectedDateObj.getFullYear() &&
                    invoiceDate.getMonth() === selectedDateObj.getMonth() &&
                    invoiceDate.getDate() === selectedDateObj.getDate()
                );
            });
        }

        setFilteredInvoices(filtered);
    };



    const getUniqueValues = (key) => {
        if (!invoices) return []; // Verificar si invoices es null y devolver un arreglo vacío
        const uniqueValues = invoices.map(invoice => {
            const keys = key.split('.');
            let value = invoice;
            for (const key of keys) {
                value = value ? value[key] : undefined;
            }
            return value;
        }).filter(value => value);
        return [...new Set(uniqueValues)];
    };


    const shippingMethods = getUniqueValues('shipping_method.name');
    const cities = getUniqueValues('shipping_location.city.nombre');
    const statuses = getUniqueValues('status.name');

    // // Arreglo de estados
    // const statusOptions = [
    //     { id: 1, name: "Pendiente" },
    //     { id: 2, name: "En Proceso" },
    //     { id: 3, name: "Aprobada" }
    // ];

    return (
        <>
            {
                loading_invoices ? (
                    <Rings width={20} height={20} color="#fff" radius="6" />
                )
                    :
                    <div>
                        <div className="flex space-x-4 mb-4">
                            <select value={selectedMethod} onChange={handleMethodChange} className="p-2 bg-gray-800 text-gray-300 rounded-md">
                                <option value="">Todos los métodos de entrega</option>
                                {shippingMethods.map((method, index) => (
                                    <option key={index} value={method}>{method}</option>
                                ))}
                            </select>
                            <select value={selectedCity} onChange={handleCityChange} className="p-2 bg-gray-800 text-gray-300 rounded-md">
                                <option value="">Todas las ciudades</option>
                                {cities.map((city, index) => (
                                    <option key={index} value={city}>{city}</option>
                                ))}
                            </select>
                            <select value={selectedStatus} onChange={handleStatusChange} className="p-2 bg-gray-800 text-gray-300 rounded-md">
                                <option value="">Todos los estados</option>
                                {statusOptions&&statusOptions.map((status, index) => (
                                    <option key={index} value={status.name}>{status.name}</option>
                                ))}
                            </select>
                            <input
                                type="text"
                                value={searchNumber}
                                onChange={handleSearchNumberChange}
                                placeholder="Buscar por # Factura"
                                className="p-2 bg-gray-800 text-gray-300 rounded-md"
                            />
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={handleDateChange}
                                className="p-2 bg-gray-800 text-gray-300 rounded-md"
                            />
                        </div>
                        <table className="min-w-full divide-y divide-gray-700 rounded-md">
                            <thead className="bg-gray-800">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"># Factura</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Fecha de pedido</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Método de entrega</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Ciudad</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Total</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Estado</th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-900 divide-y divide-gray-700">
                                {filteredInvoices && filteredInvoices.length > 0 ? (
                                    filteredInvoices.map((invoice, index) => (
                                        <tr key={index} className="hover:bg-gray-700 cursor-pointer" onClick={() => handleRowClick(invoice.transaction_number)}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                {invoice.transaction_number}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                {format(new Date(invoice.created_at), 'PPP', { locale: es })} {format(new Date(invoice.created_at), 'hh:mm a', { locale: es })}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                {invoice.shipping_method?.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                {invoice.shipping_location?.city?.nombre}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-300">
                                                {invoice.total_amount}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                {invoice.status?.name}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-center">
                                            No hay pedidos recientes.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                    </div>
            }
        </>
    );
}

const mapStateToProps = state => ({
    invoices: state.Invoices.invoices,
    loading_invoices: state.Invoices.loading_invoices,
    statusOptions: state.Invoices.status

});

export default connect(mapStateToProps, {

})(ListInvoices);
