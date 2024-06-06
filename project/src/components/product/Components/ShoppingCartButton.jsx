// src/components/ShoppingCartButton.js

import React from 'react';
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

const ShoppingCartButton = ({ setOpen, cart }) => {
  return (
    <button
      onClick={() => setOpen(true)}
      className="relative text-white px-4 py-2 rounded-md hover:bg-azul_corp "
    >
      <ShoppingCartIcon className="h-8 w-8" />
      <span className="absolute top-0 right-0 mt-1 mr-1 inline-flex items-center justify-center px-2 py-1 text-xs font-semibold leading-none text-red-100 bg-red-600 rounded-full">
        {cart && cart.items ? cart.items.length : 0}
      </span>
    </button>
  );
};

export default ShoppingCartButton;
