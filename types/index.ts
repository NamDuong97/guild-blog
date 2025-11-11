export interface Memory {
    id: number;
    title: string;
    date: string;
    category: string;
    image: string;
    content: string;
    author: string;
    likes: number;
    comments: number;
    tags: string[];
}

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