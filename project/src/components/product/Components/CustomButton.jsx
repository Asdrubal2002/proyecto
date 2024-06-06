import React from 'react';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"; // Importa el icono

const CustomButton = ({ setMobileFiltersOpen  }) => {
  return (
    <button
      type="button"
      className="p-2 text-gray-200 rounded-md sm:hidden"
      onClick={() => setMobileFiltersOpen(true)}
    >
      <span className="sr-only">Filters</span>
      <MagnifyingGlassIcon className="h-8 w-8" aria-hidden="true" /> {/* Icono incluido */}
    </button>
  );
};

export default CustomButton;
