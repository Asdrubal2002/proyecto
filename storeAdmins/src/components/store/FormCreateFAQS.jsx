import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { get_store_faqs, get_store_policies } from '../../redux/actions/store/store';
import Layout from '../../hocs/Layout';
import axios from "axios"

function FormCreateFAQS({
  userStoreSlug,
  get_store_faqs,
  faqs
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
    get_store_faqs(userStoreSlug);
  }, []);

  const initialFormData = {
    question: '',
    answer: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    console.log(formData)

    if (!formData.question.trim()) {
      errors.question = 'El nombre es requerido';
    } else if (formData.question.length > 50) {
      errors.question = 'El nombre no puede exceder los 50 caracteres';
    }

    if (!formData.answer.trim()) {
      errors.answer = 'La descripción de la política es requerida';
    } else if (formData.answer.length > 5000) {
      errors.answer = 'El texto de la política no puede exceder los 5000 caracteres';
    }

    setFormErrors(errors);

    // Si no hay errores, envía los datos del formulario
    if (Object.keys(errors).length === 0) {
      const trimmedFormData = {
        question: formData.question.trim(),
        answer: formData.answer.trim()
      };
      setFormData(initialFormData);
      const config = {
        headers: {
          'Accept': 'application/json',
          'Authorization': `JWT ${localStorage.getItem('access')}`
        }
      };
      const fetchData = async () => {
        setLoading(true);
        try {
          const res = await axios.post(
            `${import.meta.env.VITE_REACT_APP_API_URL}/api/store/faqs/create/`,
            trimmedFormData,
            config
          );

          if (res.status === 201) {
            setLoading(false);
            get_store_faqs(userStoreSlug);

          } else {
            setLoading(false);

          }
        } catch (err) {
          setLoading(false);
          alert('Error al enviar', err);
        }
      };

      fetchData();


    } else {
      // Si hay errores, no envíes los datos
      console.log('El formulario contiene errores. No se enviará.');
    }
  };

  return (
    <Layout>
      <form onSubmit={onSubmit} className="bg-gray-900 rounded-lg shadow-md p-6 mb-4">
        <div className="mb-4">
          <label htmlFor="question" className="block text-sm font-medium text-gray-300">Pregunta *</label>
          <input
            type="text"
            name="question"
            id="question"
            placeholder="¿Que pregunta crees que puede tener las personas sobre tu negocio?"
            className="placeholder:text-sm text-sm mt-1 p-2 block w-full border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-gray-300"
            value={formData.question}
            onChange={handleChange}
          />
          {formErrors.question && (
            <p className="text-red-500 text-sm mt-1">{formErrors.question}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="answer" className="block text-sm font-medium text-gray-300">Respuesta</label>
          <textarea
            name="answer"
            id="answer"
            placeholder="Respuesta"
            className="placeholder:text-sm text-sm mt-1 p-2 block w-full border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-gray-300"
            value={formData.answer}
            onChange={handleChange}
          />
          {formErrors.answer && (
            <p className="text-red-500 text-sm mt-1">{formErrors.answer}</p>
          )}
        </div>

        <div className="flex">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-azul_corp hover:bg-azul_corp_ho"
          >
            Guardar Pólitica de mi negocio.
          </button>
        </div>
      </form>
      {faqs !== null && faqs.length > 0 ? (
        <ol role="list" className="list-decimal space-y-8 text-gray-800">
          {faqs.map((faqsItem, index) => (
            <li key={index} className="flex gap-x-3">
              <span>
                <strong className="font-semibold text-gray-200">{index + 1}. {faqsItem.question}</strong>
                <p className="text-sm text-gray-400">{faqsItem.answer}</p>
              </span>
            </li>
          ))}
        </ol>
      ) : (
        <p>No hay preguntas disponibles para esta tienda.</p>
      )}
    </Layout>
  );
}

const mapStateToProps = state => ({
  userStoreSlug: state.Store.store.slug,
  faqs: state.Store.faqs
});

export default connect(mapStateToProps, {
  get_store_faqs
})(FormCreateFAQS);
