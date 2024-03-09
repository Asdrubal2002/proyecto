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
  BuildingStorefrontIcon
} from '@heroicons/react/24/outline'
import { Link, useLocation } from 'react-router-dom'



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function ItemsSidebar() {

  const location = useLocation  ()


  const navigation = [
    { name: 'Inicio', href: '/', icon: HomeIcon, current: location.pathname==='/store_admin_home' ? true:false },
    { name: 'Tienda', href: '/create_store', icon: BuildingStorefrontIcon, current: location.pathname==='/create_store' ? true:false },
    { name: 'Projects', href: '#', icon: FolderIcon, current: false },
    { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
    { name: 'Documents', href: '#', icon: InboxIcon, current: false },
    { name: 'Reports', href: '#', icon: ChartBarIcon, current: false },
  ]



  return (
    <nav className="mt-5 space-y-1 px-2">
      {navigation.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className={classNames(
            item.current
              ? 'bg-gray-100 text-gray-900'
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
