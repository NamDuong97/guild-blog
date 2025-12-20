// components/Footer.tsx
import { Heart } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <p className={styles.madeWith}>
                    Made with <Heart className={styles.heartIcon} /> by Atisté Guild
                </p>
                <p className={styles.copyright}>
                    © 2025 - Nơi lưu giữ những kỷ niệm đáng nhớ
                </p>
            </div>
        </footer>
    );
};

export default Footer;