import React, { useEffect } from 'react'
import { connect } from "react-redux"
import { CheckCircleIcon, ClipboardDocumentCheckIcon, CurrencyDollarIcon, EnvelopeIcon, FlagIcon, PhotoIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

function ProductCard({
  data
}) {

  const hasImages = data && data.images && data.images.length > 0;

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);


  return (
    <>
      <Link to={`/product/${data.slugProduct}`} className="overflow-hidden bg-white shadow sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          <li key={data.id}>
            <a href={data.href} className="block hover:bg-gray-50">
              <div className="flex items-center flex-1 px-2 py-2">
                {data.images[0] ? (
                  <div className="flex-shrink-0">
                    <img className="h-20 w-20 object-cover" src={import.meta.env.VITE_REACT_APP_API_URL + data.images[0].photo} alt="" />
                  </div>
                ) : (
                  <div className="flex-shrink-0 h-20 w-20 flex items-center justify-center bg-gray-200">
                    <PhotoIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                  </div>
                )}
                <div className="ml-2 md:grid md:grid-cols-2 md:gap-4">
                  <div>
                    <p className="mt-1 flex items-center text-sm text-azul_corp font-medium">
                      <FlagIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-text-azul_corp" aria-hidden="true" />
                      {data.name}
                    </p>
                    <p className="mt-1 flex items-center text-sm text-gray-500">
                      <ClipboardDocumentCheckIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                      {data.category.name}
                    </p>
                  </div>
                  <div className="hidden md:block">
                    <div>
                      <p className="text-sm flex text-gray-900">
                        <CurrencyDollarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        {data.price}
                      </p>
                      <p className="mt-1 flex items-center text-sm text-gray-500">
                        {data.is_active ? (
                          <CheckCircleIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400" aria-hidden="true" />
                        ) : (
                          <XCircleIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-red-400" aria-hidden="true" />
                        )}
                        {data.is_active ? 'Activo' : 'Inactivo'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </Link>
    </>

  )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {

})(ProductCard)
