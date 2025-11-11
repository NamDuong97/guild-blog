"use client";
import React, { useState, useRef } from 'react';
import { Prize } from '@/types';
import { Gift, RotateCcw, Sparkles, Trophy, Coins, Sword, Shield, Star, Crown } from 'lucide-react';
import styles from './LuckyWheel.module.css';
import { prizes } from '@/data/mockData';

const LuckyWheel: React.FC = () => {
    const [isSpinning, setIsSpinning] = useState(false);
    const [result, setResult] = useState<Prize | null>(null);
    const [spinsLeft, setSpinsLeft] = useState(3);
    const [showResultModal, setShowResultModal] = useState(false);
    const wheelRef = useRef<HTMLDivElement>(null);

    const spinWheel = () => {
        if (isSpinning || spinsLeft <= 0) return;

        setIsSpinning(true);
        setResult(null);
        setShowResultModal(false);

        // Calculate random prize based on probability
        const random = Math.random() * 100;
        let cumulativeProbability = 0;
        let selectedPrize = prizes[0];

        for (const prize of prizes) {
            cumulativeProbability += prize.probability;
            if (random <= cumulativeProbability) {
                selectedPrize = prize;
                break;
            }
        }

        // Spin animation
        const wheel = wheelRef.current;
        if (wheel) {
            const currentRotation = parseInt(wheel.style.transform.replace('rotate(', '').replace('deg)', '')) || 0;
            const targetRotation = currentRotation + 1440 + (selectedPrize.id * 45);

            wheel.style.transition = 'transform 4s cubic-bezier(0.2, 0.8, 0.3, 1)';
            wheel.style.transform = `rotate(${targetRotation}deg)`;

            setTimeout(() => {
                setIsSpinning(false);
                setResult(selectedPrize);
                setShowResultModal(true);
                setSpinsLeft(prev => prev - 1);
            }, 4000);
        }
    };

    const receiveGifts = () => {
        // Đóng modal khi nhấn "Nhận quà"
        setShowResultModal(false);
        setResult(null);

        // Có thể thêm logic xử lý nhận quà ở đây
        console.log('Đã nhận quà:', result?.name);

        // Hiển thị thông báo thành công (tuỳ chọn)
        // alert(`Bạn đã nhận thành công: ${result?.name}`);
    };

    const resetWheel = () => {
        const wheel = wheelRef.current;
        if (wheel) {
            wheel.style.transition = 'none';
            wheel.style.transform = 'rotate(0deg)';
        }
        setResult(null);
        setShowResultModal(false);
    };

    const getTypeColor = (type: string) => {
        const typeColors: Record<string, string> = {
            gold: 'linear-gradient(135deg, #fbbf24, #d97706)',
            item: 'linear-gradient(135deg, #06b6d4, #0891b2)',
            vip: 'linear-gradient(135deg, #ec4899, #db2777)',
            special: 'linear-gradient(135deg, #dc2626, #b91c1c)'
        };
        return typeColors[type] || typeColors.gold;
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.titleSection}>
                    <Gift className={styles.titleIcon} />
                    <h2 className={styles.title}>Vòng Quay May Mắn</h2>
                </div>
                <div className={styles.spinsCounter}>
                    <div className={styles.spinsBadge}>
                        <RotateCcw className={styles.spinsIcon} />
                        <span>{spinsLeft} lượt quay</span>
                    </div>
                    <div className={styles.resetButton} onClick={resetWheel}>
                        Làm mới
                    </div>
                </div>
            </div>

            <div className={styles.wheelContainer}>
                <div className={styles.wheelWrapper}>
                    <div
                        ref={wheelRef}
                        className={`${styles.wheel} ${isSpinning ? styles.spinning : ''}`}
                    >
                        {prizes.map((prize, index) => {
                            const Icon = prize.icon;
                            const rotation = index * 45;

                            return (
                                <div
                                    key={prize.id}
                                    className={styles.wheelSegment}
                                    style={{
                                        transform: `rotate(${rotation}deg)`,
                                        background: `conic-gradient(from ${rotation}deg at 50% 50%, ${prize.color}22 0deg 45deg, transparent 45deg 360deg)`
                                    }}
                                >
                                    <div
                                        className={styles.segmentContent}
                                        style={{ transform: `rotate(${rotation + 22.5}deg)` }}
                                    >
                                        <Icon className={styles.prizeIcon} />
                                        <span className={styles.prizeName}>{prize.name}</span>
                                    </div>
                                </div>
                            );
                        })}

                        <div className={styles.wheelCenter}>
                            <Sparkles className={styles.centerIcon} />
                        </div>
                    </div>

                    <div className={styles.wheelPointer}>
                        <div className={styles.pointerArrow}></div>
                    </div>
                </div>

                <button
                    className={`${styles.spinButton} ${isSpinning ? styles.spinning : ''} ${spinsLeft <= 0 ? styles.disabled : ''}`}
                    onClick={spinWheel}
                    disabled={isSpinning || spinsLeft <= 0}
                >
                    {spinsLeft <= 0 ? 'Hết lượt quay' : 'QUAY NGAY'}
                </button>
            </div>

            {/* Modal hiển thị kết quả */}
            {showResultModal && result && (
                <div className={styles.resultModal}>
                    <div className={styles.resultContent}>
                        <div
                            className={styles.resultIcon}
                            style={{ background: getTypeColor(result.type) }}
                        >
                            <result.icon className={styles.resultPrizeIcon} />
                        </div>
                        <h3 className={styles.resultTitle}>Chúc mừng!</h3>
                        <p className={styles.resultPrize}>Bạn đã nhận được: {result.name}</p>
                        <div className={styles.resultActions}>
                            <button className={styles.shareButton}>Chia sẻ</button>
                            <button className={styles.claimButton} onClick={receiveGifts}>
                                Nhận quà
                            </button>
                        </div>

                        {/* Nút đóng (X) ở góc phải */}
                        <button
                            className={styles.closeButton}
                            onClick={() => setShowResultModal(false)}
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}

            <div className={styles.prizeList}>
                <h4 className={styles.prizeListTitle}>Giải thưởng có thể nhận</h4>
                <div className={styles.prizesGrid}>
                    {prizes.map(prize => {
                        const Icon = prize.icon;
                        return (
                            <div key={prize.id} className={styles.prizeItem}>
                                <div
                                    className={styles.prizeItemIcon}
                                    style={{ background: getTypeColor(prize.type) }}
                                >
                                    <Icon className={styles.prizeItemSvg} />
                                </div>
                                <div className={styles.prizeItemInfo}>
                                    <span className={styles.prizeItemName}>{prize.name}</span>
                                    <span className={styles.prizeItemProbability}>{prize.probability}%</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default LuckyWheel;