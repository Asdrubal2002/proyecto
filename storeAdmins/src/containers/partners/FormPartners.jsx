import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Dialog, Transition, Disclosure } from '@headlessui/react'
import AssociateUserForm from './AssociateUserForm';
import axios from "axios"
import { TrashIcon } from '@heroicons/react/24/outline';
import { LetrasPerfil } from '../../components/navigation/styles/sidebar';


function FormPartners({
    partners,
    administrator,
    get_partners,
    authenticatedUserId
}) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false);
    const [sellerIdToDelete, setSellerIdToDelete] = useState(null);
    const [openDelete, setOpenDelete] = useState(false)

    const deactivateSeller = (idSeller) => {

        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        const formDataIdSeller = new FormData();
        formDataIdSeller.append('user_id', idSeller);
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}/api/store/desactivate-seller/`,
                    formDataIdSeller,
                    config);

                if (res.status === 200) {
                    setLoading(false);
                    get_partners()
                } else {
                    setLoading(false);
                }
            } catch (err) {
                setLoading(false);
            }
        };
        fetchData();
    }

    const handleOpenModal = (personId) => {
        setSellerIdToDelete(personId);
        setOpenDelete(true);
    };


    const handleDelete = async (seller) => {

        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        const formDataIdSeller = new FormData();
        formDataIdSeller.append('user_id', seller);
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/api/store/remove-seller/`,
                    formDataIdSeller,
                    config);

                if (res.status === 200) {
                    setLoading(false);
                    get_partners()
                } else {
                    setLoading(false);
                }
            } catch (err) {
                setLoading(false);
            }
        };
        fetchData();
        setOpenDelete(false);
    }



    return (
        <>
            <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
                <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                    <div className="ml-4 mt-2">
                        <h3 className="text-lg font-medium leading-6 text-gray-200">Colaboradores</h3>
                    </div>
                    {
                        administrator && <div className="ml-4 mt-2 flex-shrink-0">
                            <button
                                onClick={e => setOpen(true)}
                                className="relative inline-flex items-center rounded-md border border-transparent bg-azul_corp px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-azul_corp_ho focus:outline-none "
                            >
                                Asignar nuevo socio a mi tienda
                            </button>
                        </div>
                    }

                </div>
            </div>

            <ul role="list" className="divide-y divide-gray-700">
                {(partners || []).map((person) => (
                    <li key={person.email} className="flex justify-between gap-x-6 py-5">
                        <div className="flex min-w-0 gap-x-4">



                            <div className='h-12 w-12 flex-none rounded-full bg-azul_corp'>
                                <div className="flex items-center">
                                    {person && person.photo != null ? (
                                        <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={`${import.meta.env.VITE_REACT_APP_API_URL}${person.photo}`} alt="User profile" />
                                    ) : (
                                        <div className="h-10 w-10 flex items-center justify-center">
                                            <LetrasPerfil>{person && person.get_first_letters}</LetrasPerfil>
                                        </div>
                                    )}
                                </div>
                            </div>

                           
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-300">
                                    {person.profile.firs_name} {person.profile.last_name}
                                </p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
                            </div>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-200">{person.profile.identification}</p>
                            {person.location && person.location.city && person.location.city.nombre ? (
                                <p className="mt-1 text-xs leading-5 text-gray-200">
                                    {person.location.city.nombre} - {person.location.city.estado_o_departamento.pais.nombre}
                                </p>
                            ) : (
                                <div className="mt-1 flex items-center gap-x-1.5">
                                    <div className="flex-none rounded-full bg-red-500/20 p-1">
                                        <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                                    </div>
                                    <p className="text-xs leading-5 text-gray-500">No tiene datos</p>
                                </div>
                            )}
                        </div>
                        {!person.is_primary_store_admin && person.id !== authenticatedUserId && (
                            <div>
                                <button
                                    className={`text-xs text-white py-1 px-3 rounded-md ${person.is_seller ? 'bg-red-600' : 'bg-green-600'}`}
                                    onClick={() => deactivateSeller(person.id)}
                                >
                                    {person.is_seller ? 'Desactivar vendedor' : 'Activar vendedor'}
                                </button>
                                <div>
                                    <button
                                        className="text-xs text-white bg-red-600 py-1 px-3 rounded-md"
                                        onClick={() => handleOpenModal(person.id)}
                                    >
                                        Eliminar colaborador
                                    </button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-stone-900  transition-opacity" />
                    </Transition.Child>
                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg px-4 pt-5 pb-4 text-left transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6">
                                    <AssociateUserForm get_partners={get_partners} closePartners={() => setOpen(false)} />
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>





            <Transition.Root show={openDelete} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpenDelete}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                    <div>
                                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-100">
                                            <TrashIcon className="h-6 w-6 text-rose-600" aria-hidden="true" />
                                        </div>
                                        <div className="mt-3 text-center sm:mt-5">
                                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                                ¿Estas seguro de elimiar a tu colaborador@
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                {/* <p className="text-sm text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore.
                </p> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md border border-transparent bg-rose-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-rose-700 sm:text-sm"
                                            onClick={() => handleDelete(sellerIdToDelete)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>



        </>


    );
}

const mapStateToProps = state => ({
    partners: state.Partners_store.partners,
    administrator: state.Auth.user.is_primary_store_admin,
    authenticatedUserId: state.Auth.user.id
});

export default connect(mapStateToProps, {

})(FormPartners);
