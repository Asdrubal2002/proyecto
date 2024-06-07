import Layout from "../../hocs/Layout";
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon, InformationCircleIcon } from '@heroicons/react/20/solid'
import { connect } from "react-redux";

import { Boton, ContenedorFormulario, ContenedorFormulario2, Formulario, MensajeError } from "./styles/Formulario";
import { useState } from "react";
import ComponenteInput from "./components/ComponenteInput";

import { Rings } from "react-loader-spinner";

import { reset_password_confirm } from "../../redux/actions/auth";

import { Link, Navigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import ImagesForms from "./components/ImagesForms";

const Reset_password_new = ({ reset_password_confirm, loading }) => {

    const [new_password, changePassNew] = useState({ campo: "", valido: null });
    const [re_new_password, changePass2New] = useState({ campo: "", valido: null });

    const expresiones = {
        clave:
             /^(?=(?:\D*\d){3}\D*$)[\d\w\S]{4}$/
    };

    const [formularioValido, cambiarFormularioValido] = useState(null);

    const [requestSent, setRequestSent] = useState(false);

    const validarPassword2 = () => {
        if (new_password.campo.length > 0) {
            if (new_password.campo !== re_new_password.campo) {
                changePass2New((prevState) => {
                    return { ...prevState, valido: "false" };
                });
            } else {
                changePass2New((prevState) => {
                    return { ...prevState, valido: "true" };
                });
            }
        }
    };

    const params = useParams()


    const onSubmit = (e) => {
        e.preventDefault();
        const uid = params.uid
        const token = params.token

        if (new_password.valido === "true" && re_new_password.valido === "true") {
            reset_password_confirm(uid, token, new_password.campo, re_new_password.campo)
            setRequestSent(true);
            window.scrollTo(0, 0);
            cambiarFormularioValido(true);
            changePassNew({ campo: "", valido: null });
            changePass2New({ campo: "", valido: null });
            // ...
        } else {
            cambiarFormularioValido(false);
        }
    };

    if (requestSent) return <Navigate to="/login" replace={true} />;

    return (
        <Layout>
            <Helmet>
                <title>Ruvlo | Recuperación de contraseña</title>
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

            <ImagesForms title="Confirma tu contraseña!">
                <ContenedorFormulario>
                    <ContenedorFormulario2>
                        <Formulario onSubmit={onSubmit}>
                            <ComponenteInput
                                estado={new_password}
                                cambiarEstado={changePassNew}
                                placeholder="Nueva Contraseña"
                                tipo="password"
                                numero="4"
                                label=""
                                name="new_password"
                                leyendaError="La contraseña debe tener exactamente 4 caracteres, incluyendo tres números y una letra mayúscula o minúscula o carácter no alfanumérico (símbolo)."
                                expresionRegular={expresiones.clave}
                            />
                            <ComponenteInput
                                estado={re_new_password}
                                cambiarEstado={changePass2New}
                                tipo="password"
                                numero="4"
                                placeholder="Confirma tu contraseña"
                                label=""
                                name="re_new_password"
                                leyendaError="Ambas contraseñas deben ser iguales."
                                funcion={validarPassword2}
                            />
                            <div>
                                {loading ? (
                                    <Boton type="submit">
                                        <Rings width={20} height={20} color="#fff" radius="6" />
                                    </Boton>
                                ) : (
                                    <Boton type="submit">Registrar nueva contraseña</Boton>
                                )}
                            </div>
                        </Formulario>
                    </ContenedorFormulario2>
                </ContenedorFormulario>
            </ImagesForms>


        </Layout>
    )
};
const mapStateToProps = (state) => ({
    loading: state.Auth.loading,
});

export default connect(mapStateToProps, {
    reset_password_confirm,
})(Reset_password_new);