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
    if (req.method === 'POST') {
        try {
            const { imageBase64, userId } = req.body;

            // Validate input
            if (!imageBase64 || !userId) {
                return res.status(400).json({
                    success: false,
                    error: 'Thiếu ảnh hoặc ID người dùng'
                });
            }

            // Parse base64 data URL
            const matches = imageBase64.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);
            if (!matches || matches.length !== 3) {
                return res.status(400).json({
                    success: false,
                    error: 'Định dạng ảnh không hợp lệ'
                });
            }

            const imageType = matches[1];
            const base64Data = matches[2];
            const buffer = Buffer.from(base64Data, 'base64');

            // Generate unique filename
            const filename = `avatar-${userId}-${Date.now()}.${imageType === 'jpeg' ? 'jpg' : imageType}`;
            const uploadDir = path.join(process.cwd(), 'public', 'image', 'avatars');

            // Ensure upload directory exists
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            const filepath = path.join(uploadDir, filename);

            // Save image file
            fs.writeFileSync(filepath, buffer);

            // Public path for frontend
            const publicPath = `/image/avatars/${filename}`;

            res.status(200).json({
                success: true,
                avatarPath: publicPath,
                message: 'Upload ảnh đại diện thành công'
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Lỗi server khi upload ảnh'
            });
        }
    } else {
        res.status(405).json({
            success: false,
            error: 'Method không được hỗ trợ'
        });
    }
}