import React from 'react'
import { Boton, Contenedor, Contenedor1, Detalle, Detalles, Detalles1, Items, LinkBoton, Mes, Precio, TipoPrecio } from './styles/CompanyRuvlo'
import { CheckIcon } from '@heroicons/react/24/outline'

export default function CompanyRuvlo() {
  return (
      <div className="pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl leading-8 tracking-tight text-white sm:text-3xl">Nuestros Planes</h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-300 lg:mx-auto">Elige el plan que mejor se adapte a tu tienda.</p>
          </div>

          <div className="mt-20">
            <div className="max-w-lg mx-auto grid gap-10 lg:grid-cols-4 lg:max-w-none">
              {/* Plan Básico */}
              <Contenedor>
                <Contenedor1>
                  <div>
                    <TipoPrecio>
                      Prueba
                    </TipoPrecio>
                  </div>
                  <Precio>
                    $0
                    <Mes>/mes</Mes>
                  </Precio>
                  {/* <Detalle>Tiendas</Detalle> */}
                </Contenedor1>
                <Detalles>
                <ul>
                    <Detalles1>
                      <CheckIcon className="h-6 w-5 flex-none text-azul_corp_ho" />
                      <Items>1 Foto, 1 Pefil</Items>
                    </Detalles1>
                    <Detalles1>
                      <CheckIcon className="h-6 w-5 flex-none text-azul_corp_ho" />
                      <Items>2 categorias de productos</Items>
                    </Detalles1>
                    <Detalles1>
                      <CheckIcon className="h-6 w-5 flex-none text-azul_corp_ho" />
                      <Items>1 foto por producto</Items>
                    </Detalles1>
                    <Detalles1>
                      <CheckIcon className="h-6 w-5 flex-none text-azul_corp_ho" />
                      <Items>5 productos</Items>
                    </Detalles1>
                    <Detalles1>
                      <CheckIcon className="h-6 w-5 flex-none text-azul_corp_ho" />
                      <Items>2 opciones de un producto</Items>
                    </Detalles1>
                  </ul>
                  <Boton>
                    <LinkBoton to="/">
                      Comenzar
                    </LinkBoton>
                  </Boton>
                </Detalles>
              </Contenedor>
              <Contenedor>
                
                <Contenedor1>
                  <div>
                    <TipoPrecio>
                      Emprendimientos
                    </TipoPrecio>
                  </div>
                  <Precio>
                    $50.000
                    <Mes>/mes</Mes>
                  </Precio>
                  {/* <Detalle>Ventas pequeñas</Detalle> */}
                </Contenedor1>
                <Detalles>
                  <ul>
                    <Detalles1>
                      <CheckIcon className="h-6 w-5 flex-none text-azul_corp_ho" />
                      <Items>1 Foto, 1 Pefil</Items>
                    </Detalles1>
                    <Detalles1>
                      <CheckIcon className="h-6 w-5 flex-none text-azul_corp_ho" />
                      <Items>5 categorias de productos</Items>
                    </Detalles1>
                    <Detalles1>
                      <CheckIcon className="h-6 w-5 flex-none text-azul_corp_ho" />
                      <Items>2 fotos por producto</Items>
                    </Detalles1>
                    <Detalles1>
                      <CheckIcon className="h-6 w-5 flex-none text-azul_corp_ho" />
                      <Items>10 productos</Items>
                    </Detalles1>
                    <Detalles1>
                      <CheckIcon className="h-6 w-5 flex-none text-azul_corp_ho" />
                      <Items>3 opciones de un producto</Items>
                    </Detalles1>
                  </ul>
                  <Boton>
                    <LinkBoton to="/">
                      Comenzar
                    </LinkBoton>
                  </Boton>
                </Detalles>
              </Contenedor>


              {/* Plan Estándar */}
              <Contenedor>
                <Contenedor1>
                  <div>
                    <TipoPrecio>
                      Ventas
                    </TipoPrecio>
                  </div>
                  <Precio>
                    $100.000
                    <Mes>/mes</Mes>
                  </Precio>
                  {/* <Detalle>Emprendimientos</Detalle> */}
                </Contenedor1>
                <Detalles>
                <ul>
                    <Detalles1>
                      <CheckIcon className="h-6 w-5 flex-none text-azul_corp_ho" />
                      <Items>1 Foto, 1 Pefil</Items>
                    </Detalles1>
                    <Detalles1>
                      <CheckIcon className="h-6 w-5 flex-none text-azul_corp_ho" />
                      <Items>10 categorias de productos</Items>
                    </Detalles1>
                    <Detalles1>
                      <CheckIcon className="h-6 w-5 flex-none text-azul_corp_ho" />
                      <Items>4 fotos por producto</Items>
                    </Detalles1>
                    <Detalles1>
                      <CheckIcon className="h-6 w-5 flex-none text-azul_corp_ho" />
                      <Items>20 productos</Items>
                    </Detalles1>
                    <Detalles1>
                      <CheckIcon className="h-6 w-5 flex-none text-azul_corp_ho" />
                      <Items>5 opciones de un producto</Items>
                    </Detalles1>
                  </ul>
                  <Boton>
                    <LinkBoton to="/">
                      Comenzar
                    </LinkBoton>
                  </Boton>
                </Detalles>
              </Contenedor>

              {/* Plan Premium */}
             

              {/* Plan Premium */}
              <Contenedor>
                <Contenedor1>
                  <div>
                    <TipoPrecio>
                      Comercios
                    </TipoPrecio>
                  </div>
                  <Precio>
                    $300.000
                    <Mes>/mes</Mes>
                  </Precio>
                  {/* <Detalle>Negocios</Detalle> */}
                </Contenedor1>
                <Detalles>
                <ul>
                    <Detalles1>
                      <CheckIcon className="h-6 w-5 flex-none text-azul_corp_ho" />
                      <Items>1 Foto, 1 Pefil</Items>
                    </Detalles1>
                    <Detalles1>
                      <CheckIcon className="h-6 w-5 flex-none text-azul_corp_ho" />
                      <Items>30 categorias de productos</Items>
                    </Detalles1>
                    <Detalles1>
                      <CheckIcon className="h-6 w-5 flex-none text-azul_corp_ho" />
                      <Items>6 fotos por producto</Items>
                    </Detalles1>
                    <Detalles1>
                      <CheckIcon className="h-6 w-5 flex-none text-azul_corp_ho" />
                      <Items>90 productos</Items>
                    </Detalles1>
                    <Detalles1>
                      <CheckIcon className="h-6 w-5 flex-none text-azul_corp_ho" />
                      <Items>20 opciones de un producto</Items>
                    </Detalles1>
                  </ul>
                  <Boton>
                    <LinkBoton to="/">
                      Comenzar
                    </LinkBoton>
                  </Boton>
                </Detalles>
              </Contenedor>
            </div>
          </div>
        </div>
      </div>
  )
}
