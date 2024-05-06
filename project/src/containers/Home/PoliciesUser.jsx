import { CloudArrowUpIcon, LockClosedIcon, ServerIcon, InformationCircleIcon, CircleStackIcon, UserGroupIcon, AtSymbolIcon, ShieldExclamationIcon} from '@heroicons/react/20/solid'
import Layout from '../../hocs/Layout'
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';


const features = [
  {
    name: 'Recopilación de Información:',
    description: (
      <>
        <div className="mb-8">
          <p><strong >Información Principal:</strong> Correo electrónico.</p>
          <p><strong >Información Secundaria:</strong> Nombres, apellidos, teléfono, identificación, foto, dirección, ciudad y código postal.</p>
        </div>

        <hr className="my-8" />

        <div className="mb-8">
          <p className="mb-4">Utilizamos esta información para los siguientes fines:</p>
          <ul className="list-disc list-inside">
            <li>Proporcionar acceso a la aplicación y sus funciones.</li>
            <li>Comunicarnos contigo sobre tu cuenta y los servicios que ofrecemos.</li>
            <li>Personalizar tu experiencia en la aplicación y mejorar nuestros servicios.</li>
            <li>Cumplir con requisitos legales y normativos.</li>
          </ul>
        </div>

        <hr className="my-8" />

        <div>
          <p>Al registrarte en nuestra aplicación, aceptas y consientes la recopilación y el uso de tu información personal de acuerdo con nuestras políticas de privacidad. Si tienes alguna pregunta o inquietud sobre cómo manejamos tu información, no dudes en ponerte en contacto con nosotros.</p>
        </div>
      </>

    ),
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Uso de la Información',
    description: (
      <>
        <>
          <div className="mb-8">
            <p>Utilizamos la información que recopilamos para los siguientes propósitos:</p>
            <ul className="list-disc list-inside">
              <li>Proporcionar y mantener nuestro servicio, incluido el seguimiento del uso de nuestra aplicación.</li>
              <li>Mejorar, personalizar y expandir nuestra aplicación.</li>
              <li>Entender y analizar cómo interactúan los usuarios con nuestra aplicación.</li>
              <li>Comunicarnos contigo, ya sea directamente o a través de uno de nuestros socios, incluidos fines de marketing y promocionales.</li>
              <li>Enviar notificaciones importantes, actualizaciones y otra información relacionada con el servicio.</li>
              <li>Proteger, investigar y prevenir cualquier actividad no autorizada, fraudulenta o ilegal.</li>
              <li>Cumplir con las obligaciones legales y regulatorias.</li>
            </ul>
          </div>

          <hr className="my-8" />

          <div>
            <p>Al utilizar nuestra aplicación, aceptas el uso de tu información de acuerdo con esta política de privacidad. Si tienes alguna pregunta o inquietud sobre cómo utilizamos tu información, no dudes en ponerte en contacto con nosotros.</p>
          </div>
        </>

      </>
    ),
    icon: InformationCircleIcon,
  },
  {
    name: 'Seguridad de la Información',
    description: (
      <>
        <div className="mb-8">
          <p>Nos comprometemos a garantizar la seguridad de tu información personal. Utilizamos medidas técnicas y organizativas adecuadas para proteger la confidencialidad, integridad y disponibilidad de tu información contra accesos no autorizados, divulgación, alteración o destrucción.</p>
          <p>Algunas de las medidas de seguridad que implementamos incluyen:</p>
          <ul className="list-disc list-inside">
            <li>Encriptación de datos durante la transmisión y en reposo.</li>
            <li>Acceso restringido a la información personal solo a aquellos empleados, contratistas y agentes autorizados que necesiten conocer esa información para operar, desarrollar o mejorar nuestros servicios.</li>
            <li>Protección contra ataques de seguridad y vulnerabilidades mediante monitoreo regular y actualizaciones de seguridad.</li>
            <li>Revisiones periódicas de nuestras prácticas de recopilación, almacenamiento y procesamiento de datos para garantizar el cumplimiento de las normativas de privacidad aplicables.</li>
          </ul>
        </div>

        <hr className="my-8" />

        <div>
          <p>Si tienes alguna pregunta o inquietud sobre la seguridad de tu información, no dudes en ponerte en contacto con nosotros. Estamos comprometidos a proteger tu privacidad y garantizar la seguridad de tus datos personales.</p>
        </div>
      </>
    ),
    icon: ServerIcon,
  },
  {
    name: 'Cookies',
    description: (
      <>
        <div className="mb-8">
          <p>Para mejorar tu experiencia y mantener tu sesión activa, nuestra aplicación utiliza el almacenamiento local del navegador. Esto nos permite almacenar de forma segura un identificador único que se utiliza para identificarte y autorizarte mientras utilizas la aplicación.</p>
        </div>

        <hr className="my-8" />

        <div>
          <p>Valoramos tu privacidad y seguridad. Los datos almacenados en el LocalStorage están encriptados y se utilizan únicamente con fines de autenticación y autorización en nuestra aplicación. No compartimos tu información personal con terceros sin tu consentimiento.</p>
        </div>
      </>
    ),
    icon: CircleStackIcon,
  },

  {
    name: 'Derechos y deberes del Usuario',
    description: (
      <>
        <div className="mb-8">
          <p>Los usuarios tienen derecho a acceder, corregir, actualizar o eliminar su información personal.</p>
        </div>
        <hr className="my-8" />
        <div>
          <p>Valoramos tu privacidad y seguridad. Los datos almacenados en el LocalStorage están encriptados y se utilizan únicamente con fines de autenticación y autorización en nuestra aplicación. No compartimos tu información personal con terceros sin tu consentimiento.</p>
        </div>
      </>
    ),
    icon: UserGroupIcon,
  },

  {
    name: 'Política de Mayoría de Edad',
    description: (
      <>
        <div className="mb-8">
          <p>Solo los usuarios que sean mayores de edad, definida como la edad legalmente reconocida en su jurisdicción, serán considerados para recibir garantías y estarán sujetos a nuestras políticas y servicios. Los usuarios menores de edad no serán elegibles para recibir servicios ni estarán cubiertos por nuestras políticas y garantías.</p>
        </div>
        <hr className="my-8" />
        <div>
          <p>Valoramos tu privacidad y seguridad. Los datos almacenados en el LocalStorage están encriptados y se utilizan únicamente con fines de autenticación y autorización en nuestra aplicación. No compartimos tu información personal con terceros sin tu consentimiento.</p>
        </div>
      </>
    ),
    icon: AtSymbolIcon,
  },
  {
    name: 'Cambios en la Política',
    description: (
      <>
        <div className="mb-8">
          <p>Nos reservamos el derecho de actualizar o modificar nuestras políticas de privacidad en cualquier momento.</p>
        </div>
        <hr className="my-8" />
        <div>
          <p>Al utilizar nuestra aplicación, acepta y consiente el procesamiento de su información personal de acuerdo con estas políticas de privacidad y manejo.</p>
        </div>
      </>
    ),
    icon: ShieldExclamationIcon,
  },
]
export default function PoliciesUser() {

  useEffect(() => {
    window.scrollTo(0, 0)

  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Ruvlo | Políticas de privacidad y manejo</title>
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
      <div className="overflow-hidden py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pr-8 lg:pt-4">
              <div className="lg:max-w-lg">
                <p className="text-base font-semibold leading-7 text-azul_corp_ho">Políticas de privacidad y menejo</p>
                <h1 className="mt-2 text-3xl text-gray-200 sm:text-4xl">Ruvlo</h1>
                <p className="mt-6 text-xl leading-8 text-gray-300">
                  Bienvenido a nuestra aplicación de gestión de tiendas en línea. Valoramos la privacidad y la seguridad de la información personal de nuestros usuarios. A continuación, detallamos nuestras políticas de privacidad y manejo:
                </p>
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
    </Layout>

  )
}
