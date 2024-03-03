import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { Contenedor, Contenedor2, Info1, Info2, Info3, InfoProfile1, InfoProfile2, Profile } from './styles/LoadingStore'

export default function LoadingStores() {
    return (
        <Contenedor role="status">
            <Contenedor2>
                <PhotoIcon className="w-10 h-10 text-gray-700" />
            </Contenedor2>
            <Info1 />
            <Info2 />
            <Info2 />
            <Info2 />
            <Info3 />
            <Profile>
                <UserCircleIcon className="w-10 h-10 me-3 text-gray-800" />
                <div>
                    <InfoProfile1 />
                    <InfoProfile2 />
                </div>
            </Profile>
            <span className="sr-only">Loading...</span>
        </Contenedor>

    )
}
