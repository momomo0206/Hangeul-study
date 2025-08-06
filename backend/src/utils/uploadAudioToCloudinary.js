import tmp from 'tmp';
import fs from 'fs/promises';
import cloudinary from '../config/cloudinary.js';

export const uploadAudioToCloudinary = async (audioBuffer) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const tmpFile = tmp.fileSync({ postfix: '.mp3' });
  await fs.writeFile(tmpFile.name, audioBuffer);
  
  const result = await cloudinary.uploader.upload(tmpFile.name, {
    resource_type: 'video',
    folder: 'tts_audio',
    use_filename: true,
    unique_filename: true,
    overwrite: false,
  });

  tmpFile.removeCallback();
  return result.secure_url;
};