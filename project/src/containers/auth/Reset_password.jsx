import Layout from "../../hocs/Layout";
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon, InformationCircleIcon } from '@heroicons/react/20/solid'
import { connect } from "react-redux";

import { Boton, ContenedorFormulario, ContenedorFormulario2, Formulario, MensajeError } from "./styles/Formulario";
import { useState } from "react";
import ComponenteInput from "./components/ComponenteInput";

import { Rings } from "react-loader-spinner";

import { reset_password } from "../../redux/actions/auth";

import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Reset_password = ({ reset_password, loading }) => {

    const [email, changeMail] = useState({ campo: "", valido: null });

    const expresiones = {
        correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    };

    const [formularioValido, cambiarFormularioValido] = useState(null);
    const [requestSent, setRequestSent] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();

        if (email.valido === "true") {
            reset_password(email.campo);
            setRequestSent(true)
            window.scrollTo(0, 0);
            cambiarFormularioValido(true);
            changeMail({ campo: "", valido: null });
        } else {
            cambiarFormularioValido(false);
        }
    };


    return (
        <Layout>
            <Helmet>
                <title>Ruvlo | Recuperación contraseña</title>
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
            <div className="flex items-center justify-center py-4 pt-10">
                <div className="max-w-md w-full space-y-8 ">
                <h2 className="text-3xl font-bold text-center">Recuperar contraseña</h2> {/* Título agregado */}

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
                                    leyendaError="Digita el correo que registraste"
                                    expresionRegular={expresiones.correo}
                                />

                                {/* <div className="flex items-center justify-between">
                                </div> */}
                                <div>
                                    {loading ? (
                                        <Boton type="submit">
                                            <Rings width={20} height={20} color="#fff" radius="6" />
                                        </Boton>
                                    ) : (
                                        <Boton type="submit">Recuperar mi contraseña</Boton>
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
                                            Por favor escribe tu correo electrónico registrado.
                                        </p>
                                    </MensajeError>
                                )}
                            </div>
                        </ContenedorFormulario2>
                    </ContenedorFormulario>

                </div>
            </div>


        </Layout >
    )
};
const mapStateToProps = (state) => ({
    loading: state.Auth.loading,
});

export default connect(mapStateToProps, {
    reset_password
})(Reset_password);