import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Extracts the public ID from a Cloudinary URL.
 * URL format: https://res.cloudinary.com/cloud_name/image/upload/v123456789/folder/public_id.jpg
 */
export const getCloudinaryPublicId = (url: string): string | null => {
  if (!url || !url.includes('cloudinary.com')) return null;
  
  try {
    // Split by '/upload/' to get the part after the version/upload settings
    const parts = url.split('/upload/');
    if (parts.length < 2) return null;
    
    // Everything after the version (vXXXXXXXXX)
    let path = parts[1];
    
    // Check if there's a version number (v followed by numbers)
    if (path.startsWith('v')) {
      const slashIndex = path.indexOf('/');
      if (slashIndex !== -1) {
        path = path.substring(slashIndex + 1);
      }
    }
    
    // Remove the file extension
    const lastDotIndex = path.lastIndexOf('.');
    if (lastDotIndex !== -1) {
      path = path.substring(0, lastDotIndex);
    }
    
    return path;
  } catch (error) {
    console.error('Error extracting Cloudinary Public ID:', error);
    return null;
  }
};

/**
 * Deletes an image from Cloudinary by its URL.
 */
export const deleteCloudinaryImage = async (url: string): Promise<boolean> => {
  const publicId = getCloudinaryPublicId(url);
  if (!publicId) return false;
  
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === 'ok';
  } catch (error) {
    console.error('Failed to delete image from Cloudinary:', error);
    return false;
  }
};

export default cloudinary;
