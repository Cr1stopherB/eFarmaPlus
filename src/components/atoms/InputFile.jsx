import React, { useRef } from 'react';
import '../../styles/atoms/InputFile.css';


const InputFile = ({ onChange, accept = 'image/*', label, preview, error }) => {
    const inputRef = useRef(null);

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file && onChange) {
            onChange(file);
        }
    };

    const handleClick = () => {
        inputRef.current?.click();
    };

    return (
        <div className="input-file-container">
            {label && <label className="input-file-label">{label}</label>}

            <input
                ref={inputRef}
                type="file"
                accept={accept}
                onChange={handleChange}
                className="input-file-hidden"
            />

            {preview ? (
                <div className="input-file-preview">
                    <img src={preview} alt="Preview" />
                    <button
                        type="button"
                        className="btn-change-image"
                        onClick={handleClick}
                    >
                        Cambiar imagen
                    </button>
                </div>
            ) : (
                <button
                    type="button"
                    className="input-file-button"
                    onClick={handleClick}
                >
                    <span className="upload-icon">📁</span>
                    <span>Seleccionar archivo</span>
                </button>
            )}

            {error && <span className="input-file-error">{error}</span>}
        </div>
    );
};

export default InputFile;
