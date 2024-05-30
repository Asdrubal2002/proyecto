import React from 'react'

import {
  Bars3Icon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
  XMarkIcon,
  BuildingStorefrontIcon,
  PencilSquareIcon,
  CircleStackIcon,
  PaperAirplaneIcon,
  ListBulletIcon,
  TagIcon,
  CalculatorIcon,
  HandRaisedIcon
} from '@heroicons/react/24/outline'
import { Link, useLocation } from 'react-router-dom'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ItemsSidebar() {
  const location = useLocation  ()
  const navigation = [
    { name: 'Inicio', href: '/', icon: ChartBarIcon, current: location.pathname==='/store_admin_home' ? true:false },
    { name: 'Mi Negocio', href: '/store', icon: BuildingStorefrontIcon, current: location.pathname==='/store' ? true:false  },
    { name: 'Categorias', href: '/categories', icon: ListBulletIcon, current: location.pathname==='/categories' ? true:false  },
    { name: 'Productos', href: '/products', icon: CircleStackIcon, current: location.pathname==='/products' ? true:false },
    { name: 'Métodos de entrega o envío', href: '/shipping', icon: PaperAirplaneIcon, current: location.pathname==='/shipping' ? true:false },
    { name: 'Opciones', href: '/my_options', icon: TagIcon, current: location.pathname==='/my_options' ? true:false },
    { name: 'Pedidos', href: '/invoices', icon: CalculatorIcon, current: location.pathname==='/invoices' ? true:false },
    { name: 'Colaboradores', href: '/partners', icon: HandRaisedIcon, current: location.pathname==='/partners' ? true:false },

  ]

  return (
    <nav className="mt-5 space-y-1 px-2">
      {navigation.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className={classNames(
            item.current
              ? 'bg-blue-100 text-gray-900'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
            'group flex items-center px-2 py-2 text-base font-medium rounded-md'
          )}
        >
          <item.icon
            className={classNames(
              item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
              'mr-4 flex-shrink-0 h-6 w-6'
            )}
            aria-hidden="true"
          />
          {item.name}
        </Link>
      ))}
    </nav>
  )
}
