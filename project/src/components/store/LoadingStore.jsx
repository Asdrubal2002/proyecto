import { UserCircleIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { ConetenedorBanner, ConetenedorBanner1, ConetenedorBanner2, ConetenedorInfo, ConetenedorInfo1, ConetenedorInfo2, ConetenedorInfo3, ConetenedorInfo4, ConetenedorInfo5, ConetenedorInfo6, ConetenedorMegusta, ConetenedorProfile, ConetenedorProfile1, ConetenedorProfile2, ConetenedorProfile3, Contenedor, EspacioContenedor, Principal } from './styles/LoadingStore'


export default function LoadingStore() {
    return (
        <Contenedor role="status">
            <Principal>
                <ConetenedorBanner>
                    <ConetenedorBanner1>
                        <ConetenedorBanner2 />
                    </ConetenedorBanner1>
                    <EspacioContenedor />
                </ConetenedorBanner>
                {/* COMPANY PROFILE */}
                <ConetenedorProfile>
                    <ConetenedorProfile1>
                        <div>
                            {/* User info */}
                            <ConetenedorProfile2>
                                <ConetenedorProfile3>
                                    {/* profile picture */}
                                    <div className="flex">
                                        <UserCircleIcon className="h-24 w-24 rounded-full sm:h-32 sm:w-32 text-gray-900" />
                                    </div>
                                    <ConetenedorInfo>
                                        <ConetenedorInfo1>
                                            <ConetenedorMegusta />
                                        </ConetenedorInfo1>
                                       
                                    </ConetenedorInfo>
                                </ConetenedorProfile3>
                                {/* Store name */}
                                <ConetenedorInfo2>
                                    <ConetenedorInfo3/>
                                </ConetenedorInfo2>
                                {/* Store description */}
                                <ConetenedorInfo4/>
                                <ConetenedorInfo4/>
                                <ConetenedorInfo4/>
                                {/* Store data */}
                                <ConetenedorInfo5>
                                    <ConetenedorInfo6/>
                                    <ConetenedorInfo6/>
                                    <ConetenedorInfo6/>
                                </ConetenedorInfo5>
                            </ConetenedorProfile2>
                        </div>
                    </ConetenedorProfile1>
                </ConetenedorProfile>
            </Principal>
        </Contenedor>

    )
}
