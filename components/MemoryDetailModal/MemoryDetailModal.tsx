"use client";
import React, { useEffect } from 'react';
import { Memory } from '@/types';
import { X, Calendar, Heart, MessageSquare, Share2, Send, Smile, Image as ImageIcon } from 'lucide-react';
import ImageCarousel from '@/components/ImageCarousel/ImageCarousel';
import styles from './MemoryDetailModal.module.css';
import { getMemoryImages } from '@/types/index'

interface MemoryDetailModalProps {
    memory: Memory;
    isOpen: boolean;
    onClose: () => void;
}

// // Helper function to get images
// const getMemoryImages = (memory: Memory): string[] => {
//     if (memory.images && memory.images.length > 0) {
//         return memory.images;
//     }
//     if (memory.image) {
//         return [memory.image];
//     }
//     return [];
// };

const MemoryDetailModal: React.FC<MemoryDetailModalProps> = ({ memory, isOpen, onClose }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleEscape);
        }

        return () => {
            window.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const images = getMemoryImages(memory);

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>
                    <X />
                </button>

                <div className={styles.modalContent}>
                    {/* Left side - Image Carousel */}
                    <div className={styles.imageSection}>
                        {images.length > 0 ? (
                            <ImageCarousel images={images} alt={memory.title} />
                        ) : (
                            <div className={styles.noImage}>
                                <ImageIcon size={48} />
                                <p>No image available</p>
                            </div>
                        )}
                    </div>

                    {/* Right side - Details and Comments */}
                    <div className={styles.detailSection}>
                        {/* Header */}
                        <div className={styles.header}>
                            <div className={styles.authorInfo}>
                                <div className={styles.avatar}>
                                    {memory.author.charAt(0).toUpperCase()}
                                </div>
                                <div className={styles.authorDetails}>
                                    <h3 className={styles.authorName}>{memory.author}</h3>
                                    <div className={styles.postDate}>
                                        <Calendar className={styles.dateIcon} />
                                        <span>{memory.date}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className={styles.contentSection}>
                            <h2 className={styles.modalTitle}>{memory.title}</h2>
                            <p className={styles.modalDescription}>{memory.content}</p>

                            <div className={styles.modalTags}>
                                {memory.tags.map(tag => (
                                    <span key={tag} className={styles.modalTag}>
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Stats */}
                        <div className={styles.stats}>
                            <div className={styles.statItem}>
                                <Heart className={styles.statIcon} fill="currentColor" />
                                <span>{memory.likes} lượt thích</span>
                            </div>
                            <div className={styles.statItem}>
                                <MessageSquare className={styles.statIcon} />
                                <span>{memory.comments} bình luận</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className={styles.actionBar}>
                            <button className={styles.actionBtn}>
                                <Heart className={styles.btnIcon} />
                                <span>Thích</span>
                            </button>
                            <button className={styles.actionBtn}>
                                <MessageSquare className={styles.btnIcon} />
                                <span>Bình luận</span>
                            </button>
                            <button className={styles.actionBtn}>
                                <Share2 className={styles.btnIcon} />
                                <span>Chia sẻ</span>
                            </button>
                        </div>

                        {/* Comments Section */}
                        <div className={styles.commentsSection}>
                            <div className={styles.commentsList}>
                                {/* Sample comments - replace with actual data */}
                                <div className={styles.comment}>
                                    <div className={styles.commentAvatar}>H</div>
                                    <div className={styles.commentContent}>
                                        <div className={styles.commentBubble}>
                                            <span className={styles.commentAuthor}>Hoa Bui</span>
                                            <p className={styles.commentText}>
                                                Kỷ niệm đẹp quá! 💜
                                            </p>
                                        </div>
                                        <div className={styles.commentActions}>
                                            <button>Thích</button>
                                            <button>Phản hồi</button>
                                            <span>5 giờ</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.comment}>
                                    <div className={styles.commentAvatar}>D</div>
                                    <div className={styles.commentContent}>
                                        <div className={styles.commentBubble}>
                                            <span className={styles.commentAuthor}>Dương Nam</span>
                                            <p className={styles.commentText}>
                                                Ảnh đẹp quá! 🚀
                                            </p>
                                        </div>
                                        <div className={styles.commentActions}>
                                            <button>Thích</button>
                                            <button>Phản hồi</button>
                                            <span>3 giờ</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Comment Input */}
                            <div className={styles.commentInput}>
                                <div className={styles.inputAvatar}>B</div>
                                <div className={styles.inputWrapper}>
                                    <input
                                        type="text"
                                        placeholder="Viết bình luận..."
                                        className={styles.input}
                                    />
                                    <div className={styles.inputActions}>
                                        <button className={styles.inputActionBtn}>
                                            <Smile />
                                        </button>
                                        <button className={styles.inputActionBtn}>
                                            <ImageIcon />
                                        </button>
                                        <button className={styles.sendBtn}>
                                            <Send />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemoryDetailModal;
