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
        nickName: 'Vk của xt có vk đẹp nhất sever',
        password: '1234',
        ingameName: 'Bảo Châu',
        role: 'guild-master',
        avatar: '/image/imgChau.jpg',
        maxim: 'Đi nhẹ nói khẽ cười xỉu',
        sect: 'Y Sư',
        level: 152,
        joinDate: '2021-09-02',
        lastActive: '2024-03-20'
    },
    {
        id: 2,
        name: 'Trần Nam',
        userId: '419104166',
        nickName: 'Xt có vk đẹp nhất sever',
        password: '1234',
        ingameName: 'NamDuong',
        role: 'vice-master',
        avatar: '/image/imgNam.jpg',
        maxim: 'Bách mũi bách trúng',
        sect: 'Xạ Thủ',
        level: 148,
        joinDate: '2021-09-02',
        lastActive: '2024-03-20'
    },
    {
        id: 3,
        name: 'Lê Thùy Linh',
        userId: '291504168',
        nickName: 'Bóng Đêm Vô Ảnh',
        password: 'password123',
        ingameName: 'VongẢnh',
        role: 'hall-master',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        maxim: 'Trong bóng tối ta là vua',
        sect: 'Điệp khách',
        level: 145,
        joinDate: '2021-11-20',
        lastActive: '2024-03-19'
    },
    {
        id: 4,
        name: 'Phạm Quốc Hùng',
        userId: '291504169',
        nickName: 'Thiên Cơ Tuyệt Ảnh',
        password: 'password123',
        ingameName: 'ThiênCơ',
        role: 'village-master',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        maxim: 'Bách phát bách trúng',
        sect: 'Xạ thủ',
        level: 142,
        joinDate: '2022-01-05',
        lastActive: '2024-03-20'
    },
    {
        id: 5,
        name: 'Nguyễn Hải Yến',
        userId: '291504170',
        nickName: 'Huyền Ảo Linh Hồn',
        password: 'password123',
        ingameName: 'LinhHồn',
        role: 'manager',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
        maxim: 'Triệu hồi vạn vật',
        sect: 'Ảnh Linh',
        level: 140,
        joinDate: '2022-02-14',
        lastActive: '2024-03-18'
    },
    {
        id: 6,
        name: 'Hoàng Văn Tài',
        userId: '291504171',
        nickName: 'Đao Phong Tuyệt Đỉnh',
        password: 'password123',
        ingameName: 'ĐaoPhong',
        role: 'elder',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        maxim: 'Một đao đoạn vạn kiếm',
        sect: 'Đao khách',
        level: 138,
        joinDate: '2022-03-22',
        lastActive: '2024-03-20'
    },
    {
        id: 7,
        name: 'Vũ Thị Mai',
        userId: '291504172',
        nickName: 'Dị Giới Hành Giả',
        password: 'password123',
        ingameName: 'DịGiới',
        role: 'elite',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        maxim: 'Vượt không gian thời gian',
        sect: 'Dị nhân',
        level: 135,
        joinDate: '2022-04-30',
        lastActive: '2024-03-19'
    },
    {
        id: 8,
        name: 'Đặng Tuấn Anh',
        userId: '291504173',
        nickName: 'Cửu Âm Chân Kinh',
        password: 'password123',
        ingameName: 'CửuÂm',
        role: 'elite',
        avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face',
        maxim: 'Âm nhu khắc cương',
        sect: 'Yển sư',
        level: 133,
        joinDate: '2022-06-10',
        lastActive: '2024-03-17'
    },
    {
        id: 9,
        name: 'Bùi Thanh Hằng',
        userId: '291504174',
        nickName: 'Họa Trung Tiên Tử',
        password: 'password123',
        ingameName: 'HọaTrung',
        role: 'member',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        maxim: 'Một bút vẽ thiên địa',
        sect: 'Họa Hồn',
        level: 130,
        joinDate: '2022-07-25',
        lastActive: '2024-03-20'
    },
    {
        id: 10,
        name: 'Mai Văn Kiên',
        userId: '291504175',
        nickName: 'Thiết Giáp Bất Khuất',
        password: 'password123',
        ingameName: 'ThiếtGiáp',
        role: 'member',
        avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face',
        maxim: 'Thép đã tôi thế đấy',
        sect: 'Giáp sĩ',
        level: 128,
        joinDate: '2022-08-15',
        lastActive: '2024-03-16'
    }
]

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