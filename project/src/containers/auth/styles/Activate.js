import tw from "tailwind-styled-components";

export const Fondo = tw.div`
    
`;

export const ContenedorInfo = tw.div`
    mx-auto 
    lg:mx-12 
    max-w-full 
    py-12 
    px-4 
    sm:px-6 
    lg:py-16 
    lg:px-8

`;

export const ContenedorInfo2 = tw.div`
    lg:grid 
    lg:grid-cols-2 
    lg:items-center 
    lg:gap-8
`;


export const MensajePrincipal = tw.h2`
    text-3xl 
    tracking-tight 
    text-gray-100 
    sm:text-4xl
`;


export const ContenidoMensaje = tw.p`
    mt-3 
    max-w-3xl 
    text-base    
    text-gray-300
`;


export const ContenedorLogos = tw.div`
    mt-8 
    grid 
    grid-cols-2 
    gap-0.5 
    md:grid-cols-3 
    lg:mt-0 
    lg:grid-cols-2

`;

export const ContenedorImgs = tw.div`
    col-span-1 
    flex 
    justify-center 
    bg-gray-800 
    py-8 
    px-8

`;

export const Imagenes = tw.img`
    max-h-12
`;


export const ContenedorExcel = tw.div`
    mt-8 
    sm:flex
`;

export const ContenedorExcel1 = tw.div`
    rounded-md 
    shadow
`;



export const BotonActivar = tw.button`
    flex items-center 
    justify-center 
    rounded-md
    font-semibold   
    border 
    border-transparent 
    bg-azul_corp
    px-5 
    py-3 
    text-base 
    text-white 
    hover:bg-azul_corp_ho
`;




