"use client";
import React from 'react';
import { Users, Trophy, Gamepad2 } from 'lucide-react';
import styles from './Header.module.css';

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logoSection}>
                    <div className={styles.logo}>
                        <Gamepad2 className={styles.logoIcon} />
                    </div>
                    <div>
                        <h1 className={styles.title}>Atites Guild</h1>
                        <p className={styles.subtitle}>Kỷ niệm những trận chiến huyền thoại</p>
                    </div>
                </div>
                <div className={styles.stats}>
                    <div className={styles.statItem}>
                        <Users className={styles.statIcon} />
                        <span>50+ Thành viên</span>
                    </div>
                    <div className={styles.statItem}>
                        <Trophy className={styles.statIcon} />
                        <span>Top 3 Server</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;