"use client";
import React, { useState } from 'react';
import CategoryFilter from '@/components/CategoryFilter/CategoryFilter';
import MemoryCard from '@/components/MemoryCard/MemoryCard';
import StatsSection from '@/components/StatsSection/StatsSection';
import MemberList from '@/components/MemberList/MemberList';
import LuckyWheel from '@/components/LuckyWheel/LuckyWheel';
import styles from './page.module.css';
import { memories, categories, stats, members } from '@/data/mockData';

type SortOption = 'newest' | 'oldest';

export default function GuildBlog() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  const filteredMemories = selectedCategory === 'all'
    ? memories
    : memories.filter(m => m.category === selectedCategory);

  const sortedMemories = [...filteredMemories].sort((a, b) => {
    return sortBy === 'newest'
      ? new Date(b.date).getTime() - new Date(a.date).getTime()
      : new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  const renderCategoryContent = () => {
    switch (selectedCategory) {
      case 'member':
        return <MemberList members={members} />;
      case 'event':
        return <LuckyWheel />;
      default:
        return (
          <div className={styles.contentWrapper}>
            {/* Simple Filter Tabs */}
            <div className={styles.filterTabs}>
              <button
                className={`${styles.filterTab} ${sortBy === 'newest' ? styles.activeTab : ''}`}
                onClick={() => setSortBy('newest')}
              >
                Mới nhất
              </button>
              <button
                className={`${styles.filterTab} ${sortBy === 'oldest' ? styles.activeTab : ''}`}
                onClick={() => setSortBy('oldest')}
              >
                Cũ nhất
              </button>
            </div>

            <div className={styles.memoriesGrid}>
              {sortedMemories.map((memory, index) => (
                <MemoryCard
                  key={memory.id}
                  memory={memory}
                  index={index}
                />
              ))}
            </div>
            <StatsSection stats={stats} />
          </div>
        );
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {renderCategoryContent()}
    </main>
  );
}