import { Memory, Category, StatItem } from '@/types';
import { BookOpen, Swords, Shield, Trophy, Users, Heart, MessageSquare, Share2, Calendar, Gamepad2 } from 'lucide-react';

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
    { id: 'raid', name: 'Raid/Boss', icon: Swords },
    { id: 'pvp', name: 'PvP/War', icon: Shield },
    { id: 'event', name: 'Sự kiện', icon: Trophy },
    { id: 'member', name: 'Thành viên', icon: Users }
];

export const stats: StatItem[] = [
    { label: 'Tổng kỷ niệm', value: '156', icon: BookOpen },
    { label: 'Boss hạ gục', value: '42', icon: Swords },
    { label: 'Chiến thắng PvP', value: '89', icon: Shield },
    { label: 'Thành viên', value: '50+', icon: Users }
];