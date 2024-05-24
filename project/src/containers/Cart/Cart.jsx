import React, { useEffect, useState } from 'react';
import Layout from '../../hocs/Layout';
import { connect } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import NoFoundCarts from './NoFoundCarts';
import { CheckIcon, TrashIcon, DocumentCheckIcon, ArrowUpIcon, ChevronUpIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { InfinitySpin, Rings } from "react-loader-spinner";
import { remove_cart } from '../../redux/actions/cart';

function Cart({ isAuthenticated, carts, loading, remove_cart }) {
  if (!isAuthenticated)
    return <Navigate to="/" />;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  const [isRemovingCart, setIsRemovingCart] = useState(false);
  const navigate = useNavigate();


  const handleRemoveCart = async (slug) => {
    setIsRemovingCart(true);
    await remove_cart(slug);
    setIsRemovingCart(false);
    navigate('/invoices');
  };


  return (
    <Layout>
      <Helmet>
        {/* Metadatos */}
      </Helmet>
      {loading ? (
        <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
          <InfinitySpin width={250} height={250} color="#fff" radius="6" />
        </div>
      ) : (
        <div className="py-14 sm:py-14">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-200 sm:text-4xl">Centro de compras</h2>
            </div>
            {carts.map((cart) => (
              <div key={cart.id} className="mx-auto mt-10 max-w-2xl rounded-3xl sm:mt-10 lg:mx-0 lg:flex lg:max-w-none bg-stone-900">
                <div className="p-8 sm:p-10 lg:flex-auto">
                  <div className="flex items-center">
                    {
                      cart.store.logo ? <img src={cart.store.logo} alt="" className="h-10 w-10 rounded-full" />
                        :
                        <div className='h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center'>
                          <BuildingStorefrontIcon width={20} height={20} color="#929292" />
                        </div>
                    }
                    <Link to={`/store/${cart.store.slug}`} className="flex items-center flex-grow">
                      <h3 className="text-2xl font-bold tracking-tight text-gray-300 mx-2">{cart.store.name}</h3>
                    </Link>

                    <button onClick={() => handleRemoveCart(cart.slug)} className="ml-2 text-gray-400" disabled={isRemovingCart}>
                      <TrashIcon className="w-6 h-6" />
                    </button>
                    <Link to={`/policies/${cart.store.slug}`} className="ml-2 text-gray-400" disabled={isRemovingCart}>
                      <DocumentCheckIcon className="w-6 h-6" />
                    </Link>
                  </div>
                  {/* <p className="mt-6 text-base text-gray-400">
                    Tienes productos seleccionados en esta tienda.
                  </p> */}

                  <div className="mt-10 flex items-center gap-x-4">
                    <h4 className="flex-none text-sm font-semibold leading-6 text-azul_corp_ho">Tus productos</h4>
                    <div className="h-px flex-auto bg-gray-100" />
                  </div>

                  <ul
                    role="list"
                    className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-400 sm:grid-cols-2 sm:gap-6"
                  >
                    {cart.items.map((item) => (
                      <li key={item.id} className="flex gap-x-3">
                        <CheckIcon className="h-6 w-5 flex-none text-azul_corp_ho" aria-hidden="true" />
                        {/* {item.product.name} - {item.product.price} - Cantidad: {item.quantity} */}
                        <p>{item.product_option.product.name} -  {item.product_option.option.value} - {item.quantity} - {item.subtotal}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  to={`/${cart.slug}/products/`}
                  disabled={isRemovingCart}
                  className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0  rounded-r-lg flex"
                >
                  <div className="flex-1 rounded-2xl bg-gray-50 py-10 text-center flex flex-col justify-center hover:bg-gray-400">
                    <div className="mx-auto max-w-xs px-8">
                      <p className="text-base font-semibold text-gray-600">Total productos en {cart.store.name}</p>
                      <p className="mt-6 flex items-baseline justify-center gap-x-2">
                        <span className="text-5xl font-bold tracking-tight text-gray-900 ">{cart.total_con_impuestos_formateado}</span>
                        <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">{cart.store.city.estado_o_departamento.pais.currency.typecurrency}</span>
                      </p>
                      <div
                        className="mt-10 block w-full rounded-md bg-azul_corp px-3 py-2 text-center text-sm font-semibold text-white shadow-sm"
                      >
                        Accede a tus productos seleccionados de la tienda
                      </div>
                    </div>
                  </div>
                </Link>

              </div>
            ))}
            {carts.length === 0 && <NoFoundCarts />}
          </div>
        </div>
      )}
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
  carts: state.Cart.carts.carts,
  loading: state.Cart.loading_carts,
});

export default connect(mapStateToProps, { remove_cart })(Cart);
