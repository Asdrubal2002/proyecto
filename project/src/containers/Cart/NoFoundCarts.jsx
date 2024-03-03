import { ArchiveBoxXMarkIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { NavLink, Link } from 'react-router-dom'
import Searcher from '../../components/searcher/Searcher'


export default function NoFoundCarts() {
    return (
        <>
            {/*
          This example requires updating your template:
  
          ```
          <html class="h-full">
          <body class="h-full">
          ```
        */}
            <main className="grid min-h-full place-items-center px-6 py-20">
                <div className="text-center">
                    <h1 className="mt-4 w-14 h-14 mx-auto"><ArchiveBoxXMarkIcon className="w-full h-full" /></h1>
                    <p className="mt-6 text-base leading-7 text-color_letra_blanca">No tienes compras que realizar.</p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Searcher/>
                    </div>
                </div>
            </main>
        </>

    )
}
