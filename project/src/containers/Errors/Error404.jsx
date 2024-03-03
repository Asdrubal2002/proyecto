import Layout from "../../hocs/Layout";
import { NavLink, Link } from 'react-router-dom'


export default function Error404() {
    return (
      <Layout>
        {/*
          This example requires updating your template:
  
          ```
          <html class="h-full">
          <body class="h-full">
          ```
        */}
        <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-color_letra_blanca">Error 404</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-color_letra_blanca sm:text-5xl">Página no encontrada</h1>
            <p className="mt-6 text-base leading-7 text-color_letra_blanca">Lo sentimos, no pudimos encontrar la página que estás buscando.</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/"
                className="rounded-md bg-azul_corp px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-azul_corp_ho focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Volver al inicio
              </Link>
            
            </div>
          </div>
        </main>
      </Layout>
    )
  }
  