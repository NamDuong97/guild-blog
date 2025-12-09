"use client";
import React, { useState, useCallback } from 'react';
import { Memory } from '@/types';
import { Calendar, Heart, ImageIcon, MessageSquare, Share2 } from 'lucide-react';
import styles from './MemoryCard.module.css';
import MemoryDetailModal from '@/components/MemoryDetailModal/MemoryDetailModal';
import { getMemoryImages } from '@/types/index';
import Image from 'next/image';

interface MemoryCardProps {
    memory: Memory;
    index: number;
}

const MemoryCard: React.FC<MemoryCardProps> = ({ memory, index }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCardClick = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const images = getMemoryImages(memory);

    return (
        <>
            <article
                className={styles.card}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={handleCardClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        handleCardClick();
                    }
                }}
            >
                <div className={styles.imageContainer}>
                    {images.length > 0 ? (
                        <Image
                            src={images[0]}
                            alt={memory.title}
                            width={400}
                            height={300}
                            className={styles.image}
                            sizes="(max-width: 768px) 100vw, 400px"
                        />
                    ) : (
                        <div className={styles.noImage}>
                            <ImageIcon size={48} />
                            <p>No image available</p>
                        </div>
                    )}

                    <div className={styles.imageOverlay}></div>
                    <div className={styles.tags}>
                        {memory.tags.map((tag: string) => (
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

                    <p className={styles.description}>{memory.content.substring(0, 150)}...</p>

                    <div className={styles.actions}>
                        <div className={styles.actionButtons}>
                            {memory.likes > 0 && (
                                <button
                                    className={styles.actionButton}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        // Handle like logic
                                    }}
                                >
                                    <Heart className={styles.actionIcon} />
                                    <span>{memory.likes}</span>
                                </button>
                            )}
                            {memory.comments > 0 && (
                                <button
                                    className={styles.actionButton}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        // Handle comment logic
                                    }}
                                >
                                    <MessageSquare className={styles.actionIcon} />
                                    <span>{memory.comments}</span>
                                </button>
                            )}
                        </div>
                        {memory.comments > 0 && (
                            <button
                                className={styles.actionButton}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    // Handle share logic
                                }}
                            >
                                <Share2 className={styles.actionIcon} />
                            </button>
                        )}
                    </div>
                </div>
            </article>

            {isModalOpen && (
                <MemoryDetailModal
                    memory={memory}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
};

export default MemoryCard;