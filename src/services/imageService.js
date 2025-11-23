// services/imageService.js
// Servicio para gestión de imágenes
import { uploadImage, validateImageFile } from '../utils/uploadImage';

/**
 * Servicio de imágenes
 * Maneja la lógica de validación y subida de imágenes
 */
class ImageService {
    /**
     * Subir imagen de producto
     * 
     * @param {File} file - Archivo de imagen
     * @returns {Promise<String>} - URL de la imagen
     */
    async uploadProductImage(file) {
        // Validar archivo
        const validation = validateImageFile(file, 5); // Máximo 5MB
        if (!validation.valid) {
            throw new Error(validation.error);
        }

        try {
            // Subir imagen
            const imageUrl = await uploadImage(file);
            return imageUrl;
        } catch (error) {
            console.error('Error al subir imagen de producto:', error);
            throw new Error('No se pudo subir la imagen. Intenta nuevamente.');
        }
    }

    /**
     * Subir imagen de usuario (avatar)
     * 
     * @param {File} file - Archivo de imagen
     * @returns {Promise<String>} - URL de la imagen
     */
    async uploadUserAvatar(file) {
        // Validar archivo (tamaño más pequeño para avatares)
        const validation = validateImageFile(file, 2); // Máximo 2MB
        if (!validation.valid) {
            throw new Error(validation.error);
        }

        try {
            const imageUrl = await uploadImage(file);
            return imageUrl;
        } catch (error) {
            console.error('Error al subir avatar:', error);
            throw new Error('No se pudo subir el avatar. Intenta nuevamente.');
        }
    }

    /**
     * Eliminar imagen (placeholder - ImgBB no permite eliminar sin cuenta premium)
     * En producción, guardarías el delete hash al subir y lo usarías aquí
     * 
     * @param {String} imageUrl - URL de la imagen a eliminar
     */
    async deleteImage(imageUrl) {
        console.warn('Eliminación de imágenes no implementada en ImgBB free tier');
        // En producción con backend, guardarías las referencias y las eliminarías
        return true;
    }
}

export default new ImageService();
