import React, { useEffect, useState, Fragment } from 'react'
import { connect } from "react-redux"
import Layout from '../../hocs/Layout'

import { get_products, get_products_list_page } from '../../redux/actions/products/products'

import ProductList from '../../components/products/ProductList'
import { Dialog, Transition, Disclosure } from '@headlessui/react'

import { Rings } from "react-loader-spinner";
import Create from '../store/Create'
import axios from "axios"
import { get_user_store } from '../../redux/actions/store/store'

function Products({
  get_products,
  get_products_list_page,
  products,
  loading_products,
  count,
  userStore,
  categories,
  get_user_store
}) {


  useEffect(() => {
    window.scrollTo(0, 0)
    get_user_store()
    get_products()
  }, []);

  const [loading, setLoading] = useState(false)


  const [open, setOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = e => {
    setSelectedCategory(e.target.value);
  };

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    console.log(
      formData.get('name'),
      formData.get('category'),
      formData.get('description'),
      formData.get('price')
    );

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data', // Agregamos el Content-Type adecuado
        'Authorization': `JWT ${localStorage.getItem('access')}`
      }
    };

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/product/create-product/`,
          formData,
          config
        );

        if (res.status === 200) {
          setLoading(false);
        } else {
          setLoading(false);
          resetStates();
        }
      } catch (err) {
        setLoading(false);
        alert('Error al enviar', err);
      }
    };

    fetchData();
    get_products()
    setOpen(false)
  }


  const handleChange = (e) => {
    const { name, value } = e.target;

    // Eliminar puntos y comas del valor del precio
    const cleanedValue = value.replace(/[^\d]/g, '');

    setFormData({
      ...formData,
      [name]: cleanedValue
    });
  };


  return (
    <>
      <Layout>
        {userStore ? (
          <>
            {loading_products ? (
              <Rings width={30} height={30} color="#fff" radius="6" />
            ) : (
              <>
                {products && products.length > 0 ? (
                  <>
                    <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
                      <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                        <div className="ml-4 mt-2">
                          <h3 className="text-lg font-medium leading-6 text-gray-200">¿Tienes otro producto nuevo?</h3>
                        </div>
                        <div className="ml-4 mt-2 flex-shrink-0">
                          <button
                            onClick={e => setOpen(true)}
                            className="relative inline-flex items-center rounded-md border border-transparent bg-azul_corp px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-azul_corp_ho focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Crear producto
                          </button>
                        </div>
                      </div>
                    </div>
                    <ProductList products={products} get_products_list_page={get_products_list_page} count={count} />
                  </>
                ) : (
                  <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
                    <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                      <div className="ml-4 mt-2">
                        <h3 className="text-lg font-medium leading-6 text-gray-200">Nos alegra que estes aqui, crea tu primer producto</h3>
                      </div>
                      <div className="ml-4 mt-2 flex-shrink-0">
                        <button
                          onClick={e => setOpen(true)}
                          className="relative inline-flex items-center rounded-md border border-transparent bg-azul_corp px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-azul_corp_ho focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Crear producto
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          <div className='m-4'>
            <Create />
          </div>
        )}
      </Layout>


      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6">

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <h2 className="text-lg font-medium leading-6 text-gray-800">crea tu producto</h2>
                    <input
                      name='name'
                      type='text'
                      placeholder='Nuevo nombre'
                      className="p-2 rounded-md focus:outline-none bg-gray-300 text-sm sm:leading-6 placeholder:text-gray-600 text-gray-900"
                      required
                    />
                    <select
                      name='category'
                      className="p-2 rounded-md focus:outline-none bg-gray-300 text-sm sm:leading-6 placeholder:text-gray-600 text-gray-900"
                      required
                    >
                      <option value="">Seleccione una categoría...</option>
                      {categories && categories.map(category => (
                        <React.Fragment key={category.id}>
                          {category.parent ? (
                            <option value={category.id}>{category.name}</option>
                          ) : (
                            <optgroup label={category.name}>
                              {categories.filter(childCategory => childCategory.parent === category.id).map(childCategory => (
                                <option key={childCategory.id} value={childCategory.id}>{childCategory.name}</option>
                              ))}
                            </optgroup>
                          )}
                        </React.Fragment>
                      ))}
                    </select>
                    <textarea
                      name='description'
                      placeholder='Nueva descripción'
                      className="p-2 rounded-md focus:outline-none bg-gray-300 text-sm sm:leading-6 placeholder:text-gray-600 text-gray-900"
                      required
                    />
                    <input
                      name='price'
                      type='number'
                      placeholder='Nuevo precio'
                      className="p-2 rounded-md focus:outline-none bg-gray-300 text-sm sm:leading-6 placeholder:text-gray-600 text-gray-900"
                      onChange={handleChange}
                      required
                    />
                    <button type="submit" className="px-4 py-2 rounded-md bg-azul_corp text-white font-medium hover:bg-azul_corp_ho focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Enviar</button>
                  </form>
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
  products: state.Products.products,
  loading_products: state.Products.loading_products,
  count: state.Products.count,
  next: state.Products.next,
  previous: state.Products.previous,
  userStore: state.Store.store,
  categories: state.Product_category.categories


})

export default connect(mapStateToProps, {
  get_products,
  get_products_list_page,
  get_user_store
})(Products)
