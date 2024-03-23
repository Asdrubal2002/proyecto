import React, { useEffect } from 'react'
import { connect } from "react-redux"
import { CheckCircleIcon, ChevronRightIcon, ClipboardDocumentCheckIcon, CurrencyDollarIcon, EnvelopeIcon, XCircleIcon } from '@heroicons/react/24/outline';

function ProductCard({
  data
}) {


  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);


  return (
    <>
      <div className="overflow-hidden bg-white shadow sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          <li key={data.id}>
            <a href={data.href} className="block hover:bg-gray-50">
              <div className="flex items-center px-4 py-4 sm:px-6">
                <div className="flex min-w-0 flex-1 items-center">
                  {/* <div className="flex-shrink-0">
                    <img className="h-12 w-12 rounded-full" src={data.applicant.imageUrl} alt="" />
                  </div> */}
                  <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                    <div>
                      <p className="truncate text-sm font-medium text-azul_corp">{data.name}</p>
                      <p className="mt-2 flex items-center text-sm text-gray-500">
                        <ClipboardDocumentCheckIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        {/* <span className="truncate">{data.applicant.email}</span> */}
                        {data.category.name}
                      </p>
                    </div>
                    <div className="hidden md:block">
                      <div>
                        <p className="text-sm flex text-gray-900">
                        <CurrencyDollarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                          {/* Applied on <time dateTime={data.date}>{data.dateFull}</time> */}
                           {data.price}
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500">
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
                <div>
                  <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </>

  )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {

})(ProductCard)
