import { Fragment } from "react";
import { connect } from "react-redux";
import { ContenedorInfoAlert, ContenedorInfoMSG, Mensaje } from "./Styles/Alert";

function Alerta({ alert }) {

  const displayAlert = () => {
    if (!alert) {
      return null;
    }

    const { alertType, msg } = alert;

    return (
      <div className={`rounded-md p-4 mx-5 mt-3 shadow-xl fixed top-10 right-10 `} style={{ backgroundColor: alertType, boxShadow: `0 0 10px ${alertType}, 0 0 20px ${alertType}, 0 0 30px ${alertType}` }}>
        <ContenedorInfoAlert>
          <ContenedorInfoMSG>
            <Mensaje>{msg}</Mensaje>
          </ContenedorInfoMSG>
        </ContenedorInfoAlert>
      </div>
    );
  };

  return <Fragment>{displayAlert()}</Fragment>;
}

const mapStateToProps = (state) => ({
  alert: state.Alert.alert,
});

export default connect(mapStateToProps)(Alerta);
