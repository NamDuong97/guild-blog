export interface Memory {
    id: number;
    title: string;
    date: string;
    category: string;
    image?: string;
    images?: string[];
    content: string;
    author: string;
    likes: number;
    comments: number;
    tags: string[];
}

// Helper function to get images array
export const getMemoryImages = (memory: Memory): string[] => {
    if (memory.images && memory.images.length > 0) {
        return memory.images;
    }
    if (memory.image) {
        return [memory.image];
    }
    return [];
};

export interface Category {
    id: string;
    name: string;
    icon: any;
}

export interface StatItem {
    label: string;
    value: string;
    icon: any;
}

export interface Member {
    id: number | string; // Cho phép cả number và string
    name: string;
    userId: string;
    nickName: string;
    password: string;
    ingameName: string;
    role: 'guild-master' | 'vice-master' | 'hall-master' | 'village-master' | 'manager' | 'elder' | 'elite' | 'member';
    avatar: string;
    maxim: string; // trâm ngôn
    sect: string;  // môn phái
    level: number;
    joinDate: string;
    lastActive: string;
}

export const memberRoles = {
    'guild-master': { label: 'Bang Chủ', color: '#f59e0b', badge: '👑' },
    'vice-master': { label: 'Bang Phó', color: '#ef4444', badge: '⭐' },
    'hall-master': { label: 'Đường Chủ', color: '#8b5cf6', badge: '🏛️' },
    'village-master': { label: 'Hương Chủ', color: '#06b6d4', badge: '🏡' },
    'manager': { label: 'Quản Gia', color: '#10b981', badge: '📊' },
    'elder': { label: 'Trưởng Lão', color: '#f97316', badge: '🧙' },
    'elite': { label: 'Tinh Anh', color: '#ec4899', badge: '⚔️' },
    'member': { label: 'Bang Chúng', color: '#6b7280', badge: '👤' }
} as const;

export enum Sect {
    CHIEN_CUONG = 'Chiến cuồng',
    DIEP_KHACH = 'Điệp khách',
    ANH_LINH = 'Ảnh Linh',
    DI_NHAN = 'Dị nhân',
    XA_THU = 'Xạ thủ',
    DAO_KHACH = 'Đao khách',
    YEN_SI = 'Yển sư',
    PHUONG_SI = 'Phương Sĩ',
    HIEP_KHACH = 'Hiệp khách',
    GIAP_SI = 'Giáp sĩ',
    Y_SI = 'Y Sư',
    HOA_HON = 'Họa Hồn',
    MI_GIA = 'Mị Giả'
}

export interface Prize {
    id: number;
    name: string;
    type: 'tẩy luyện' | 'exp' | 'vip' | 'pk';
    icon: any;
    color: string;
    probability: number;
}

// Thêm vào file types/interfaces.ts cho sự kiện vòng quay
export interface SpinHistory {
    timestamp: Date;
    prizeName: string;
    prizeId: string;
    userId: string;
    quantity: number;
    status: 'received' | 'pending' | 'failed';
    type: string;
}


export interface HistoryModalProps {
    isShowHistory: boolean;
    onClose: () => void;
    spinHistory: SpinHistory[];
    user: Member | null
}