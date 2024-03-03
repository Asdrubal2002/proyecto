import tw from "tailwind-styled-components";
import { NavLink, Link } from "react-router-dom";
import styled, { css } from "styled-components";



export const NavbarMenu = tw.header`
    relative 
    bg-neutral-900 
    z-100
`;

export const MessajeNavbar = tw.p`
    flex 
    h-7 
    items-center 
    justify-center 
    bg-azul_corp 
    px-2
    text-sm 
    font-medium 
    text-white 
    sm:px-6 
    lg:px-8
`;

export const Contenedor1 = tw.div`
    border-b 
    border-stone-600
`;

export const Contenedor2 = tw.div`
    flex 
    h-16 
    items-center
`;

export const MenusDesplegables = tw.div`
    relative 
    bg-stone-800
`;

export const MenusDesplegable1 = tw.div`
    mx-auto 
    max-w-7xl 
    px-8
`;

export const MenusDesplegable2 = tw.div`
    grid 
    grid-cols-2 
    gap-x-8 
    gap-y-10 py-16
`;


export const MenusDesplegable3 = tw.div`
    col-start-2 
    grid 
    grid-cols-2 
    gap-x-8
`;


export const MenusDesplegable4 = tw.div`
    row-start-1 
    grid 
    grid-cols-3 
    gap-x-8 
    gap-y-10 
    text-sm
`;

export const ParteDerechaNavbar = tw.div`
    ml-auto 
    flex 
    items-center
`;

export const ParteDerechaNavbar1 = tw.div`
    hidden 
    lg:flex 
    lg:flex-1 
    lg:items-center 
    lg:justify-end 
    lg:space-x-6
`;

export const Links = tw(Link)` 
    text-sm 
    font-medium 
    text-gray-200 
    hover:text-gray-400
`;

export const LetrasPerfil = tw.span` 
    font-encabezados 
    text-gray-300 
`;

export const NombreModal = tw.div` 
    text-gray-900 
    dark:text-white 
    px-4 font-medium 
    font-encabezados
`;

export const FotoPerfil = tw.div` 
    relative 
    inline-flex 
    items-center 
    justify-center 
    w-10 
    h-10 
    overflow-hidden 
    bg-gray-300 
    rounded-full 
    dark:bg-gray-600
`;





