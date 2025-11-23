// components/molecules/Modal.jsx
// Modal reutilizable con animaciones
import React, { useEffect } from 'react';
import '../../styles/molecules/Modal.css';

/**
 * Componente Modal reutilizable
 * 
 * @param {Boolean} isOpen - Controla si el modal está abierto
 * @param {Function} onClose - Función para cerrar el modal
 * @param {String} title - Título del modal
 * @param {ReactNode} children - Contenido del modal
 * @param {String} size - Tamaño del modal (small, medium, large)
 * 
 * Ejemplo de uso:
 * <Modal 
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Crear Producto"
 *   size="large"
 * >
 *   <FormularioProducto />
 * </Modal>
 */
const Modal = ({ isOpen, onClose, title, children, size = 'medium' }) => {
    // Cerrar modal con ESC
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    // Prevenir scroll del body cuando el modal está abierto
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className={`modal-content modal-${size}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header">
                    <h2 className="modal-title">{title}</h2>
                    <button
                        className="modal-close"
                        onClick={onClose}
                        aria-label="Cerrar modal"
                    >
                        ✕
                    </button>
                </div>

                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
