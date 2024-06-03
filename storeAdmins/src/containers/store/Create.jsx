import React, { useEffect, useState } from 'react'
import { connect } from "react-redux"
import Layout from '../../hocs/Layout'
import Autosuggest from 'react-autosuggest';
import { get_categories } from '../../../../project/src/redux/actions/store_categories'
import { get_cities } from '../../redux/actions/cities/cities'
import axios from "axios"
import { createStore, get_user_store } from '../../redux/actions/store/store';
import { Navigate, useNavigate } from 'react-router-dom';
import { Rings } from 'react-loader-spinner';
import { Disclosure, Transition } from '@headlessui/react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

import Step1 from './campos/Step1';
import Step2 from './campos/Step2';
import Step3 from './campos/Step3';
import Review from './campos/Review';


function Create({
  get_categories,
  categories,
  get_cities,
  cities,
  createStore,
  loading,
  get_user_store,
  user
}) {

  useEffect(() => {
    get_categories()
    get_cities();
  }, []);


  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    category_name: '',
    slug: '',
    location: '',
    address: '',
    phone: '',
    email: '',
    schedule: '',
    nit: '',
    city: '',
    city_id: '',
    url_pay: '',
    account_pay: '',
    description: '',
  });

  const [errors, setErrors] = useState({});
  const [loadingS, setLoading] = useState(false)
  const [errorSlug, setErrorSlug] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null);

  const nextStep = () => {
    const validationErrors = validateForm(formData, step);
    if (Object.keys(validationErrors).length === 0) {
      setStep(step + 1);
      setErrors({});
    } else {
      setErrors(validationErrors);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => setStep(step - 1);

  const handleChange = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        'Accept': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('access')}`
      }
    };
    const validationErrors = validateForm(formData, step);
    if (Object.keys(validationErrors).length === 0) {
      console.log('Formulario enviado:', formData);

      const dataToSend = {
        name: formData.name,
        category: formData.category,
        description: formData.description,
        location: formData.location,
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
        schedule: formData.schedule,
        nit: formData.nit,
        url_pay: formData.url_pay,
        account_pay: formData.account_pay,
        slug: formData.slug,
        city: formData.city_id
      };

      const fetchData = async () => {
        setLoading(true);
        try {
          const res = await axios.post(
            `${import.meta.env.VITE_REACT_APP_API_URL}/api/store/create-store/`,
            dataToSend,
            config
          );

          if (res.status === 201) {
            console.log("apenas llega")
            setLoading(false);
            get_user_store();
          } else {
            setLoading(false);
          }
        } catch (err) {
          setLoading(false);
          if (err.response && err.response.status === 409) {
            const { data } = err.response;

            // Verificar si hay errores específicos para el campo "slug"
            if (data.slug_error) {
              setErrorSlug(data.slug_error);
            } else {
              setErrorSlug(null); // Limpiar el estado de error para el campo "slug"
            }

            // Verificar si hay errores específicos para el campo "email"
            if (data.email_error) {
              setErrorEmail(data.email_error);
              console.log(data.email_error)
            } else {
              setErrorEmail(null); // Limpiar el estado de error para el campo "email"
            }
          } else {
            console.log('Ocurrió un error al procesar la solicitud. Por favor, intenta nuevamente.'); // Establecer el mensaje de error general
          }
        }
      };

      fetchData();


      // Aquí puedes manejar el envío del formulario
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <>
      {
        loadingS ? (
          <Rings width={20} height={20} color="#fff" radius="6" />
        ) : (
          <div className='max-w-4xl mx-auto mt-8 p-8 bg-stone-900 shadow-md rounded-lg'>
            <h2 className="text-2xl font-semibold text-gray-100 mb-6">Crea tu negocio</h2>

            <p className="text-sm text-gray-300 mb-8">
              La siguiente información será registrada como una nueva tienda dentro de Ruvlo. Por favor, ten en cuenta la importancia de los datos que proporcionas, ya que será la presentación de tu negocio.
            </p>

            <div className={`transition-opacity duration-500 ease-in-out ${step === 1 ? 'opacity-100' : 'opacity-0'}`}>
              {step === 1 && <Step1 nextStep={nextStep} handleChange={handleChange} values={formData} errors={errors} categories={categories} errorSlug={errorSlug} formData={formData} setFormData={setFormData}/>}
            </div>
            <div className={`transition-opacity duration-500 ease-in-out ${step === 2 ? 'opacity-100' : 'opacity-0'}`}>
              {step === 2 && <Step2 nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} values={formData} errors={errors} errorEmail={errorEmail}/>}
            </div>
            <div className={`transition-opacity duration-500 ease-in-out ${step === 3 ? 'opacity-100' : 'opacity-0'}`}>
              {step === 3 && <Step3 nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} values={formData} errors={errors} cities={cities} setFormData={setFormData} />}
            </div>
            <div className={`transition-opacity duration-500 ease-in-out ${step === 4 ? 'opacity-100' : 'opacity-0'}`}>
              {step === 4 && <Review prevStep={prevStep} handleSubmit={handleSubmit} values={formData} errorSlug={errorSlug} errorEmail={errorEmail} user={user}/>}
            </div>
          </div>
        )
      }
    </>

  );
};

const validateForm = (formData, step) => {
  let errors = {};

  if (step === 1) {
    if (formData.name.trim() === '') {
      errors.name = 'El nombre es obligatorio.';
    } else if (formData.name.trim().length > 100) {
      errors.name = 'El nombre no puede sobrepasar el límite de 100 caracteres.';
    }

    if (!formData.category) {
      errors.category = 'Por favor, selecciona una categoría.';
    }

    if (!formData.slug) {
      errors.slug = 'Por favor, crea tu dirección.';
    } else if (/\s/.test(formData.slug)) {
      errors.slug = 'La dirección no puede contener espacios.';
    } else if (/[A-Z]/.test(formData.slug)) {
      errors.slug = 'La dirección no puede contener letras mayúsculas.';
    } else if (/[^\w\s]/.test(formData.slug)) {
      errors.slug = 'La dirección no puede contener símbolos.';
    } else if (formData.slug.trim().length > 200) {
      errors.slug = 'La dirección no puede contener más de 200 caracteres.';
    }
  }

  if (step === 2) {
    if (!formData.location) {
      errors.location = 'Completa tu alcance de tiendas.';
    } else if (formData.location.trim().length > 500) {
      errors.location = 'La locación no puede contener más de 500 caracteres.';
    }

    if (formData.address.trim().length > 300) {
      errors.address = 'La dirección de la tienda no puede contener más de 300 caracteres.';
    }

    if (!formData.phone) {
      errors.phone = 'Completa tu teléfono.';
    } else if (formData.phone.trim().length > 100) {
      errors.phone = 'El teléfono no puede tener más de 100 caracteres.';
    }

    if (!formData.email) {
      errors.email = 'Completa tu email.';
    } else if (formData.email.trim().length > 100) {
      errors.email = 'El correo no puede contener más de 100 caracteres.';
    } else if (!/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i.test(formData.email)) {
      errors.email = 'Correo electrónico inválido.';
    }
  }

  if (step === 3) {
    if (!formData.schedule) {
      errors.schedule = 'Completa tu horario.';
    } else if (formData.schedule.trim().length > 100) {
      errors.schedule = 'El horario no puede contener más de 100 caracteres.';
    }

    if (formData.nit.trim().length > 100) {
      errors.nit = 'El NIT no puede contener más de 100 caracteres.';
    } else if (/\./.test(formData.nit)) {
      errors.nit = 'El NIT no puede contener puntos.';
    }

    if (!formData.city) {
      errors.city = 'Por favor, selecciona una ciudad.';
    }

    if (formData.description.trim() === '') {
      errors.description = 'La descripción es obligatoria.';
    } else if (formData.description.trim().length > 500) {
      errors.description = 'La descripción no puede sobrepasar el límite de 500 caracteres.';
    }

    if (formData.url_pay.trim().length > 255) {
      errors.url_pay = 'La URL no puede contener más de 255 caracteres.';
    }

    if (formData.account_pay.trim() !== '') {
      if (!/^\d+$/.test(formData.account_pay.trim())) {
        errors.account_pay = 'La cuenta bancaria solo puede contener números.';
      } else if (formData.account_pay.trim().length > 50) {
        errors.account_pay = 'La cuenta bancaria no puede contener más de 50 caracteres.';
      }
    }
  }

  return errors;
};
const mapStateToProps = state => ({
  categories: state.Store_Categories.categories,
  cities: state.Cities.cities,
  loading: state.Store.loading,
  user:state.Profile.profile
})

export default connect(mapStateToProps, {
  get_categories,
  get_cities,
  createStore,
  get_user_store
})(Create)
