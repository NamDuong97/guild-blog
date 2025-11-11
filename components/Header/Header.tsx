"use client";
import React from 'react';
import { Users, Trophy, Gamepad2, Crown, Shield, Sparkles } from 'lucide-react';
import styles from './Header.module.css';

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            {/* Background Effects */}
            <div className={styles.backgroundEffects}>
                <div className={styles.floatingOrb1}></div>
                <div className={styles.floatingOrb2}></div>
                <div className={styles.floatingOrb3}></div>
            </div>

            <div className={styles.container}>
                {/* Main Logo & Title */}
                <div className={styles.mainSection}>
                    <div className={styles.logoContainer}>
                        <div className={styles.logoGlow}></div>
                        <div className={styles.logo}>
                            <Gamepad2 className={styles.logoIcon} />
                            <div className={styles.logoSparkle}>
                                <Sparkles className={styles.sparkleIcon} />
                            </div>
                        </div>
                    </div>

                    <div className={styles.titleSection}>
                        <h1 className={styles.title}>
                            <span className={styles.titleMain}>Atiste</span>
                            <span className={styles.titleSub}>Guild</span>
                        </h1>
                        <div className={styles.guildBadge}>
                            <Crown className={styles.badgeIcon} />
                            <span>Atiste Guild</span>
                        </div>
                        <p className={styles.subtitle}>Where Legends Are Forged in Fire</p>
                    </div>
                </div>

                {/* Stats & Info */}
                <div className={styles.infoSection}>
                    <div className={styles.statsGrid}>
                        <div className={styles.statCard}>
                            <div className={styles.statIconWrapper}>
                                <Users className={styles.statIcon} />
                            </div>
                            <div className={styles.statContent}>
                                <div className={styles.statValue}>58</div>
                                <div className={styles.statLabel}>Active Members</div>
                            </div>
                        </div>

                        <div className={styles.statCard}>
                            <div className={styles.statIconWrapper}>
                                <Trophy className={styles.statIcon} />
                            </div>
                            <div className={styles.statContent}>
                                <div className={styles.statValue}>Top 3</div>
                                <div className={styles.statLabel}>Server Rank</div>
                            </div>
                        </div>

                        <div className={styles.statCard}>
                            <div className={styles.statIconWrapper}>
                                <Shield className={styles.statIcon} />
                            </div>
                            <div className={styles.statContent}>
                                <div className={styles.statValue}>Lv5</div>
                                <div className={styles.statLabel}>Guild Level</div>
                            </div>
                        </div>
                    </div>

                    {/* Guild Motto */}
                    <div className={styles.motto}>
                        <div className={styles.mottoText}>"From Ashes We Rise"</div>
                        <div className={styles.mottoDivider}></div>
                    </div>
                </div>
            </div>

            {/* Navigation Wave */}
            <div className={styles.navWave}>
                <div className={styles.wave}></div>
            </div>
        </header>
    );
};

export default Header;