"use client";
import React, { useState } from 'react';
import { Member, memberRoles } from '@/types';
import { Search, Filter, Crown, Sword, Shield, Zap, Heart } from 'lucide-react';
import styles from './MemberList.module.css';

interface MemberListProps {
    members: Member[];
}

const MemberList: React.FC<MemberListProps> = ({ members }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState<string>('all');
    const [sortBy, setSortBy] = useState<'level' | 'joinDate' | 'name'>('level');

    const filteredMembers = members
        .filter(member =>
            member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.ingameName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(member => roleFilter === 'all' || member.role === roleFilter)
        .sort((a, b) => {
            if (sortBy === 'level') return b.level - a.level;
            if (sortBy === 'joinDate') return new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime();
            return a.name.localeCompare(b.name);
        });

    const roleStats = members.reduce((acc, member) => {
        acc[member.role] = (acc[member.role] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return (
        <div className={styles.container}>
            {/* Header Stats */}
            <div className={styles.statsHeader}>
                <div className={styles.statCard}>
                    <div className={styles.statNumber}>{members.length}</div>
                    <div className={styles.statLabel}>Tổng thành viên</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statNumber}>
                        {Math.max(...members.map(m => m.level))}
                    </div>
                    <div className={styles.statLabel}>Cấp cao nhất</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statNumber}>
                        {members.filter(m =>
                            new Date(m.lastActive).getTime() > Date.now() - 24 * 60 * 60 * 1000
                        ).length}
                    </div>
                    <div className={styles.statLabel}>Online 24h</div>
                </div>
            </div>

            {/* Controls */}
            <div className={styles.controls}>
                <div className={styles.searchBox}>
                    <Search className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Tìm theo tên hoặc tên game..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>

                <div className={styles.filters}>
                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className={styles.filterSelect}
                    >
                        <option value="all">Tất cả chức vụ</option>
                        {Object.entries(memberRoles).map(([key, role]) => (
                            <option key={key} value={key}>
                                {role.label} ({roleStats[key] || 0})
                            </option>
                        ))}
                    </select>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className={styles.filterSelect}
                    >
                        <option value="level">Cấp độ cao nhất</option>
                        <option value="joinDate">Tham gia sớm nhất</option>
                        <option value="name">Theo tên</option>
                    </select>
                </div>
            </div>

            {/* Members Grid */}
            <div className={styles.membersGrid}>
                {filteredMembers.map((member) => {
                    const roleInfo = memberRoles[member.role];
                    const isOnline = new Date(member.lastActive).getTime() > Date.now() - 24 * 60 * 60 * 1000;

                    return (
                        <div key={member.id} className={styles.memberCard}>
                            <div className={styles.memberHeader}>
                                <div className={styles.avatarContainer}>
                                    <img
                                        src={member.avatar}
                                        alt={member.name}
                                        className={styles.avatar}
                                    />
                                    <div className={`${styles.status} ${isOnline ? styles.online : styles.offline}`}></div>
                                </div>

                                <div className={styles.memberInfo}>
                                    <h3 className={styles.memberName}>{member.name}</h3>
                                    <p className={styles.ingameName}>{member.ingameName}</p>
                                    <div className={styles.userId}>ID: {member.userId}</div>
                                </div>
                            </div>

                            <div className={styles.roleSection}>
                                <span
                                    className={styles.roleBadge}
                                    style={{ backgroundColor: roleInfo.color }}
                                >
                                    {roleInfo.badge} {roleInfo.label}
                                </span>
                            </div>

                            <div className={styles.memberDetails}>
                                <div className={styles.detailItem}>
                                    <span className={styles.detailLabel}>Tham gia:</span>
                                    <span className={styles.detailValue}>
                                        {new Date(member.joinDate).toLocaleDateString('vi-VN')}
                                    </span>
                                </div>

                                <div className={styles.detailItem}>
                                    <span className={styles.detailLabel}>Môn phái:</span>
                                    <span className={styles.detailValue}>
                                        {member.sect}
                                    </span>
                                </div>

                                <div className={styles.detailItem}>
                                    <span className={styles.detailLabel}>Châm ngôn:</span>
                                    <span className={styles.detailValue}>
                                        {member.maxim}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MemberList;