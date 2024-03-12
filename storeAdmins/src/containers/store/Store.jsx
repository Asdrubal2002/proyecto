import React, { useEffect } from 'react'
import { connect } from "react-redux"
import Layout from '../../hocs/Layout'

import { get_user_store } from '../../redux/actions/store/store'
import { Link } from 'react-router-dom';
import { CloudArrowUpIcon, LockClosedIcon, PaperClipIcon, ServerIcon } from '@heroicons/react/24/outline';
import Create from './Create';


function Store({
  get_user_store,
  userStore
}) {


  useEffect(() => {
    window.scrollTo(0, 0)
    get_user_store()
  }, []);

  return (
    <Layout>
      {userStore ? (
        <div>
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-gray-100">Información de tienda</h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-300">Personal details and application.</p>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-100">Nombre de tu tienda</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-200 sm:col-span-2 sm:mt-0">{userStore.name}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-100">Categoria</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-200 sm:col-span-2 sm:mt-0">{userStore.category.name}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-100">Correo</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-200 sm:col-span-2 sm:mt-0">{userStore.email}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-100">Teléfono</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-200 sm:col-span-2 sm:mt-0">{userStore.phone}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-100">Horario de atención</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-200 sm:col-span-2 sm:mt-0">{userStore.schedule}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-100">Alcance barrial</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-200 sm:col-span-2 sm:mt-0">{userStore.location}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-100">Identificación tributaria</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-200 sm:col-span-2 sm:mt-0">{userStore.nit}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-100">Presentación</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-200 sm:col-span-2 sm:mt-0">
                {userStore.description}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-100">Imagenes</dt>
                <dd className="mt-2 text-sm text-gray-100 sm:col-span-2 sm:mt-0">
                  <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                      <div className="flex w-0 flex-1 items-center">
                        <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                          <span className="truncate font-medium">resume_back_end_developer.pdf</span>
                          <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                          Download
                        </a>
                      </div>
                    </li>
                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                      <div className="flex w-0 flex-1 items-center">
                        <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                          <span className="truncate font-medium">coverletter_back_end_developer.pdf</span>
                          <span className="flex-shrink-0 text-gray-400">4.5mb</span>
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                          Download
                        </a>
                      </div>
                    </li>
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      ) : (
        <Create />

      )}
    </Layout>

  )
}

const mapStateToProps = state => ({
  userStore: state.Store.store
})

export default connect(mapStateToProps, {
  get_user_store
})(Store)
