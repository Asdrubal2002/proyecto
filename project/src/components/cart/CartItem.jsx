import { memo, useCallback, useRef } from 'react';
import { CheckBadgeIcon, CheckIcon, ClockIcon, TrashIcon, XMarkIcon, } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import LazyLoad from 'react-lazyload'; // Importa el componente LazyLoad
import { connect } from "react-redux";
import { decrement_item, increment_item, remove_item } from '../../redux/actions/cart';

const CartItem = ({ item, increment_item, decrement_item, remove_item, setRender }) => {
    // Referencia a la función de actualización del estado
    const setRenderRef = useRef(setRender);

    // Actualiza la referencia cuando setRender cambia
    setRenderRef.current = setRender;

    // Función de manejo de evento genérica
    const handleAction = useCallback(async (action) => {
        await action(item.id);
        // Actualiza el estado utilizando la referencia
        setRenderRef.current(prev => !prev);
    }, [item.id]);

    const handleAdd = useCallback(() => handleAction(increment_item), [handleAction, increment_item]);
    const handleSubtract = useCallback(() => handleAction(decrement_item), [handleAction, decrement_item]);
    const removeItemHandler = useCallback(() => handleAction(remove_item), [handleAction, remove_item]);

    return (
        <li className="flex py-6 sm:py-10">
            <div className="flex-shrink-0">
                <Carousel
                    showArrows={true}
                    showStatus={false}
                    showThumbs={false}
                    infiniteLoop={true}
                    className="w-24 h-24 rounded-md object-center object-cover sm:w-40 sm:h-48"
                >
                    {item.product_option.product.images.map((image, index) => (
                        <LazyLoad key={index} height={200} offset={100}>
                            {/* Envuelve cada imagen dentro de LazyLoad */}
                            <img
                                src={image.photo}
                                alt=""
                                className="w-full h-full rounded-md object-center object-cover"
                                loading="lazy"
                            />
                        </LazyLoad>
                    ))}
                </Carousel>

            </div>
            <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6 font-estilo_letra">
                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div>
                        <div className="flex justify-between">
                            <h3 className="text-sm">
                                <Link to={`/${item.product_option.product.slugProduct}/detail`} className="font-medium text-gray-300 hover:text-gray-400">
                                    {item.product_option.product.name} -  {item.product_option.option && item.product_option.option.value}
                                </Link>
                            </h3>
                        </div>
                        <div className="mt-1 flex text-sm">
                            <p className="text-gray-500">{item.product_option.product.category.name}</p>
                            <p className="ml-4 pl-4 border-l border-gray-200 text-gray-500">$ {item.product_option.product.formatted_price}</p>
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-300">$ {item.product_option.product.price * item.quantity}</p>
                        <p className="mt-1 text-sm text-gray-500">impuesto {item.product_option.product.tax} %</p>
                        <p className="mt-1 text-sm font-medium text-gray-300">$ {item.subtotal}</p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:pr-9">
                        <div className="flex items-center">
                            {item.quantity > 1 && (
                                <button
                                    type="button"
                                    onClick={handleSubtract}
                                    className="px-3 py-1.5 bg-azul_corp text-white rounded-l-md cursor-pointer focus:outline-none hover:bg-azul_corp_ho"
                                >
                                    -
                                </button>
                            )}
                            <span className="mx-2">{item.quantity}</span>
                            {item.product_option.quantity > 0 && (
                                <button
                                    type="button"
                                    onClick={handleAdd}
                                    className="px-3 py-1.5 bg-azul_corp text-white rounded-r-md cursor-pointer focus:outline-none hover:bg-azul_corp_ho"
                                >
                                    +
                                </button>
                            )}
                        </div>
                        <div className="absolute top-0 right-0">
                            <button
                                type="button"
                                onClick={removeItemHandler}
                                className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
                            >
                                <span className="sr-only">Remove</span>
                                <TrashIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>
                <p className="mt-4 flex text-sm text-gray-400 space-x-2">
                    {item.product_option && item.product_option.quantity > 0 ? (
                        <>
                            <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                            <span>Aún hay unidades disponibles</span>
                        </>
                    ) : (
                        <>
                            <XMarkIcon className="flex-shrink-0 h-5 w-5 text-gray-300" aria-hidden="true" />
                            <span>Ya no hay unidades disponibles</span>
                        </>
                    )}
                </p>
            </div>
        </li>
    )
}

const mapStateToProps = state => ({

})
export default connect(mapStateToProps, {
    increment_item,
    decrement_item,
    remove_item
})(CartItem)
