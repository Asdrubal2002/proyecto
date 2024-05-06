import React from 'react'
import { Dialog, Menu, Transition, Disclosure, Tab } from '@headlessui/react'
import { ArchiveBoxArrowDownIcon, ArchiveBoxXMarkIcon, InformationCircleIcon, PaperAirplaneIcon, RectangleGroupIcon, UserIcon } from '@heroicons/react/24/outline'


function PoliticsFoundations() {
    return (
        <div>

            <Disclosure>
                <Disclosure.Button className="focus:outline-none">
                    <div className='flex font-medium text-yellow-400 my-2'>
                        <InformationCircleIcon className="w-6 h-6 text-yellow-400 mx-2" />¿Como crear políticas de mi negocio?.
                    </div>
                </Disclosure.Button>
                <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                >
                    <p className='text-sm'>
                        ¡Bienvenido! Aquí encontrarás ejemplos y características esenciales para las políticas de tu negocio. Estas políticas son 
                        fundamentales ya que estarán permanentemente visibles y no podrán ser eliminadas. Servirán como garantías para tus productos 
                        y/o servicios dentro de Ruvlo, nuestra comunidad. Estamos aquí para ayudarte a establecer una base sólida para tu negocio y
                         brindarte la confianza que necesitas para crecer.
                    </p>
                    <Disclosure.Panel className="rounded-md p-2 ">
                        <div>
                            <Disclosure>
                                <Disclosure.Button className="focus:outline-none">
                                    <div className='flex font-medium text-gray-300 my-2 text-sm'>
                                        <ArchiveBoxArrowDownIcon className="w-6 h-6 text-gray-300 mx-2" /> 1. Política de devoluciones y reembolsos:
                                    </div>
                                </Disclosure.Button>
                                <Transition
                                    enter="transition duration-100 ease-out"
                                    enterFrom="transform scale-95 opacity-0"
                                    enterTo="transform scale-100 opacity-100"
                                    leave="transition duration-75 ease-out"
                                    leaveFrom="transform scale-100 opacity-100"
                                    leaveTo="transform scale-95 opacity-0"
                                >
                                    <Disclosure.Panel className="rounded-md p-2 text-sm">
                                        <div>
                                            <p>
                                                Especifica claramente bajo qué circunstancias aceptarás devoluciones y cómo procesarás los reembolsos. Esto incluye detalles sobre plazos, condiciones del producto devuelto y métodos de reembolso.

                                            </p>
                                            <br />
                                            <p>
                                                - Circunstancias para aceptar devoluciones: Se aceptan devoluciones dentro de los primeros 30 días después de la compra.
                                                <br />
                                                - Proceso de reembolso: El reembolso se procesa dentro de los 5 días hábiles después de recibir el producto devuelto en condiciones satisfactorias.
                                            </p>
                                        </div>
                                    </Disclosure.Panel>
                                </Transition>
                            </Disclosure>

                        </div>

                        <div>
                            <Disclosure>
                                <Disclosure.Button className="focus:outline-none">
                                    <div className='flex font-medium text-gray-300 my-2 text-sm'>
                                        <PaperAirplaneIcon className="w-6 h-6 text-gray-300 mx-2" /> 2. Política de envío y entrega:
                                    </div>
                                </Disclosure.Button>
                                <Transition
                                    enter="transition duration-100 ease-out"
                                    enterFrom="transform scale-95 opacity-0"
                                    enterTo="transform scale-100 opacity-100"
                                    leave="transition duration-75 ease-out"
                                    leaveFrom="transform scale-100 opacity-100"
                                    leaveTo="transform scale-95 opacity-0"
                                >
                                    <Disclosure.Panel className="rounded-md p-2 text-sm">
                                        <div>
                                            <p>
                                                Detalla los plazos de envío estimados, los costos asociados y las áreas de cobertura. También puedes incluir información sobre cómo manejar los retrasos en la entrega y qué hacer en caso de productos dañados durante el transporte.
                                            </p>
                                            <br />
                                            <p>
                                                - Plazos de envío estimados: Los productos se envían dentro de las 48 horas siguientes a la compra.
                                                <br />
                                                - Costos asociados: Envío gratuito para pedidos superiores a $50.
                                                <br />
                                                - Áreas de cobertura: Envíos disponibles en todo el país.
                                            </p>
                                        </div>
                                    </Disclosure.Panel>
                                </Transition>
                            </Disclosure>

                        </div>

                        <div>
                            <Disclosure>
                                <Disclosure.Button className="focus:outline-none">
                                    <div className='flex font-medium text-gray-300 my-2 text-sm'>
                                        <UserIcon className="w-6 h-6 text-gray-300 mx-2" /> 3. Política de garantía y servicio al cliente:
                                    </div>
                                </Disclosure.Button>
                                <Transition
                                    enter="transition duration-100 ease-out"
                                    enterFrom="transform scale-95 opacity-0"
                                    enterTo="transform scale-100 opacity-100"
                                    leave="transition duration-75 ease-out"
                                    leaveFrom="transform scale-100 opacity-100"
                                    leaveTo="transform scale-95 opacity-0"
                                >
                                    <Disclosure.Panel className="rounded-md p-2 text-sm">
                                        <div>
                                            <p>
                                                Detalla las garantías ofrecidas para tus productos o servicios, incluidos los procedimientos para solicitar servicio al cliente, reclamaciones de garantía y asistencia técnica.
                                            </p>
                                            <br />
                                            <p>
                                                - Garantías ofrecidas: Garantía de satisfacción del cliente: Si no está satisfecho con su compra, puede devolver el producto para obtener un reembolso completo.
                                                <br />
                                                - rocedimientos de servicio al cliente: Los clientes pueden ponerse en contacto con nuestro equipo de servicio al cliente por correo electrónico o teléfono para recibir asistencia.
                                            </p>
                                        </div>
                                    </Disclosure.Panel>
                                </Transition>
                            </Disclosure>

                        </div>

                        <div>
                            <Disclosure>
                                <Disclosure.Button className="focus:outline-none">
                                    <div className='flex font-medium text-gray-300 my-2 text-sm'>
                                        <ArchiveBoxXMarkIcon className="w-6 h-6 text-gray-300 mx-2" /> 4. Política de cancelación y reservas:
                                    </div>
                                </Disclosure.Button>
                                <Transition
                                    enter="transition duration-100 ease-out"
                                    enterFrom="transform scale-95 opacity-0"
                                    enterTo="transform scale-100 opacity-100"
                                    leave="transition duration-75 ease-out"
                                    leaveFrom="transform scale-100 opacity-100"
                                    leaveTo="transform scale-95 opacity-0"
                                >
                                    <Disclosure.Panel className="rounded-md p-2 text-sm">
                                        <div>
                                            <p>
                                                Define las reglas para cancelaciones de pedidos, citas o reservas. Esto puede incluir plazos de cancelación, cargos por cancelación y procedimientos para reprogramar.
                                            </p>
                                            <br />
                                            <p>
                                                - Garantías ofrecidas: Garantía de satisfacción del cliente: Si no está satisfecho con su compra, puede devolver el producto para obtener un reembolso completo.
                                                <br />
                                                - rocedimientos de servicio al cliente: Los clientes pueden ponerse en contacto con nuestro equipo de servicio al cliente por correo electrónico o teléfono para recibir asistencia.
                                            </p>
                                        </div>
                                    </Disclosure.Panel>
                                </Transition>
                            </Disclosure>

                        </div>

                        <div>
                            <Disclosure>
                                <Disclosure.Button className="focus:outline-none">
                                    <div className='flex font-medium text-gray-300 my-2 text-sm'>
                                        <RectangleGroupIcon className="w-6 h-6 text-gray-300 mx-2" /> 4. Política de cumplimiento legal:
                                    </div>
                                </Disclosure.Button>
                                <Transition
                                    enter="transition duration-100 ease-out"
                                    enterFrom="transform scale-95 opacity-0"
                                    enterTo="transform scale-100 opacity-100"
                                    leave="transition duration-75 ease-out"
                                    leaveFrom="transform scale-100 opacity-100"
                                    leaveTo="transform scale-95 opacity-0"
                                >
                                    <Disclosure.Panel className="rounded-md p-2 text-sm">
                                        <div>
                                            <p>
                                                Asegúrate de cumplir con todas las leyes y regulaciones aplicables a tu industria y ubicación. Esto puede incluir normativas sobre protección al consumidor, privacidad de datos, seguridad de productos y más.
                                            </p>
                                            <br />
                                            <p>
                                                - Cumplimiento de las leyes y regulaciones: Nos comprometemos a cumplir con todas las leyes y regulaciones aplicables en nuestra industria y ubicación.
                                                <br />
                                                - Protección al consumidor: Nos aseguramos de proteger los derechos y la privacidad de nuestros clientes en todo momento.
                                            </p>
                                        </div>
                                    </Disclosure.Panel>
                                </Transition>
                            </Disclosure>

                        </div>



                    </Disclosure.Panel>
                </Transition>
            </Disclosure></div>
    )
}

export default PoliticsFoundations