// utils/encryption.ts
const ENCRYPTION_KEY = 'artiste-guild-secret-key'; // Key mã hoá

export const encrypt = (text: any): string => {
    try {
        if (!text && text !== 0) return ''; // Cho phép số 0
        // Chuyển đổi thành string
        const textStr = typeof text === 'string' ? text : String(text);
        if (textStr.length === 0) return '';
        // Simple XOR encryption
        return textStr.split('')
            .map(char => String.fromCharCode(char.charCodeAt(0) ^ ENCRYPTION_KEY.length))
            .join('');
    } catch (error) {
        console.error('Encryption error:', error);
        return '';
    }
};

export const decrypt = (encryptedText: any): string => {
    try {
        if (!encryptedText && encryptedText !== 0) return '';

        const encryptedStr = typeof encryptedText === 'string' ? encryptedText : String(encryptedText);

        if (encryptedStr.length === 0) return '';

        return encryptedStr.split('')
            .map(char => String.fromCharCode(char.charCodeAt(0) ^ ENCRYPTION_KEY.length))
            .join('');
    } catch (error) {
        console.error('Decryption error:', error);
        return '';
    }
};

// Hàm mã hoá để so sánh (dùng trong login)
export const encryptForComparison = (password: string): string => {
    return encrypt(password);
};