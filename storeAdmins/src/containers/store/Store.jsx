import React, { useEffect, useState, Fragment } from 'react'
import { connect } from "react-redux"
import Layout from '../../hocs/Layout'

import { get_user_store } from '../../redux/actions/store/store'
import { Link } from 'react-router-dom';
import { BuildingStorefrontIcon, CheckBadgeIcon, CheckIcon, CloudArrowUpIcon, LockClosedIcon, PaperClipIcon, PhotoIcon, QrCodeIcon, ServerIcon, UserCircleIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Create from './Create';
import { Rings } from 'react-loader-spinner';
import axios from "axios"
import { Dialog, Menu, Transition } from '@headlessui/react'



function Store({
  get_user_store,
  userStore,
  loading
}) {
  const profileImagePath = userStore && userStore.logo ? import.meta.env.VITE_REACT_APP_API_URL + userStore.logo : null;
  const bannerImagePath = userStore && userStore.banner ? import.meta.env.VITE_REACT_APP_API_URL + userStore.banner : null;

  const qrcodeImagePath = userStore && userStore.qr_code ? import.meta.env.VITE_REACT_APP_API_URL + userStore.qr_code : null;


  const [loadingS, setLoading] = useState(false)

  const [updateBanner, setUpdateBanner] = useState(false)
  const [previewImageBanner, setPreviewImageBanner] = useState()
  const [banner, setBanner] = useState(null)

  const [updatePhoto, setUpdatePhoto] = useState(false)
  const [previewImage, setPreviewImage] = useState()
  const [logo, setPhoto] = useState(null)

  const [open, setOpen] = useState(false)



  useEffect(() => {
    window.scrollTo(0, 0)
    get_user_store()
  }, []);

  const fileSelectedHandler = (e) => {
    const file = e.target.files[0]
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (e) => {
      setPreviewImageBanner(reader.result);
    };
    setBanner(file)
  }

  const filePhotoSelectedHandler = (e) => {
    const file = e.target.files[0]
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (e) => {
      setPreviewImage(reader.result);
    };
    setPhoto(file)
  }

  const onSubmitPhotos = e => {
    e.preventDefault()

    const config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': `JWT ${localStorage.getItem('access')}`
      }
    };

    const formData = new FormData()
    formData.append('logo', logo, logo.name)

    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/api/store/edit-Store-photo/`,
          formData,
          config)

        if (res.status === 200) {
          setLoading(false)
          setPreviewImage(null);
          setUpdatePhoto(false)
          setPhoto(null);
          get_user_store()
        } else {
          setLoading(false)
        }

      } catch (err) {
        setLoading(false)
        alert('Error al enviar', err)
      }

    }
    fetchData()
  }

  const onSubmitBanner = e => {
    e.preventDefault()

    const config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': `JWT ${localStorage.getItem('access')}`
      }
    };

    const formData = new FormData()
    formData.append('banner', banner, banner.name)

    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/api/store/edit-Store-banner/`,
          formData,
          config)

        if (res.status === 200) {
          setLoading(false)
          setPreviewImageBanner(null);
          setUpdateBanner(false)
          setBanner(null);
          get_user_store()
        } else {
          setLoading(false)
        }

      } catch (err) {
        setLoading(false)
        alert('Error al enviar', err)
      }

    }
    fetchData()
  }

  const qrModal = () => {
    setOpen(true);
  };

  const downloadImage = (imageUrl, storeName) => {
    fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => {
        // Crear un objeto URL para el Blob
        const url = window.URL.createObjectURL(blob);

        // Crear un enlace para la descarga
        const link = document.createElement('a');
        link.href = url;

        // Establecer el nombre del archivo usando el nombre de la tienda
        const filename = `${storeName}_qr.png`;
        link.download = filename;

        // Simular un clic en el enlace
        link.click();

        // Liberar el objeto URL
        window.URL.revokeObjectURL(url);
      })
      .catch(error => console.error('Error al descargar la imagen:', error));
  };


  return (
    <Layout>
      {
        loading ?
          <Rings width={30} height={30} color="#fff" radius="6" />
          : <>
            {userStore ? (
              <>
                <div className="bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
                  <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-gray-900 shadow-md rounded-lg overflow-hidden">
                      {/* Banner */}
                      <div className="overflow-hidden w-full h-32">
                        {previewImageBanner ?
                          <img src={previewImageBanner} className="w-full h-32 object-cover" alt="Preview" />
                          :
                          <>
                            {
                              bannerImagePath ? <img src={bannerImagePath} alt="Banner" className="w-full h-32 object-cover" /> 
                              :
                                <div className="flex items-center justify-center w-full h-full bg-gray-600">
                                  <PhotoIcon width={40} height={40} color="#929292" />
                                </div>
                            }
                          </>
                        }
                      </div>

                      {/* Contenido del perfil */}
                      <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {/* Logo */}
                          {previewImage ?
                            <img src={previewImage} alt="Logo" className="w-16 h-16 rounded-full" />
                            :
                            <>
                              {
                                profileImagePath ? <img src={profileImagePath} alt="Logo" className="w-16 h-16 rounded-full" />
                                  :
                                  <div className="w-16 h-16 rounded-full bg-gray-600 flex items-center justify-center">
                                     <BuildingStorefrontIcon width={30} height={30} color="#929292" />
                                  </div>
                              }
                            </>
                          }
                          {/* Nombre de la tienda y descripción */}
                          <div>
                            <h3 className="text-lg font-semibold">{userStore.name} {userStore.verified ? <CheckBadgeIcon className="h-5 w-5 inline-block text-blue-500" /> : <></>}</h3>
                            <p className="text-gray-400 text-sm">{userStore.description}</p>
                          </div>
                        </div>
                        {/* Botón */}
                        <button className="text-sm text-gray-500" onClick={qrModal}> <QrCodeIcon width={20} height={20} color="#929292" radius="6" /></button>
                      </div>


                      {/* Información adicional de la tienda */}
                      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                        <dl className="sm:divide-y sm:divide-gray-200">
                          <div className="py-3 flex justify-between sm:px-4 sm:py-5">
                            <dt className="text-sm font-medium text-gray-300">Dirección</dt>
                            {userStore.address ? (
                              <dd className="mt-1 text-sm text-gray-400 sm:mt-0 sm:col-span-2">{userStore.address}</dd>
                            ) : (
                              <dd className="mt-1 text-sm text-gray-400 sm:mt-0 sm:col-span-2">No hay dirección disponible</dd>
                            )}
                          </div>

                          <div className="py-3 flex justify-between sm:px-4 sm:py-5">
                            <dt className="text-sm font-medium text-gray-300">Ubicaciones en {userStore.city.nombre}</dt>
                            {userStore.location ? (
                              <dd className="mt-1 text-sm text-gray-400 sm:mt-0 sm:col-span-2">{userStore.location}</dd>
                            ) : (
                              <dd className="mt-1 text-sm text-gray-400 sm:mt-0 sm:col-span-2">No hay locaciones disponible</dd>
                            )}
                          </div>

                          <div className="py-3 flex justify-between sm:px-4 sm:py-5">
                            <dt className="text-sm font-medium text-gray-300">Teléfono</dt>
                            <dd className="mt-1 text-sm text-gray-400 sm:mt-0 sm:col-span-2">{userStore.phone}</dd>
                          </div>
                          <div className="py-3 flex justify-between sm:px-4 sm:py-5">
                            <dt className="text-sm font-medium text-gray-300">Correo Electrónico</dt>
                            <dd className="mt-1 text-sm text-gray-400 sm:mt-0 sm:col-span-2">{userStore.email}</dd>
                          </div>

                          <div className="py-3 flex justify-between sm:px-4 sm:py-5">
                            <dt className="text-sm font-medium text-gray-300">Horario de atención</dt>
                            <dd className="mt-1 text-sm text-gray-400 sm:mt-0 sm:col-span-2">{userStore.schedule}</dd>
                          </div>

                          <div className="py-3 flex justify-between sm:px-4 sm:py-5">
                            <dt className="text-sm font-medium text-gray-200">{userStore.likes} Me gusta</dt>
                            <dd className="mt-1 text-sm text-gray-400 sm:mt-0 sm:col-span-2">Se inauguró el {userStore.get_formatted_created_on}</dd>
                          </div>

                          {/* Agrega más información de la tienda según sea necesario */}
                          <div className="py-3 flex justify-between sm:px-4 sm:py-5">
                            <dt className="text-sm font-medium text-gray-300">

                              <div className="py-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:py-5">
                                <div className="mt-4 flex text-sm text-gray-300 sm:col-span-3 sm:mt-0">
                                  {updateBanner ? (
                                    <>
                                      <form onSubmit={onSubmitBanner} className="flex w-full items-center">
                                        <input
                                          type="file"
                                          name="banner"
                                          onChange={fileSelectedHandler}
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
                                              setUpdateBanner(false);
                                              setPreviewImageBanner(null);
                                              setBanner(null);
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
                                        onClick={() => setUpdateBanner(true)}
                                        className="flex items-center justify-center px-4 py-2 rounded-md bg-gray-800 text-white font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                      >
                                        <PhotoIcon className="mr-2" width={20} height={20} color="#fff" radius="6" />
                                        Agregar el banner a tu tienda
                                      </button>
                                    </>
                                  )}
                                </div>
                              </div>


                            </dt>
                            <dd className="mt-1 text-sm text-gray-400 sm:mt-0 sm:col-span-2">
                              <div className="py-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:py-5">
                                <div className="mt-4 flex text-sm text-gray-300 sm:col-span-3 sm:mt-0">
                                  {updatePhoto ? (
                                    <>
                                      <form onSubmit={onSubmitPhotos} className="flex w-full items-center">
                                        <input
                                          type="file"
                                          name="logo"
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
                                        className="flex items-center justify-center px-4 py-2 rounded-md bg-gray-800 text-white font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                      >
                                        <UserCircleIcon className="mr-2" width={20} height={20} color="#fff" radius="6" />
                                        Agregar el perfil a tu tienda
                                      </button>
                                    </>
                                  )}
                                </div>
                              </div>
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

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
                            <h2 className='text-gray-900 text-sm'>¡Aquí está el código QR de tu tienda! Utilízalo para compartirlo y llegar a más personas.</h2>
                            <div className="inline-block max-w-full p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
                              <img src={qrcodeImagePath} className="w-full" alt="Preview" />
                            </div>

                            <button
                              className="inline-block px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none mr-2"
                              onClick={() => downloadImage(qrcodeImagePath, userStore.name)}
                            >
                              Descargar código QR
                            </button>



                          </Dialog.Panel>
                        </Transition.Child>
                      </div>
                    </div>
                  </Dialog>
                </Transition.Root>
              </>
            ) : (
              <Create />

            )}


          </>
      }

    </Layout>
  )
}
const mapStateToProps = state => ({
  userStore: state.Store.store,
  loading: state.Store.loading
})
export default connect(mapStateToProps, {
  get_user_store
})(Store)
