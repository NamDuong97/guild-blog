import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

// Tắt bodyParser mặc định để xử lý base64 lớn
export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb',
        },
    },
};

// Mock database tạm thời (có thể thay bằng real database sau)
const mockDatabase: any = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const startTime = Date.now();
    const requestId = Math.random().toString(36).substring(2, 9);

    console.log(`[${new Date().toISOString()}] [${requestId}] ===== START REQUEST =====`);
    console.log(`[${new Date().toISOString()}] [${requestId}] Method: ${req.method}`);
    console.log(`[${new Date().toISOString()}] [${requestId}] URL: ${req.url}`);
    console.log(`[${new Date().toISOString()}] [${requestId}] Headers:`, {
        'content-type': req.headers['content-type'],
        'content-length': req.headers['content-length'],
    });

    if (req.method === 'POST') {
        try {
            const { imageBase64, userId } = req.body;

            console.log(`[${new Date().toISOString()}] [${requestId}] Request body info:`, {
                hasImageBase64: !!imageBase64,
                imageBase64Length: imageBase64?.length || 0,
                imageBase64Prefix: imageBase64?.substring(0, 50) || 'none',
                userId: userId,
            });

            // Validate input
            if (!imageBase64 || !userId) {
                console.warn(`[${new Date().toISOString()}] [${requestId}] Validation failed:`, {
                    missingImage: !imageBase64,
                    missingUserId: !userId,
                });

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
            const buffer = Buffer.from(base64Data, 'base64');

            console.log(`[${new Date().toISOString()}] [${requestId}] Image parsed successfully:`, {
                imageType: imageType,
                base64DataLength: base64Data.length,
                bufferSize: buffer.length,
                estimatedFileSize: `${Math.round(buffer.length / 1024)} KB`,
            });

            // Generate unique filename
            const filename = `avatar-${userId}-${Date.now()}.${imageType === 'jpeg' ? 'jpg' : imageType}`;
            const uploadDir = path.join(process.cwd(), 'public', 'image', 'avatars');

            console.log(`[${new Date().toISOString()}] [${requestId}] File info:`, {
                filename: filename,
                uploadDir: uploadDir,
            });

            // Ensure upload directory exists
            if (!fs.existsSync(uploadDir)) {
                console.log(`[${new Date().toISOString()}] [${requestId}] Creating upload directory: ${uploadDir}`);
                fs.mkdirSync(uploadDir, { recursive: true });
            } else {
                console.log(`[${new Date().toISOString()}] [${requestId}] Upload directory already exists`);
            }

            const filepath = path.join(uploadDir, filename);
            console.log(`[${new Date().toISOString()}] [${requestId}] Full file path: ${filepath}`);

            // Save image file
            console.log(`[${new Date().toISOString()}] [${requestId}] Writing file to disk...`);
            fs.writeFileSync(filepath, buffer);

            // Verify file was written
            const stats = fs.statSync(filepath);
            console.log(`[${new Date().toISOString()}] [${requestId}] File saved successfully:`, {
                fileSize: `${Math.round(stats.size / 1024)} KB`,
                createdAt: stats.birthtime,
            });

            // Public path for frontend
            const publicPath = `/image/avatars/${filename}`;

            const processingTime = Date.now() - startTime;
            console.log(`[${new Date().toISOString()}] [${requestId}] Request completed successfully in ${processingTime}ms`);
            console.log(`[${new Date().toISOString()}] [${requestId}] Response:`, {
                success: true,
                avatarPath: publicPath,
                fileSize: `${Math.round(stats.size / 1024)} KB`,
            });

            res.status(200).json({
                success: true,
                avatarPath: publicPath,
                message: 'Upload ảnh đại diện thành công'
            });

        } catch (error: any) {
            const errorTime = Date.now() - startTime;
            console.error(`[${new Date().toISOString()}] [${requestId}] ERROR in processing:`, {
                errorName: error.name,
                errorMessage: error.message,
                errorStack: error.stack,
                processingTime: `${errorTime}ms`,
            });

            // Log specific error types
            if (error.code === 'ENOENT') {
                console.error(`[${new Date().toISOString()}] [${requestId}] File system error: Directory does not exist`);
            } else if (error.code === 'EACCES') {
                console.error(`[${new Date().toISOString()}] [${requestId}] Permission denied error`);
            }

            res.status(500).json({
                success: false,
                error: 'Lỗi server khi upload ảnh',
                requestId: requestId, // Trả về requestId để debug
            });
        }
    } else {
        console.warn(`[${new Date().toISOString()}] [${requestId}] Method not allowed: ${req.method}`);

        res.status(405).json({
            success: false,
            error: 'Method không được hỗ trợ'
        });
    }

    const totalTime = Date.now() - startTime;
    console.log(`[${new Date().toISOString()}] [${requestId}] ===== END REQUEST ===== (${totalTime}ms)`);
}