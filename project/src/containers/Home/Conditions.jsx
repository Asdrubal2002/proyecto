import Layout from '../../hocs/Layout'
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, Navigate } from "react-router-dom";


const termsAndConditions = {
  sections: [
    {
      title: "Usuario",
      features: [
        {
          name: 'Aceptación de los Términos:',
          description: (
            <>
              <div className="mb-8">
                <p>
                  Al acceder y utilizar la aplicación Ruvlo, aceptas automáticamente estos términos y condiciones. Si no estás de acuerdo con alguno de los términos, te pedimos que no utilices la aplicación.
                </p>
              </div>
            </>
          ),
        },
        {
          name: 'Registro de Usuario:',
          description: (
            <>
              <div className="mb-8">
                <p>
                  Para registrarte en Ruvlo, debes ser mayor de edad y proporcionar información precisa y completa durante el proceso de registro. Es importante que mantengas la confidencialidad de tu contraseña y nos informes de cualquier uso no autorizado de tu cuenta para proteger la seguridad de tu información personal.
                </p>
                <br />
                <p>
                  Eres responsable de mantener la seguridad de tu cuenta en Ruvlo. Esto incluye proteger tu contraseña y tomar medidas para prevenir el acceso no autorizado a tu cuenta.
                </p>
              </div>
            </>
          ),
        },
        {
          name: 'Uso Aceptable:',
          description: (
            <>
              <div className="mb-8">
                <p>No puedes utilizar nuestra aplicación de manera que viole las leyes aplicables o infrinja los derechos de terceros. Esto incluye, entre otros, el envío de contenido ilegal, la realización de actividades fraudulentas o el acoso a otros usuarios.</p>
                <br />
                <p>
                  Te comprometes a tratar a todos los usuarios de Ruvlo con respeto y cortesía en todas tus interacciones dentro de la plataforma. No se tolerarán comportamientos abusivos, intimidatorios, discriminatorios o inapropiados hacia otros usuarios.
                </p>
              </div>
            </>
          ),
        },
        {
          name: 'Propiedad Intelectual',
          description: (
            <>
              <div className="mb-8">
                <p>Todos los derechos de propiedad intelectual sobre el contenido y la tecnología de Ruvlo son propiedad de nuestra empresa o de nuestros licenciantes. Esto incluye, entre otros, derechos de autor, marcas comerciales y derechos de diseño. No tienes derecho a reproducir, distribuir o modificar dicho contenido sin nuestro consentimiento previo por escrito.</p>
              </div>
            </>
          ),
        },
        {
          name: 'Limitación de Responsabilidad',
          description: (
            <>
              <div className="mb-8">
                <p>En la máxima medida permitida por la ley, Ruvlo no será responsable de ningún daño directo, indirecto, incidental, especial o consecuente derivado del uso de la aplicación. Hacemos todo lo posible para garantizar la precisión y seguridad de la información en nuestra plataforma, pero no podemos garantizar la total ausencia de errores o interrupciones.</p>
              </div>
            </>
          ),
        },
        {
          name: 'Modificaciones y Cancelación',
          description: (
            <>
              <div className="mb-8">
                <p>Tienes derecho a cancelar tu cuenta en Ruvlo en cualquier momento, sin penalización alguna, siempre que tu cuenta esté en buen estado y no tengas ningún problema pendiente dentro de la plataforma. Esto significa que no debes tener reportes activos, deudas pendientes u otros asuntos sin resolver que puedan afectar negativamente tu cuenta. Para cancelar tu cuenta, simplemente comunícate con nuestro equipo de soporte o utiliza la función de cancelación de cuenta disponible en la configuración de tu perfil. Ten en cuenta que la cancelación de tu cuenta eliminará permanentemente todos tus datos y contenido asociados con Ruvlo, y no podrás recuperarlos una vez completada la cancelación.</p>
                <br />
                <p>
                  Nos reservamos el derecho de suspender o cancelar tu cuenta en Ruvlo en caso de que existan razones justificadas, como, pero no limitado a, incumplimiento de estos términos y condiciones, violación de las políticas de uso de la plataforma, actividad sospechosa o fraudulentas, o cualquier otra conducta que consideremos inapropiada o contraria a los intereses de la comunidad de Ruvlo.
                </p>
              </div>
            </>
          ),
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
        },
        {
          name: 'Consentimiento para Comunicaciones Electrónicas:',
          description: (
            <>
              <div className="mb-8">
                <p>Al utilizar nuestra aplicación, aceptas recibir comunicaciones electrónicas de nuestra parte, como correos electrónicos informativos o notificaciones sobre cambios en los términos y condiciones.</p>
                <br />
                <p>Te notificaremos cualquier cambio importante en nuestros términos y condiciones, así como cualquier modificación significativa en la funcionalidad de la plataforma, a través de nuestra plataforma. Esta notificación puede realizarse mediante mensajes en la aplicación, correos electrónicos o cualquier otro medio de comunicación que consideremos adecuado.</p>
              </div>
            </>
          ),
        },
        {
          name: 'Privacidad y Protección de Datos:',
          description: (
            <>
              <div className="mb-8">
                <p>Remitimos a nuestra política de privacidad para obtener información sobre cómo recopilamos, utilizamos y protegemos tus datos personales. <Link to={'/policies'} className='text-azul_corp_ho'>Políticas de privacidad y manejo</Link></p>
              </div>
            </>
          ),
        },
        {
          name: 'Recopilación de Información:',
          description: (
            <>
              <div className="mb-8">
                <p>Recopilamos información personal que nos proporcionas voluntariamente al registrarte en nuestra plataforma, como tu nombre, dirección de correo electrónico y cualquier otra información relevante para el uso de nuestra aplicación.</p>
              </div>
            </>
          ),
        },
        {
          name: 'Uso de la Información:',
          description: (
            <>
              <div className="mb-8">
                <p>Utilizamos la información recopilada para mejorar nuestros servicios, personalizar tu experiencia en la plataforma, y enviarte actualizaciones y notificaciones relevantes.</p>
              </div>
            </>
          ),
        },
        {
          name: 'Protección de Datos:',
          description: (
            <>
              <div className="mb-8">
                <p>Implementamos medidas de seguridad adecuadas para proteger tu información personal contra el acceso no autorizado, la alteración, divulgación o destrucción.</p>
              </div>
            </>
          ),
        },
        {
          name: 'Compartición de Información:',
          description: (
            <>
              <div className="mb-8">
                <p>No compartimos tu información personal con terceros, excepto cuando sea necesario para cumplir con la ley, proteger nuestros derechos, o en el caso de una fusión o adquisición de nuestra empresa.</p>
              </div>
            </>
          ),
        },
        // Más características...
      ]
    },
    {
      title: "Tienda",
      features: [
        {
          name: 'Definiciones:',
          description: (
            <>
              <div className="mb-8">
                <p>
                  - Plataforma: El sitio web y servicios ofrecidos.
                  <br />

                  - Usuario: Persona que se registra y utiliza la plataforma.
                  <br />

                  - Administrador: Usuario con permisos para gestionar una tienda.
                  <br />

                  - Tienda: Entidad creada en la plataforma para ofrecer productos o servicios.
                  <br />
                  - Política de Tienda: Normas específicas establecidas por una tienda.</p>
              </div>
            </>
          ),
        },
        {
          name: 'Creación y Gestión de Tiendas:',
          description: (
            <>
              <div className="mb-8">
                <p>Solo los usuarios registrados pueden crear y gestionar tiendas en la plataforma.
                  Cada tienda debe proporcionar información veraz, incluyendo nombre, categoría, descripción, ubicación, dirección, teléfono, email, logotipo, banner, y horario de atención.
                  Las tiendas deben mantener actualizada la información y cumplir con todas las leyes y regulaciones aplicables.</p>
              </div>
            </>
          ),
        },
        {
          name: 'Contenido y Propiedad Intelectual:',
          description: (
            <>
              <div className="mb-8">
                <p>Las tiendas pueden subir imágenes y otros contenidos, asegurando que poseen los derechos necesarios o permisos para su uso.
                  La plataforma y todos sus contenidos, incluyendo código, diseño, textos, gráficos y logotipos, son propiedad de la empresa o de sus respectivos titulares de derechos y están protegidos por las leyes de propiedad intelectual.</p>
              </div>
            </>
          ),
        },
        {
          name: 'Políticas de Tienda:',
          description: (
            <>
              <div className="mb-8">
                <p>Las tiendas pueden establecer sus propias políticas y condiciones adicionales.
                  Estas políticas deben ser claras y no contradecir estos Términos. Las políticas específicas de cada tienda son responsabilidad exclusiva de la misma.</p>
              </div>
            </>
          ),
        },
        {
          name: 'Interacciones del Usuario:',
          description: (
            <>
              <div className="mb-8">
                <p>Los usuarios pueden interactuar con las tiendas, dejar comentarios, y presentar quejas.
                  Los usuarios deben comportarse de manera respetuosa y no utilizar la plataforma para actividades ilegales o no autorizadas.</p>
              </div>
            </>
          ),
        },


        {
          name: 'Verificación y Activación de Tiendas:',
          description: (
            <>
              <div className="mb-8">
                <p>Las tiendas pueden ser verificadas por la plataforma. Este proceso de verificación es interno y no garantiza la legitimidad completa de una tienda.
                  La plataforma se reserva el derecho de desactivar tiendas que no cumplan con estos Términos o con las leyes aplicables.</p>
              </div>
            </>
          ),
        },

        {
          name: 'Verificación y Activación de Tiendas:',
          description: (
            <>
              <div className="mb-8">
                <p>Las tiendas pueden ser verificadas por la plataforma. Este proceso de verificación es interno y no garantiza la legitimidad completa de una tienda.
                  La plataforma se reserva el derecho de desactivar tiendas que no cumplan con estos Términos o con las leyes aplicables.</p>
              </div>
            </>
          ),
        },

        {
          name: 'Política de Privacidad:',
          description: (
            <>
              <div className="mb-8">
                <p>La información personal proporcionada por los usuarios y administradores será tratada conforme a nuestra Política de Privacidad.
                  No compartiremos su información personal con terceros sin su consentimiento, salvo que sea necesario para la operación del servicio o requerido por la ley.</p>
              </div>
            </>
          ),
        },

        {
          name: 'Modificaciones de los Términos:',
          description: (
            <>
              <div className="mb-8">
                <p>Nos reservamos el derecho de modificar estos Términos en cualquier momento. Las modificaciones serán efectivas desde su publicación en la plataforma.
                  Es responsabilidad del usuario revisar regularmente los Términos para estar al tanto de cualquier cambio.</p>
              </div>
            </>
          ),
        },

        {
          name: 'Terminación del Servicio:',
          description: (
            <>
              <div className="mb-8">
                <p>La plataforma se reserva el derecho de suspender o terminar el acceso a cualquier usuario o tienda que viole estos Términos sin previo aviso.
                  La terminación del servicio puede ocurrir sin responsabilidad alguna hacia el usuario o tienda.</p>
              </div>
            </>
          ),
        },

        {
          name: 'Ley Aplicable y Jurisdicción:',
          description: (
            <>
              <div className="mb-8">
                <p>Estos Términos se rigen por las leyes del país donde opera la plataforma.
                  Cualquier disputa que surja en relación con estos Términos será resuelta en los tribunales competentes de dicha jurisdicción.</p>
              </div>
            </>
          ),
        },

        {
          name: 'Contacto:',
          description: (
            <>
              <div className="mb-8">
                <p>Para cualquier pregunta o inquietud sobre los Términos de cada tienda, por favor contáctenos a través del correo electrónico proporcionado en la tienda.</p>
              </div>
            </>
          ),
        },
        // Más características...
      ]
    },

    {
      title: "Producto",
      features: [
        {
          name: 'Definiciones:',
          description: (
            <>
              <div className="mb-8">
                <p>
                  - Plataforma: El sitio web y servicios ofrecidos.
                  <br />

                  - Usuario: Persona que se registra y utiliza la plataforma.
                  <br />

                  - Administrador: Usuario con permisos para gestionar una tienda.
                  <br />

                  - Tienda: Entidad creada en la plataforma para ofrecer productos o servicios.
                  <br />
                  - Producto: Bien o servicio ofrecido por una tienda en la plataforma.
                  <br />
                  - Categoría: Clasificación del producto dentro de la plataforma.
                  <br />
                  - Opción de Producto: Variantes específicas de un producto.

                </p>
              </div>
            </>
          ),
        },
        {
          name: ' Registro de Productos:',
          description: (
            <>
              <div className="mb-8">
                <p>Los productos solo pueden ser creados y gestionados por administradores de tiendas verificadas en la plataforma.
                  Cada producto debe proporcionar información precisa y completa, incluyendo nombre, categoría, descripción, precio, impuestos aplicables, y otras características relevantes.
                  El precio del producto debe reflejar el costo real y estar actualizado.</p>
              </div>
            </>
          ),
        },
        {
          name: 'Imágenes y Contenido de Productos:',
          description: (
            <>
              <div className="mb-8">
                <p>Las imágenes de los productos deben ser de alta calidad y representar fielmente el producto.
                  No se permite subir imágenes o contenido que infrinjan derechos de autor, marcas registradas u otros derechos de propiedad intelectual.
                  Las tiendas son responsables del contenido que publican y deben asegurarse de tener los derechos necesarios para utilizar dicho contenido.</p>
              </div>
            </>
          ),
        },
        {
          name: 'Precios y Impuestos:',
          description: (
            <>
              <div className="mb-8">
                <p>Los precios de los productos deben incluir todos los impuestos aplicables.
                  Los precios deben estar claramente indicados y ser precisos. Las tiendas no deben engañar a los usuarios con precios falsos o inexactos.
                  La plataforma se reserva el derecho de revisar y modificar los precios de los productos si se detecta algún error.</p>
              </div>
            </>
          ),
        },
        {
          name: 'Disponibilidad y Venta de Productos:',
          description: (
            <>
              <div className="mb-8">
                <p>Los productos deben estar disponibles para la venta en las cantidades indicadas. Las tiendas deben actualizar las cantidades disponibles y vendidas de manera precisa.
                  La plataforma no se responsabiliza por la falta de stock o por problemas de disponibilidad de los productos.
                  Los administradores deben asegurarse de que los productos cumplan con todas las leyes y regulaciones aplicables en el lugar donde se comercializan.</p>
              </div>
            </>
          ),
        },


        {
          name: 'Opciones de Productos:',
          description: (
            <>
              <div className="mb-8">
                <p>Las tiendas pueden ofrecer opciones de productos, como tamaños, colores u otras variantes.
                  Cada opción de producto debe estar claramente descrita y tener un inventario y precio específicos.
                  Las opciones de productos deben ser gestionadas de manera precisa para reflejar la disponibilidad real.</p>
              </div>
            </>
          ),
        },

        {
          name: 'Interacciones del Usuario:',
          description: (
            <>
              <div className="mb-8">
                <p>Los usuarios pueden interactuar con los productos, incluyendo dejar "me gusta" y realizar compras.
                  Las tiendas deben manejar todas las interacciones de manera profesional y respetuosa.</p>
              </div>
            </>
          ),
        },

        {
          name: 'Propiedad Intelectual:',
          description: (
            <>
              <div className="mb-8">
                <p>Todo el contenido de los productos, incluyendo descripciones, imágenes y otras características, es propiedad de la tienda o del titular de los derechos y está protegido por las leyes de propiedad intelectual.
                  La plataforma no será responsable por cualquier infracción de propiedad intelectual cometida por las tiendas.</p>
              </div>
            </>
          ),
        },

        {
          name: 'Política de Privacidad:',
          description: (
            <>
              <div className="mb-8">
                <p>La información personal proporcionada por los usuarios en relación con los productos será tratada conforme a nuestra Política de Privacidad.
                  Las tiendas no deben compartir información personal de los usuarios sin su consentimiento, salvo que sea necesario para completar una transacción o requerido por la ley..</p>
              </div>
            </>
          ),
        },

        {
          name: 'Modificaciones de los Términos del Producto:',
          description: (
            <>
              <div className="mb-8">
                <p>Nos reservamos el derecho de modificar estos Términos del Producto en cualquier momento. Las modificaciones serán efectivas desde su publicación en la plataforma.
                  Es responsabilidad de los administradores revisar regularmente los Términos del Producto para estar al tanto de cualquier cambio.</p>
              </div>
            </>
          ),
        },

        {
          name: 'Terminación de Productos:',
          description: (
            <>
              <div className="mb-8">
                <p>La plataforma se reserva el derecho de eliminar o desactivar cualquier producto que viole estos Términos del Producto o cualquier otra política de la plataforma sin previo aviso.
                  Las tiendas son responsables de mantener la información de sus productos actualizada y precisa.</p>
              </div>
            </>
          ),
        },

        {
          name: 'Limitación de Responsabilidad:',
          description: (
            <>
              <div className="mb-8">
                <p>La plataforma no será responsable por cualquier daño directo, indirecto, incidental, especial o consecuencial que resulte del uso o la imposibilidad de uso del servicio de productos.
                  Las tiendas son responsables de la calidad, seguridad y legalidad de los productos que ofrecen en la plataforma.</p>
              </div>
            </>
          ),
        },
        // Más características...
      ]
    },

    {
      title: "Envio",
      features: [
        {
          name: 'Definiciones:',
          description: (
            <>
              <div className="mb-8">
                <p>
                  - Plataforma: El sitio web y servicios ofrecidos.
                  <br />

                  - Usuario: Persona que se registra y utiliza la plataforma.
                  <br />

                  - Administrador: Usuario con permisos para gestionar una tienda.
                  <br />

                  - Tienda: Entidad creada en la plataforma para ofrecer productos o servicios.
                  <br />
                  - Envío: Servicio ofrecido por una tienda para la entrega de productos comprados por los usuarios.


                </p>
              </div>
            </>
          ),
        },
        {
          name: 'Registro de Servicios de Envío:',
          description: (
            <>
              <div className="mb-8">
                <p>Los servicios de envío solo pueden ser creados y gestionados por administradores de tiendas verificadas en la plataforma.
                  Cada servicio de envío debe proporcionar información precisa y completa, incluyendo nombre, tiempo estimado de entrega, precio y notas adicionales.
                  El precio del envío debe reflejar el costo real y estar actualizado.</p>
              </div>
            </>
          ),
        },
        {
          name: 'Precios y Tasas de Envío:',
          description: (
            <>
              <div className="mb-8">
                <p>Los precios de los servicios de envío deben incluir todos los impuestos aplicables.
                  Los precios deben estar claramente indicados y ser precisos. Las tiendas no deben engañar a los usuarios con precios falsos o inexactos.
                  La plataforma se reserva el derecho de revisar y modificar los precios de los servicios de envío si se detecta algún error.</p>
              </div>
            </>
          ),
        },
        {
          name: 'Disponibilidad y Plazos de Entregas:',
          description: (
            <>
              <div className="mb-8">
                <p>Los tiempos de entrega estimados deben ser claros y razonables. Las tiendas deben actualizar esta información en caso de cualquier cambio.
                  La plataforma no se responsabiliza por retrasos en la entrega o problemas de disponibilidad del servicio de envío.
                  Las tiendas son responsables de cumplir con los tiempos de entrega indicados y de comunicar cualquier retraso a los usuarios.</p>
              </div>
            </>
          ),
        },
        {
          name: ' Información Adicional:',
          description: (
            <>
              <div className="mb-8">
                <p>Las tiendas pueden proporcionar notas adicionales sobre los servicios de envío, como restricciones de entrega o instrucciones especiales.
                  La información adicional debe ser clara y relevante para ayudar a los usuarios a entender el servicio de envío ofrecido.</p>
              </div>
            </>
          ),
        },


        {
          name: 'Interacciones del Usuario:',
          description: (
            <>
              <div className="mb-8">
                <p>Los usuarios pueden interactuar con los servicios de envío, incluyendo la selección del servicio y el seguimiento de sus envíos.
                  Las tiendas deben manejar todas las interacciones de manera profesional y respetuosa.</p>
              </div>
            </>
          ),
        },

        {
          name: 'Propiedad Intelectual:',
          description: (
            <>
              <div className="mb-8">
                <p>Todo el contenido relacionado con los servicios de envío, incluyendo descripciones e imágenes, es propiedad de la tienda o del titular de los derechos y está protegido por las leyes de propiedad intelectual.
                  La plataforma no será responsable por cualquier infracción de propiedad intelectual cometida por las tiendas.</p>
              </div>
            </>
          ),
        },

        {
          name: 'Política de Privacidad:',
          description: (
            <>
              <div className="mb-8">
                <p>La información personal proporcionada por los usuarios en relación con los servicios de envío será tratada conforme a nuestra Política de Privacidad.
                  Las tiendas no deben compartir información personal de los usuarios sin su consentimiento, salvo que sea necesario para completar una entrega o requerido por la ley.</p>
              </div>
            </>
          ),
        },

        {
          name: 'Modificaciones de los Términos del Envío:',
          description: (
            <>
              <div className="mb-8">
                <p>Nos reservamos el derecho de modificar estos Términos del Envío en cualquier momento. Las modificaciones serán efectivas desde su publicación en la plataforma.
                  Es responsabilidad de los administradores revisar regularmente los Términos del Envío para estar al tanto de cualquier cambio.</p>
              </div>
            </>
          ),
        },

        {
          name: 'Terminación de Servicios de Envío:',
          description: (
            <>
              <div className="mb-8">
                <p>La plataforma se reserva el derecho de eliminar o desactivar cualquier servicio de envío que viole estos Términos del Envío o cualquier otra política de la plataforma sin previo aviso.
                  Las tiendas son responsables de mantener la información de sus servicios de envío actualizada y precisa.</p>
              </div>
            </>
          ),
        },

        {
          name: 'Limitación de Responsabilidad:',
          description: (
            <>
              <div className="mb-8">
                <p>La plataforma no será responsable por cualquier daño directo, indirecto, incidental, especial o consecuencial que resulte del uso o la imposibilidad de uso del servicio de envío.
                  Las tiendas son responsables de la calidad, seguridad y legalidad de los servicios de envío que ofrecen en la plataforma.</p>
              </div>
            </>
          ),
        },
        // Más características...
      ]
    }


  ]
};

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
      </Helmet>
      <div className="relative isolate overflow-hidden px-6 py-20 sm:py-20 lg:overflow-visible lg:px-0">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="lg:max-w-lg">
                <p className="text-base font-semibold leading-7 text-azul_corp_ho">Términos y condiciones</p>
                <h1 className="mt-2 text-3xl text-gray-200 sm:text-4xl">Ruvlo</h1>
                <p className="mt-6 text-md leading-8 text-gray-300">

                  ¡Bienvenido a Ruvlo, antes de comenzar a disfrutar de la amplia gama de tiendas y productos que ofrecemos, te pedimos que leas detenidamente y aceptes nuestros términos y condiciones de uso. Estos términos establecen los derechos y responsabilidades tanto de los usuarios como de Ruvlo, y son fundamentales para garantizar una experiencia segura y satisfactoria para todos.
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
                {termsAndConditions.sections.map((section, sectionIndex) => (
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
