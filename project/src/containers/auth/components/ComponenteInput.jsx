

import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { GrupoInput, Input, Label, LeyendaError } from "../styles/Formulario";


const ComponenteInput = ({
  estado,
  cambiarEstado,
  tipo,
  numero,
  label,
  placeholder,
  name,
  leyendaError,
  expresionRegular,
  funcion,
}) => {
  const onChange = (e) => {
    cambiarEstado({...estado, campo: e.target.value });
  };

  const validacion = () => {
     if(expresionRegular){
        if(expresionRegular.test(estado.campo)){
            cambiarEstado({...estado, valido: 'true' });
        }else{
            cambiarEstado({...estado, valido: 'false' });
        }
     }

     if(funcion){
        funcion();
    }

  }

  return (
    <div>
      <Label htmlFor={name} valido={estado.valido}>{label}</Label>

      <GrupoInput>
        <Input
          type={tipo}
          maxLength={numero}
          placeholder={placeholder}
          id={name}
          name={name}
          value={estado.campo}
          onChange={onChange}
          onKeyUp={validacion}
          onBlur={validacion}
          valido={estado.valido}
        />
        
      </GrupoInput>
      <LeyendaError valido={estado.valido}>{leyendaError}</LeyendaError>
    </div>
  );
};

export default ComponenteInput;
