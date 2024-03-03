import React, { useEffect, useState } from 'react';
import Layout from '../../hocs/Layout';
import LocationForm from './LocationForm';
import ProfileForm from './ProfileForm';
import { connect } from 'react-redux';
import { PencilIcon } from '@heroicons/react/24/outline';
import { Helmet } from 'react-helmet';
import { get_user_location } from '../../redux/actions/profile';
import { Navigate } from 'react-router-dom';
import { Rings } from 'react-loader-spinner';
import Sidebar from '../Home/Sidebar/Sidebar';
import Searcher from '../../components/searcher/Searcher';

function Dashboard({
    isAuthenticated,
    profile,
    get_user_location,
    location,
}) {
    const [showFormLocation, setShowFormLocation] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isAuthenticated) {
            get_user_location().then(() => setIsLoading(false));
        }
    }, [isAuthenticated]); // Dependencia añadida al useEffect

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
                            Perfil del usuario
                        </h2>
                    </div>
                </div>
                <section aria-labelledby="products-heading" className="pb-24 pt-6">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                        <Sidebar />
                        {isLoading ? (
                            <Rings width={80} height={80} color="#fff" radius="6" />
                        ) : (
                            <div className="lg:col-span-3">
                                <div className=" rounded-lg shadow-md p-6">
                                    {/* <h2 className="text-2xl font-semibold mb-4">Formulario de Ubicación</h2> */}
                                    <div className="bg-neutral-900 p-6 rounded-md shadow-md text-white">
                                        <div className="flex justify-between items-center mb-4">
                                            <h2 className="text-sm font-medium text-gray-200">Registra tus datos, para mayor seguridad.</h2>
                                            <button onClick={() => setShowForm(!showForm)}>
                                                <span className="flex items-center text-blue-500 hover:text-blue-700">
                                                    <PencilIcon className="h-6 w-6 mr-1" />
                                                </span>
                                            </button>
                                        </div>
                                        {showForm ? (
                                            <ProfileForm />
                                        ) : (
                                            <>
                                                {profile && profile.firs_name || profile && profile.last_name ? (
                                                    <div className="font-sans text-base grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                        <div className="flex items-center">
                                                            <span className="mr-4 font-semibold">{`${profile.firs_name} ${profile.last_name}`}</span>
                                                            <span className="inline-block">{profile.phone && profile.phone.replace(/.(?=.{2})/g, '*')}</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <span className="mr-4 font-semibold">Identificación:</span>
                                                            <span className="inline-block">{profile.identification && profile.identification.replace(/.(?=.{2})/g, '*')}</span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <ProfileForm />
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className=" rounded-lg shadow-md p-6">
                                    <div className="bg-neutral-900 p-6 rounded-md shadow-md text-white">
                                        <div className="flex justify-between items-center mb-4">
                                            <h2 className="text-sm font-medium text-gray-200">Registra tu dirección para la llegadas de tus productos. </h2>
                                            <button onClick={() => setShowFormLocation(!showFormLocation)}>
                                                <span className="flex items-center text-blue-500 hover:text-blue-700">
                                                    <PencilIcon className="h-6 w-6 mr-1" />
                                                </span>
                                            </button>
                                        </div>
                                        {showFormLocation ? (
                                            <LocationForm />
                                        ) : (
                                            <>
                                                {location && location.address_line_1 || location && location.address_line_2 || (location && location.city && location.city.nombre) || location && location.postal_zip_code || location && location.delivery_notes ? (
                                                    <div className="font-sans text-base grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        {location.address_line_1 && <p className="mb-2"><span className="font-semibold">Dirección Principal:</span> {location.address_line_1.replace(/.(?=.{4})/g, '*')}</p>}
                                                        {location.address_line_2 && <p className="mb-2"><span className="font-semibold">Dirección Secundaria:</span> {location.address_line_2}</p>}
                                                        {(location.city && location.city.nombre) && <p className="mb-2"><span className="font-semibold">Ciudad:</span> {location.city.nombre}</p>}
                                                        {location.postal_zip_code && <p className="mb-2"><span className="font-semibold">Código Postal:</span> {location.postal_zip_code}</p>}
                                                        {location.delivery_notes && <p className="mb-2"><span className="font-semibold">Notas:</span> {location.delivery_notes}</p>}
                                                    </div>
                                                ) : (
                                                    <>
                                                        {/* <p>No hay datos disponibles</p> */}
                                                        <LocationForm />
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </div>
                                   
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </main>

        </Layout>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.Auth.isAuthenticated,
    profile: state.Profile.profile,
    location: state.Profile.profile_location,

});

export default connect(mapStateToProps, {
    get_user_location,
})(Dashboard);
