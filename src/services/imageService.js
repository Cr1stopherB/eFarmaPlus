import { uploadImageWithValidation } from '../utils/uploadImage';

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
        try {
            // uploadImageWithValidation ya incluye la validación
            const result = await uploadImageWithValidation(file, {
                maxWidth: 800,
                maxHeight: 800,
                quality: 80,
                maxSizeMB: 5
            });
            return result.url;
        } catch (error) {
            console.error('Error al subir imagen de producto:', error);
            throw new Error(error.message || 'No se pudo subir la imagen. Intenta nuevamente.');
        }
    }

    /**
     * Subir imagen de usuario (avatar)
     * 
     * @param {File} file - Archivo de imagen
     * @returns {Promise<String>} - URL de la imagen
     */
    async uploadUserAvatar(file) {
        try {
            const result = await uploadImageWithValidation(file, {
                maxWidth: 400,
                maxHeight: 400,
                quality: 85,
                maxSizeMB: 2
            });
            return result.url;
        } catch (error) {
            console.error('Error al subir avatar:', error);
            throw new Error(error.message || 'No se pudo subir el avatar. Intenta nuevamente.');
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
