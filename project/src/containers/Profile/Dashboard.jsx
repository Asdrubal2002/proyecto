import React, { useEffect, useState } from 'react';
import Layout from '../../hocs/Layout';
import LocationForm from './forms/LocationForm';
import ProfileForm from './forms/ProfileForm';
import { connect } from 'react-redux';
import { PencilIcon, PhotoIcon, XMarkIcon, CheckIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Helmet } from 'react-helmet';
import { get_user_location } from '../../redux/actions/profile';
import { Navigate } from 'react-router-dom';
import { InfinitySpin, Rings } from 'react-loader-spinner';
import Sidebar from '../Home/Sidebar/Sidebar';
import Searcher from '../../components/searcher/Searcher';
import { LetrasPerfil } from './styles/Dashboard';
import axios from "axios"
import Compressor from 'compressorjs';

function Dashboard({
    isAuthenticated,
    profile,
    get_user_location,
    location,
    user,
}) {
    const [showFormLocation, setShowFormLocation] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [updatePhoto, setUpdatePhoto] = useState(false)
    const [previewImage, setPreviewImage] = useState()
    const [photo, setPhoto] = useState(null)

    const [loadingS, setLoading] = useState(false)


    useEffect(() => {
        if (isAuthenticated) {
            get_user_location().then(() => setIsLoading(false));
        }
    }, [isAuthenticated, user.photo]); // Dependencia añadida al useEffect

    if (!isAuthenticated) return <Navigate to="/" />;

    // Define la función para comprimir imágenes
    const compressImage = async (image) => {
        try {
            // Comprimir la imagen
            const compressedImage = await new Promise((resolve, reject) => {
                new Compressor(image, {
                    quality: 0.6,
                    success(result) {
                        resolve(result);
                    },
                    error(err) {
                        reject(err);
                    },
                });
            });
            return compressedImage;
        } catch (err) {
            console.error('Error al comprimir la imagen:', err);
            throw err;
        }
    };

    const filePhotoSelectedHandler = (e) => {
        const file = e.target.files[0]
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = (e) => {
            setPreviewImage(reader.result);
        };
        setPhoto(file)
    }

    const onSubmitPhotos = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        const formData = new FormData();
        // Comprime la imagen antes de agregarla al formData
        if (photo) {
            const compressedImage = await compressImage(photo);
            formData.append('photo', compressedImage, photo.name);
        }

        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.post(
                    `${import.meta.env.VITE_REACT_APP_API_URL}/api/user/edit-profile-photo/`,
                    formData,
                    config
                );

                if (res.status === 200) {
                    setLoading(false);
                    setPreviewImage(null);
                    setPhoto(null);
                    setUpdatePhoto(false)
                } else {
                    setLoading(false);
                }
            } catch (err) {
                setLoading(false);
                alert('Error al enviar', err);
            }
        };
        fetchData();
    };


    return (
        <Layout>
            <Helmet>
                <title>Ruvlo | Cuenta</title>
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
                            <InfinitySpin width={290} height={200} color="#fff" radius="6" />
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
                                                        <div className="flex items-center">
                                                            <span className="mr-4 font-semibold">Correo:</span>
                                                            <span className="inline-block">{user.email && user.email}</span>
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
                                    <div className="flex flex-wrap items-center">
                                        <div className='m-5 relative inline-flex items-center justify-center w-20 h-20 overflow-hidden bg-azul_corp rounded-full' alt="profile Photo">
                                            {previewImage ? <img className="h-20 w-20 cover" src={previewImage} /> : <>
                                                {user && user.photo != null ? (
                                                    <img className="h-20 w-20 cover" src={user && user.photo} />
                                                ) : (
                                                    <LetrasPerfil>{user && user.get_first_letters}</LetrasPerfil>
                                                )}
                                            </>}
                                        </div>
                                        <div className="py-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:py-5">
                                            <div className="mt-4 flex text-sm text-gray-300 sm:col-span-3 sm:mt-0">
                                                {updatePhoto ? (
                                                    <>
                                                        <form onSubmit={onSubmitPhotos} className="flex w-full items-center">
                                                            <input
                                                                type="file"
                                                                name="photo"
                                                                onChange={filePhotoSelectedHandler}
                                                                className="w-full py-3 px-2 border border-gray-300 rounded-lg"
                                                                required
                                                            />
                                                            <div className="flex items-center space-x-2 ml-4">
                                                                <button
                                                                    type="submit"
                                                                    className="px-4 py-2 rounded-md bg-azul_corp text-white font-medium hover:bg-azul_corp_ho focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                                >
                                                                    <CheckIcon width={20} height={20} color="#fff" radius="6" />
                                                                </button>
                                                                <button
                                                                    onClick={() => {
                                                                        setUpdatePhoto(false);
                                                                        setPreviewImage(null);
                                                                        setPhoto(null);
                                                                    }}
                                                                    className="px-4 py-2 rounded-md bg-gray-600 text-white font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                                >
                                                                    <XMarkIcon width={20} height={20} color="#fff" radius="6" />
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button
                                                            onClick={() => setUpdatePhoto(true)}
                                                            className="flex items-center justify-center px-4 py-2 rounded-md bg-neutral-900 text-white font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                        >
                                                            <UserCircleIcon className="mr-2" width={20} height={20} color="#fff" radius="6" />
                                                            Actualizar mi foto de perfil
                                                        </button>
                                                    </>
                                                  
                                                )}
                                            </div>
                                        </div>
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
    user: state.Auth.user,

});

export default connect(mapStateToProps, {
    get_user_location,
})(Dashboard);
