import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid';
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
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const toggleMostrarPassword = () => {
    setMostrarPassword(!mostrarPassword);
  };

  const onChange = (e) => {
    cambiarEstado({ ...estado, campo: e.target.value });
  };

  const validacion = () => {
    if (expresionRegular) {
      if (expresionRegular.test(estado.campo)) {
        cambiarEstado({ ...estado, valido: 'true' });
      } else {
        cambiarEstado({ ...estado, valido: 'false' });
      }
    }

    if (funcion) {
      funcion();
    }
  };

  return (
    <div>
      <Label htmlFor={name} valido={estado.valido}>{label}</Label>

      <GrupoInput className="relative">
        <Input
          type={tipo === 'password' && mostrarPassword ? 'text' : tipo}
          maxLength={numero}
          placeholder={placeholder}
          id={name}
          name={name}
          value={estado.campo}
          onChange={onChange}
          onKeyUp={validacion}
          onBlur={validacion}
          valido={estado.valido}
          className="pr-10" // Aumentamos el padding para el botón de icono
        />
        {tipo === 'password' && (
          <button
            type="button"
            onClick={toggleMostrarPassword}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 focus:outline-none"
          >
            {mostrarPassword ? (
              <EyeSlashIcon className="h-6 w-6 text-gray-500" />
            ) : (
              <EyeIcon className="h-6 w-6 text-gray-500" />
            )}
          </button>
        )}
      </GrupoInput>
      <LeyendaError valido={estado.valido}>{leyendaError}</LeyendaError>
    </div>
  );
};

export default ComponenteInput;
