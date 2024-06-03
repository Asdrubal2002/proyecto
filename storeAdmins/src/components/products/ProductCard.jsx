import React, { useEffect } from 'react'
import { connect } from "react-redux"
import {
  ArrowTrendingDownIcon,
  ArrowsUpDownIcon,
  CheckCircleIcon,
  ClipboardDocumentCheckIcon,
  CurrencyDollarIcon,
  FlagIcon,
  PhotoIcon,
  XCircleIcon,
  ScaleIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

function ProductCard({
  data
}) {


  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);


  return (
    <>
      <Link to={`/product/${data.slugProduct}`} className="overflow-hidden bg-white shadow sm:rounded-md block hover:bg-gray-50">
        <div className="flex px-2 py-2">
          <div className="flex-shrink-0">
            {data.images[0] ? (
              <img className="h-20 w-20 object-cover" src={import.meta.env.VITE_REACT_APP_API_URL + data.images[0].photo} alt="" />
            ) : (
              <div className="h-20 w-20 flex items-center justify-center bg-gray-200">
                <PhotoIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              </div>
            )}
          </div>
          <div className="ml-2 flex flex-col">
            <p className="mt-1 flex items-center text-sm text-azul_corp font-medium">
              <FlagIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-text-azul_corp" aria-hidden="true" />
              {data.name}
            </p>
            <p className="mt-1 flex items-center text-sm text-gray-500">
              <ClipboardDocumentCheckIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              {data.category.name}
            </p>
            <div className="mt-2 flex">
              <div className="mr-4">
                <p className="text-sm flex text-gray-900">
                  <CurrencyDollarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                  {data.formatted_price}
                </p>
                <p className="mt-2 text-sm flex text-gray-900 font-semibold">
                  <BanknotesIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                  {data.price_with_tax}
                </p>
              </div>
              <div>
                <p className="text-sm flex text-gray-900 ">
                  <ScaleIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400 " aria-hidden="true" />
                  {data.tax} %
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-2 flex items-center text-sm text-gray-500 ml-2">
          {data.is_low_stock_alert ? (
            <>
              <div className="flex items-center justify-center mr-1.5 h-6 w-6 flex-shrink-0 bg-red-500 rounded-full">
                <ArrowTrendingDownIcon className="h-4 w-4 text-white" aria-hidden="true" />
              </div>
              <span className="inline-flex items-center rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                Bajo
              </span>
            </>
          ) : (
            <>
              <span className="inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                Estable
              </span>
              <div className="flex items-center justify-center mr-1.5 h-6 w-6 flex-shrink-0 ">
                <ArrowsUpDownIcon className="h-4 w-4 text-green-600" aria-hidden="true" />
              </div>

            </>
          )}
          <p className="mt-2 flex items-center text-sm text-gray-600">
            {data.is_active ? (
              <CheckCircleIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-600" aria-hidden="true" />
            ) : (
              <XCircleIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-red-400" aria-hidden="true" />
            )}
            {data.is_active ? 'Activo' : 'Inactivo'}
          </p>
        </div>
      </Link>


    </>

  )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {

})(ProductCard)
