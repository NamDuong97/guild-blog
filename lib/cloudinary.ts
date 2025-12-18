// lib/cloudinary.js
import { v2 as cloudinary } from 'cloudinary';

if (!process.env.CLOUDINARY_CLOUD_NAME) {
    console.error('Missing Cloudinary configuration. Check your environment variables:');
    console.error('CLOUDINARY_CLOUD_NAME:', !!process.env.CLOUDINARY_CLOUD_NAME);
    console.error('CLOUDINARY_API_KEY:', !!process.env.CLOUDINARY_API_KEY);
    console.error('CLOUDINARY_API_SECRET:', !!process.env.CLOUDINARY_API_SECRET);

    // Fallback cho development
    if (process.env.NODE_ENV === 'development') {
        console.warn('Using dummy Cloudinary config for development');
        // Bạn có thể dùng dummy config ở đây nếu cần
    }
}

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export default cloudinary;