import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
  XMarkIcon,
  CheckIcon,
  BarsArrowUpIcon,
  ArrowLeftStartOnRectangleIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline'
import ItemsSidebar from './ItemsSidebar'
import { Link, useNavigate } from 'react-router-dom'
import { LetrasPerfil } from './styles/sidebar'


export default function Sidebar({ children, logout, profile, user }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [open, setOpen] = useState(false)

  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }


  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full">
        <body class="h-full">
        ```
      */}
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                    <div className="flex flex-shrink-0 items-center px-4">
                      <img
                        className="h-8 w-auto"
                        src="/LogoRuvlo.png"
                        alt="Your Company"
                      />
                    </div>
                    <ItemsSidebar />
                  </div>
                  <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
                    <button onClick={e => setOpen(true)} className="group block flex-shrink-0">
                      <div className="flex items-center">
                        <div>
                          <img
                            className="inline-block h-10 w-10 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">Tom Cook</p>
                          <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">View profile</p>
                        </div>
                      </div>
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0">{/* Force sidebar to shrink to fit close icon */}</div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-60 md:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
              <div className="flex flex-shrink-0 items-center px-4 justify-between">
                <img
                  className="h-8 w-auto"
                  src="/LogoRuvlo.png"
                  alt="Your Company"
                />
                <Link to="/help" className='group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-900'>
                  <QuestionMarkCircleIcon className='mr-4 flex-shrink-0 h-6 w-6' />
                  Ayuda
                </Link>
              </div>

              <ItemsSidebar />
            </div>
            {/* <div className='mt-5 space-y-1 px-2'>
              <Link to="/help" className='group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-900'>
                <QuestionMarkCircleIcon className='mr-4 flex-shrink-0 h-6 w-6' />
                ¿Necesitas ayuda con tu tienda?

              </Link>
            </div> */}

            <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
              <button onClick={e => setOpen(true)} className="group block w-full flex-shrink-0">
                <div className="flex items-center">


                  <Menu as="div" className="relative inline-block text-left justify-center items-center">
                    <Menu.Button
                      onClick={() => setOpen(true)}
                      className="group block w-full flex-shrink-0 relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-azul_corp rounded-full focus:outline-none cursor-pointer"
                    >
                      <div className="flex items-center">
                        {user && user.photo != null ? (
                          <img className="h-10 w-10 cover" src={user.photo} alt="User profile" />
                        ) : (
                          <div className="h-10 w-10 flex items-center justify-center">
                            <LetrasPerfil>{user && user.get_first_letters}</LetrasPerfil>
                          </div>
                        )}
                      </div>
                    </Menu.Button>
                  </Menu>

                  <div className="ml-3">
                    <p className="text-sm text-gray-700 group-hover:text-gray-900">{profile && profile.firs_name} {profile && profile.last_name}</p>
                    <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700 flex justify-center"> <ArrowLeftStartOnRectangleIcon width={20} height={20} color="#ffdef" radius="6" /></p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col md:pl-64">
          <div className="sticky top-0 z-10 bg-white pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1">
            <div className="py-6">
              {/* <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
              </div> */}
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                        Salir de administración
                      </Dialog.Title>
                      <div className="mt-2">
                        {/* <p className="text-sm text-gray-500">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore.
                      </p> */}
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-azul_corp px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-azul_corp_ho sm:text-sm"
                      onClick={() => handleLogout()}
                    >
                      Salir
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

    </>
  )
}
