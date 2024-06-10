import { BuildingStorefrontIcon, ListBulletIcon, CircleStackIcon, CheckCircleIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom';
import { connect } from "react-redux"
import { get_user_store } from '../../redux/actions/store/store';



function StepStore({userStore}) {

  const features = [
    {
      name: '1- Crear el perfil de mi tienda',
      description: 'Nombrarás tu tienda, establecerás el usuario de tu tienda, la dirección y el alcance de las localidades.',
      icon: userStore ? CheckCircleIcon : BuildingStorefrontIcon,
      link: '/store',
      button: userStore ? '¡Felicidades, has creado tu tienda!':'Haz clic aquí para crear tu tienda',
    },
    {
      name: '2- Crear categorías dentro de mi tienda',
      description: 'Nombrarás las categorías de tu tienda para darle una mejor organización y facilitar la búsqueda de productos a tus clientes.',
      icon: ListBulletIcon,
      link: '/categories',
      button: 'Haz clic aquí para crear categorías',
    },
    {
      name: '3- Crear mis productos',
      description: 'Crearás los productos que quieres vender, incluyendo las opciones disponibles, imágenes de los productos, precios y los impuestos aplicables a cada uno.',
      icon: CircleStackIcon,
      link: '/products',
      button: 'Haz clic aquí para crear Productos',
    },
    {
      name: '4- Métodos de entrega',
      description: 'Configurarás los métodos de entrega para tus productos, incluyendo opciones y tarifas.',
      icon: CircleStackIcon,
      link: '/shipping',
      button: 'Haz clic aquí para crear Método',
    },
  ];
  return (
    <div className="relative isolate overflow-hidden px-6 lg:overflow-visible lg:px-0">
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-base font-semibold leading-7 text-azul_corp_ho">Vamos a crear tu tienda</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-200 sm:text-4xl">Sigue estos pasos para completarla</h1>
              <p className="mt-6 text-md leading-8 text-gray-300">
                Crearás el perfil de tu tienda, categorías, productos, métodos de entrega, opciones de productos, y administrarás tus pedidos.
              </p>
            </div>
          </div>
        </div>
        <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <img
            className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
            src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
            alt="Product screenshot"
          />
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-md leading-7 text-gray-300 lg:max-w-lg">
              <p>
                Siguiendo estos pasos podrás configurar tu tienda de manera rápida y eficiente.
              </p>
              <ul role="list" className="mt-8 space-y-8 text-gray-400">
                {features.map((feature) => (
                  <li key={feature.name} className="flex gap-x-3">
                    <feature.icon className="mt-1 h-5 w-5 flex-none text-azul_corp_ho" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-azul_corp_ho">{feature.name}</strong>
                      <p>{feature.description}</p>
                      <Link to={feature.link} className="text-azul_corp_ho hover:text-azul_corp">{feature.button}</Link>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-8">
                Completa cada uno de estos pasos para asegurar que tu tienda esté configurada correctamente.
              </p>
              <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">No server? No problem.</h2>
              <p className="mt-6">
                Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam consequat in. Convallis arcu ipsum urna nibh.
                Pharetra, euismod vitae interdum mauris enim, consequat vulputate nibh. Maecenas pellentesque id sed
                tellus mauris, ultrices mauris. Tincidunt enim cursus ridiculus mi. Pellentesque nam sed nullam sed diam
                turpis ipsum eu a sed convallis diam.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  userStore: state.Store.store,
})

export default connect(mapStateToProps, {
  get_user_store
})(StepStore)

