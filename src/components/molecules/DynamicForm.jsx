// components/molecules/DynamicForm.jsx
// Formulario dinámico generado a partir de configuración
import React, { useState } from 'react';
import Button from '../atoms/Button';
import InputFile from '../atoms/InputFile';

/**
 * Componente de formulario dinámico
 * 
 * @param {Array} fields - Configuración de campos del formulario
 * @param {Object} initialValues - Valores iniciales (para editar)
 * @param {Function} onSubmit - Callback al enviar formulario
 * @param {Function} onCancel - Callback al cancelar
 * @param {String} submitText - Texto del botón submit
 * 
 * Configuración de fields:
 * [
 *   { name: 'nombre', label: 'Nombre', type: 'text', required: true },
 *   { name: 'precio', label: 'Precio', type: 'number', min: 0 },
 *   { name: 'descripcion', label: 'Descripción', type: 'textarea' },
 *   { name: 'imagen', label: 'Imagen', type: 'file', accept: 'image/*' }
 * ]
 */
const DynamicForm = ({
    fields,
    initialValues = {},
    onSubmit,
    onCancel,
    submitText = 'Guardar'
}) => {
    const [formData, setFormData] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [previews, setPreviews] = useState({});

    const handleChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Limpiar error del campo
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleFileChange = (name, file) => {
        setFormData(prev => ({
            ...prev,
            [name]: file
        }));

        // Crear preview
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviews(prev => ({
                    ...prev,
                    [name]: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const validate = () => {
        const newErrors = {};

        fields.forEach(field => {
            if (field.required && !formData[field.name]) {
                newErrors[field.name] = `${field.label} es requerido`;
            }

            if (field.type === 'email' && formData[field.name]) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(formData[field.name])) {
                    newErrors[field.name] = 'Email inválido';
                }
            }

            if (field.min !== undefined && formData[field.name] < field.min) {
                newErrors[field.name] = `El valor mínimo es ${field.min}`;
            }

            if (field.max !== undefined && formData[field.name] > field.max) {
                newErrors[field.name] = `El valor máximo es ${field.max}`;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(formData);
        }
    };

    const renderField = (field) => {
        const { name, label, type, required, ...rest } = field;

        switch (type) {
            case 'textarea':
                return (
                    <div key={name} className="form-group">
                        <label htmlFor={name}>
                            {label}
                            {required && <span className="required">*</span>}
                        </label>
                        <textarea
                            id={name}
                            name={name}
                            value={formData[name] || ''}
                            onChange={(e) => handleChange(name, e.target.value)}
                            className={errors[name] ? 'error' : ''}
                            {...rest}
                        />
                        {errors[name] && (
                            <span className="error-message">{errors[name]}</span>
                        )}
                    </div>
                );

            case 'file':
                return (
                    <div key={name} className="form-group">
                        <InputFile
                            label={label}
                            onChange={(file) => handleFileChange(name, file)}
                            preview={previews[name] || initialValues[`${name}Preview`]}
                            error={errors[name]}
                            {...rest}
                        />
                    </div>
                );

            case 'select':
                return (
                    <div key={name} className="form-group">
                        <label htmlFor={name}>
                            {label}
                            {required && <span className="required">*</span>}
                        </label>
                        <select
                            id={name}
                            name={name}
                            value={formData[name] || ''}
                            onChange={(e) => handleChange(name, e.target.value)}
                            className={errors[name] ? 'error' : ''}
                        >
                            <option value="">Seleccionar...</option>
                            {field.options?.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        {errors[name] && (
                            <span className="error-message">{errors[name]}</span>
                        )}
                    </div>
                );

            default:
                return (
                    <div key={name} className="form-group">
                        <label htmlFor={name}>
                            {label}
                            {required && <span className="required">*</span>}
                        </label>
                        <input
                            type={type}
                            id={name}
                            name={name}
                            value={formData[name] || ''}
                            onChange={(e) => handleChange(name, e.target.value)}
                            className={errors[name] ? 'error' : ''}
                            {...rest}
                        />
                        {errors[name] && (
                            <span className="error-message">{errors[name]}</span>
                        )}
                    </div>
                );
        }
    };

    return (
        <form onSubmit={handleSubmit} className="dynamic-form">
            {fields.map(renderField)}

            <div className="form-actions">
                <Button type="submit" variant="primary">
                    {submitText}
                </Button>
                {onCancel && (
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Cancelar
                    </Button>
                )}
            </div>
        </form>
    );
};

export default DynamicForm;
