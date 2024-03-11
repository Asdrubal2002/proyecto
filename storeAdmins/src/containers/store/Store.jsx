import React, { useEffect } from 'react'
import { connect } from "react-redux"
import Layout from '../../hocs/Layout'

import { get_user_store } from '../../redux/actions/store/store'
import { Link } from 'react-router-dom';
import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Tratado de manejo de tu tienda',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: CloudArrowUpIcon,
    linkTo: '/push-to-deploy',
  },
  {
    name: 'Tratamiento de datos',
    description: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
    icon: LockClosedIcon,
    linkTo: '/ssl-certificates',
  },
  {
    name: 'Crear mi tienda',
    description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    icon: ServerIcon,
    linkTo: '/create_store',
  },
];

function Store({
  get_user_store,
  userStore
}) {


  useEffect(() => {
    get_user_store()
  }, []);

  return (
    <Layout>
      {userStore ? (
        <h1 className="text-3xl font-bold underline">Tienda</h1>
      ) : (
        <div className="overflow-hidden ">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              <div className="lg:pr-8 lg:pt-4">
                <div className="lg:max-w-lg">
                  <h2 className="text-base font-semibold leading-7 text-azul_corp_ho">Con ruvlo</h2>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-gray-200 sm:text-4xl">Crea tu negocio</p>
                  <p className="mt-6 text-lg leading-8 text-gray-300">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque,
                    iste dolor cupiditate blanditiis ratione.
                  </p>
                  <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-300 lg:max-w-none">
                    {features.map((feature) => (
                      <div key={feature.name} className="relative pl-9">
                        <dt className="inline font-semibold text-gray-200">
                          <feature.icon className="absolute left-1 top-1 h-5 w-5 text-azul_corp_ho" aria-hidden="true" />
                          <Link to={feature.linkTo} className="text-azul_corp_ho hover:text-azul_corp">
                            {feature.name}
                          </Link>
                        </dt>{' '}
                        <dd className="inline text-sm">{feature.description}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
              <img
                src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
                alt="Product screenshot"
                className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                width={2432}
                height={1442}
              />
            </div>
          </div>
        </div>

      )}
    </Layout>

  )
}

const mapStateToProps = state => ({
  userStore: state.Store.store
})

export default connect(mapStateToProps, {
  get_user_store
})(Store)
