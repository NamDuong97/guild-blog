"use client";
import React, { useState, useMemo, useCallback, useRef } from 'react';
import { Member, memberRoles } from '@/types';
import { Search } from 'lucide-react';
import styles from './MemberList.module.css';
import Image from 'next/image';
import { useCurrentTime } from '@/hooks/useCurrentTime';

interface MemberListProps {
    members: Member[];
}

const MemberList: React.FC<MemberListProps> = ({ members }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState<string>('all');
    const [sortBy, setSortBy] = useState<'level' | 'joinDate' | 'name'>('level');

    // Tính toán thời gian hiện tại một lần trong component
    const currentTime = useCurrentTime();

    // Tính toán roleStats
    const roleStats = useMemo(() => {
        return members.reduce((acc, member) => {
            acc[member.role] = (acc[member.role] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
    }, [members]);

    // Tính toán online members count
    const onlineMembersCount = useMemo(() => {
        const twentyFourHoursAgo = currentTime - 24 * 60 * 60 * 1000;
        return members.filter(member =>
            new Date(member.lastActive).getTime() > twentyFourHoursAgo
        ).length;
    }, [members, currentTime]);

    // Tính toán filtered members
    const filteredMembers = useMemo(() => {
        const twentyFourHoursAgo = currentTime - 24 * 60 * 60 * 1000;

        return members
            .filter(member => {
                const searchLower = searchTerm.toLowerCase();
                return (
                    member.name.toLowerCase().includes(searchLower) ||
                    member.ingameName.toLowerCase().includes(searchLower) ||
                    member.nickName.toLowerCase().includes(searchLower)
                );
            })
            .filter(member => roleFilter === 'all' || member.role === roleFilter)
            .sort((a, b) => {
                if (sortBy === 'level') return b.level - a.level;
                if (sortBy === 'joinDate') {
                    return new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime();
                }
                return a.name.localeCompare(b.name);
            })
            .map(member => ({
                ...member,
                isOnline: new Date(member.lastActive).getTime() > twentyFourHoursAgo,
                formattedJoinDate: new Date(member.joinDate).toLocaleDateString('vi-VN'),
            }));
    }, [members, searchTerm, roleFilter, sortBy, currentTime]);

    // Xử lý thay đổi search term
    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }, []);

    // Xử lý thay đổi role filter
    const handleRoleFilterChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setRoleFilter(e.target.value);
    }, []);

    // Xử lý thay đổi sort
    const handleSortChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value as 'level' | 'joinDate' | 'name');
    }, []);

    // Tính toán max level
    const maxLevel = useMemo(() => {
        return Math.max(...members.map(m => m.level));
    }, [members]);

    return (
        <div className={styles.container}>
            {/* Header Stats */}
            <div className={styles.statsHeader}>
                <div className={styles.statCard}>
                    <div className={styles.statNumber}>{members.length}</div>
                    <div className={styles.statLabel}>Tổng thành viên</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statNumber}>{maxLevel}</div>
                    <div className={styles.statLabel}>Cấp cao nhất</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statNumber}>{onlineMembersCount}</div>
                    <div className={styles.statLabel}>Online 24h</div>
                </div>
            </div>

            {/* Controls */}
            <div className={styles.controls}>
                <div className={styles.searchBox}>
                    <Search className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Tìm theo tên, biệt danh hoặc tên game..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className={styles.searchInput}
                    />
                </div>

                <div className={styles.filters}>
                    <select
                        value={roleFilter}
                        onChange={handleRoleFilterChange}
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
                        onChange={handleSortChange}
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

                    return (
                        <div key={member.userId} className={styles.memberCard}>
                            <div className={styles.memberHeader}>
                                <div className={styles.avatarContainer}>
                                    <Image
                                        src={member.avatar}
                                        alt={member.name}
                                        width={64}
                                        height={64}
                                        className={styles.avatar}
                                        priority
                                        unoptimized
                                        quality={100}
                                    />
                                    {/* <div className={`${styles.status} ${member.isOnline ? styles.online : styles.offline}`}></div> */}
                                </div>

                                <div className={styles.memberInfo}>
                                    <h3 className={styles.memberName}>{member.name}</h3>
                                    <p className={styles.ingameName}>{member.ingameName}</p>
                                    {member.nickName && (
                                        <div className={styles.nickName}>
                                            &quot;{member.nickName}&quot;
                                        </div>
                                    )}
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
                                        {member.formattedJoinDate}
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