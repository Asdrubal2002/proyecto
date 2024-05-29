import Layout from '../../hocs/Layout'
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, Navigate } from "react-router-dom";


const policiesUsers = {
  sections: [
    {
      title: "Usuario",
      features: [
        {
          name: 'Recopilación de Información:',
          description: (
            <>
              <div className="mb-8">
                <p><strong >Información Principal:</strong> Correo electrónico.</p>
                <p><strong >Información Secundaria:</strong> Nombres, apellidos, teléfono, identificación, foto, dirección, ciudad y código postal.</p>
              </div>
              <div className="mb-8">
                <p className="mb-4">Utilizamos esta información para los siguientes fines:</p>
                <ul className="list-disc list-inside">
                  <li>Proporcionar acceso a la aplicación y sus funciones.</li>
                  <li>Comunicarnos contigo sobre tu cuenta y los servicios que ofrecemos.</li>
                  <li>Personalizar tu experiencia en la aplicación y mejorar nuestros servicios.</li>
                  <li>Cumplir con requisitos legales y normativos.</li>
                </ul>
              </div>
              <div>
                <p>Al registrarte en nuestra aplicación, aceptas y consientes la recopilación y el uso de tu información personal de acuerdo con nuestras políticas de privacidad. Si tienes alguna pregunta o inquietud sobre cómo manejamos tu información, no dudes en ponerte en contacto con nosotros.</p>
              </div>
            </>
          ),
        },
        {
          name: 'Uso de la Información:',
          description: (

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



              <div>
                <p>Al utilizar nuestra aplicación, aceptas el uso de tu información de acuerdo con esta política de privacidad. Si tienes alguna pregunta o inquietud sobre cómo utilizamos tu información, no dudes en ponerte en contacto con nosotros.</p>
              </div>
            </>


          ),
        },
        {
          name: 'Seguridad de la Información:',
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

              <div>
                <p>Si tienes alguna pregunta o inquietud sobre la seguridad de tu información, no dudes en ponerte en contacto con nosotros. Estamos comprometidos a proteger tu privacidad y garantizar la seguridad de tus datos personales.</p>
              </div>
            </>
          ),
        },
        {
          name: 'Cookies:',
          description: (
            <>
              <div className="mb-8">
                <p>Para mejorar tu experiencia y mantener tu sesión activa, nuestra aplicación utiliza el almacenamiento local del navegador. Esto nos permite almacenar de forma segura un identificador único que se utiliza para identificarte y autorizarte mientras utilizas la aplicación.</p>
              </div>

              <div>
                <p>Valoramos tu privacidad y seguridad. Los datos almacenados en el LocalStorage están encriptados y se utilizan únicamente con fines de autenticación y autorización en nuestra aplicación. No compartimos tu información personal con terceros sin tu consentimiento.</p>
              </div>
            </>
          ),
        },
        {
          name: 'Derechos y deberes del Usuario:',
          description: (
            <>
              <div className="mb-8">
                <p>Los usuarios tienen derecho a acceder, corregir, actualizar o eliminar su información personal.</p>
              </div>

              <div>
                <p>Valoramos tu privacidad y seguridad. Los datos almacenados en el LocalStorage están encriptados y se utilizan únicamente con fines de autenticación y autorización en nuestra aplicación. No compartimos tu información personal con terceros sin tu consentimiento.</p>
              </div>
            </>
          ),
        },
        {
          name: 'Política de Mayoría de Edad',
          description: (
            <>
              <div className="mb-8">
                <p>Solo los usuarios que sean mayores de edad, definida como la edad legalmente reconocida en su jurisdicción, serán considerados para recibir garantías y estarán sujetos a nuestras políticas y servicios. Los usuarios menores de edad no serán elegibles para recibir servicios ni estarán cubiertos por nuestras políticas y garantías.</p>
              </div>

              <div>
                <p>Valoramos tu privacidad y seguridad. Los datos almacenados en el LocalStorage están encriptados y se utilizan únicamente con fines de autenticación y autorización en nuestra aplicación. No compartimos tu información personal con terceros sin tu consentimiento.</p>
              </div>
            </>
          ),
        },

        {
          name: 'Cambios en la Política',
          description: (
            <>
              <div className="mb-8">
                <p>Nos reservamos el derecho de actualizar o modificar nuestras políticas de privacidad en cualquier momento.</p>
                <p>Al utilizar nuestra aplicación, acepta y consiente el procesamiento de su información personal de acuerdo con estas políticas de privacidad y manejo.</p>


              </div>

            </>
          ),
        },
      ]
    },
    {
      title: "Tienda",
      features: [
        {
          name: 'Política de Verificación:',
          description: (
            <>
              <div className="mb-8">
                <p>
                  Todas las tiendas deben pasar por un proceso de verificación exhaustivo antes de poder operar en la plataforma.
                  La verificación incluye la validación de información esencial como el nombre de la tienda, dirección, correo electrónico y número de teléfono.
                  La plataforma se reserva el derecho de solicitar documentación adicional para confirmar la identidad y legitimidad de la tienda.</p>
              </div>
            </>
          ),
        },
        {
          name: 'Obligaciones del Administrador:',
          description: (
            <>
              <div className="mb-8">
                <p>Los administradores de tiendas deben proporcionar información veraz y completa durante el proceso de verificación.
                  Cualquier intento de proporcionar información falsa o engañosa resultará en la suspensión o eliminación de la tienda de la plataforma.</p>
              </div>
            </>
          ),
        },
        {
          name: 'Actualización de Información::',
          description: (
            <>
              <div className="mb-8">
                <p>Las tiendas deben mantener su información de contacto y otros datos relevantes actualizados.
                  Cualquier cambio significativo debe ser reportado a la plataforma dentro de los 30 días siguientes a la ocurrencia del cambio.</p>
              </div>
            </>
          ),
        },
        {
          name: 'Calidad del Contenido:',
          description: (
            <>
              <div className="mb-8">
                <p>LLa información de la tienda, incluyendo descripciones, imágenes y horarios, debe ser precisa, clara y actualizada regularmente.
                  Las imágenes deben ser de alta calidad y representar fielmente la tienda y sus productos.</p>
              </div>
            </>
          ),
        },
        {
          name: 'Prohibiciones:',
          description: (
            <>
              <div className="mb-8">
                <p>No se permite la publicación de contenido ofensivo, inapropiado o que infrinja los derechos de propiedad intelectual de terceros.
                  Las tiendas no deben utilizar la plataforma para promover actividades ilegales o fraudulentas.</p>
              </div>
            </>
          ),
        },


        {
          name: 'Revisión y Eliminación de Contenidos:',
          description: (
            <>
              <div className="mb-8">
                <p>La plataforma se reserva el derecho de revisar y eliminar cualquier contenido que considere inapropiado o que viole estas políticas.
                  Las tiendas serán notificadas sobre cualquier eliminación de contenido y podrán apelar la decisión siguiendo el proceso de disputas de la plataforma.</p>
              </div>
            </>
          ),
        },

        {
          name: 'Revisión y Eliminación de Contenidos:',
          description: (
            <>
              <div className="mb-8">
                <p>La plataforma se reserva el derecho de revisar y eliminar cualquier contenido que considere inapropiado o que viole estas políticas.
                  Las tiendas serán notificadas sobre cualquier eliminación de contenido y podrán apelar la decisión siguiendo el proceso de disputas de la plataforma.</p>
              </div>
            </>
          ),
        },

        {
          name: 'Responsabilidades del Administrador:',
          description: (
            <>
              <div className="mb-8">
                <p>Solo los administradores autorizados pueden gestionar la información y los productos de la tienda.
                  Los administradores deben actuar de manera profesional y respetuosa en todas las interacciones con los usuarios y la plataforma.</p>
              </div>
            </>
          ),
        },

        {
          name: 'Capacitación y Soporte:',
          description: (
            <>
              <div className="mb-8">
                <p>La plataforma ofrecerá capacitación y soporte continuo a los administradores para asegurar el cumplimiento de estas políticas.
                  Los administradores deben participar en las sesiones de capacitación y utilizar los recursos de soporte proporcionados por la plataforma.</p>
              </div>
            </>
          ),
        },


        {
          name: 'Cumplimiento Normativo:',
          description: (
            <>
              <div className="mb-8">
                <p>Los administradores son responsables de asegurar que todas las actividades de la tienda cumplan con las leyes y regulaciones locales, nacionales e internacionales aplicables.</p>
              </div>
            </>
          ),
        },

        {
          name: 'Protección de Datos:',
          description: (
            <>
              <div className="mb-8">
                <p>Las tiendas deben mantener la seguridad de sus cuentas y proteger la información personal de los usuarios.
                  Se recomienda el uso de contraseñas seguras y la activación de medidas adicionales de seguridad proporcionadas por la plataforma.</p>
              </div>
            </>
          ),
        },

        {
          name: 'Notificación de Brechas de Seguridad:',
          description: (
            <>
              <div className="mb-8">
                <p>En caso de una brecha de seguridad, las tiendas deben notificar inmediatamente a la plataforma y a los usuarios afectados.
                  Las tiendas deben cooperar plenamente con la plataforma para investigar y resolver cualquier incidente de seguridad.</p>
              </div>
            </>
          ),
        },

        {
          name: 'Veracidad de la Información:',
          description: (
            <>
              <div className="mb-8">
                <p>Las tiendas son responsables de la veracidad de la información proporcionada y de la calidad de los productos y servicios ofrecidos.
                  La plataforma no se hace responsable de las reclamaciones relacionadas con la información inexacta o productos defectuosos.</p>
              </div>
            </>
          ),
        },

        {
          name: 'Cumplimiento Legal:',
          description: (
            <>
              <div className="mb-8">
                <p>Las tiendas deben cumplir con todas las leyes y regulaciones aplicables en su país de operación, incluyendo, pero no limitándose a, leyes de protección al consumidor, privacidad de datos y propiedad intelectu</p>
              </div>
            </>
          ),
        },


      ]
    },

    {
      title: "Producto",
      features: [
        {
          name: 'Información Completa y Precisa::',
          description: (
            <>
              <div className="mb-8">
                <p>
                  Los productos deben ser listados con información completa y precisa, incluyendo nombre, descripción, precio y opciones disponibles.
                  Las descripciones deben ser detalladas y no deben inducir a error a los usuarios.</p>
              </div>
            </>
          ),
        },

        {
          name: 'Inclusión de Impuestos:',
          description: (
            <>
              <div className="mb-8">
                <p>Los precios deben incluir todos los impuestos aplicables y ser actualizados regularmente.
                  Las tiendas deben especificar claramente cualquier impuesto adicional que pueda aplicarse al momento de la compra.</p>
              </div>
            </>
          ),
        },
        {
          name: 'Transparencia de Precios:',
          description: (
            <>
              <div className="mb-8">
                <p>No se deben agregar cargos ocultos o injustificados a los productos listados.
                  Los precios deben reflejar el costo real del producto y ser competitivos en el mercado.</p>
              </div>
            </>
          ),
        },
        {
          name: 'Calidad de las Imágenes:',
          description: (
            <>
              <div className="mb-8">
                <p>Las imágenes de los productos deben ser de alta calidad y representar fielmente el producto.
                  Las imágenes deben ser actualizadas para reflejar cualquier cambio en el producto.</p>
              </div>
            </>
          ),
        },


        {
          name: 'Descripciones Detalladas:',
          description: (
            <>
              <div className="mb-8">
                <p>Las descripciones deben proporcionar toda la información necesaria para que los usuarios puedan tomar una decisión informada de compra.
                  Cualquier característica especial, uso recomendado o limitaciones del producto deben ser claramente indicadas.</p>
              </div>
            </>
          ),
        },

        {
          name: 'Propiedad Intelectual:',
          description: (
            <>
              <div className="mb-8">
                <p>Las tiendas deben asegurarse de que tienen los derechos necesarios para usar cualquier imagen o contenido relacionado con el producto.
                  La plataforma no será responsable por cualquier infracción de propiedad intelectual cometida por las tiendas.</p>
              </div>
            </>
          ),
        },

        {
          name: 'Actualización de Inventario::',
          description: (
            <>
              <div className="mb-8">
                <p>Las tiendas deben mantener un inventario actualizado y reflejar la disponibilidad real de los productos.
                  Los productos agotados deben ser marcados como "no disponibles" y no deben ser vendidos hasta que se repongan.</p>
              </div>
            </>
          ),
        },

        {
          name: 'Comunicación de Disponibilidad:',
          description: (
            <>
              <div className="mb-8">
                <p>Las tiendas deben notificar a los usuarios sobre cualquier cambio en la disponibilidad del producto lo antes posible.
                  Las pre-órdenes y reservas deben ser gestionadas de manera eficiente para evitar decepciones a los usuarios.</p>
              </div>
            </>
          ),
        },


        {
          name: 'Derechos del Consumidor:',
          description: (
            <>
              <div className="mb-8">
                <p>Las tiendas deben establecer y comunicar claramente su política de devoluciones y reembolsos, cumpliendo con las leyes de protección al consumidor aplicables.
                  Las devoluciones deben ser manejadas de manera justa y rápida, asegurando que los usuarios reciban un reembolso completo o un reemplazo del producto defectuoso.</p>
              </div>
            </>
          ),
        },

        {
          name: 'Proceso de Devolución:',
          description: (
            <>
              <div className="mb-8">
                <p>Las tiendas deben proporcionar instrucciones claras sobre cómo los usuarios pueden devolver productos.
                  Los costos de envío de las devoluciones deben ser claramente especificados, y en algunos casos, cubiertos por la tienda.</p>
              </div>
            </>
          ),
        },

        {
          name: 'Resolución de Disputas:',
          description: (
            <>
              <div className="mb-8">
                <p>Las tiendas deben tener un proceso eficiente para manejar y resolver disputas relacionadas con devoluciones y reembolsos.
                  Las disputas no resueltas pueden ser escaladas a la plataforma para una mediación imparcial.</p>
              </div>
            </>
          ),
        },
      ]
    },

    {
      title: "Envío",
      features: [
        {
          name: 'Política de Tiempos de Entrega:',
          description: (
            <>
              <div className="mb-8">
                <p>
                Los tiempos de entrega estimados deben ser precisos y claramente comunicados a los usuarios.
Las tiendas deben esforzarse por cumplir con los tiempos de entrega prometidos y notificar a los usuarios en caso de cualquier retraso.</p>
              </div>
            </>
          ),
        },

        {
          name: 'Comunicación de Retrasos:',
          description: (
            <>
              <div className="mb-8">
                <p>Cualquier retraso en la entrega debe ser comunicado inmediatamente a los usuarios, proporcionando una nueva fecha estimada de entrega.
Las tiendas deben ofrecer compensaciones adecuadas por retrasos significativos que afecten la experiencia del usuario.</p>
              </div>
            </>
          ),
        },
        {
          name: 'Transparencia en los Costos',
          description: (
            <>
              <div className="mb-8">
                <p>Los costos de envío deben ser claramente indicados y reflejar los costos reales del servicio.
No se deben agregar cargos ocultos o injustificados a los costos de envío.</p>
              </div>
            </>
          ),
        },
        {
          name: 'Inclusión de Impuestos:',
          description: (
            <>
              <div className="mb-8">
                <p>Los costos de envío deben incluir todos los impuestos aplicables.
Las tiendas deben especificar claramente cualquier impuesto adicional que pueda aplicarse al momento del envío.</p>
              </div>
            </>
          ),
        },


        {
          name: 'Información de Seguimiento:',
          description: (
            <>
              <div className="mb-8">
                <p>Las tiendas deben proporcionar a los usuarios información de seguimiento para sus envíos siempre que sea posible.
Los usuarios deben ser informados del estado de su envío en cada etapa del proceso, desde la recogida hasta la entrega final.</p>
              </div>
            </>
          ),
        },

        {
          name: 'Actualización del Estado del Envío:',
          description: (
            <>
              <div className="mb-8">
                <p>Cualquier cambio en el estado del envío debe ser actualizado y comunicado a los usuarios de manera oportuna.
Las tiendas deben asegurar que la información de seguimiento proporcionada sea precisa y actualizada.</p>
              </div>
            </>
          ),
        },

        {
          name: 'Responsabilidad del Envío:',
          description: (
            <>
              <div className="mb-8">
                <p>as tiendas son responsables de los productos hasta que sean entregados al usuario.
En caso de daño o pérdida durante el envío, las tiendas deben ofrecer una solución justa, ya sea reemplazo del producto o reembolso completo.</p>
              </div>
            </>
          ),
        },

        {
          name: 'Proceso de Reclamo:',
          description: (
            <>
              <div className="mb-8">
                <p>Las tiendas deben proporcionar un proceso claro y fácil para que los usuarios puedan reportar daños o pérdidas.
Los reclamos deben ser manejados de manera rápida y eficiente, proporcionando soluciones adecuadas a los usuarios afectados.</p>
              </div>
            </>
          ),
        },


        {
          name: 'Comunicación de Restricciones:',
          description: (
            <>
              <div className="mb-8">
                <p>Cualquier restricción o instrucción especial para el envío debe ser claramente comunicada a los usuarios antes de la compra.
Las notas adicionales deben ser relevantes y ayudar a mejorar la experiencia de entrega del usuario.</p>
              </div>
            </>
          ),
        },

        {
          name: 'Instrucciones Especiales:',
          description: (
            <>
              <div className="mb-8">
                <p>Las tiendas deben proporcionar instrucciones claras para envíos especiales, como entregas en horarios específicos o manejo de productos frágiles.
Los usuarios deben ser informados sobre cualquier requisito especial que deban cumplir para recibir sus envíos.</p>
              </div>
            </>
          ),
        },

        
      ]
    },

  ]
};

