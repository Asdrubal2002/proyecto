import React from 'react'
import { connect } from "react-redux";

import { Link } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { HeartIcon } from '@heroicons/react/24/outline';
import { add_to_wish_list } from '../../redux/actions/wish_list';



function dataCard({ data, index, add_to_wish_list,isAuthenticated }) {

  const hasImages = data && data.images && data.images.length > 0;
  return (

    <div className="group relative overflow-hidden transition-transform transform hover:scale-105 rounded-sm">
      {hasImages ? (
        <Carousel
          showArrows={true}
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          className="carousel-container"
        >
          {data.images.map((image, index) => (
            <div className="carousel-image-container" key={index}>
              <img
                className="w-full h-full object-cover"
                style={{ aspectRatio: '1/1' }}
                src={image.photo}
                alt={data.name}
              />
            </div>
          ))}
        </Carousel>
      ) : (
        <div className="no-images-message">No hay imágenes disponibles</div>
      )}

      <Link to={`/${data.slugProduct}/detail`} key={data.id} className="block bg-gray-700 bg-opacity-75 p-4 hover:bg-opacity-100 transition-colors duration-300 rounded-b-lg">
        <div className="flex flex-col items-start">
          <h3 className="text-lg font-medium text-gray-300">{data.name}</h3>
          <p className="mt-1 text-sm text-gray-400 w-full">{data.description.length > 150 ? `${data.description.slice(0, 30)}...` : data.description}</p>
          <div className="flex justify-between items-center w-full mt-1">
            <span className="text-md font-semibold text-gray-200">${data.price}</span>
            <div className="flex items-center">
              <button className="text-gray-400 hover:text-red-500 focus:outline-none" onClick={(e) => { e.preventDefault(); add_to_wish_list(data.slugProduct); }}>
                <HeartIcon className="w-8 h-8" />
              </button>
              <span className="text-gray-400 ml-1">{data.likes}</span> {/* Muestra el número de likes al lado del botón */}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,

})

export default connect(mapStateToProps, {
  add_to_wish_list
})(dataCard)