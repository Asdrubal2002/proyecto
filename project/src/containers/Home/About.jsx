import React from 'react'
import Layout from '../../hocs/Layout'
import CompanyRuvlo from '../../components/home/CompanyRuvlo'
import { LockClosedIcon, ServerIcon, CloudArrowUpIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom';
import { BuildingStorefrontIcon } from '@heroicons/react/24/outline';


export default function About() {
    return (
        <Layout>
            <Helmet>
                <title>Ruvlo | Comienza con tu tienda</title>
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
                                <p className="text-base font-semibold leading-7 text-azul_corp_ho font-estilo_letra">Empieza a vender</p>
                                <h1 className="mt-2 text-3xl text-gray-200 sm:text-4xl font-estilo_letra">Con Ruvlo</h1>
                                <p className="mt-6 text-xl leading-8 text-gray-300 font-estilo_letra">
                                    Con nuestra plataforma, puedes lanzar tu propia tienda en línea y vender tus productos de manera sencilla a través de Ruvlo. </p>
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
                            <div className="max-w-xl text-base leading-7 text-gray-300 lg:max-w-lg font-estilo_letra">
                                <p>
                                    Te ofrecemos una amplia gama de características y servicios diseñados para impulsar tu éxito</p>
                                <ul role="list" className="mt-8 space-y-8 text-gray-400">
                                    <li className="flex gap-x-3">
                                        <LockClosedIcon className="mt-1 h-5 w-5 flex-none text-azul_corp_ho" aria-hidden="true" />
                                        <span>
                                            <strong className="font-semibold text-azul_corp_ho">Seguridad</strong> Nuestra plataforma proporciona un entorno seguro y confiable para tu tienda en línea.
                                            Con funcionalidades como el sistema de pago integrado y la gestión de inventario, puedes gestionar fácilmente tus productos y transacciones.
                                        </span>
                                    </li>
                                    <li className="flex gap-x-3">
                                        <ComputerDesktopIcon className="mt-1 h-5 w-5 flex-none text-azul_corp_ho" aria-hidden="true" />
                                        <span>
                                            <strong className="font-semibold text-azul_corp_ho">Simplicidad.</strong>  Simplificamos el proceso de despliegue de tu tienda en línea. Con solo un clic, puedes implementar tus cambios y actualizaciones en tiempo real, manteniendo tu tienda siempre actualizada y funcional.
                                        </span>
                                    </li>
                                    <li className="flex gap-x-3">
                                        <ServerIcon className="mt-1 h-5 w-5 flex-none text-azul_corp_ho" aria-hidden="true" />
                                        <span>
                                            <strong className="font-semibold text-azul_corp_ho">Database backups.</strong> Ac tincidunt sapien
                                            vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.
                                        </span>
                                    </li>
                                </ul>
                                <p className="mt-8">
                                    Con nuestra plataforma, puedes crear, gestionar y expandir tu tienda en línea de forma sencilla y segura. Únete a nosotros hoy mismo y lleva tu negocio al siguiente nivel con Ruvlo.</p>
                                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-400">

                                    <Link to="/conditions" className='text-azul_corp_ho mx-2 text-base'>leé los términos y condiciones </Link>
                                </h2>
                                <p className="mt-6 italic ">
                                    Democratizamos el mercado y fomentamos la competencia, brindándote las herramientas para que tu negocio prospere en igualdad de condiciones y compita con las grandes cadenas de tiendas. Únete a Ruvlo y haz que tu empresa destaque.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CompanyRuvlo />
        </Layout>
    )
}
