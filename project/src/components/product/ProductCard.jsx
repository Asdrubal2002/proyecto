import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useEffect, useState, Fragment } from 'react';
import { Dialog, Transition, Disclosure } from '@headlessui/react';
import ProductModal from './ProductModal';
import { HeartIcon, XMarkIcon } from '@heroicons/react/24/solid';
import DOMPurify from 'dompurify';
import LazyLoad from 'react-lazyload'; // Importa el componente LazyLoad
import { add_like_dislike_product } from '../../redux/actions/products';
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';

function dataCard({ data, index, isAuthenticated, add_like_dislike_product, storeSlug }) {

  const [open, setOpen] = useState(false)
  const [showBubble, setShowBubble] = useState(false);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return `${text.slice(0, maxLength)}...`;
    } else {
      return text;
    }
  };

  const handleButtonClick = (slug, e) => {
    e.stopPropagation();
    add_like_dislike_product(slug)
    // Aquí puedes agregar la lógica adicional que desees

    setShowBubble(true);
    setTimeout(() => {
      setShowBubble(false);
    }, 2000);
  };

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
              <div className="carousel-image-container relative" key={index}>
                <LazyLoad height={200} offset={100}>
                  {/* Envuelve cada imagen dentro de LazyLoad */}
                  <img
                    className="w-full h-full object-cover"
                    style={{ aspectRatio: '1/1' }}
                    src={image.photo}
                    alt={data.name}
                  />
                </LazyLoad>
                {/* Contenedor de descuento */}
                {data.discount !== "0" && (
                  <div className="absolute top-0 left-0 bg-red-500 text-white font-semibold px-4 py-1 rounded-b-full shadow-lg">
                    {data.discount}% Descuento
                  </div>
                )}
              </div>
            ))}
          </Carousel>
        ) : (
          <div className="no-images-message">No hay imágenes disponibles</div>
        )}

        <div
          className="block bg-gray-700 bg-opacity-75 transition-colors duration-300 rounded-b-lg cursor-pointer"
          onClick={(e) => setOpen(true)}
        >
          <div className="w-full h-full p-4 hover:bg-opacity-100 focus:bg-opacity-100 font-estilo_letra">
            <div className="flex flex-col items-start">
              <h3 className="text-md font-bold text-gray-300">{data.name}</h3>
              <p className="text-sm text-gray-300" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data && truncateText(data.description, 40)) }}></p>

              <div className="flex justify-between items-center w-full mt-1">
                <span className="text-md font-semibold text-gray-200 flex"> <CurrencyDollarIcon className="w-6 h-6 text-green-500" />{data.price_with_tax}</span>
                <div className="flex items-center">
                  <button
                    onClick={(e) => handleButtonClick(data.slugProduct, e)}
                    className="text-red-600 hover:text-red-300 focus:outline-none"
                  >
                    <HeartIcon className="w-8 h-8" />
                  </button>
                </div>
              </div>
            </div>
            {showBubble && (
              <div className="absolute bottom-16 right-4 bg-azul_corp text-white p-2 rounded-lg font-sm">
                {isAuthenticated ? (
                  <>Se agregado a favoritos</>
                ) : (
                  <>Tienes que ingresar a tu cuenta</>
                )}
              </div>
            )}
          </div>
        </div>
      </div>



      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-[100] " onClose={setOpen}>
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
                <button
                    type="button"
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                  <ProductModal data={data} isAuthenticated={isAuthenticated} closeModal={() => setOpen(false)} storeSlug={storeSlug}/>
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
  add_like_dislike_product
})(dataCard);
