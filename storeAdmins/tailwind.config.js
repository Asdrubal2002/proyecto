/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "azul_corp":"#0C4896",
        "azul_corp_ho":"#0268C8",
        "errores":"#bb2929",
        "exito":"#017BB4",
        "color_letra_blanca":"#F2F3F4",
        "color_letra_oscura_clara":"#D2D2D2",

        "fondo_mensajes_error":"#C0392B",
        "fondo_mensajes_exito":"#5DADE2"
      },
      fontFamily: {
        'estilo_letra': ['Montserrat', 'sans-serif']
      },
      zIndex: {
        '100': '100',
      },
    },
  },
  plugins: [],
}