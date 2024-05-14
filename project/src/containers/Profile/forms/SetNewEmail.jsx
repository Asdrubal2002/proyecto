import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Rings } from 'react-loader-spinner';
import { change_email_set } from '../../../redux/actions/auth';



function SetNewEmail({ change_email_set, loading }) {
    const [formData, setFormData] = useState({
        current_password: '',
        new_email: '',
        re_new_email: '',
    });

    const [formErrors, setFormErrors] = useState({
        current_password: '',
        new_email: '',
        re_new_email: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Validar el campo en tiempo real
        const errors = { ...formErrors };
        if (value.trim() === '') {
            errors[name] = `El campo ${name.replace('_', ' ')} es obligatorio.`;
        } else {
            errors[name] = '';
        }
        setFormErrors(errors);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm(formData);
        setFormErrors(errors);

        if (Object.values(errors).every((error) => error === '')) {
            try {
                // Aquí puedes agregar la lógica para enviar los datos al backend
                change_email_set(formData.current_password, formData.new_email, formData.re_new_email)
            } catch (error) {
                console.log('Error al cambiar el correo electrónico:', error);
                // Aquí podrías manejar el error si la actualización falla
            }
        } else {
            console.log('Formulario inválido, por favor revisa los campos');
        }
    };

    const validateForm = (formData) => {
        let errors = {
            current_password: '',
            new_email: '',
            re_new_email: '',
        };

        // Validación de que los correos electrónicos sean iguales
        if (formData.new_email !== formData.re_new_email) {
            errors.re_new_email = 'Los correos electrónicos no coinciden.';
        }
        if (formData.new_email.length > 150) {
            errors.re_new_email = 'El correo electrónico no puede tener más de 150 caracteres.';
        }

        return errors;
    };

    const isFormValid = () => {
        return Object.values(formData).every((value) => value.trim() !== '') && Object.values(formErrors).every((error) => error === '');
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto px-4 py-8 bg-white shadow-lg rounded-lg">
            <div className="mb-4">
                <input
                    type="password"
                    id="current_password"
                    name="current_password"
                    value={formData.current_password}
                    onChange={handleChange}
                    placeholder="Contraseña actual *"
                    className="mt-1 p-2 rounded-md w-full focus:outline-none bg-gray-200 text-sm sm:leading-6 placeholder:text-gray-600 text-gray-900"
                />
                {formErrors.current_password && <p className="text-red-500 text-sm">{formErrors.current_password}</p>}
            </div>
            <div className="mb-4">
                <input
                    type="email"
                    id="new_email"
                    name="new_email"
                    value={formData.new_email}
                    onChange={handleChange}
                    placeholder="Nuevo correo electrónico *"
                    className="mt-1 p-2 rounded-md w-full focus:outline-none bg-gray-200 text-sm sm:leading-6 placeholder:text-gray-600 text-gray-900"
                />
                {formErrors.new_email && <p className="text-red-500 text-sm">{formErrors.new_email}</p>}
            </div>
            <div className="mb-4">
                <input
                    type="email"
                    id="re_new_email"
                    name="re_new_email"
                    value={formData.re_new_email}
                    onChange={handleChange}
                    placeholder="Repetir nuevo correo electrónico *"
                    className="mt-1 p-2 rounded-md w-full focus:outline-none bg-gray-200 text-sm sm:leading-6 placeholder:text-gray-600 text-gray-900"
                />
                {formErrors.re_new_email && <p className="text-red-500 text-sm">{formErrors.re_new_email}</p>}
            </div>
            <button
                type="submit"
                disabled={!isFormValid()}
                className="text-sm font-semibold w-full bg-azul_corp text-white py-2 px-4 rounded-md hover:bg-azul_corp_ho focus:outline-none focus:bg-blue-600">
                {loading ? (
                    <Rings width={20} height={20} color="#fff" radius="6" />
                ) : (
                    <>
                        Guardar Cambios
                    </>
                )}
            </button>
        </form>
    );
}

const mapStateToProps = (state) => ({
    loading: state.Auth.loading,
});

export default connect(mapStateToProps, {
    change_email_set
})(SetNewEmail);
