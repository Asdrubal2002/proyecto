import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { Contenedor, Contenedor2, Info1, Info2, Info3, InfoProfile1, InfoProfile2, Profile } from './styles/LoadingStore'
import { InfinitySpin } from 'react-loader-spinner'

export default function Loader() {
    return (
        <Contenedor role="status">
            <InfinitySpin width={200} height={200} color="#fff" radius="6" />                                 
        </Contenedor>

    )
}
