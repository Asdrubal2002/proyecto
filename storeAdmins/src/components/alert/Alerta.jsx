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
      <div className={`rounded-md p-4 mx-5 mt-3 shadow-xl fixed`} style={{ backgroundColor: alertType }}>
        
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
  