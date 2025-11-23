// utils/uploadImage.js
// Utilidad para comprimir y subir imágenes a ImgBB
import Resizer from 'react-image-file-resizer';

const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

/**
 * Función principal para subir imagen a ImgBB con compresión y preview
 * 
 * @param {File} file - Archivo de imagen a subir
 * @param {Object} options - Opciones de compresión
 * @param {number} options.maxWidth - Ancho máximo (default: 1024)
 * @param {number} options.maxHeight - Alto máximo (default: 1024)
 * @param {number} options.quality - Calidad 0-100 (default: 80)
 * @returns {Promise<{url: string, preview: string}>} - URL de ImgBB y preview local
 */
export const uploadToImgBB = async (file, options = {}) => {
    const {
        maxWidth = 1024,
        maxHeight = 1024,
        quality = 80
    } = options;

    console.log('Intentando subir imagen...');
    console.log('API Key configurada:', IMGBB_API_KEY ? 'SÍ' : 'NO');

    if (!IMGBB_API_KEY) {
        console.error('Falta VITE_IMGBB_API_KEY en .env');
        throw new Error('Configuración incompleta: Falta API Key de ImgBB');
    }

    return new Promise((resolve, reject) => {
        try {
            Resizer.imageFileResizer(
                file,
                maxWidth,
                maxHeight,
                'WEBP',
                quality,
                0,
                async (uri) => {
                    try {
                        if (!uri || typeof uri !== 'string') {
                            reject(new Error("Error al procesar la imagen"));
                            return;
                        }

                        const base64 = uri.split(',')[1];
                        if (!base64) {
                            reject(new Error("Formato base64 inválido"));
                            return;
                        }

                        const formData = new FormData();
                        formData.append('image', base64);

                        const response = await fetch(
                            `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
                            {
                                method: 'POST',
                                body: formData
                            }
                        );

                        if (!response.ok) {
                            throw new Error(`Error HTTP: ${response.status}`);
                        }

                        const result = await response.json();

                        if (result.success) {
                            resolve({
                                url: result.data.url,
                                preview: uri, // Preview local en base64
                                deleteUrl: result.data.delete_url // Opcional: para eliminar luego
                            });
                        } else {
                            reject(new Error(result.error?.message || "Error al subir la imagen"));
                        }
                    } catch (err) {
                        reject(err);
                    }
                },
                'base64'
            );
        } catch (err) {
            reject(err);
        }
    });
};

/**
 * Validar archivo de imagen
 * 
 * @param {File} file - Archivo a validar
 * @param {number} maxSizeMB - Tamaño máximo en MB (default: 5)
 * @returns {Object} { valid: boolean, error: string }
 */
export const validateImageFile = (file, maxSizeMB = 5) => {
    if (!file) {
        return { valid: false, error: 'No se seleccionó ningún archivo' };
    }

    if (!file.type.startsWith('image/')) {
        return { valid: false, error: 'El archivo debe ser una imagen' };
    }

    const maxSize = maxSizeMB * 1024 * 1024;
    if (file.size > maxSize) {
        return {
            valid: false,
            error: `La imagen no debe superar ${maxSizeMB}MB`
        };
    }

    return { valid: true, error: null };
};

/**
 * Función completa con validación
 * 
 * @param {File} file - Archivo de imagen
 * @param {Object} options - Opciones de compresión
 * @returns {Promise<{url: string, preview: string}>}
 */
export const uploadImageWithValidation = async (file, options = {}) => {
    // Validar archivo
    const validation = validateImageFile(file, options.maxSizeMB);
    if (!validation.valid) {
        throw new Error(validation.error);
    }

    // Subir imagen
    return await uploadToImgBB(file, options);
};