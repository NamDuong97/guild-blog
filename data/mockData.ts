import { Memory, Category, StatItem, Member, Prize } from '@/types';
import { BookOpen, Swords, Trophy, Users, Heart, MessageSquare, Share2, Calendar, Gamepad2, Gift, RotateCcw, Sparkles, Coins, Sword, Shield, Star, Crown } from 'lucide-react';

export const memories: Memory[] = [
    {
        id: 1,
        title: "Chiến thắng Boss Rồng Đen đầu tiên",
        date: "2024-03-15",
        category: "raid",
        image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80",
        content: "Sau 3 tiếng chiến đấu căng thẳng, cuối cùng bang hội chúng ta cũng hạ gục được Boss Rồng Đen! Đặc biệt cảm ơn Tank đã giữ aggro cực tốt và Healer đã cứu cả đội nhiều lần.",
        author: "GuildMaster",
        likes: 42,
        comments: 15,
        tags: ["raid", "boss", "victory"]
    },
    {
        id: 2,
        title: "Guild War Season 5 - Top 3 Server",
        date: "2024-03-10",
        category: "pvp",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
        content: "Mùa giải Guild War vừa qua thật sự khốc liệt! Chúng ta đã vượt qua 12 bang hội mạnh để giành top 3 server. Mọi người đã chiến đấu hết mình!",
        author: "WarCommander",
        likes: 38,
        comments: 12,
        tags: ["pvp", "guild-war", "achievement"]
    },
    {
        id: 3,
        title: "Đêm họp mặt online - Tết Nguyên Đán",
        date: "2024-02-08",
        category: "event",
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80",
        content: "Buổi họp mặt online đầm ấm với cả bang! Chúng ta đã cùng nhau chơi mini game, chia sẻ về cuộc sống và trao đổi chiến thuật. Cảm ơn mọi người đã tham gia!",
        author: "EventHost",
        likes: 56,
        comments: 28,
        tags: ["event", "community", "festival"]
    },
    {
        id: 4,
        title: "Chào mừng 10 thành viên mới",
        date: "2024-02-25",
        category: "member",
        image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80",
        content: "Bang hội chúng ta ngày càng lớn mạnh! Chào mừng các tân binh: DarkKnight, PhoenixMage, ShadowAssassin và 7 anh em khác. Chúc các bạn có những trải nghiệm tuyệt vời!",
        author: "Recruiter",
        likes: 31,
        comments: 22,
        tags: ["member", "welcome", "growth"]
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
        name: 'Nguyễn Văn A',
        userId: '12434312',
        password: 'toilatoi',
        ingameName: 'PhoenixKing',
        role: 'guild-master',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        level: 95,
        joinDate: '2023-01-15',
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