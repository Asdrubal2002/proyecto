/* This example requires Tailwind CSS v2.0+ */

import { Link } from 'react-router-dom'
import { Typewriter } from 'react-simple-typewriter'
export default function Banner() {
    return (
        <div className="z-0">
        <div className="relative isolate px-6 pt-10 lg:px-8 border-b border-stone-900 p-32">
          <div className="mx-auto max-w-2xl py-32 sm:py-10 lg:py-10 z-0">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="z-0 relative rounded-full px-3 py-1 text-sm leading-6 text-color_letra_blanca ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                Anunciante y busca ante empleadores.{' '}
                <a href="#" className="font-semibold text-indigo-600">
                  <span className="absolute inset-0" aria-hidden="true" />
                  Anuncia <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
            <div className="text-center z-0 ">
              <h1 className="text-4xl font-bold tracking-tight text-color_letra_blanca sm:text-6xl">
                Todo lo que necesitas esta más cerca
              </h1>
              <p className="mt-6 text-lg leading-8 text-color_letra_blanca estilo_letra">
                Haremos todo lo posible para que tu empresa vea quien eres y que haces. Tambien estamos cansados
                de que nos pasen sin decirnos nada.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  to="/mall"
                  className="rounded-lg bg-azul_corp px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-azul_corp_ho focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Ingresar
                </Link>
                <a href="#" className="text-sm font-semibold leading-6 text-gray-300">
                  <span aria-hidden="true">En tu </span>
                  <Typewriter
                    words={['País', 'Ciudad', 'Barrio']}
                    loop={0}
                    cursor

                    //cursorStyle='_'
                    typeSpeed={120}
                    deleteSpeed={50}
                    delaySpeed={1000}
                  // onLoopDone={handleDone}
                  // onType={handleType}
                  />
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
  