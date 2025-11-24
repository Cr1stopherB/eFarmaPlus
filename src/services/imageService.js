import { uploadToImgBB } from '../utils/uploadImage';

class ImageService {

    async uploadProductImage(file) {
        try {
            const result = await uploadToImgBB(file, {
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


    async uploadUserAvatar(file) {
        try {
            const result = await uploadToImgBB(file, {
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

    async deleteImage(imageUrl) {
        console.warn('Eliminación de imágenes no implementada en ImgBB free tier');
        return true;
    }
}

export default new ImageService();
