import Resizer from 'react-image-file-resizer';

const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

export const uploadToImgBB = async (file, options = {}) => {
    // Validar API Key
    if (!IMGBB_API_KEY) {
        console.error('Falta la API KEY de ImgBB en las variables de entorno (VITE_IMGBB_API_KEY)');
        throw new Error('Configuración incompleta: Falta API Key de imágenes');
    }

    // Opciones por defecto
    const {
        maxWidth = 1024,
        maxHeight = 1024,
        compressFormat = 'WEBP',
        quality = 80,
        rotation = 0,
        outputType = 'base64'
    } = options;

    return new Promise((resolve, reject) => {
        Resizer.imageFileResizer(
            file,
            maxWidth,
            maxHeight,
            compressFormat,
            quality,
            rotation,
            async (uri) => {
                try {
                    if (!uri || typeof uri !== 'string') {
                        reject(new Error("Error al procesar imagen"));
                        return;
                    }

                    // Extraer base64 si es necesario
                    const base64 = uri.includes('base64,') ? uri.split(',')[1] : uri;

                    if (!base64) {
                        reject(new Error("Base64 inválido"));
                        return;
                    }

                    const formData = new FormData();
                    formData.append('image', base64);

                    const response = await fetch(
                        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
                        { method: 'POST', body: formData }
                    );

                    const result = await response.json();

                    if (result.success) {
                        resolve({
                            url: result.data.url,
                            preview: uri,
                            fullData: result.data
                        });
                    } else {
                        console.error('Error ImgBB:', result);
                        reject(new Error(result.error?.message || "Error al subir a ImgBB"));
                    }
                } catch (err) {
                    console.error('Error de red al subir imagen:', err);
                    reject(err);
                }
            },
            outputType
        );
    });
};