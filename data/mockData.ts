import { Memory, Category, StatItem, Member, Prize } from '@/types';
import { BookOpen, Swords, Trophy, Users, Heart, MessageSquare, Share2, Calendar, Gamepad2, Gift, RotateCcw, Sparkles, Coins, Sword, Shield, Star, Crown } from 'lucide-react';

export const memories: Memory[] = [
    {
        "id": 1,
        "title": "Lại một năm nữa chúng mình còn chơi với nhau",
        "date": "2024-03-15",
        "category": "community",
        "image": "/image/img1.jpg",
        "content": "Một lời chúc giản dị nhưng chân thành đến toàn thể thành viên trong bang. Cảm ơn tất cả anh em, từ Baachau, Hamðuang, Vuongky, Bangkhoa Mua, Ca Lacauce, Quyt Giang, HangMiu, MorCat, Maúðay, Quangtree, Gia Tuyet, Hye, Haàðao, Maho, BichTram Ly, Nhatiteunaiha, DangCham, God... vì đã cùng nhau viết nên những kỷ niệm đẹp. Hy vọng chúng ta sẽ còn bên nhau thật nhiều năm nữa!",
        "author": "baochau",
        "likes": 0,
        "comments": 0,
        "tags": ["friendship", "anniversary", "community"]
    },
    {
        "id": 2,
        "title": "Giáng Sinh An Lành - Merry Christmas Artiste",
        "date": "2024-03-10",
        "category": "event",
        "images": ["/image/img2.jpg", "/image/img7.jpg"],
        "content": "Gửi đến toàn thể gia đình Artiste một mùa Giáng Sinh thật ấm áp và an lành! Chúc cho mọi thành viên luôn tràn ngập tiếng cười và hạnh phúc. Cùng nhau đón một mùa lễ hội thật vui vẻ bên gia đình và bạn bè nhé!",
        "author": "baochau",
        "likes": 0,
        "comments": 0,
        "tags": ["christmas", "festival", "greetings"]
    },
    {
        "id": 3,
        "title": "Kỷ Niệm 3 Năm Hành Trình Artiste",
        "date": "2024-02-08",
        "category": "anniversary",
        "image": "/image/img3.jpg",
        "content": "Chính thức chào mừng cột mốc 3 năm (02/09/2021 - 02/09/2024) của Artiste! Một hành trình dài với biết bao kỷ niệm, thử thách và sự gắn kết. Cảm ơn tất cả các thành viên, đặc biệt là Manny Tommela, và mọi người đã cùng nhau xây dựng nên một cộng đồng tuyệt vời như ngày hôm nay.",
        "author": "baochau",
        "likes": 0,
        "comments": 0,
        "tags": ["anniversary", "milestone", "celebration"]
    },
    {
        "id": 4,
        "title": "Sinh Nhật Bang Artiste - Hẹn Gặp Cả Nhà!",
        "date": "2024-02-25",
        "category": "event",
        "image": "/image/img4.jpg",
        "content": "'1 năm...2 năm...không biết là bao lâu nhưng cảm ơn vì mọi người đã cùng nhau tạo nên một Artiste'. Trân trọng kính mời toàn thể anh em, bạn bè, bác chú cô dì trong bang về Thành bang dự tiệc sinh nhật Artiste (02/09/2021 - 02/09/2023) vào lúc 21h thứ Bảy (02/08). Cùng nhau ôn lại kỷ niệm và hướng đến một tương lai phát triển hơn nữa!",
        "author": "baochau",
        "likes": 0,
        "comments": 0,
        "tags": ["birthday", "gathering", "invitation"]
    },
    {
        "id": 5,
        "title": "Đại Gia Đình Artiste - Một Nhà Vững Mạnh",
        "date": "2024-02-25",
        "category": "community",
        "image": "/image/img5.jpg",
        "content": "Bức ảnh lưu giữ khoảnh khắc đầy tự hào của toàn thể hội anh em trong gia viên Artiste. Hình ảnh lá cờ đỏ sao vàng - biểu tượng của tinh thần dân tộc và sự đoàn kết - ở vị trí trung tâm càng khẳng định sức mạnh của một tập nhất trí. Chúng ta không chỉ là một bang hội trong game, mà còn là một đại gia đình thực thụ, cùng nhau hỗ trợ và hướng về một mục tiêu chung.",
        "author": "baochau",
        "likes": 0,
        "comments": 0,
        "tags": ["unity", "family", "brotherhood", "pride"]
    },
    {
        "id": 6,
        "title": "Chào Đón Năm Mới 2025 - Artiste",
        "date": "2024-02-25",
        "category": "event",
        "image": "/image/img6.jpg",
        "content": "Một trang mới sắp mở ra! Cùng Artiste chào đón một năm 2025 với thật nhiều năng lượng, thành công và gắn kết. Hãy sẵn sàng cho những cuộc phiêu lưu, những trận chiến và những kỷ niệm mới trong năm tới!",
        "author": "baochau",
        "likes": 0,
        "comments": 0,
        "tags": ["new-year", "greetings", "future"]
    }
];

