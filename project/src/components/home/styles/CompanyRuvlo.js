import tw from "tailwind-styled-components";
import { Link } from "react-router-dom";


export const Contenedor = tw.div`
    flex 
    flex-col 
    rounded-lg 
    shadow-lg 
    overflow-hidden 
    bg-white
    transition-transform transform hover:scale-105
`;

export const Contenedor1 = tw.div`
    px-6 
    py-8 
    sm:p-10 
    sm:pb-6
   

`;


export const TipoPrecio = tw.h3`
    inline-flex 
    px-4 
    py-1 
    rounded-full 
    text-sm 
    font-semibold 
    tracking-wide 
    uppercase 
    bg-indigo-100 
    text-indigo-600

`;

export const Precio = tw.div`
    mt-4 
    flex 
    items-baseline 
    text-4xl 
    font-bold 
    text-gray-700
`;

export const Mes = tw.span`
    ml-1 
    text-base
    font-medium 
    text-gray-600
`;


export const Detalle = tw.p`
    mt-5 
    text-md 
    text-gray-500
`;


export const Detalles = tw.div`
    px-6 
    pt-6 
    pb-8 
    bg-gray-50 
    sm:p-10 
    sm:pt-6
`;

export const Detalles1 = tw.li`
    flex 
    items-start
    py-1
`;

export const Items = tw.p`
    ml-3 
    text-sm 
    text-gray-800
`;


export const Boton = tw.div`
    mt-6 
    rounded-md 
    shadow-md
`;

export const LinkBoton = tw(Link)` 
    flex 
    items-center 
    justify-center 
    px-5 
    py-3 
    border 
    border-transparent 
    text-base 
    font-medium 
    rounded-md 
    text-white 
    bg-azul_corp 
    hover:bg-azul_corp_ho
`;