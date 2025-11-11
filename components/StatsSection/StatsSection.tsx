"use client";
import React from 'react';
import { StatItem } from '@/types';
import styles from './StatsSection.module.css';

interface StatsSectionProps {
    stats: StatItem[];
}

const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
    return (
        <div className={styles.statsGrid}>
            {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                    <div key={i} className={styles.statCard}>
                        <Icon className={styles.statIcon} />
                        <div className={styles.statValue}>{stat.value}</div>
                        <div className={styles.statLabel}>{stat.label}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default StatsSection;