export const categories: Category[] = [
    { id: 'all', name: 'Tất cả', icon: BookOpen },
    { id: 'event', name: 'Sự kiện', icon: Trophy },
    { id: 'member', name: 'Thành viên', icon: Users }
];

export const stats: StatItem[] = [
    { label: 'Tổng kỷ niệm', value: '156', icon: BookOpen },
    { label: 'Boss hạ gục', value: '42', icon: Swords },
    { label: 'Chiến thắng PvP', value: '89', icon: Shield },
    { label: 'Thành viên', value: '50+', icon: Users }
];

export const members: Member[] = [
    {
        id: 1,
        name: 'Bảo Châu',
        userId: '291504166',
        password: '1234',
        ingameName: 'Bảo Châu',
        role: 'guild-master',
        avatar: '/image/imgChau.jpg',
        level: 152,
        joinDate: '2021-09-02',
        lastActive: '2024-03-20'
    },
    {
        id: 2,
        name: 'Trần Thị B',
        userId: '12434311',
        password: 'toilatoi',
        ingameName: 'MoonShadow',
        role: 'vice-master',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        level: 92,
        joinDate: '2023-02-20',
        lastActive: '2024-03-20'
    },
    {
        id: 3,
        name: 'Lê Văn C',
        userId: '12434310',
        password: 'toilatoi',
        ingameName: 'DragonSlayer',
        role: 'hall-master',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        level: 90,
        joinDate: '2023-03-10',
        lastActive: '2024-03-19'
    },
    {
        id: 4,
        name: 'Phạm Thị D',
        userId: '12434349',
        password: 'toilatoi',
        ingameName: 'IceMage',
        role: 'village-master',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        level: 88,
        joinDate: '2023-04-05',
        lastActive: '2024-03-20'
    },
    {
        id: 5,
        name: 'Hoàng Văn E',
        userId: '12434348',
        password: 'toilatoi',
        ingameName: 'ShadowAssassin',
        role: 'manager',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        level: 87,
        joinDate: '2023-05-12',
        lastActive: '2024-03-18'
    },
    {
        id: 6,
        name: 'Vũ Thị F',
        userId: '12434347',
        password: 'toilatoi',
        ingameName: 'HealingAngel',
        role: 'elder',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        level: 89,
        joinDate: '2023-06-08',
        lastActive: '2024-03-20'
    },
    {
        id: 7,
        name: 'Đặng Văn G',
        userId: '12434346',
        password: 'toilatoi',
        ingameName: 'ThunderWarrior',
        role: 'elite',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        level: 85,
        joinDate: '2023-07-25',
        lastActive: '2024-03-19'
    },
    {
        id: 8,
        name: 'Bùi Thị H',
        userId: '12434345',
        password: 'toilatoi',
        ingameName: 'ForestRanger',
        role: 'member',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
        level: 82,
        joinDate: '2023-08-30',
        lastActive: '2024-03-17'
    }
];

export const prizes: Prize[] = [
    {
        id: 1,
        name: 'Tịnh Bình',
        type: 'tẩy luyện',
        icon: '/image/tinhbinh.jpg',
        color: '#fbbf24',
        probability: 30
    },
    {
        id: 2,
        name: 'Ân Khư',
        type: 'exp',
        icon: '/image/ankhu.jpg',
        color: '#06b6d4',
        probability: 15
    },
    {
        id: 3,
        name: 'Bất Tận Mộc',
        type: 'tẩy luyện',
        icon: '/image/battanmoc.jpg',
        color: '#ec4899',
        probability: 10
    },
    {
        id: 4,
        name: 'Bích Liễu Lộ',
        type: 'tẩy luyện',
        icon: '/image/bichlieulo.jpg',
        color: '#f59e0b',
        probability: 5
    },
    {
        id: 5,
        name: 'Đoạt Hồn Phiên',
        type: 'pk',
        icon: '/image/doathonphien.jpg',
        color: '#8b5cf6',
        probability: 15
    },
    {
        id: 6,
        name: 'Hộp Người Tuyết',
        type: 'vip',
        icon: '/image/hopnguoituyet.jpg',
        color: '#10b981',
        probability: 3
    },
    {
        id: 7,
        name: 'Niệm Châu',
        type: 'tẩy luyện',
        icon: '/image/niemchau.jpg',
        color: '#d97706',
        probability: 20
    },
    {
        id: 8,
        name: 'Loa Nhỏ',
        type: 'vip',
        icon: '/image/loanho.jpg',
        color: '#dc2626',
        probability: 2
    }
];