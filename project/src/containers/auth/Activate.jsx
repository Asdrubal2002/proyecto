import Layout from "../../hocs/Layout.jsx";
import { useParams } from "react-router";

import { useState } from "react";
import { connect } from "react-redux";

import { Navigate } from "react-router";

import {
  Fondo,
  ContenedorInfo,
  ContenedorInfo2,
  MensajePrincipal,
  ContenidoMensaje,
  ContenedorLogos,
  ContenedorImgs,
  Imagenes,
  ContenedorExcel,
  ContenedorExcel1,
  BotonActivar
} from "./styles/Activate.js";

import { activate } from "../../redux/actions/auth.js";


import { Rings } from "react-loader-spinner";
import { Helmet } from "react-helmet";

const Activate = ({ activate, loading }) => {
  const params = useParams();
  const [activated, setActivated] = useState(false);

  const activate_account = () => {
    const uid = params.uid;
    const token = params.token;
    activate(uid, token);
    setActivated(true);
  };

  if (activated && !loading) return <Navigate to="/login" replace={true} />;

  return (
    <>
      <Layout>
        <Helmet>
          <title>Ruvlo | Felicidades activa tu cuenta</title>
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
        <Fondo>
          <ContenedorInfo>
            <ContenedorInfo2>
              <div>
                <MensajePrincipal>
                  A un paso de Ruvlo
                </MensajePrincipal>
                <ContenidoMensaje>
                  Te has registrado con nosotros y estás más cerca de aprovechar
                  lo que tenemos para ti, te damos la bienvenida y te invitamos a
                  acercarte a las personas con el potencial que tú tienes.
                </ContenidoMensaje>

                <ContenedorExcel>
                  <ContenedorExcel1>
                    {loading ? (
                      <BotonActivar>
                        <Rings width={20} height={20} color="#fff" radius="6" />
                      </BotonActivar>
                    ) : (
                      <BotonActivar onClick={activate_account}>
                        Activar Cuenta
                      </BotonActivar>
                    )}

                  </ContenedorExcel1>
                </ContenedorExcel>
              </div>

              <ContenedorLogos>
                <ContenedorImgs>
                  <Imagenes
                    src="https://tailwindui.com/img/logos/transistor-logo-gray-400.svg"
                    alt="Workcation"
                  />
                </ContenedorImgs>

                <ContenedorImgs>
                  <Imagenes
                    src="https://tailwindui.com/img/logos/mirage-logo-gray-400.svg"
                    alt="Mirage"
                  />
                </ContenedorImgs>

                <ContenedorImgs>
                  <Imagenes
                    src="https://tailwindui.com/img/logos/tuple-logo-gray-400.svg"
                    alt="Tuple"
                  />
                </ContenedorImgs>

                <ContenedorImgs>
                  <Imagenes
                    src="https://tailwindui.com/img/logos/laravel-logo-gray-400.svg"
                    alt="Laravel"
                  />
                </ContenedorImgs>

                <ContenedorImgs>
                  <Imagenes
                    src="https://tailwindui.com/img/logos/statickit-logo-gray-400.svg"
                    alt="StaticKit"
                  />
                </ContenedorImgs>

                <ContenedorImgs>
                  <Imagenes
                    src="https://tailwindui.com/img/logos/statamic-logo-gray-400.svg"
                    alt="Statamic"
                  />
                </ContenedorImgs>
              </ContenedorLogos>
            </ContenedorInfo2>
          </ContenedorInfo>
        </Fondo>
      </Layout>

    </>
  );
};

const mapStateToProps = (state) => ({
  loading: state.Auth.loading,
});

export default connect(mapStateToProps, {
  activate,
})(Activate);
