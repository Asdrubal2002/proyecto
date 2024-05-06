import { CloudArrowUpIcon, LockClosedIcon, ServerIcon, InformationCircleIcon, CircleStackIcon, UserGroupIcon, AtSymbolIcon, InboxArrowDownIcon, DocumentMagnifyingGlassIcon } from '@heroicons/react/20/solid'
import Layout from '../../hocs/Layout'
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, Navigate } from "react-router-dom";


const features = [
  {
    name: 'Aceptación de los Términos:',
    description: (
      <>
        <div className="mb-8">
          <p>Al utilizar nuestra aplicación, aceptas automáticamente estos términos y condiciones. Si no estás de acuerdo con alguno de los términos, por favor, no utilices la aplicación.</p>
        </div>
      </>

    ),
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Registro de Usuario:',
    description: (
      <>
        <div className="mb-8">
          <p>Para registrarte en nuestra aplicación, debes ser mayor de edad y proporcionar información precisa y completa durante el proceso de registro. Te comprometes a mantener la confidencialidad de tu contraseña y a informarnos de cualquier uso no autorizado de tu cuenta.</p>
        </div>
      </>
    ),
    icon: InformationCircleIcon,
  },
  {
    name: 'Uso Aceptable:',
    description: (
      <>
        <div className="mb-8">
          <p>No puedes utilizar nuestra aplicación de manera que viole las leyes aplicables o infrinja los derechos de terceros. Esto incluye, entre otros, el envío de contenido ilegal, la realización de actividades fraudulentas o el acoso a otros usuarios.</p>
        </div>
      </>
    ),
    icon: ServerIcon,
  },
  {
    name: 'Propiedad Intelectual',
    description: (
      <>
        <div className="mb-8">
          <p>Todos los derechos de propiedad intelectual sobre el contenido y la tecnología de nuestra aplicación son propiedad de nuestra empresa o de nuestros licenciantes. No tienes derecho a reproducir, distribuir o modificar dicho contenido sin nuestro consentimiento previo por escrito.</p>
        </div>


      </>
    ),
    icon: CircleStackIcon,
  },

  {
    name: 'Limitación de Responsabilidad',
    description: (
      <>
        <div className="mb-8">
          <p>En la máxima medida permitida por la ley, nuestra empresa no será responsable de ningún daño directo, indirecto, incidental, especial o consecuente derivado del uso de nuestra aplicación.</p>
        </div>
      </>
    ),
    icon: UserGroupIcon,
  },

  {
    name: 'Modificaciones y Cancelación',
    description: (
      <>
        <div className="mb-8">
          <p>Nos reservamos el derecho de modificar, suspender o cancelar cualquier aspecto de nuestra aplicación en cualquier momento y sin previo aviso. Además, puedes cancelar tu cuenta en cualquier momento sin penalización.</p>
        </div>
      </>
    ),
    icon: LockClosedIcon,
  },
  {
    name: 'Jurisdicción y Ley Aplicable',
    description: (
      <>
        <div className="mb-8">
          <p>Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes del país donde se encuentre registrada nuestra empresa. Cualquier disputa relacionada con estos términos estará sujeta a la jurisdicción exclusiva de los tribunales de dicho país.</p>
        </div>

      </>
    ),
    icon: DocumentMagnifyingGlassIcon,
  },
  {
    name: 'Consentimiento para Comunicaciones Electrónicas:',
    description: (
      <>
        <div className="mb-8">
          <p>Al utilizar nuestra aplicación, aceptas recibir comunicaciones electrónicas de nuestra parte, como correos electrónicos informativos o notificaciones sobre cambios en los términos y condiciones.</p>
        </div>

      </>
    ),
    icon: InboxArrowDownIcon,
  },
  {
    name: 'Privacidad y Protección de Datos:',
    description: (
      <>
        <div className="mb-8">
          <p>Remitimos a nuestra política de privacidad para obtener información sobre cómo recopilamos, utilizamos y protegemos tus datos personales. <Link to={'/policies'} className='text-azul_corp_ho'>Políticas de privacidad y menejo</Link></p>

        </div>


      </>
    ),
    icon: AtSymbolIcon,
  },
]
export default function Conditions() {

  useEffect(() => {
    window.scrollTo(0, 0)

  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Ruvlo | Términos y condiciones</title>
        <meta name="description" content="Lo que sale en google" />
        <meta name="keywords" content='palabras para google' />
        <meta name="robots" content='all' />
        <link rel="canonical" href="https://www.ruvlo.com/" />
        <meta name="author" content='Ruvlo' />
        <meta name="publisher" content='Ruvlo' />

        {/* Social Media Tags */}
        <meta property="og:title" content='Ruvlo |  Busqueda tiendas' />
        <meta property="og:description" content='descripcion.' />
        <meta property="og:url" content="https://www.ruvlo.com/" />
        <meta property="og:image" content='https://bafybeicwrhxloesdlojn3bxyjqnxgsagtd4sl53a7t4cn4vfe2abmybzua.ipfs.w3s.link/lightbnuilbg.jpg' />

        <meta name="twitter:title" content='Ruvlo |  Busqueda tiendas' />
        <meta
          name="twitter:description"
          content='descripcion.'
        />
        <meta name="twitter:image" content='https://bafybeicwrhxloesdlojn3bxyjqnxgsagtd4sl53a7t4cn4vfe2abmybzua.ipfs.w3s.link/lightbnuilbg.jpg' />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <div className="relative isolate overflow-hidden px-6 py-20 sm:py-20 lg:overflow-visible lg:px-0">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="lg:max-w-lg">
                <p className="text-base font-semibold leading-7 text-azul_corp_ho">Términos y condiciones</p>
                <h1 className="mt-2 text-3xl text-gray-200 sm:text-4xl">Ruvlo</h1>
                <p className="mt-6 text-xl leading-8 text-gray-300">
                Bienvenido a nuestra aplicación de gestión de tiendas en línea. Valoramos la privacidad y la seguridad de la información personal de nuestros usuarios. A continuación, detallamos nuestros términos y condiciones
                </p>
              </div>
            </div>
          </div>
          <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
            <img
              className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
              src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
              alt=""
            />
          </div>
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="max-w-xl text-base leading-7 text-gray-300 lg:max-w-lg">
                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                  {features.map((feature) => (
                    <div key={feature.name} className="relative pl-9">
                      <dt className="inline font-semibold text-azul_corp_ho">
                        <feature.icon className="absolute left-1 top-1 h-5 w-5 text-azul_corp_ho" aria-hidden="true" />
                        {feature.name}
                      </dt>{' '}
                      <dd className="inline text-gray-400">{feature.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>

  )
}
