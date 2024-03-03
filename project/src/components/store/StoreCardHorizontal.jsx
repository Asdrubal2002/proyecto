import { CheckBadgeIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import { add_to_wish_list_store } from "../../redux/actions/wish_list_stores";


function StoreCardHorizontal({ data, index, add_to_wish_list_store }) {

  const handleHeartClick = () => {
    // Aquí puedes llamar a la función deseada al hacer clic en el icono del corazón
    add_to_wish_list_store(data.slug)
  };


  return (
    <div className="pt-5 bg-stone-900 rounded-md">

      <article key={data.id} className="flex w-full flex-col items-start justify-between shadow-stone-800 transition-shadow duration-300 shadow-md hover:shadow-lg hover:shadow-stone-800 p-4">
        <div className="w-full flex justify-between items-center text-xs">
          <div className="text-gray-300">
            {data.city.nombre} - {data.city.estado_o_departamento.nombre}
          </div>
          <button
            onClick={handleHeartClick}
            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
          >
            {data.likes} Me gusta
          </button>
        </div>
        <Link to={`/store/${data.slug}`}>
          <div className="group relative">
            <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-300 group-hover:text-azul_corp_ho">
              {data.name}  {data.verified ? <CheckBadgeIcon className="h-5 w-5 inline-block text-blue-500" /> : <></>}
            </h3>
            <p className="mt-5 text-sm leading-6 text-gray-300">{data.description.length > 150 ? data.description.slice(0, 300) : data.description}</p>
          </div>
          <div className="relative mt-8 flex items-center gap-x-4">
            <img src={data.logo} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
            <div className="text-sm leading-6">
              <p className="font-semibold text-gray-400">
                {data.name}
              </p>
              <p className="text-gray-400"> {data.schedule}</p>
            </div>
          </div>
        </Link>


      </article>

    </div>





  )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {
  add_to_wish_list_store
})(StoreCardHorizontal)