import React, { useEffect, useState } from 'react'
import Layout from '../../hocs/Layout'

import { connect } from "react-redux";

import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';


import { BuildingStorefrontIcon, CheckIcon, ClockIcon, PencilIcon, QuestionMarkCircleIcon, UserCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

import { get_user_location } from '../../redux/actions/profile';

import {
  get_user_cart,
  increment_item,
  decrement_item,
  remove_item
} from '../../redux/actions/cart';
import CartItem from '../../components/cart/CartItem';
import { Rings } from 'react-loader-spinner';
import LocationForm from '../Profile/LocationForm';
import ProfileForm from '../Profile/ProfileForm';
import { get_shippings } from '../../redux/actions/shipping';
import { add_invoice } from '../../redux/actions/Invoice';



// ... Importaciones y componentes anteriores

function Products({
  isAuthenticated,
  get_user_cart,
  cart,
  get_user_location,
  increment_item,
  decrement_item,
  remove_item,
  location,
  profile,
  loading,
  get_shippings,
  shipping,
  add_invoice,
  loading_invoice
}) {

  const [render, setRender] = useState(false);

  const [mostrarContenido, setMostrarContenido] = useState(true);

  const [showForm, setShowForm] = useState(false); // Estado para controlar la visibilidad del formulario

  const [showFormLocation, setShowFormLocation] = useState(false);



  const [formData, setFormData] = useState({
    shipping_id: 0,
  });

  const { shipping_id } = formData;

  const onChange = (selectedShippingId) => {
    setFormData({ ...formData, shipping_id: selectedShippingId });
    console.log(shipping_id)
  };

  const toggleContenido = () => {
    setMostrarContenido(!mostrarContenido);
  };

  const params = useParams()
  const cart_slug = params.cart_slug

  const navigate = useNavigate();


  useEffect(() => {
    get_user_cart(cart_slug);
    get_user_location()
    get_shippings(cart_slug)
  }, [render]);

  // Verificar si cart_slug está presente y redirigir si no lo está

  if (!isAuthenticated)
    return <Navigate to='/' />;

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
                  increment_item={increment_item}
                  decrement_item={decrement_item}
                  remove_item={remove_item}
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


  //10:09:03
  const renderShipping = () => {

    const hasShippingOptions = shipping && shipping.length > 0;

    return (
      <div>

        {hasShippingOptions ? (
          // Renderizar opciones de envío si hay
          <div className='mb-5 grid gap-6 grid-cols-1 sm:grid-cols-2'>
            {shipping.map((shipping, index) => (
              <div
                key={index}
                className={`${shipping.id === shipping_id
                  ? 'border-blue-500 ring ring-blue-200'
                  : ''
                  } bg-white p-4 rounded-md shadow-md transition-transform transform hover:scale-105 cursor-pointer`}
                onClick={() => {
                  onChange(shipping.id);
                  const radioElement = document.getElementById(`shipping_option_${index}`);
                  if (radioElement) {
                    radioElement.click();
                  }
                }}>
                <div
                  className={`${shipping.id === shipping_id
                    ? 'bg-blue-500 text-white'
                    : 'bg-white border border-gray-300'
                    } inline-block w-4 h-4 rounded-full border-box mr-3 align-middle`}
                >
                  {shipping.id === shipping_id && <CheckIcon className="h-3 w-3 m-0.5" />}
                </div>
                <label htmlFor={`shipping_option_${index}`} className='text-xs text-gray-600'>
                  <span className="font-semibold">{shipping.name}</span> - ${shipping.price} - ({shipping.time_to_delivery} dias)  - {shipping.additional_notes}
                </label>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded-md mb-4">
            <p className="text-base font-semibold">Lo sentimos, no hay opciones de envío disponibles en este momento.</p>
          </div>
        )}
      </div>
    );
  };

  async function procesarCompra(profileF, storeF, shippingme, locationShi, cartF) {
    // Verificar si shippingme es 0
    if (shippingme === 0) {
      return;
    }

    // Si shippingme no es 0, continuar con el proceso de compra
    console.log("Se presionó el botón Comprar con los parámetros:", profileF, storeF, shippingme, locationShi, cartF);
    await add_invoice(profileF, storeF, shippingme, locationShi, cartF);
    navigate('/invoices');

  }


  return (
    <Layout>
      <Helmet>
        <title>Ruvlo | Tu Compra </title>
      </Helmet>
      <div>
        <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-300 sm:text-3xl">productos ({cart && cart.items ? cart.items.length : 0})</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">

            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>

              <ul role="list" className="border-t  border-gray-200 divide-y divide-gray-200">
                {/*  Verifica que cart y cart.items existan antes de llamar a showItems() */}
                {showItems()}

              </ul>
            </section>

            <section
              aria-labelledby="summary-heading"
              className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
            >
              <Link to={`/store/${cart && cart.store && cart.store.slug}`} className="flex items-center justify-between">
                <h2 id="summary-heading" className="text-lg font-medium text-gray-900 mr-2">
                  Detalle de compra
                </h2>
                <BuildingStorefrontIcon className="h-6 w-6 text-gray-500" />
              </Link>
              {mostrarContenido ? (
                <>
                  <dl className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-gray-600">Total productos</dt>

                      {loading ? <>
                        <Rings width={30} height={30} color="#0C4896" radius="6" />
                      </> : <>
                        {/* <dd className="text-sm font-medium text-gray-900">$ {cart && cart.total_sin_impuestos.toFixed(2)}</dd> */}
                        <dd className="text-sm font-medium text-gray-900">$ {cart && cart.total_sin_impuestos}</dd>
                      </>
                      }

                    </div>
                    <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                      <dt className="flex text-sm text-gray-600">
                        <span>Impuestos</span>
                        <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                          <span className="sr-only">Learn more about how tax is calculated</span>
                          <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                        </a>
                      </dt>
                      {loading ? <>
                        <Rings width={30} height={30} color="#0C4896" radius="6" />
                      </> : <>
                        {/* <dd className="text-sm font-medium text-gray-900">$ {cart && cart.total_impuestos.toFixed(2)}</dd> */}
                        <dd className="text-sm font-medium text-gray-900">$ {cart && cart.total_impuestos}</dd>
                      </>
                      }
                    </div>
                    <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                      <dt className="text-base font-medium text-gray-900">Total compra</dt>
                      {loading ? <>
                        <Rings width={30} height={30} color="#0C4896" radius="6" />
                      </> : <>
                        {/* <dd className="text-base font-medium text-gray-900">$ {cart && cart.total.toFixed(2)}</dd> */}
                        <dd className="text-base font-medium text-gray-900">$ {cart && cart.total}</dd>
                      </>
                      }
                    </div>
                  </dl>
                  <div className="mt-6 flex justify-between">
                    <button
                      onClick={toggleContenido}
                      className="flex-1 ml-3 bg-azul_corp border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-azul_corp_ho "
                    >
                      Iniciar compra
                    </button>
                  </div>
                </>) : (
                <div>
                  <>
                    <dl className="mt-6 space-y-4">
                      <dt className="text-sm text-gray-600">Selecciona tu método de entrega</dt>
                      <div className="flex items-center justify-between">
                        {renderShipping()}
                      </div>
                      <div className="bg-gray-100 p-6 rounded-md shadow-md text-black">
                        <div className="flex justify-between items-center mb-4">
                          <h2 className="text-lg font-medium text-gray-900">Dirección</h2>
                          <button onClick={() => setShowFormLocation(!showFormLocation)}>
                            <span className="flex items-center text-blue-500 hover:text-blue-700">
                              <PencilIcon className="h-6 w-6 mr-1" />
                            </span>
                          </button>

                        </div>

                        {showFormLocation ? (
                          <LocationForm />
                        ) : (
                          <>
                            {location.address_line_1 || location.address_line_2 || (location.city && location.city.nombre) || location.postal_zip_code || location.delivery_notes ? (
                              <div>
                                {location.address_line_1 && <p className="mb-2"><span className="font-semibold">Dirección Principal:</span> {location.address_line_1.replace(/.(?=.{4})/g, '*')}</p>}
                                {location.address_line_2 && <p className="mb-2"><span className="font-semibold">Dirección Secundaria:</span> {location.address_line_2}</p>}
                                {(location.city && location.city.nombre) && <p className="mb-2"><span className="font-semibold">Ciudad:</span> {location.city.nombre}</p>}
                                {location.postal_zip_code && <p className="mb-2"><span className="font-semibold">Código Postal:</span> {location.postal_zip_code}</p>}
                                {location.delivery_notes && <p className="mb-2"><span className="font-semibold">Notas:</span> {location.delivery_notes}</p>}
                              </div>
                            ) : (
                              <>
                                {/* <p>No hay datos disponibles</p> */}
                                <LocationForm />
                              </>
                            )}
                          </>
                        )}

                      </div>
                      <div className="bg-gray-100 p-6 rounded-md shadow-md text-black">
                        <div className="flex justify-between items-center mb-4">
                          <h2 className="text-lg font-medium text-gray-900">Responsable</h2>
                          <button onClick={() => setShowForm(!showForm)}>
                            <span className="flex items-center text-blue-500 hover:text-blue-700">
                              <PencilIcon className="h-6 w-6 mr-1" />
                            </span>
                          </button>
                        </div>
                        {showForm ? (
                          <ProfileForm />
                        ) : (
                          <>
                            {profile.firs_name || profile.last_name ? (
                              <p className="font-sans text-base">
                                <span className="inline-block mr-4">{profile.firs_name} {profile.last_name}</span>
                                <span className="inline-block">{profile.phone && profile.phone.replace(/.(?=.{2})/g, '*')}</span>
                              </p>
                            ) : (
                              <>
                                <ProfileForm />
                                {/* <p>No hay datos disponibles</p> */}
                              </>
                            )}
                          </>
                        )}
                      </div>

                      <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                        <dt className="text-base font-medium text-gray-900">Total compra</dt>
                        {loading ? <>
                          <Rings width={30} height={30} color="#0C4896" radius="6" />
                        </> : <>
                          {/* <dd className="text-base font-medium text-gray-900">$ {cart && cart.total.toFixed(2)}</dd> */}
                          <dd className="text-base font-medium text-gray-900">$ {cart && cart.total}</dd>
                        </>
                        }
                      </div>
                    </dl>
                    <div className="mt-6 flex justify-between">
                      <button
                        onClick={toggleContenido}
                        className="flex-1 bg-azul_corp border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-azul_corp_ho "
                      >
                        Volver
                      </button>
                      {profile.firs_name == null ? (<>

                        <Link to={'/dashboard'}
                          className="flex items-center justify-center ml-3 bg-azul_corp border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-azul_corp_ho "
                        >
                          <UserCircleIcon className="h-6 w-6" />
                        </Link>

                      </>) : (
                        <>{loading_invoice ? (<>
                          <button
                            className="flex items-center justify-center ml-3 bg-azul_corp border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-azul_corp_ho "
                          >
                            <Rings width={30} height={30} color="#fff" radius="6" />
                          </button>
                        </>
                        ) : (
                          <>
                            <button
                              onClick={() => procesarCompra(profile && profile.id, cart && cart.store.id, shipping_id, location && location.id, cart && cart.id)}
                              className="flex-1 ml-3 bg-azul_corp border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-azul_corp_ho "
                            >
                              Comprar
                            </button>
                          </>
                        )}</>)}

                    </div>
                    {shipping_id === 0 && (
                      <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded-md my-4">
                        <p className="text-base font-semibold">Por favor selecciona un método de envío antes de continuar.</p>
                      </div>
                    )}
                  </>

                </div>
              )}
            </section>
          </div>

        </div>

      </div>




    </Layout >
  );
}

// ... Conexión a Redux y exportación



const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  cart: state.Cart.cart,
  location: state.Profile.profile_location,
  profile: state.Profile.profile,
  loading: state.Cart.loading_carts,
  shipping: state.Shipping.shipping_options,
  loading_invoice: state.Invoice.loading
})

export default connect(mapStateToProps, {
  get_user_cart,
  increment_item,
  decrement_item,
  remove_item,
  get_user_location,
  get_shippings,
  add_invoice
})(Products)