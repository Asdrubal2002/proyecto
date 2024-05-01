import React, { useEffect, useState } from 'react';
import { update_user_profile } from '../../redux/actions/profile';
import { connect } from 'react-redux';

const ProfileForm = ({
    update_user_profile
}) => {

    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        // Tu lógica aquí
    }, []);

    const countries = [
        { code: '+57', name: 'Colombia' },
        { code: '+56', name: 'Peru' },
        // Agrega más países según sea necesario
    ];

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        identification:'',
        country: countries[0].code, // Establece el código del primer país como predeterminado
    });

    const [formErrors, setFormErrors] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        identification:'',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm(formData);
        setFormErrors(errors);

        if (Object.values(errors).every(error => error === '')) {
            try {
                const phoneNumber = `${formData.country}${formData.phone}`;
                await update_user_profile(formData.first_name, formData.last_name, phoneNumber, formData.identification);
                setSuccessMessage('¡Datos actualizados correctamente!');
            } catch (error) {
                console.log('Error al actualizar datos:', error);
                // Manejar el error si la actualización falla
            }
        } else {
            console.log('Formulario inválido, por favor revisa los campos');
        }
    };

    const validateForm = (formData) => {
        let errors = {
            first_name: '',
            last_name: '',
            phone: '',
            identification:'',
        };

        if (formData.first_name.trim() === '') {
            errors.first_name = 'El nombre es obligatorio.';
        }else if(formData.first_name.trim().length > 20){
            errors.first_name = 'El nombre es demasiado largo.';
        }

        
        if (formData.last_name.trim() === '') {
            errors.last_name = 'El apellido es obligatorio.';
        }else if(formData.last_name.trim().length > 20){
            errors.last_name = 'El apellido es demasiado largo.';
        }

        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(formData.phone)) {
            errors.phone = 'El número de teléfono debe contener 10 dígitos';
        }

        if (!phoneRegex.test(formData.identification)) {
            errors.identification = 'El número de identificación debe contener exactamente 10 dígitos';
        }

        return errors;
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto px-4 py-8 bg-white shadow-lg rounded-lg">
            <div className="mb-4">
                <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder='Nombre *'
                    className="mt-1 p-2 rounded-md w-full focus:outline-none bg-gray-200 text-sm sm:leading-6 placeholder:text-gray-600 text-gray-900"
                />
                {formErrors.first_name && <p className="text-red-500 text-sm">{formErrors.first_name}</p>}
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder='Apellido *'
                    className="mt-1 p-2 rounded-md w-full focus:outline-none bg-gray-200 text-sm sm:leading-6 placeholder:text-gray-600 text-gray-900"
                />
                {formErrors.last_name && <p className="text-red-500 text-sm">{formErrors.last_name}</p>}
            </div>
            <div className="mb-4 flex items-center">
                <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="p-2 rounded-md mr-2 focus:outline-none bg-gray-200 text-sm text-gray-900"
                >
                    {countries.map((country) => (
                        <option key={country.code} value={country.code}>
                            {country.name} ({country.code})
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Teléfono *"
                    className="p-2 rounded-md focus:outline-none bg-gray-200 text-sm sm:leading-6 placeholder:text-gray-600 text-gray-900 w-full"
                />
                {formErrors.phone && <p className="text-red-500 text-sm pl-2" >{formErrors.phone}</p>}
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    id="identification"
                    name="identification"
                    value={formData.identification}
                    onChange={handleChange}
                    placeholder="Identificación *"
                    className="mt-1 p-2 rounded-md w-full focus:outline-none bg-gray-200 text-sm sm:leading-6 placeholder:text-gray-600 text-gray-900"
                />
                {formErrors.identification && <p className="text-red-500 text-sm">{formErrors.identification}</p>}
            </div>

            <button type="submit" className="text-sm font-semibold w-full bg-azul_corp text-white py-2 px-4 rounded-md hover:bg-azul_corp_ho focus:outline-none focus:bg-blue-600">Guardar</button>
        </form>
    );
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, {
    update_user_profile
})(ProfileForm);
