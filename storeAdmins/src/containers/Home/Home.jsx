import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Layout from '../../hocs/Layout';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import { login, load_user, check_authenticated, refresh } from '../../redux/actions/auth/auth.js'
import { Navigate } from 'react-router-dom';
import { Rings } from "react-loader-spinner";


import Alerta from '../../components/alert/Alerta.jsx';

function Home({
  login,
  check_authenticated,
  load_user,
  refresh,
  isAuthenticated,
  loading
}) {

  useEffect(() => {
    isAuthenticated ? <></> :
      <>
        {check_authenticated()}
        {load_user()}
        {refresh()}
      </>
  }, [])


  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    const newErrors = { ...errors };

    if (name === 'email') {
      newErrors.email = '';
      if (!value.trim()) {
        newErrors.email = 'Por favor, ingresa tu correo electrónico';
      } else if (!/^\S+@\S+\.\S+$/.test(value)) {
        newErrors.email = 'Por favor, ingresa un correo electrónico válido';
      }
    }

    if (name === 'password') {
      newErrors.password = '';
      if (!value.trim()) {
        newErrors.password = 'Por favor, ingresa tu contraseña';
      } else if (value.length < 8) {
        newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
      }
    }

    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formIsValid = true;
    const newErrors = { ...errors };

    if (!formData.email.trim()) {
      newErrors.email = 'Por favor, ingresa tu correo electrónico';
      formIsValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Por favor, ingresa un correo electrónico válido';
      formIsValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Por favor, ingresa tu contraseña';
      formIsValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
      formIsValid = false;
    }

    setErrors(newErrors);

    if (formIsValid) {
      console.log('Datos enviados:', formData.email, formData.password);
      login(formData.email, formData.password)
      // Aquí puedes enviar los datos a través de una solicitud HTTP, como fetch o axios https://www.youtube.com/watch?v=KO0VTwKuJo4&t=814s 1:06:56
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/store_admin_home" />
  }

  return (
    <>
      <div className="absolute z-[100]">
        <Alerta/>
      </div>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-28 w-auto"
              src="/LogoRuvlo.png"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-color_letra_blanca">
              ¡Bienvenido a tu negocio!
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              O{' '}
              <a href="#" className="font-medium text-azul_corp_ho hover:text-azul_corp">
                Empieza por un mes gratis
              </a>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  maxLength={100}
                  className={`bg-stone-800 relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-300 placeholder-gray-400 focus:z-10 focus:border-azul_corp_ho focus:outline-none focus:ring-azul_corp_ho sm:text-sm ${errors.email ? 'border-red-500' : ''
                    }`}
                  placeholder="Correo electrónico"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  maxLength={50}
                  className={`bg-stone-800 relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-300 placeholder-gray-400 focus:z-10 focus:border-azul_corp_ho focus:outline-none focus:ring-azul_corp_ho sm:text-sm ${errors.password ? 'border-red-500' : ''
                    }`}
                  placeholder="Contraseña"
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>
            </div>

            <div className="flex items-center justify-between">
              {/* <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-azul_corp focus:ring-azul_corp_ho"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div> */}

              <div className="text-sm">
                <a href="#" className="font-medium text-azul_corp_ho hover:text-azul_corp">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-azul_corp py-2 px-4 text-sm font-medium text-white hover:bg-azul_corp_ho focus:outline-none focus:ring-2 focus:ring-azul_corp_ho focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-azul_corp_ho group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                {
                  loading ? (
                    <Rings width={20} height={20} color="#fff" radius="6" />


                  ) : (
                    <>Ingresar</>
                  )
                }
                
              </button>
            </div>
          </form>
        </div>
      </div>
    </>

  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
  loading: state.Auth.loading,

});

export default connect(mapStateToProps, {
  login,
  check_authenticated,
  load_user,
  refresh,
})(Home);
