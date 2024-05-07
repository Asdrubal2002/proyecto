import React, { useEffect } from 'react'
import Layout from '../../hocs/Layout'

const features = [
    { name: 'Utiliza buena iluminación', description: 'La iluminación adecuada es crucial para fotos claras y nítidas. Evita sombras duras y busca luz natural o luces de estudio.' },
    { name: 'Fondo limpio y simple', description: 'Elige un fondo sin distracciones para que tus productos sean el centro de atención. Un fondo blanco o neutro resalta los detalles.' },
    { name: 'Enfoque y composición', description: 'Asegúrate de que tus productos estén enfocados y que la composición sea atractiva. Experimenta con ángulos y perspectivas.' },
    { name: 'Destaca características clave', description: 'Resalta detalles únicos, colores vibrantes o funcionalidades especiales en tus fotos.' },
    { name: 'Edición mínima', description: 'Edita las fotos mínimamente para mejorar calidad, evita excesos que parezcan poco naturales.' },
    { name: 'Muestra en contexto', description: 'Si es relevante, muestra tus productos en situaciones de uso real.' },
    { name: 'Haz varias tomas', description: 'No te conformes con una sola foto, prueba desde diferentes ángulos.' },
];



function HelpWithPhotos() {

    useEffect(() => {
        window.scrollTo(0, 0)

      }, []);


    return (
        <Layout>
            <div className="">
                <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-8 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-200 sm:text-4xl">Sugerencias para fotos</h2>
                        <p className="mt-4 text-gray-300">
                        Tomar fotos de calidad de tus productos puede hacer una gran diferencia en la percepción de tu tienda en línea. Aquí hay algunos consejos para tomar fotos profesionales y atractivas:
                        </p>

                        <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                            {features.map((feature) => (
                                <div key={feature.name} className="border-t border-gray-200 pt-4">
                                    <dt className="font-medium text-gray-300">{feature.name}</dt>
                                    <dd className="mt-2 text-sm text-gray-400">{feature.description}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                    <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
                        <img
                            src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-01.jpg"
                            alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
                            className="rounded-lg bg-gray-100"
                        />
                        <img
                            src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-02.jpg"
                            alt="Top down view of walnut card tray with embedded magnets and card groove."
                            className="rounded-lg bg-gray-100"
                        />
                        <img
                            src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-03.jpg"
                            alt="Side of walnut card tray with card groove and recessed card area."
                            className="rounded-lg bg-gray-100"
                        />
                        <img
                            src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-04.jpg"
                            alt="Walnut card tray filled with cards and card angled in dedicated groove."
                            className="rounded-lg bg-gray-100"
                        />
                         <img
                            src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-03.jpg"
                            alt="Side of walnut card tray with card groove and recessed card area."
                            className="rounded-lg bg-gray-100"
                        />
                        <img
                            src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-04.jpg"
                            alt="Walnut card tray filled with cards and card angled in dedicated groove."
                            className="rounded-lg bg-gray-100"
                        />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default HelpWithPhotos