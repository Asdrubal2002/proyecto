import React, { useState } from 'react';
import Layout from "../../hocs/Layout";
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { Link } from 'react-router-dom';

const faqs = [
    {
        question: "¿Como crear mi tienda?",
        answer: "Al momento que entres por primera vez a administrar tu tienda. Se observara un formulario en todas las pestañas que eligas. Deberas llenarlo cuidadosamente.",

    },

    {
        question: "¿Como establecer el banner y la foto de mi tienda?",
        answer: (
            <>
                <p>
                    Ahora que has creado tu tienda, encontrarás dos botones uno en la parte superior <strong className="text-yellow-400">'Actualizar el banner de mi tienda'</strong> y en la parte inferior <strong className="text-yellow-400">'Agregar perfil a mi tienda'</strong>.
                    Al presionarlos, se abrirá un selector de archivos donde podrás cargar tus imágenes.
                    Podrás previsualizarlas y verificar si se ajustan al tema de tu tienda.
                </p>
            </>
        ),
        href: [
            { link: '/store', step: 'Establecer mis imagenes' },
        ]
    },
    {
        question: "¿Cómo agrego productos a mi tienda?",
        answer: (
            <>
                <p>
                    Para agregar productos, primero debes registrar las <strong className="text-yellow-400">categorías</strong> que vas a manejar en tu negocio. Después de registrarlas, puedes crear los productos que pertenezcan a cada categoría creada.
                </p>
            </>
        ),
        href: [
            { link: '/categories', step: 'Registrar Categorías' },
        ]
    },
    {
        question: "¿Como crear categorias?",
        answer: (
            <>
                <p>El formulario consta de dos campos:  <strong className="text-yellow-400">Nombre de la categoría y Categoría Padre.</strong></p><br />
                <p>Puedes nombrar tu categoría como desees. Por ejemplo, para una tienda de ropa, podrías llamarla <strong className="text-yellow-400">'Infantil'</strong> y seleccionarla como <strong className="text-yellow-400">'Categoría Padre'</strong>, ya que puede haber otras categorías hijas dentro de 'Infantil', como jeans, camisas, medias, etc.</p><br />
                <p>Una vez que tengas una categoría padre, puedes guardar otras subcategorías dentro de ella seleccionando la opción correspondiente en el campo Categoría Padre.</p>

            </>
        ), href: [
            { link: '/categories', step: 'Registrar Categorías' }
        ]

    },
    {
        question: "¿Como crear un método de entrega?",
        answer: (
            <>
                <p>Tu negocio puede que tenga o no tenga envíos. En el formulario vas a especificar eso.</p>
                <br />
                <p>En el formulario hay 4 campos:</p>
                <br />
                <ul>
                    <li><strong className="text-yellow-400">* Nombre de tu entrega</strong>: Se debe asignar un nombre al método de entrega  <strong>Ejemplo</strong>: Punto de ventas, envio nacional, envio internacional, domicilio.</li>
                    <li><strong className="text-yellow-400">* Tiempo estimado de entrega</strong>: Se debe asignar el tiempo estimado que tomará la entrega. <strong>Ejemplo</strong>: 2 horas, 5 dias, al instante, etc</li>
                    <li><strong className="text-yellow-400">* Precio de la entrega</strong>: Se debe asignar el precio de la entrega, utilizando solo números <strong>Ejemplo</strong>: 0, 3000, 20, 2500, 15000</li>
                    <li><strong className="text-yellow-400">* Notas adicionales que tengas sobre el envió o entrega.</strong>: Se pueden agregar notas adicionales sobre el envío, pero es opcional.</li>
                </ul>
                <br />
                <p>Puedes desactivar y activar los métodos de entrega cuando quieras. </p>
            </>
        ), href: [
            { link: '/shipping', step: 'Registrar Métodos de entrega' }
        ]
    },
    {
        question: "¿Como crear productos?",
        answer: (
            <>
                <p>Verás en la parte superior derecha un botón que dice <strong className="text-yellow-400">'Crear Producto'</strong>. Al hacer clic en él, aparecerá un formulario con unos campos básicos del producto para registrarlo.</p>
                <br />
                <ul>
                    <li>* Nombre</li>
                    <li>* Categoría del producto <strong className="text-yellow-400">(Ya creadas anteriormente)</strong></li>
                    <li>* Descripción </li>
                    <li>* Precio</li>
                </ul>
                <br />
                <p>Una vez creado el producto, aparecerá en los productos de tu tienda, inicialmente desactivado. Si deseas agregarle o editarle información, tendrás que ingresar en él.</p>

            </>
        ), href: [
            { link: '/products', step: 'Registrar Productos' },
            { link: '/categories', step: '¿Si no has registrado las categorías...?' }
        ]

    },
    {
        question: "¿Como editar los productos?",
        answer: (
            <>
                <p>Cuando accedas al producto que deseas editar, verás los campos previamente completados durante su creación. Desde aquí, puedes realizar cualquier modificación necesaria.</p>
                <br />
                <p>En el campo <strong className="text-yellow-400">'Opciones del producto'</strong> puedes registrar las distintas opciones disponibles y su cantidad para el producto. Por ejemplo, colores, tallas, sabores, ingredientes, etc.</p>
                <br />
                <p><strong className="text-yellow-400">Aviso importante:</strong> No puedes dejar este campo vacío. Si no tienes opciones, complétalo con una característica principal de tu producto y la cantidad que tengas disponible.</p>
                <br />
                <p>Puedes agregar imágenes a tu producto para mostrarlo en tu tienda. También tienes la opción de activar o desactivar tu producto en cualquier momento.</p>
            </>
        ), href: [
            { link: '/products', step: 'Productos' },
        ]

    },
    {
        question: "¿Cómo registrar las opciones del producto?",
        answer: (
            <>
                <p>Al acceder al producto que deseas editar, encontrarás dos campos: <strong className="text-yellow-400">'Escriba una opción'</strong> y <strong className="text-yellow-400">'Cantidad'</strong>. Estos campos te permiten especificar las características principales de tu producto y la cantidad disponible de cada una.</p>
                <br />
                <p>Cuando registres estas opciones, quedarán almacenadas en tu tienda para que puedas reutilizarlas en otros productos si es necesario. Esto facilita la gestión de tus productos y garantiza consistencia en las opciones disponibles para tus clientes."</p>

            </>
        ), href: [
            { link: '/products', step: 'Productos' },
        ]

    },
    {
        question: "¿Como establecer fotos de mi producto?",
        answer: (
            <>
                <p>Cuando accedas al producto que deseas editar, verás en la parte inferior el campo para ingresar imagenes de tu producto. Al momento de subirlas, se podran observar en la galeria de tu producto.</p>
                

            </>
        ), href: [
            { link: '/products', step: 'Productos' },
        ]

    },

    {
        question: "¿Que es la verificación de mi negocio",
        answer: (
            <>
                <p>Tu tienda está sujeta a verificación por parte de las autoridades tributarias gubernamentales. Este proceso garantiza la legitimidad y confiabilidad de tu empresa, proporcionando tranquilidad tanto a ti como a tus clientes.</p>
                

            </>
        ), href: [
            { link: '/store', step: 'Negocio' },
        ]

    },

    // Agrega más preguntas y respuestas aquí
];

