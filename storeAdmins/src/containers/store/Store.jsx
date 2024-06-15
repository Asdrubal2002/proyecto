import React, { useEffect, useState, Fragment } from 'react'
import { connect } from "react-redux"
import Layout from '../../hocs/Layout'
import { get_stores_likes, get_user_store } from '../../redux/actions/store/store'
import { Link } from 'react-router-dom';
import { ArchiveBoxArrowDownIcon, BuildingStorefrontIcon, ChatBubbleBottomCenterTextIcon, CheckBadgeIcon, CheckIcon, CloudArrowUpIcon, InformationCircleIcon, LockClosedIcon, PaperClipIcon, PencilIcon, PhotoIcon, PlusIcon, QrCodeIcon, ServerIcon, UserCircleIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Create from './Create';
import { DNA, Rings } from 'react-loader-spinner';
import axios from "axios"
import { Dialog, Menu, Transition, Disclosure, Tab } from '@headlessui/react'
import { get_store_comments } from '../../redux/actions/comments/Comments_store';
import FormCreatePolicy from '../../components/store/FormCreatePolicy';
import PoliticsFoundations from '../../components/store/PoliticsFoundations';
import Compressor from 'compressorjs';
import FormCreateFAQS from '../../components/store/FormCreateFAQS';



function Store({
  get_user_store,
  userStore,
  loading,
  get_stores_likes,
  likes
}) {

  const links = [
    { name: 'Editar datos de mi tienda', href: '/update_store' },
    { name: 'Crear políticas', href: '/create_policies' },
    { name: 'Crear preguntas frecuentes', href: '/create_faqs' },
    { name: '¿Necesitas ayuda?', href: '/help' },
  ]
  const stats = [
    { name: 'Me gusta', value: likes },
    { name: 'Full-time colleagues', value: '300+' },
    { name: 'Hours per week', value: '40' },
    { name: 'Paid time off', value: 'Unlimited' },
  ]

  useEffect(() => {
    window.scrollTo(0, 0)
    get_user_store()
    get_stores_likes(userStore && userStore.slug)
  }, []);

  const bannerImagePath = userStore && userStore.banner ? import.meta.env.VITE_REACT_APP_API_URL + userStore.banner : null;


  return (
    <Layout>
      {
        loading ?
          <div className="flex items-center justify-center h-screen">
            <DNA width={200} height={200} />

          </div> : <>
            {userStore ? (
              <>
                <div className="relative isolate overflow-hidden bg-gray-900 sm:py-16 py-24 rounded-lg ">

                  <img
                    src={bannerImagePath}
                    alt=""
                    className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center opacity-10"
                  />
                  <div
                    className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
                    aria-hidden="true"
                  >
                    <div
                      className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#0C4896] to-[#0268C8] opacity-20"
                      style={{
                        clipPath:
                          'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                      }}
                    />
                  </div>
                  <div
                    className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
                    aria-hidden="true"
                  >
                    <div
                      className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#0268C8] opacity-20"
                      style={{
                        clipPath:
                          'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                      }}
                    />
                  </div>
                  <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                      <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">{userStore.name} {userStore.verified ? <CheckBadgeIcon className="h-5 w-5 inline-block text-blue-500" /> : <></>}</h2>
                      <p className="mt-6 text-lg leading-8 text-gray-300">
                        {userStore.description}
                      </p>
                    </div>
                    <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
                      <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
                        {links.map((link) => (
                          <Link key={link.name} to={link.href}>
                            {link.name} <span aria-hidden="true">&rarr;</span>
                          </Link>
                        ))}
                      </div>
                      <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat) => (
                          <div key={stat.name} className="flex flex-col-reverse">
                            <dt className="text-base leading-7 text-gray-300">{stat.name}</dt>
                            <dd className="text-2xl font-bold leading-9 tracking-tight text-white">{stat.value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                </div>

              </>
            ) : (
              <Create />
            )}
          </>
      }
    </Layout>
  )
}
const mapStateToProps = state => ({
  userStore: state.Store.store,
  loading: state.Store.loading,
  count_comments: state.Comments_Store.comments ? state.Comments_Store.comments.comments_count : 0,
  comments: state.Comments_Store.comments ? state.Comments_Store.comments.comments : [],
  likes: state.Store.likes ? state.Store.likes.total_likes : 0
})
export default connect(mapStateToProps, {
  get_user_store,
  get_store_comments,
  get_stores_likes
})(Store)
