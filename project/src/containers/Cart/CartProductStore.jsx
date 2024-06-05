import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition, } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { connect } from "react-redux";
import { get_user_cart_from_store } from '../../redux/actions/cart';
import CartItem from '../../components/cart/CartItem';
import { Link } from 'react-router-dom';

const CartProductStore = ({
  open,
  setOpen,
  storeSlug,
  get_user_cart_from_store,
  cart,
  store
}) => {
  const [render, setRender] = useState(false);

  useEffect(() => {
    get_user_cart_from_store(storeSlug)
  }, [render])

  const showItems = () => {
    return (
      <div>
        {
          cart && cart.items &&
          cart && cart.items !== null &&
          cart && cart.items !== undefined &&
          cart && cart.items.length !== 0 &&
          cart && cart.items.map((item, index) => {
            return (
              <div key={index}>
                {/* Renderizar contenido de cada item 8:56:46*/}
                <CartItem
                  item={item}
                  setRender={setRender}
                  render={render}
                />
              </div>
            );
          })
        }
      </div>
    )
  }

  return (
    <Transition show={open}>
      <Dialog className="relative z-100" onClose={setOpen}>
        <Transition.Child
           as={Fragment}
           enter="transition-opacity ease-linear duration-300"
           enterFrom="opacity-0"
           enterTo="opacity-100"
           leave="transition-opacity ease-linear duration-300"
           leaveFrom="opacity-100"
           leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
               as={Fragment}
               enter="transition ease-in-out duration-300 transform"
               enterFrom="translate-x-full"
               enterTo="translate-x-0"
               leave="transition ease-in-out duration-300 transform"
               leaveFrom="translate-x-0"
               leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto max-w-xl">
                  <div className="flex h-full flex-col bg-stone-900 shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-200">({cart && cart.items ? cart.items.length : 0})Productos seleccionados</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200 ">
                            {showItems()}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-200">
                        <p>Subtotal</p>
                         <p>${cart&&cart.total_con_impuestos_formateado}</p> 
                      </div>
                      <p className="mt-0.5 text-sm text-gray-400">El método de entrega se calculan más adelante.</p>
                      <div className="mt-6">
                        <Link
                          to={`/${cart&&cart.slug}/products/`}
                          className="flex items-center justify-center rounded-md border border-transparent bg-azul_corp px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-azul_corp_ho"
                        >
                          Pedir a {store&&store.name}
                        </Link>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          o{' '}
                          <button
                            type="button"
                            className="font-medium text-azul_corp_ho hover:text-azul_corp"
                            onClick={() => setOpen(false)}
                          >
                           Seguir seleccionando
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>

  )
}

const mapStateToProps = state => ({
  cart: state.Cart.cart,
  store: state.Stores.store

})

export default connect(mapStateToProps, {
  get_user_cart_from_store
})(CartProductStore)