import { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from '../../lib/cloudinary';

// Tăng bodyParser limit cho ảnh lớn
export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb',
        },
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const startTime = Date.now();
    const requestId = Math.random().toString(36).substring(2, 9);

    console.log(`[${new Date().toISOString()}] [${requestId}] ===== START REQUEST =====`);
    console.log(`[${new Date().toISOString()}] [${requestId}] Method: ${req.method}`);
    console.log(`[${new Date().toISOString()}] [${requestId}] URL: ${req.url}`);

    if (req.method === 'POST') {
        try {
            const { imageBase64, userId } = req.body;

            console.log(`[${new Date().toISOString()}] [${requestId}] Request body info:`, {
                hasImageBase64: !!imageBase64,
                imageBase64Length: imageBase64?.length || 0,
                userId: userId,
            });

            // Validate input
            if (!imageBase64 || !userId) {
                console.warn(`[${new Date().toISOString()}] [${requestId}] Validation failed`);
                return res.status(400).json({
                    success: false,
                    error: 'Thiếu ảnh hoặc ID người dùng'
                });
            }

            console.log(`[${new Date().toISOString()}] [${requestId}] Validating base64 format...`);

            // Parse base64 data URL
            const matches = imageBase64.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);
            if (!matches || matches.length !== 3) {
                console.warn(`[${new Date().toISOString()}] [${requestId}] Invalid image format`);
                return res.status(400).json({
                    success: false,
                    error: 'Định dạng ảnh không hợp lệ'
                });
            }

            const imageType = matches[1];
            const base64Data = matches[2];

            console.log(`[${new Date().toISOString()}] [${requestId}] Image parsed successfully:`, {
                imageType: imageType,
                base64DataLength: base64Data.length,
                estimatedFileSize: `${Math.round(base64Data.length * 0.75 / 1024)} KB`,
            });

            // Tạo unique filename
            const timestamp = Date.now();
            const randomString = Math.random().toString(36).substring(2, 8);
            const publicId = `avatar_${userId}_${timestamp}_${randomString}`;

            console.log(`[${new Date().toISOString()}] [${requestId}] Starting Cloudinary upload...`, {
                publicId: publicId,
                folder: 'avatars'
            });

            // Upload lên Cloudinary
            const uploadResponse = await cloudinary.uploader.upload(
                imageBase64, // Cloudinary tự động parse base64
                {
                    public_id: publicId,
                    folder: 'avatars',
                    resource_type: 'auto',
                    overwrite: false,
                    invalidate: true,
                    transformation: [
                        { width: 500, height: 500, crop: 'fill', gravity: 'face' }, // Auto crop quanh mặt
                        { quality: 'auto:good' }, // Tự động optimize chất lượng
                        { fetch_format: 'auto' } // Tự động chọn format tốt nhất
                    ],
                    tags: [`user_${userId}`, 'avatar'] // Thêm tags để dễ quản lý
                }
            );

            console.log(`[${new Date().toISOString()}] [${requestId}] Cloudinary upload successful:`, {
                publicId: uploadResponse.public_id,
                format: uploadResponse.format,
                bytes: uploadResponse.bytes,
                width: uploadResponse.width,
                height: uploadResponse.height,
                url: uploadResponse.secure_url.substring(0, 100) + '...',
                uploadTime: `${uploadResponse.created_at}`
            });

            // Tạo optimized URL với transformations
            const optimizedUrl = cloudinary.url(uploadResponse.public_id, {
                width: 300,
                height: 300,
                crop: 'fill',
                gravity: 'face',
                quality: 'auto',
                fetch_format: 'auto',
                secure: true
            });

            // Tạo thumbnail URL
            const thumbnailUrl = cloudinary.url(uploadResponse.public_id, {
                width: 100,
                height: 100,
                crop: 'fill',
                gravity: 'face',
                quality: 'auto',
                fetch_format: 'auto',
                secure: true
            });

            const processingTime = Date.now() - startTime;
            console.log(`[${new Date().toISOString()}] [${requestId}] Request completed successfully in ${processingTime}ms`);

            // Trả về response
            res.status(200).json({
                success: true,
                message: 'Upload ảnh đại diện thành công',
                data: {
                    publicId: uploadResponse.public_id,
                    originalUrl: uploadResponse.secure_url,
                    optimizedUrl: optimizedUrl,
                    thumbnailUrl: thumbnailUrl,
                    format: uploadResponse.format,
                    width: uploadResponse.width,
                    height: uploadResponse.height,
                    fileSize: uploadResponse.bytes,
                    createdAt: uploadResponse.created_at,
                    // URL cho hiển thị ngay
                    displayUrl: optimizedUrl
                },
                metadata: {
                    userId: userId,
                    requestId: requestId,
                    processingTime: `${processingTime}ms`
                }
            });

        } catch (error: any) {
            const errorTime = Date.now() - startTime;
            console.error(`[${new Date().toISOString()}] [${requestId}] ERROR in Cloudinary processing:`, {
                errorName: error.name,
                errorMessage: error.message,
                errorCode: error.http_code || error.code,
                processingTime: `${errorTime}ms`,
            });

            // Phân loại lỗi Cloudinary
            let errorMessage = 'Lỗi server khi upload ảnh';
            let statusCode = 500;

            if (error.message.includes('File size too large')) {
                errorMessage = 'Kích thước ảnh quá lớn (tối đa 10MB)';
                statusCode = 400;
            } else if (error.message.includes('Invalid image file')) {
                errorMessage = 'Định dạng ảnh không được hỗ trợ';
                statusCode = 400;
            } else if (error.http_code === 401) {
                errorMessage = 'Lỗi xác thực Cloudinary. Vui lòng kiểm tra cấu hình';
                console.error('Cloudinary authentication error - check env variables');
            } else if (error.http_code === 429) {
                errorMessage = 'Quá nhiều yêu cầu. Vui lòng thử lại sau';
                statusCode = 429;
            }

            res.status(statusCode).json({
                success: false,
                error: errorMessage,
                details: process.env.NODE_ENV === 'development' ? error.message : undefined,
                requestId: requestId,
                metadata: {
                    processingTime: `${errorTime}ms`
                }
            });
        }
    } else if (req.method === 'DELETE') {
        // Thêm endpoint để xóa ảnh
        try {
            const { publicId } = req.body;

            if (!publicId) {
                return res.status(400).json({
                    success: false,
                    error: 'Thiếu publicId'
                });
            }

            console.log(`[${new Date().toISOString()}] [${requestId}] Deleting image from Cloudinary:`, { publicId });

            const deleteResult = await cloudinary.uploader.destroy(publicId);

            if (deleteResult.result === 'ok') {
                console.log(`[${new Date().toISOString()}] [${requestId}] Image deleted successfully`);
                res.status(200).json({
                    success: true,
                    message: 'Xóa ảnh thành công',
                    result: deleteResult
                });
            } else {
                console.warn(`[${new Date().toISOString()}] [${requestId}] Failed to delete image:`, deleteResult);
                res.status(400).json({
                    success: false,
                    error: 'Không thể xóa ảnh',
                    result: deleteResult
                });
            }

        } catch (error: any) {
            console.error(`[${new Date().toISOString()}] [${requestId}] Error deleting image:`, error);
            res.status(500).json({
                success: false,
                error: 'Lỗi khi xóa ảnh'
            });
        }
    } else if (req.method === 'GET') {
        // Endpoint để lấy thông tin ảnh
        try {
            const { publicId } = req.query;

            if (!publicId || typeof publicId !== 'string') {
                return res.status(400).json({
                    success: false,
                    error: 'Thiếu publicId'
                });
            }

            console.log(`[${new Date().toISOString()}] [${requestId}] Getting image info:`, { publicId });

            // Lấy thông tin ảnh từ Cloudinary
            const resourceInfo = await cloudinary.api.resource(publicId, {
                resource_type: 'image'
            });

            res.status(200).json({
                success: true,
                data: {
                    publicId: resourceInfo.public_id,
                    url: resourceInfo.secure_url,
                    format: resourceInfo.format,
                    width: resourceInfo.width,
                    height: resourceInfo.height,
                    fileSize: resourceInfo.bytes,
                    createdAt: resourceInfo.created_at,
                    tags: resourceInfo.tags || []
                }
            });

        } catch (error: any) {
            if (error.http_code === 404) {
                res.status(404).json({
                    success: false,
                    error: 'Không tìm thấy ảnh'
                });
            } else {
                console.error(`[${new Date().toISOString()}] [${requestId}] Error getting image info:`, error);
                res.status(500).json({
                    success: false,
                    error: 'Lỗi khi lấy thông tin ảnh'
                });
            }
        }
    } else {
        console.warn(`[${new Date().toISOString()}] [${requestId}] Method not allowed: ${req.method}`);

        res.setHeader('Allow', ['POST', 'DELETE', 'GET']);
        res.status(405).json({
            success: false,
            error: `Method ${req.method} không được hỗ trợ`,
            allowedMethods: ['POST', 'DELETE', 'GET']
        });
    }

    const totalTime = Date.now() - startTime;
    console.log(`[${new Date().toISOString()}] [${requestId}] ===== END REQUEST ===== (${totalTime}ms)`);
}