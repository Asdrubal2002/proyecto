import Layout from "../../hocs/Layout";
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon, InformationCircleIcon } from '@heroicons/react/20/solid'
import { connect } from "react-redux";

import { Boton, ContenedorFormulario, ContenedorFormulario2, Formulario, MensajeError } from "./styles/Formulario";
import { useState } from "react";
import ComponenteInput from "./components/ComponenteInput";

import { Rings } from "react-loader-spinner";

import { login } from "../../redux/actions/auth";
import { Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import ImagesForms from "./components/ImagesForms";

const SignIn = ({ login, loading, isAuthenticated }) => {

  if (isAuthenticated) {
    return <Navigate to="/" />
  }


  const [email, changeMail] = useState({ campo: "", valido: null });
  const [password, changePass] = useState({ campo: "", valido: null });

  const expresiones = {
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    clave:
      /^(?=(?:\D*\d){3}\D*$)[\d\w\S]{4}$/
  };

  const [formularioValido, cambiarFormularioValido] = useState(null);

  const [activated, setActivated] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (email.valido === "true" && password.valido === "true") {
      cambiarFormularioValido(true);
      login(email.campo, password.campo);
      window.scrollTo(0, 0);
      setActivated(true);
    } else {
      cambiarFormularioValido(false);
    }
  };

  if (activated) return <Navigate to="/" replace={true} />;

  return (
    <Layout>
      <Helmet>
        <title>Ruvlo | iniciar sesión</title>
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

      <ImagesForms title="¡Ingresar ahora!">
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

              <ComponenteInput
                estado={password}
                cambiarEstado={changePass}
                placeholder="Clave solo 4 caracteres"
                tipo="password"
                numero="4"
                label=""
                name="password"
                leyendaError="Digita la contraseña que registraste"
                expresionRegular={expresiones.clave}
              />
              <div className="flex items-center justify-between lg:hidden">
                <div className="text-sm">
                  <Link to="/signup" className="font-medium text-azul_corp_ho hover:text-azul_corp">
                    Crear cuenta
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link to="/reset_password" className="font-medium text-azul_corp_ho hover:text-azul_corp">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
              </div>
              
              <div>
                {loading ? (
                  <Boton type="submit">
                    <Rings width={20} height={20} color="#fff" radius="6" />
                  </Boton>
                ) : (
                  <Boton type="submit">Ingresar</Boton>
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
                  Por favor rellena el formulario completamente.
                </p>
              </MensajeError>
              )}

             
            </div>
          </ContenedorFormulario2>
        </ContenedorFormulario>
      </ImagesForms>


    </Layout>
  )
};
const mapStateToProps = (state) => ({
  loading: state.Auth.loading,
  isAuthenticated: state.Auth.isAuthenticated,

});

export default connect(mapStateToProps, {
  login,
})(SignIn);