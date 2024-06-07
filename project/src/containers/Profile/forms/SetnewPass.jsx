import React, { useState } from 'react';
import { connect } from 'react-redux';
import { change_password_set } from '../../../redux/actions/auth';
import { Rings } from 'react-loader-spinner';

function SetnewPass({ change_password_set, loading }) {
    const expresiones = {
        clave:  /^(?=(?:\D*\d){3}\D*$)[\d\w\S]{4}$/, // 8 a 16 digitos.
    };

    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: '',
        current_password: '',
    });

    const [formErrors, setFormErrors] = useState({
        new_password: '',
        re_new_password: '',
        current_password: '',
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
        } else if (name === 'new_password' && !expresiones.clave.test(value)) {
            errors.new_password =
                'La contraseña debe tener exactamente 4 caracteres, incluyendo tres números y una letra mayúscula o minúscula o carácter no alfanumérico (símbolo).';
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
                change_password_set(formData.new_password, formData.re_new_password, formData.current_password);
            } catch (error) {
                console.log('Error al cambiar la contraseña:', error);
                // Aquí podrías manejar el error si la actualización falla
            }
        } else {
            console.log('Formulario inválido, por favor revisa los campos');
        }
    };

    const validateForm = (formData) => {
        let errors = {
            new_password: '',
            re_new_password: '',
            current_password: '',
        };

        // Validación de contraseñas iguales
        if (formData.new_password !== formData.re_new_password) {
            errors.re_new_password = 'Las contraseñas no coinciden.';
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
                    id="new_password"
                    name="new_password"
                    value={formData.new_password}
                    onChange={handleChange}
                    placeholder="Nueva clave *"
                    className="mt-1 p-2 rounded-md w-full focus:outline-none bg-gray-200 text-sm sm:leading-6 placeholder:text-gray-600 text-gray-900"
                />
                {formErrors.new_password && <p className="text-red-500 text-sm">{formErrors.new_password}</p>}
            </div>
            <div className="mb-4">
                <input
                    type="password"
                    id="re_new_password"
                    name="re_new_password"
                    value={formData.re_new_password}
                    onChange={handleChange}
                    placeholder="Confirmar nueva clave *"
                    className="mt-1 p-2 rounded-md w-full focus:outline-none bg-gray-200 text-sm sm:leading-6 placeholder:text-gray-600 text-gray-900"
                />
                {formErrors.re_new_password && <p className="text-red-500 text-sm">{formErrors.re_new_password}</p>}
            </div>
            <div className="mb-4">
                <input
                    type="password"
                    id="current_password"
                    name="current_password"
                    value={formData.current_password}
                    onChange={handleChange}
                    placeholder="Clave actual *"
                    className="mt-1 p-2 rounded-md w-full focus:outline-none bg-gray-200 text-sm sm:leading-6 placeholder:text-gray-600 text-gray-900"
                />
                {formErrors.current_password && <p className="text-red-500 text-sm">{formErrors.current_password}</p>}
            </div>
            <button
                type="submit"
                disabled={!isFormValid()}
                className="text-sm font-semibold w-full bg-azul_corp text-white py-2 px-4 rounded-md hover:bg-azul_corp_ho focus:outline-none focus:bg-blue-600">
                {loading ? (
                    <Rings width={20} height={20} color="#fff" radius="6" />
                ) : (
                    <>
                        Guardar Nueva clave
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
    change_password_set,
})(SetnewPass);