export default function PoliciesUser() {

  useEffect(() => {
    window.scrollTo(0, 0)

  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Ruvlo | Políticas de uso de ruvlo</title>
        <meta name="description" content="Lo que sale en google" />
        <meta name="keywords" content='palabras para google' />
        <meta name="robots" content='all' />
        <link rel="canonical" href="https://www.ruvlo.com/" />
        <meta name="author" content='Ruvlo' />
        <meta name="publisher" content='Ruvlo' />
      </Helmet>
      <div className="relative isolate overflow-hidden px-6 py-20 sm:py-20 lg:overflow-visible lg:px-0 font-estilo_letra">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="lg:max-w-lg">
                <p className="text-base font-semibold leading-7 text-azul_corp_ho">Políticas de privacidad y menejo</p>
                <h1 className="mt-2 text-3xl text-gray-200 sm:text-4xl">Ruvlo</h1>
                <p className="mt-6 text-md leading-8 text-gray-300">

                  Bienvenido a nuestra aplicación. Valoramos la privacidad y la seguridad de la información personal de nuestros usuarios. A continuación, detallamos nuestras políticas de privacidad y manejo:
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
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:w-full lg:max-w-7xl lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="max-w-xl text-base leading-7 text-gray-300 lg:max-w-lg">
                {policiesUsers.sections.map((section, sectionIndex) => (
                  <div key={section.title}>
                    <h2 className="text-xl font-bold text-azul_corp_ho mb-4">{`${sectionIndex + 1} - ${section.title}`}</h2>
                    <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                      {section.features.map((feature, featureIndex) => (
                        <div key={feature.name} className="relative pl-9">
                          <dt className="inline font-semibold text-azul_corp_ho">
                            {`${sectionIndex + 1}.${featureIndex + 1} - ${feature.name}`}
                          </dt>
                          <dd className="inline text-gray-400 text-sm">{feature.description}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>

  )
}
