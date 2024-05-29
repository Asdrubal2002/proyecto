import { CheckBadgeIcon, BuildingStorefrontIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from "react-redux";


function StoreCardHorizontal({ data, index }) {

  const handleHeartClick = () => {
    // Aquí puedes llamar a la función deseada al hacer clic en el icono del corazón
  };


  return (
    <div className="bg-stone-900 rounded-md overflow-hidden shadow-stone-800 transition-shadow duration-300 shadow-md hover:shadow-lg hover:shadow-stone-800">
      <Link to={`/store/${data.slug}`} className="flex flex-col md:flex-row">
        {
          data.banner && (
            <img className="object-cover w-full md:w-48 h-64 md:h-auto md:rounded-none md:rounded-l-lg" src={data.banner} alt={data.name} />
          )
        }

        <div className="p-4 md:p-6 flex flex-col justify-between">
          <div>
            <div className="text-gray-400 text-sm">
              {data.city.nombre} - {data.city.estado_o_departamento.nombre}
            </div>
            <h2 className="text-2xl estilo_letra text-white mb-2 ">{data.name} {data.verified && <CheckBadgeIcon className="h-6 w-6 inline-block text-blue-500" />}</h2>
            <p className="text-dm md:text-dm text-gray-400 mb-3">{data.description.length > 200 ? data.description.slice(0, 200) + '...' : data.description}</p>
          </div>
          <div className="relative mt-2 flex items-center gap-x-4">
            {
              data.logo ? <img src={data.logo} alt="" className="h-10 w-10 rounded-full" />
                :
                <div className='h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center'>
                  <BuildingStorefrontIcon width={20} height={20} color="#929292" />
                </div>
            }
            <div className="text-sm leading-6">
              <p className="font-semibold text-gray-200">
                {data.name}
              </p>
              <p className="text-gray-300"> {data.schedule}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>






  )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {
})(StoreCardHorizontal)