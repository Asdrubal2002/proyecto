import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { create_policy, get_store_policies } from '../../redux/actions/store/store';
import Layout from '../../hocs/Layout';
import PoliticsFoundations from './PoliticsFoundations';

function FormCreatePolicy({
  create_policy,
  userStoreSlug,
  get_store_policies,
  policy
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
    get_store_policies(userStoreSlug);
  }, []);

  const initialFormData = {
    name: '',
    policy_text: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({});

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
  
    if (!formData.name.trim()) {
      errors.name = 'El nombre es requerido';
    } else if (formData.name.length > 50) {
      errors.name = 'El nombre no puede exceder los 50 caracteres';
    }
  
    if (!formData.policy_text.trim()) {
      errors.policy_text = 'La descripción de la política es requerida';
    } else if (formData.policy_text.length > 5000) {
      errors.policy_text = 'El texto de la política no puede exceder los 5000 caracteres';
    }
  
    setFormErrors(errors);
  
    // Si no hay errores, envía los datos del formulario
    if (Object.keys(errors).length === 0) {
      const trimmedFormData = {
        name: formData.name.trim(),
        policy_text: formData.policy_text.trim()
      };
  
      setFormData(initialFormData);
      await create_policy(formData.name, formData.policy_text);
      get_store_policies(userStoreSlug);
    } else {
      // Si hay errores, no envíes los datos
      console.log('El formulario contiene errores. No se enviará.');
    }
  };
  

  return (
    <Layout>
       <PoliticsFoundations />
      <form onSubmit={onSubmit} className="bg-gray-900 rounded-lg shadow-md p-6 mb-4">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">Nombre de tu política de negocio *</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Nombra a tu política"
            className="placeholder:text-sm text-sm mt-1 p-2 block w-full border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-gray-300"
            value={formData.name}
            onChange={handleChange}
          />
          {formErrors.name && (
            <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="policy_text" className="block text-sm font-medium text-gray-300">Describe tu política de negicio</label>
          <textarea
            name="policy_text"
            id="policy_text"
            placeholder="Esto es lo que veran tus clientes ante cualquier eventualidad."
            className="placeholder:text-sm text-sm mt-1 p-2 block w-full border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-gray-300"
            value={formData.policy_text}
            onChange={handleChange}
          />
          {formErrors.policy_text && (
            <p className="text-red-500 text-sm mt-1">{formErrors.policy_text}</p>
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
      {policy !== null && policy.length > 0 ? (
        <ol role="list" className="list-decimal space-y-8 text-gray-800">
          {policy.map((policyItem, index) => (
            <li key={index} className="flex gap-x-3">
              <span>
                <strong className="font-semibold text-gray-200">{index + 1}. {policyItem.name}</strong>
                <p className="text-sm text-gray-400">{policyItem.policy_text}</p>
              </span>
            </li>
          ))}
        </ol>
      ) : (
        <p>No hay políticas disponibles para esta tienda.</p>
      )}

    </Layout>
  );
}

const mapStateToProps = state => ({
  userStoreSlug: state.Store.store.slug,
  policy: state.Store.policies
});

export default connect(mapStateToProps, {
  create_policy,
  get_store_policies
})(FormCreatePolicy);
