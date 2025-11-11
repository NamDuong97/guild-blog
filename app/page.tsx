"use client";
import React, { useState } from 'react';
import Header from '@/components/Header/Header';
import CategoryFilter from '@/components/CategoryFilter/CategoryFilter';
import MemoryCard from '@/components/MemoryCard/MemoryCard';
import StatsSection from '@/components/StatsSection/StatsSection';
import { memories, categories, stats } from '@/data/mockData';
import { Heart } from 'lucide-react';

export default function GuildBlog() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredMemories = selectedCategory === 'all'
    ? memories
    : memories.filter(m => m.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
      </div>

      <Header />

      <main className="relative max-w-6xl mx-auto px-4 py-8">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

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
      </main>

      <footer className="relative mt-16 border-t border-purple-500/20 backdrop-blur-sm bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <p className="text-purple-300">
            Made with <Heart className="w-4 h-4 inline text-red-400 fill-current" /> by Atiste Guild
          </p>
          <p className="text-purple-400 text-sm mt-2">
            © 2024 - Nơi lưu giữ những kỷ niệm đáng nhớ
          </p>
        </div>
      </footer>
    </div>
  );
}