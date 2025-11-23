// utils/uploadImage.js
// Utilidad para comprimir y subir imágenes a ImgBB
import Resizer from 'react-image-file-resizer';

/**
 * Comprime y convierte imagen a WebP
 * 
 * @param {File} file - Archivo de imagen original
 * @param {Number} maxWidth - Ancho máximo (default: 800)
 * @param {Number} maxHeight - Alto máximo (default: 800)
 * @param {Number} quality - Calidad 0-100 (default: 80)
 * @returns {Promise<Blob>} - Imagen comprimida en formato WebP
 */
const compressImage = (file, maxWidth = 800, maxHeight = 800, quality = 80) => {
    return new Promise((resolve, reject) => {
        Resizer.imageFileResizer(
            file,
            maxWidth,
            maxHeight,
            'WEBP', // Formato de salida
            quality, // Calidad
            0, // Rotación
            (blob) => {
                resolve(blob);
            },
            'blob', // Tipo de salida
            maxWidth,
            maxHeight
        );
    });
};

/**
 * Sube imagen comprimida a ImgBB
 * 
 * @param {Blob} imageBlob - Imagen comprimida
 * @returns {Promise<String>} - URL de la imagen subida
 */
const uploadToImgBB = async (imageBlob) => {
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;

    if (!apiKey) {
        throw new Error('API Key de ImgBB no configurada. Agrega VITE_IMGBB_API_KEY a tu archivo .env');
    }

    const formData = new FormData();
    formData.append('image', imageBlob);

    try {
        const response = await fetch(
            `https://api.imgbb.com/1/upload?key=${apiKey}`,
            {
                method: 'POST',
                body: formData
            }
        );

        const data = await response.json();

        if (data.success) {
            return data.data.url;
        } else {
            throw new Error(data.error?.message || 'Error al subir imagen');
        }
    } catch (error) {
        console.error('Error al subir imagen:', error);
        throw error;
    }
};

/**
 * Función principal para procesar y subir imagen
 * 
 * @param {File} file - Archivo de imagen
 * @returns {Promise<String>} - URL de la imagen subida
 * 
 * Uso:
 * const imageUrl = await uploadImage(file);
 */
export const uploadImage = async (file) => {
    try {
        // 1. Comprimir y convertir a WebP
        const compressedBlob = await compressImage(file);

        // 2. Subir a ImgBB
        const imageUrl = await uploadToImgBB(compressedBlob);

        return imageUrl;
    } catch (error) {
        console.error('Error en uploadImage:', error);
        throw error;
    }
};

/**
 * Validar que el archivo sea una imagen válida
 * 
 * @param {File} file - Archivo a validar
 * @param {Number} maxSizeMB - Tamaño máximo en MB (default: 5)
 * @returns {Object} { valid: boolean, error: string }
 */
export const validateImageFile = (file, maxSizeMB = 5) => {
    // Verificar que sea un archivo
    if (!file) {
        return { valid: false, error: 'No se seleccionó ningún archivo' };
    }

    // Verificar tipo de archivo
    if (!file.type.startsWith('image/')) {
        return { valid: false, error: 'El archivo debe ser una imagen' };
    }

    // Verificar tamaño
    const maxSize = maxSizeMB * 1024 * 1024; // Convertir a bytes
    if (file.size > maxSize) {
        return {
            valid: false,
            error: `La imagen no debe superar ${maxSizeMB}MB`
        };
    }

    return { valid: true, error: null };
};

export default uploadImage;
