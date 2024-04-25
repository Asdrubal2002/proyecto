import React from 'react'
import { connect } from "react-redux";

import { Link } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { HeartIcon } from '@heroicons/react/24/outline';
import { add_to_wish_list } from '../../redux/actions/wish_list';
import { useEffect, useState, Fragment } from 'react';
import { Dialog, Transition, Disclosure } from '@headlessui/react'
import ProductModal from './ProductModal';



function dataCard({ data, index, add_to_wish_list, isAuthenticated }) {

  const [open, setOpen] = useState(false)


  const hasImages = data && data.images && data.images.length > 0;
  return (
    <>
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

        <div className="block bg-gray-700 bg-opacity-75 transition-colors duration-300 rounded-b-lg">
          <button onClick={e => setOpen(true)} className="w-full h-full p-4 hover:bg-opacity-100 focus:bg-opacity-100">
            <div className="flex flex-col items-start">
              <h3 className="text-lg font-medium text-gray-300">{data.name}</h3>
              <p className="text-sm text-gray-400 ">{data.description.length > 150 ? `${data.description.slice(0, 30)}...` : data.description}</p>
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
          </button>
        </div>
      </div>


      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10 " onClose={setOpen}>
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-stone-900 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 w-full max-w-4xl sm:p-6">
                  <ProductModal data={data} isAuthenticated={isAuthenticated} />
                  {/* Contenido del modal */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

    </>






  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,

})

export default connect(mapStateToProps, {
  add_to_wish_list
})(dataCard)