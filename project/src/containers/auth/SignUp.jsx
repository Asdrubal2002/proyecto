import Layout from "../../hocs/Layout";
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon, InformationCircleIcon } from '@heroicons/react/20/solid'
import { Switch } from '@headlessui/react'

import { Boton, ContenedorFormulario, ContenedorFormulario2, Formulario, MensajeError } from "./styles/Formulario";
import { useState } from "react";
import ComponenteInput from "./components/ComponenteInput";

import { signup } from "../../redux/actions/auth";

import { Rings } from "react-loader-spinner";

import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import ImagesForms from "./components/ImagesForms";

const SignUp = ({ signup, loading, isAuthenticated }) => {

    if (isAuthenticated) {
        return <Navigate to="/" />
    }

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const [email, changeMail] = useState({ campo: "", valido: null });
    const [password, changePass] = useState({ campo: "", valido: null });
    const [re_password, changePass2] = useState({ campo: "", valido: null });
    const [formularioValido, cambiarFormularioValido] = useState(null);

    const [accountCreated, setAccountCreated] = useState(false);

    const [terminosAceptados, setTerminosAceptados] = useState(false);


    const expresiones = {
        correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        clave:
            /^(?=(?:\D*\d){3}\D*$)[\d\w\S]{4}$/
    };

    const validarPassword2 = () => {
        if (password.campo.length > 0) {
            if (password.campo !== re_password.campo) {
                changePass2((prevState) => {
                    return { ...prevState, valido: "false" };
                });
            } else {
                changePass2((prevState) => {
                    return { ...prevState, valido: "true" };
                });
            }
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (
            email.valido === "true" &&
            password.valido === "true" &&
            re_password.valido === "true" &&
            terminosAceptados
        ) {
            signup(
                email.campo,
                password.campo,
                re_password.campo
            );
            setAccountCreated(true);
            cambiarFormularioValido(true);
            changeMail({ campo: "", valido: null });
            changePass({ campo: "", valido: null });
            changePass2({ campo: "", valido: null });
            // ...
        } else {
            cambiarFormularioValido(false);
        }
    };
    return (
        <Layout>
            <Helmet>
                <title>Ruvlo | Crear cuenta</title>
                <meta name="description" content="Lo que sale en google" />
                <meta name="keywords" content='palabras para google' />
                <meta name="robots" content='all' />
                <link rel="canonical" href="https://www.ruvlo.com/" />
                <meta name="author" content='Ruvlo' />
                <meta name="publisher" content='Ruvlo' />

                {/* Social Media Tags */}
                <meta property="og:title" content='Ruvlo |  Busqueda tiendas' />
                <meta property="og:description" content='descripcion.' />
                <meta property="og:url" content="https://www.ruvlo.com/" />
                <meta property="og:image" content='https://bafybeicwrhxloesdlojn3bxyjqnxgsagtd4sl53a7t4cn4vfe2abmybzua.ipfs.w3s.link/lightbnuilbg.jpg' />

                <meta name="twitter:title" content='Ruvlo |  Busqueda tiendas' />
                <meta
                    name="twitter:description"
                    content='descripcion.'
                />
                <meta name="twitter:image" content='https://bafybeicwrhxloesdlojn3bxyjqnxgsagtd4sl53a7t4cn4vfe2abmybzua.ipfs.w3s.link/lightbnuilbg.jpg' />
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>

            {/* Si quito las imagenes solo es llamar al formulari */}
            <ImagesForms title="¡Regístrate ahora!">
                <ContenedorFormulario>
                    <ContenedorFormulario2>
                        <Formulario onSubmit={onSubmit}>
                            <ComponenteInput
                                estado={email}
                                cambiarEstado={changeMail}
                                placeholder="Correo Electrónico"
                                tipo="text"
                                numero="40"
                                label=""
                                name="email"
                                leyendaError="Digita tu correo"
                                expresionRegular={expresiones.correo}
                            />
                            <ComponenteInput
                                estado={password}
                                cambiarEstado={changePass}
                                placeholder="Clave de solo 4 caracteres."
                                tipo="password"
                                numero="4"
                                label=""
                                name="password"
                                leyendaError="La clave debe tener exactamente 4 caracteres, incluyendo tres números y una letra mayúscula o minúscula o carácter no alfanumérico (símbolo)."
                                expresionRegular={expresiones.clave}
                            />
                            <ComponenteInput
                                estado={re_password}
                                cambiarEstado={changePass2}
                                tipo="password"
                                numero="4"
                                placeholder="Confirma tu clave"
                                label=""
                                name="re_password"
                                leyendaError="Ambas contraseñas deben ser iguales."
                                funcion={validarPassword2}
                            />
                            <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2 ">
                                <div className="flex h-6 items-center">
                                    <Switch
                                        checked={terminosAceptados}
                                        onChange={setTerminosAceptados}
                                        className={classNames(
                                            terminosAceptados ? 'bg-azul_corp' : 'bg-gray-500',
                                            'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul_corp'
                                        )}
                                    >
                                        <span className="sr-only">Agree to policies</span>
                                        <span
                                            aria-hidden="true"
                                            className={classNames(
                                                terminosAceptados ? 'translate-x-3.5' : 'translate-x-0',
                                                'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                                            )}
                                        />
                                    </Switch>
                                </div>
                                <Switch.Label className="text-sm leading-6 text-gray-400 font-estilo_letra font-bold">
                                    Aceptas nuestros {' '}
                                    <Link to="/conditions" className="font-semibold text-azul_corp_ho">
                                        términos y condiciones
                                    </Link>
                                    .
                                </Switch.Label>
                            </Switch.Group>
                            <div className="flex items-center justify-between lg:hidden">
                                <div className="text-sm">
                                    <Link to="/login" className="font-medium text-azul_corp_ho hover:text-azul_corp">
                                      Iniciar Sesión
                                    </Link>
                                </div>
                            </div>
                            <div>
                                {loading ? (
                                    <Boton type="submit">
                                        <Rings width={20} height={20} color="#fff" radius="6" />
                                    </Boton>
                                ) : (
                                    <Boton type="submit">Regístrarse</Boton>
                                )}

                            </div>
                        </Formulario>
                        <div className="mt-6">

                            {formularioValido === false && (
                                <MensajeError>
                                    <p className="flex">
                                        <b className="h-5 w-5 mr-2">
                                            <InformationCircleIcon />
                                        </b>
                                        Por favor rellena el formulario completamente y acepta los términos y condiciones
                                    </p>
                                </MensajeError>
                            )}
                           
                        </div>
                    </ContenedorFormulario2>
                </ContenedorFormulario>
            </ImagesForms>


        </Layout>
    )
}
const mapStateToProps = (state) => ({
    loading: state.Auth.loading,
    isAuthenticated: state.Auth.isAuthenticated,

});
export default connect(mapStateToProps, {
    signup
})(SignUp);
