"use client";
import React from 'react';
import { Category } from '@/types';
import styles from './CategoryFilter.module.css';

interface CategoryFilterProps {
    categories: Category[];
    selectedCategory: string;
    onCategoryChange: (categoryId: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
    categories,
    selectedCategory,
    onCategoryChange
}) => {
    return (
        <div className={styles.filterContainer}>
            {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                    <button
                        key={cat.id}
                        onClick={() => onCategoryChange(cat.id)}
                        className={`${styles.filterButton} ${selectedCategory === cat.id ? styles.active : styles.inactive
                            }`}
                    >
                        <Icon className={styles.filterIcon} />
                        <span>{cat.name}</span>
                    </button>
                );
            })}
        </div>
    );
};

export default CategoryFilter;