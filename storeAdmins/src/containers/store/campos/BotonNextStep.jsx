import { ArrowLongRightIcon, ArrowUpCircleIcon, ArrowUturnRightIcon, ForwardIcon } from '@heroicons/react/24/outline'
import React from 'react'

function BotonNextStep({
    nextStep
}) {
    return (
        <button onClick={nextStep} className="bg-azul_corp text-white px-4 py-2 rounded-md hover:bg-azul_corp_ho font-medium ">
            <div className='flex'>
                Siguiente
                <ArrowLongRightIcon className="w-6 h-6 mx-2 " />
            </div>
        </button>
    )
}

export default BotonNextStep