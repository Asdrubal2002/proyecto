import { CheckIcon } from '@heroicons/react/24/outline';
import React from 'react';

const Options = ({ options, selectedOptionId, handleOptionClick, setSelectedOptionId, errorMessage }) => {
  if (!options || options.every(option => option.quantity === 0)) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded-md mb-4">
        <p className="text-base font-semibold">Lo sentimos, no hay opciones en este momento.</p>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-base font-semibold mb-4">Opciones disponibles</h2>
      <div className='grid gap-3 grid-cols-1 sm:grid-cols-2'>
        {options.filter(option => option.quantity > 0).map((option, index) => (
          <div
            key={index}
            className={`inline-block p-2 rounded-md shadow-md transition-transform transform hover:scale-105 cursor-pointer ${option.id === selectedOptionId ? 'ring ring-azul_corp' : 'bg-stone-700'
              } ${errorMessage ? 'border border-red-500' : ''}`}
            onClick={() => {
              handleOptionClick(option);
              setSelectedOptionId(option.id);
            }}
          >
            <div className={`inline-block w-4 h-4 rounded-full border-box mr-3 ${option.id === selectedOptionId ? 'bg-azul_corp text-white' : 'border border-gray-300'
              }`}>
              {option.id === selectedOptionId && <CheckIcon className="h-3 w-3 m-0.5" />}
            </div>
            <label htmlFor={`option_${index}`} className="text-sm text-gray-200">
              <span className="font-semibold">{option.option.value}</span>
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default Options;
