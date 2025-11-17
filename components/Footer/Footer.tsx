// components/Footer.tsx
import { Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="relative mt-16 border-t border-purple-500/20 backdrop-blur-sm bg-slate-900/50">
            <div className="max-w-6xl mx-auto px-4 py-8 text-center">
                <p className="text-purple-300">
                    Made with <Heart className="w-4 h-4 inline text-red-400 fill-current" /> by Atisté Guild
                </p>
                <p className="text-purple-400 text-sm mt-2">
                    © 2025 - Nơi lưu giữ những kỷ niệm đáng nhớ
                </p>
            </div>
        </footer>
    );
};

export default Footer;