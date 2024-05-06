import tw from "tailwind-styled-components";
import styled, { css } from "styled-components";


export const ContenedorFormulario = tw.div`
    mt-8 
    sm:mx-auto 
    sm:w-full 
    sm:max-w-md
`;

export const ContenedorFormulario2 = tw.div`
    bg-stone-800 
    py-8 
    px-4 
    shadow 
    sm:rounded-lg 
    sm:px-10
`;

export const Formulario = tw.form`
  space-y-6
`;

export const Label = tw.label`
    block 
    text-sm 
    font-medium 
    text-gray-700

    dark:text-white

    ${props => props.valido === 'false' && css`
        text-rose-500 !important;
    `}
`;

export const LeyendaError = tw.p`
    text-sm
	text-errores
    hidden
    dark:text-red-400

    ${props => props.valido === 'true' && css`
        hidden
    `}

    ${props => props.valido === 'false' && css`
        block
    `}
`;

export const MensajeError = tw.div`
    h-10
    font-semibold
	bg-red-100
    text-sm
	pt-3
    pl-5
    rounded
    flex
    text-red-700
	p {
		m-0
	} 
	b {
        mt-2
		ml-10;
	}
`;

export const GrupoInput = tw.div`
    relative 
    mt-2 
    rounded-md 
    shadow-sm
`;


export const Input = tw.input`
    bg-stone-900
    block 
    w-full 
    rounded-md 
    border-0 
    py-1.5 
    pl-3 
    pr-10 
    text-white
    placeholder:text-gray-500 
    focus:outline-none
    sm:text-sm 
    sm:leading-6

    ${props => props.valido === 'true' && css`
        border-2 border-exito
    `}

    ${props => props.valido === 'false' && css`
        border-2 border-errores  
    `}
`;

export const Boton = tw.button`
    w-full 
    flex 
    justify-center 
    py-2 
    px-4 
    border 
    border-transparent 
    rounded-md 
    shadow-sm 
    text-sm 
    font-medium 
    text-white 
    bg-azul_corp 
    hover:bg-azul_corp_ho 
`;


