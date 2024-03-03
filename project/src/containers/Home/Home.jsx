import Layout from '../../hocs/Layout'
import Footer from '../../components/home/Footer';

import { Helmet } from 'react-helmet';
import Searcher from '../../components/searcher/Searcher';


const Home = () => {
  return (
    <Layout>
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
      <div className='flex items-center justify-center h-full mt-0 pt-6'>
        <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center h-full'>
          <img
            src="/LogoRuvlo.png"
            alt="Descripción de la imagen"
            className="mx-auto h-32 w-auto m-8"
          />
          <Searcher />
        </div></div>

      <Footer />
    </Layout>
  )
}


export default Home
