import { Fragment, useState } from 'react'
import { Dialog, Popover, Tab, Transition, Menu } from '@headlessui/react'
import { BanknotesIcon, Bars3Icon, BuildingStorefrontIcon, ClipboardDocumentCheckIcon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, NavLink } from 'react-router-dom'

import { logout } from "../../redux/actions/auth"

import { Links, Contenedor2, Contenedor1, MessajeNavbar, NavbarMenu, MenusDesplegables, MenusDesplegable1, MenusDesplegable2, MenusDesplegable3, MenusDesplegable4, ParteDerechaNavbar, ParteDerechaNavbar1, LetrasPerfil, NombreModal } from './Styles/Navbar'

import { connect } from "react-redux";


const navigation = {
    categories: [
        {
            id: 'cuenta',
            name: 'Cuenta',
            featured: [
                {
                    name: 'Centro de compras',
                    to: '/carts',
                    imageSrc: '/tiendas.png',
                    imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
                },
                {
                    name: 'Facturas',
                    to: '/invoices',
                    imageSrc: '/facturas.png',
                    imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
                },
            ],
            sections: [
                {
                    id: 'profule',
                    name: 'Perfil',
                    items: [
                        { name: 'Datos personales', to: '/dashboard' },
                        { name: 'Cambia datos de tu cuenta', to: '/dashboardAccount' },


                    ],
                },

                {
                    id: 'product',
                    name: 'Productos',
                    items: [
                        { name: 'Productos favoritos', to: '/wish_list' },
                    ],
                },
                {
                    id: 'store',
                    name: 'Tiendas',
                    items: [
                        { name: 'Tiendas favoritas', to: '/wish_list_stores' },
                    ],
                },
            ],
        },
        // {
        //     id: 'compras',
        //     name: 'Compras',
        //     featured: [
        //         {
        //             name: 'New Arrivs',
        //             to: '#',
        //             imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
        //             imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
        //         },
        //         {
        //             name: 'Artwork Tees',
        //             to: '#',
        //             imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
        //             imageAlt:
        //                 'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
        //         },
        //     ],
        //     sections: [
        //         {
        //             id: 'clothing',
        //             name: 'Clothing',
        //             items: [
        //                 { name: 'Tops', to: '#' },
        //                 { name: 'Pants', to: '#' },
        //                 { name: 'Sweaters', to: '#' },
        //                 { name: 'T-Shirts', to: '#' },
        //                 { name: 'Jackets', to: '#' },
        //                 { name: 'Activewear', to: '#' },
        //                 { name: 'Browse All', to: '#' },
        //             ],
        //         },
        //         {
        //             id: 'accessories',
        //             name: 'Accessories',
        //             items: [
        //                 { name: 'Watches', to: '#' },
        //                 { name: 'Wallets', to: '#' },
        //                 { name: 'Bags', to: '#' },
        //                 { name: 'Sunglasses', to: '#' },
        //                 { name: 'Hats', to: '#' },
        //                 { name: 'Belts', to: '#' },
        //             ],
        //         },
        //         {
        //             id: 'brands',
        //             name: 'Brands',
        //             items: [
        //                 { name: 'Re-Arranged', to: '#' },
        //                 { name: 'Counterfeit', to: '#' },
        //                 { name: 'Full Nelson', to: '#' },
        //                 { name: 'My Way', to: '#' },
        //             ],
        //         },
        //     ],
        // },
    ],
    pages: [
        { name: 'Compañia', to: '/' },
        { name: 'Centro comercial', to: '/' },
    ],
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function Navbar({ isAuthenticated, user, logout, cart_count, invoice_count }) {
    const [open, setOpen] = useState(false)
    const [redirect, setRedirect] = useState(false);

    const logoutHandler = () => {
        logout();
        setRedirect(true);
        setOpen(false)
    };

    return (
        <>
            <div>
                {/* Mobile menu */}
                <Transition.Root show={open} as={Fragment}>
                    <Dialog as="div" className="relative  lg:hidden" onClose={setOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-[100] flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                                    <div className="flex px-4 pb-2 pt-5">
                                        <button
                                            type="button"
                                            className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                                            onClick={() => setOpen(false)}
                                        >
                                            <span className="absolute -inset-0.5" />
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>


                                    {isAuthenticated ? <>
                                        <Tab.Group as="div" className="mt-2">
                                            <div className="border-b border-gray-200">
                                                <Tab.List className="-mb-px flex space-x-8 px-4">
                                                    {navigation.categories.map((category) => (
                                                        <Tab
                                                            key={category.name}
                                                            className={({ selected }) =>
                                                                classNames(
                                                                    selected ? 'border-azul_corp_ho text-azul_corp_ho' : 'border-transparent text-gray-900',
                                                                    'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium'
                                                                )
                                                            }
                                                        >
                                                            {category.name}
                                                        </Tab>
                                                    ))}
                                                </Tab.List>
                                            </div>
                                            <Tab.Panels as={Fragment}>
                                                {navigation.categories.map((category) => (
                                                    <Tab.Panel key={category.name} className="space-y-10 px-4 pb-8 pt-10">

                                                        <div className="grid grid-cols-2 gap-x-4">
                                                            {category.featured.map((item) => (
                                                                <div key={item.name} className="group relative text-sm">
                                                                    <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                                                        <img src={item.imageSrc} alt={item.imageAlt} className="object-cover object-center" />
                                                                    </div>
                                                                    <Link to={item.to} className="mt-6 block font-medium text-gray-900">
                                                                        <span className="absolute inset-0 " aria-hidden="true" />
                                                                        {item.name}
                                                                    </Link>
                                                                    <p aria-hidden="true" className="mt-1">
                                                                        de
                                                                    </p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        {category.sections.map((section) => (
                                                            <div key={section.name}>
                                                                <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                                                                    {section.name}
                                                                </p>
                                                                <ul
                                                                    role="list"
                                                                    aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                                                    className="mt-6 flex flex-col space-y-6"
                                                                >
                                                                    {section.items.map((item) => (
                                                                        <li key={item.name} className="flow-root">
                                                                            <Link to={item.to} className="-m-2 block p-2 text-gray-500">
                                                                                {item.name}
                                                                            </Link>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        ))}
                                                    </Tab.Panel>
                                                ))}
                                            </Tab.Panels>
                                        </Tab.Group>
                                        <button className="space-y-6 px-4 py-6 text-gray-600 bg-gray-200" onClick={logoutHandler} >
                                            Salir
                                        </button >
                                    </> : <>
                                        <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                            <div className="flow-root">
                                                <Link to="/login" className="-m-2 block p-2 font-medium text-gray-900">
                                                    Ingresar
                                                </Link>
                                            </div>
                                            <div className="flow-root">
                                                <Link to="/signup" className="-m-2 block p-2 font-medium text-gray-900">
                                                    Registrarse
                                                </Link>
                                            </div>
                                        </div>
                                    </>}
                                    {/* Links */}
                                    <div className="space-y-6 border-t border-gray-200 px-4 py-6">

                                        <div className="flow-root">
                                            <Link to={'/'} className="-m-2 block p-2 font-medium text-gray-900">
                                                Centro comercial
                                            </Link>
                                        </div>
                                        <div className="flow-root">
                                            <Link to={'/company'} className="-m-2 block p-2 font-medium text-gray-900">
                                                Compañia
                                            </Link>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <NavbarMenu>
                    {/* <MessajeNavbar>
                       Desde hoy la democratizar el mercador sera posible.
                    </MessajeNavbar>  */}

                    <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <Contenedor1>
                            <Contenedor2>
                                <button
                                    type="button"
                                    className="relative rounded-md bg-stone-800 p-2 text-gray-100 lg:hidden"
                                    onClick={() => setOpen(true)}
                                >
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open menu</span>
                                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                                </button>

                                {/* Logo */}
                                <div className="ml-4 flex lg:ml-0">
                                    <Link to="/">
                                        <span className="sr-only">Your Company</span>
                                        <img
                                            className="h-8 w-auto"
                                            src="/LogoRuvlo.png"
                                            alt=""
                                        />
                                    </Link>
                                </div>

                                {/* Flyout menus */}
                                <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                                    <div className="flex h-full space-x-8">
                                        {isAuthenticated ? <> {navigation.categories.map((category) => (
                                            <Popover key={category.name} className="flex">
                                                {({ open }) => (
                                                    <>
                                                        <div className="relative flex">
                                                            <Popover.Button
                                                                className={classNames(
                                                                    open
                                                                        ? 'border-azul_corp_ho text-white'
                                                                        : 'border-transparent text-white hover:text-gray-400',
                                                                    'relative  -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                                                                )}
                                                            >
                                                                {category.name}
                                                            </Popover.Button>
                                                        </div>

                                                        <Transition
                                                            as={Fragment}
                                                            enter="transition ease-out duration-200"
                                                            enterFrom="opacity-0"
                                                            enterTo="opacity-100"
                                                            leave="transition ease-in duration-150"
                                                            leaveFrom="opacity-100"
                                                            leaveTo="opacity-0"
                                                        >
                                                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                                                                {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                                                <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                                                                <MenusDesplegables>
                                                                    <MenusDesplegable1>
                                                                        <MenusDesplegable2>
                                                                            <MenusDesplegable3>
                                                                                {category.featured.map((item) => (
                                                                                    <div key={item.name} className="group relative text-base sm:text-sm">
                                                                                        <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                                                                            <img
                                                                                                src={item.imageSrc}
                                                                                                alt={item.imageAlt}
                                                                                                className="object-cover object-center"
                                                                                            />
                                                                                        </div>
                                                                                        <Link to={item.to} className="mt-6 block font-medium text-gray-300">
                                                                                            <span className="absolute inset-0 " aria-hidden="true" />
                                                                                            {item.name}
                                                                                        </Link>
                                                                                        <p aria-hidden="true" className="mt-1">
                                                                                            Dentro de tu cuenta
                                                                                        </p>
                                                                                    </div>
                                                                                ))}
                                                                            </MenusDesplegable3>
                                                                            <MenusDesplegable4>
                                                                                {category.sections.map((section) => (
                                                                                    <div key={section.name}>
                                                                                        <p id={`${section.name}-heading`} className="font-medium text-gray-200">
                                                                                            {section.name}
                                                                                        </p>
                                                                                        <ul
                                                                                            role="list"
                                                                                            aria-labelledby={`${section.name}-heading`}
                                                                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                                        >
                                                                                            {section.items.map((item) => (
                                                                                                <li key={item.name} className="flex">
                                                                                                    <Link to={item.to} className="hover:text-gray-400">
                                                                                                        {item.name}
                                                                                                    </Link>
                                                                                                </li>
                                                                                            ))}
                                                                                        </ul>
                                                                                    </div>
                                                                                ))}
                                                                            </MenusDesplegable4>
                                                                        </MenusDesplegable2>
                                                                    </MenusDesplegable1>
                                                                </MenusDesplegables>
                                                            </Popover.Panel>
                                                        </Transition>
                                                    </>
                                                )}
                                            </Popover>
                                        ))}</> : <></>}

                                        <Link

                                            to={'/company'}
                                            className={`flex items-center text-sm font-medium ${window.location.pathname === '/company' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-100 hover:text-gray-400'}`}
                                            >
                                            Compañia
                                        </Link>

                                        <NavLink
                                            to={'/'}
                                            className={`flex items-center text-sm font-medium ${window.location.pathname === '/' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-100 hover:text-gray-400'}`}
                                            >
                                            Centro comercial
                                        </NavLink>
                                    </div>
                                </Popover.Group>
                                {/* Desktop */}
                                <ParteDerechaNavbar>
                                    <ParteDerechaNavbar1>
                                        {isAuthenticated ? <>
                                            <div className="ml-4 flow-root lg:ml-6">
                                                <Link to={'/carts'} className="group -m-2 flex items-center p-2">
                                                    <BuildingStorefrontIcon
                                                        className={`h-6 w-6 flex-shrink-0 group-hover:text-gray-500 ${window.location.pathname === '/carts' ? 'text-azul_corp_ho' : 'text-gray-400'}`}
                                                        aria-hidden="true"
                                                    />
                                                    <span className="text-xs absolute top-1 mt-3 ml-4 bg-red-500 text-white font-semibold rounded-full px-2 text-center">{cart_count}</span>
                                                    <span className="sr-only">items in cart, view bag</span>
                                                </Link>
                                            </div>
                                            <div className="ml-4 flow-root lg:ml-6">
                                                <Link to={'/invoices'} className="group -m-2 flex items-center p-2">
                                                    <ClipboardDocumentCheckIcon
                                                        className={`h-6 w-6 flex-shrink-0 group-hover:text-gray-500 ${window.location.pathname === '/invoices' ? 'text-azul_corp_ho' : 'text-gray-400'}`}
                                                        aria-hidden="true"
                                                    />
                                                    <span className="text-xs absolute top-1 mt-3 ml-4 bg-azul_corp text-white font-semibold rounded-full px-2 text-center">{invoice_count}</span>
                                                </Link>
                                            </div>
                                            {/* <div className="flex lg:ml-6">
                                                <a to="#" className="p-2 text-gray-400 hover:text-gray-500">
                                                    <span className="sr-only">Search</span>
                                                    <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                                                </a>
                                            </div> */}
                                            <Menu
                                                as="div"
                                                className="relative inline-block text-left justify-center items-center"
                                            >
                                                <div>
                                                    <Menu.Button className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-azul_corp rounded-full ">
                                                        {user && user.photo != null ? (
                                                            <img className="h-10 w-10 cover" src={user && user.photo} />
                                                        ) : (
                                                            <LetrasPerfil>{user && user.get_first_letters}</LetrasPerfil>
                                                        )}
                                                    </Menu.Button>
                                                </div>

                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-stone-900 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        <div className="py-1">
                                                            <NombreModal>
                                                                <span>{user && user.get_full_name}</span>
                                                            </NombreModal>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <Link
                                                                        to="/Dashboard"
                                                                        className={classNames(
                                                                            active
                                                                                ? "bg-gray-800 text-gray-300"
                                                                                : "text-gray-300",
                                                                            "block px-4 py-2 text-sm font-estilo_letra"
                                                                        )}
                                                                    >
                                                                        Datos personales
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <Link
                                                                        to="/dashboardAccount"
                                                                        className={classNames(
                                                                            active
                                                                                ? "bg-gray-800 text-gray-300"
                                                                                : "text-gray-300",
                                                                            "block px-4 py-2 text-sm font-estilo_letra"
                                                                        )}
                                                                    >
                                                                        Datos de tu cuenta
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <Link
                                                                        to="/carts"
                                                                        className={classNames(
                                                                            active
                                                                                ? "bg-gray-800 text-gray-300"
                                                                                : "text-gray-300",
                                                                            "block px-4 py-2 text-sm font-estilo_letra"
                                                                        )}
                                                                    >
                                                                        Tiendas seleccionadas
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <Link
                                                                        to="/invoices"
                                                                        className={classNames(
                                                                            active
                                                                                ? "bg-gray-800 text-gray-300"
                                                                                : "text-gray-300",
                                                                            "block px-4 py-2 text-sm font-estilo_letra"
                                                                        )}
                                                                    >
                                                                        Pedidos realizados
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <button
                                                                        onClick={logoutHandler}
                                                                        className={classNames(
                                                                            active
                                                                                ? "bg-gray-800 text-gray-300"
                                                                                : "text-gray-300",
                                                                            "block w-full text-left px-4 py-2 text-sm font-estilo_letra"
                                                                        )}
                                                                    >
                                                                        Salir de tu cuenta
                                                                    </button>
                                                                )}
                                                            </Menu.Item>
                                                        </div>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </> : <>
                                            <Links to="/signup">
                                                Registrarse
                                            </Links>
                                            <span className="h-6 w-px bg-gray-200" aria-hidden="true" />

                                            <Links to='/login'>
                                                Ingresar
                                            </Links>

                                        </>}


                                    </ParteDerechaNavbar1>

                                    {/* <div className="hidden lg:ml-8 lg:flex">
                                        <a to="#" className="flex items-center text-gray-200 hover:text-gray-400">
                                            <img
                                                src="https://tailwindui.com/img/flags/flag-canada.svg"
                                                alt=""
                                                className="block h-auto w-5 flex-shrink-0"
                                            />
                                            <span className="ml-3 block text-sm font-medium">CAD</span>
                                            <span className="sr-only">, change currency</span>
                                        </a>
                                    </div> */}

                                    {/* Search */}
                                    {/* <div className="flex lg:ml-6">
                                        <a to="#" className="p-2 text-gray-400 hover:text-gray-500">
                                            <span className="sr-only">Search</span>
                                            <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                                        </a>
                                    </div> */}

                                    {/* Cart */}
                                    {/* <div className="ml-4 flow-root lg:ml-6">
                                        <a to="#" className="group -m-2 flex items-center p-2">
                                            <ShoppingBagIcon
                                                className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                aria-hidden="true"
                                            />
                                            <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                                            <span className="sr-only">items in cart, view bag</span>
                                        </a>
                                    </div> */}
                                </ParteDerechaNavbar>
                            </Contenedor2>
                        </Contenedor1>
                    </nav>
                </NavbarMenu>
            </div>

        </>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user,
    cart_count: state.Cart.carts.cart_count,
    invoice_count: state.Invoice.invoices.invoices_count
});

export default connect(mapStateToProps, {
    logout
})(Navbar);

