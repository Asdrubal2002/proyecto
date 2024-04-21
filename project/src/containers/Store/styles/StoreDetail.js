import tw from "tailwind-styled-components";
import styled, { css } from "styled-components";

import { Link } from "react-router-dom";


//La parte principal esta en ..omponents/store/styles/LoadingStore

export const Photo = tw.img`
    w-full 
    h-full 
    object-cover 
    object-center
`;

export const EspacioPhotos = tw.div`
    absolute 
    inset-0 
    mix-blend-multiply
`;

export const StoreProfile = tw.img`
    h-24
    w-24 
    rounded-full 
    sm:h-32 
    sm:w-32  
`;

export const BotonesMeGustaNOMegusta = tw.button` 
    rounded-lg 
    bg-azul_corp 
    px-4 py-2  
    text-sm 
    font-semibold 
    text-white 
    shadow-md 
    hover:bg-azul_corp_ho 
    hover:shadow-lg  
`;

export const DescriptionStore = tw.p`
    mt-2 
    max-w-4xl 
    text-sm 
    text-color_letra_oscura_clara
`;

export const ContenedorInfoUbication = tw.div`
inline-flex 
grid-cols-4 
my-10
`;

export const SeparadorVertical = tw.span`
    mx-2
    text-color_letra_blanca
`;


export const ContenedorInfoUbication1 = tw.p`
max-w-4xl 
    text-sm 
    mx-1 
    text-color_letra_blanca
`;




