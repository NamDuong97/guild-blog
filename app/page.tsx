"use client";
import React, { useState } from 'react';

import CategoryFilter from '@/components/CategoryFilter/CategoryFilter';
import MemoryCard from '@/components/MemoryCard/MemoryCard';
import StatsSection from '@/components/StatsSection/StatsSection';
import MemberList from '@/components/MemberList/MemberList';
import LuckyWheel from '@/components/LuckyWheel/LuckyWheel';
import styles from './page.module.css';
import { memories, categories, stats, members } from '@/data/mockData';


export default function GuildBlog() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredMemories = selectedCategory === 'all'
    ? memories
    : memories.filter(m => m.category === selectedCategory);

  const renderCategoryContent = () => {
    switch (selectedCategory) {
      case 'member':
        return <MemberList members={members} />;
      case 'event':
        return <LuckyWheel />;
      default:
        return (
          <>
            <div className="grid md:grid-cols-2 gap-6">
              {filteredMemories.map((memory, index) => (
                <MemoryCard
                  key={memory.id}
                  memory={memory}
                  index={index}
                />
              ))}
            </div>
            <StatsSection stats={stats} />
          </>
        );
    }
  };

  return (
    <main className={styles.main}>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      {renderCategoryContent()}
    </main>
  );
}