import { Tab } from '@headlessui/react';
import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import LazyLoad from 'react-lazyload'; // Importa el componente LazyLoad

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const ImageGallery = ({ data }) => {
    if (!data || data.length === 0) {
        return <p>No hay imágenes disponibles.</p>;
    }

    const [selectedImage, setSelectedImage] = useState(data[0].id);

    return (
        <>
            {/* Image gallery */}
            <Tab.Group as="div" className="flex flex-col-reverse">
                {/* Image selector */}
                <div className="mt-6 w-full max-w-2xl mx-auto hidden lg:block">
                    <Tab.List className="grid grid-cols-4 gap-6">
                        {data.map((image) => (
                            <Tab
                                key={image.id}
                                className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                                onClick={() => setSelectedImage(image.id)}
                            >
                                {({ selected }) => (
                                    <>
                                        <span className="sr-only">{image.name}</span>
                                        <span className="absolute inset-0 rounded-md overflow-hidden">
                                            <LazyLoad height={200} offset={100}>
                                                {/* Envuelve cada imagen dentro de LazyLoad */}
                                                <img
                                                    src={image.photo}
                                                    alt=""
                                                    className="w-full h-full object-center object-cover transition-opacity duration-300 ease-in-out"
                                                    style={{ opacity: selectedImage === image.id ? 1 : 0.5 }}
                                                />
                                            </LazyLoad>
                                        </span>
                                        <span
                                            className={classNames(
                                                selected ? 'ring-azul_corp_ho' : 'ring-transparent',
                                                'absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none'
                                            )}
                                            aria-hidden="true"
                                        />
                                    </>
                                )}
                            </Tab>
                        ))}
                    </Tab.List>
                </div>

                <Tab.Panels className="w-full aspect-w-1 aspect-h-1">
                    {/* Carousel para pantallas pequeñas */}
                    <Carousel showArrows={true} showThumbs={false} showStatus={false} showIndicators={false} className="lg:hidden">
                        {data.map((image) => (
                            <div key={image.id}>
                                <LazyLoad height={200} offset={100}>
                                    {/* Envuelve cada imagen dentro de LazyLoad */}
                                    <img
                                        src={image.photo}
                                        alt={image.alt}
                                        className="w-full h-full object-center object-cover sm:rounded-lg"
                                    />
                                </LazyLoad>
                            </div>
                        ))}
                    </Carousel>

                    {/* Imágenes individuales para pantallas grandes */}
                    {data.map((image) => (
                        <Tab.Panel key={image.id} className="hidden lg:block">
                            <LazyLoad height={200} offset={100}>
                                {/* Envuelve cada imagen dentro de LazyLoad */}
                                <img
                                    src={image.photo}
                                    alt={image.alt}
                                    className="w-full h-full object-center object-cover sm:rounded-lg"
                                />
                            </LazyLoad>
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </>
    );
}

export default ImageGallery;
