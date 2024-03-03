import { Provider } from 'react-redux'
import store from './store.js'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async';

import AnimatedRoutes from './Routes.jsx';


function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Ruvlo | Busqueda tiendas</title>
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
      <Provider store={store}>
        <Router>
         <AnimatedRoutes/>
        </Router>
      </Provider>
    </HelmetProvider>



  )
}

export default App;