"use client";
import React from 'react';
import { Memory } from '@/types';
import { Calendar, Heart, MessageSquare, Share2 } from 'lucide-react';
import styles from './MemoryCard.module.css';

interface MemoryCardProps {
    memory: Memory;
    index: number;
}

const MemoryCard: React.FC<MemoryCardProps> = ({ memory, index }) => {
    return (
        <article
            className={styles.card}
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <div className={styles.imageContainer}>
                <img
                    src={memory.image}
                    alt={memory.title}
                    className={styles.image}
                />
                <div className={styles.imageOverlay}></div>
                <div className={styles.tags}>
                    {memory.tags.map(tag => (
                        <span key={tag} className={styles.tag}>
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.meta}>
                    <div className={styles.date}>
                        <Calendar className={styles.metaIcon} />
                        <span>{memory.date}</span>
                    </div>
                    <span className={styles.author}>{memory.author}</span>
                </div>

                <h2 className={styles.title}>{memory.title}</h2>

                <p className={styles.description}>{memory.content}</p>

                <div className={styles.actions}>
                    <div className={styles.actionButtons}>
                        <button className={styles.actionButton}>
                            <Heart className={styles.actionIcon} />
                            <span>{memory.likes}</span>
                        </button>
                        <button className={styles.actionButton}>
                            <MessageSquare className={styles.actionIcon} />
                            <span>{memory.comments}</span>
                        </button>
                    </div>
                    <button className={styles.actionButton}>
                        <Share2 className={styles.actionIcon} />
                    </button>
                </div>
            </div>
        </article>
    );
};

export default MemoryCard;