export default function HelpWithMyStore() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredFaqs = faqs.filter((faq) =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Layout>
            <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
                <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                    <div className="ml-4 mt-2">
                        <h3 className="text-lg font-medium leading-6 text-gray-200">Administración de tu tienda</h3>
                    </div>
                </div>
            </div>
            <div className="w-full py-4">
                <div className="rounded-2xl bg-stone-800 p-2">
                    <input
                        type="text"
                        placeholder="Buscar pregunta..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="text-sm block w-full p-2 mb-4 bg-stone-900 rounded-lg placeholder-gray-400 text-gray-200 focus:outline-none focus:ring-2 focus:ring-azul_corp_ho"
                    />
                    {filteredFaqs.map((faq, index) => (
                        <Disclosure key={index}>
                            {({ open }) => (
                                <>
                                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-stone-900 px-4 py-2 text-left text-sm font-medium text-white hover:bg-stone-700 my-4">
                                        <span>{faq.question}</span>
                                        <ChevronUpIcon
                                            className={`${open ? 'rotate-180 transform' : ''
                                                } h-5 w-5 text-azul_corp_ho`}
                                        />
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="px-4 py-2 text-sm text-gray-200">
                                        <p>{faq.answer}</p>
                                        {faq.href &&
                                            faq.href.map((step, i) => (
                                                <div key={i} className="my-2">
                                                    <Link to={step.link} className="text-azul_corp_ho font-medium">{step.step}</Link>
                                                </div>
                                            ))}
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
