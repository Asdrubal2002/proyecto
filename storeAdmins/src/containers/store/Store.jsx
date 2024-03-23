import React, { useEffect } from 'react'
import { connect } from "react-redux"
import Layout from '../../hocs/Layout'

import { get_user_store } from '../../redux/actions/store/store'
import { Link } from 'react-router-dom';
import { CloudArrowUpIcon, LockClosedIcon, PaperClipIcon, ServerIcon } from '@heroicons/react/24/outline';
import Create from './Create';
import { Rings } from 'react-loader-spinner';


function Store({
  get_user_store,
  userStore,
  loading
}) {
  const profileImagePath = userStore && userStore.logo ? import.meta.env.VITE_REACT_APP_API_URL + userStore.logo : null;
  const bannerImagePath = userStore && userStore.banner ? import.meta.env.VITE_REACT_APP_API_URL + userStore.banner : null;

  useEffect(() => {
    window.scrollTo(0, 0)
    get_user_store()
  }, []);

  return (
    <Layout>
      {
        loading ? 
        <Rings width={30} height={30} color="#fff" radius="6" />
        : <>
          {userStore ? (
            <div className="bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-gray-900 shadow-md rounded-lg overflow-hidden">
                  {/* Banner */}
                  <div className="overflow-hidden">
                    <img src={bannerImagePath} alt="Banner" className="w-full h-32 object-cover" />
                  </div>

                  {/* Contenido del perfil */}
                  <div className="p-4 flex items-center space-x-4">
                    {/* Logo */}
                    <img src={profileImagePath} alt="Logo" className="w-16 h-16 rounded-full" />

                    {/* Nombre de la tienda y descripción */}
                    <div>
                      <h3 className="text-lg font-semibold">{userStore.name}</h3>
                      <p className="text-gray-400 text-sm">{userStore.description}</p>
                    </div>
                  </div>

                  {/* Información adicional de la tienda */}
                  <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                      <div className="py-3 flex justify-between sm:px-4 sm:py-5">
                        <dt className="text-sm font-medium text-gray-500">Dirección</dt>
                        {userStore.address ? (
                          <dd className="mt-1 text-sm text-gray-400 sm:mt-0 sm:col-span-2">{userStore.address}</dd>
                        ) : (
                          <dd className="mt-1 text-sm text-gray-400 sm:mt-0 sm:col-span-2">No hay dirección disponible</dd>
                        )}
                      </div>

                      <div className="py-3 flex justify-between sm:px-4 sm:py-5">
                        <dt className="text-sm font-medium text-gray-500">Ubicaciones</dt>
                        {userStore.location ? (
                          <dd className="mt-1 text-sm text-gray-400 sm:mt-0 sm:col-span-2">{userStore.location}</dd>
                        ) : (
                          <dd className="mt-1 text-sm text-gray-400 sm:mt-0 sm:col-span-2">No hay locaciones disponible</dd>
                        )}
                      </div>

                      <div className="py-3 flex justify-between sm:px-4 sm:py-5">
                        <dt className="text-sm font-medium text-gray-500">Teléfono</dt>
                        <dd className="mt-1 text-sm text-gray-400 sm:mt-0 sm:col-span-2">{userStore.phone}</dd>
                      </div>
                      <div className="py-3 flex justify-between sm:px-4 sm:py-5">
                        <dt className="text-sm font-medium text-gray-500">Correo Electrónico</dt>
                        <dd className="mt-1 text-sm text-gray-400 sm:mt-0 sm:col-span-2">{userStore.email}</dd>
                      </div>
                      {/* Agrega más información de la tienda según sea necesario */}
                    </dl>
                  </div>
                </div>
              </div>
            </div>
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
