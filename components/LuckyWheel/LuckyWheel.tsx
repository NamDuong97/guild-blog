"use client";
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Prize } from '@/types';
import { Gift, RotateCcw, Sparkles } from 'lucide-react';
import styles from './LuckyWheel.module.css';
import { prizes } from '@/data/mockData';

const LuckyWheel: React.FC = () => {
    const [isSpinning, setIsSpinning] = useState(false);
    const [result, setResult] = useState<Prize | null>(null);
    const [spinsLeft, setSpinsLeft] = useState(3);
    const [showResultModal, setShowResultModal] = useState(false);
    const wheelRef = useRef<HTMLDivElement>(null);

    const wheelConfig = useMemo(() => {
        const totalPrizes = prizes.length;
        const segmentAngle = 360 / totalPrizes;
        const pointerOffset = segmentAngle / 2;

        return {
            totalPrizes,
            segmentAngle,
            pointerOffset
        };
    }, [prizes.length]);


    useEffect(() => {
        const totalPrizes = prizes.length;
        const segmentAngle = 360 / totalPrizes;
        const pointerOffset = segmentAngle / 2;

        // 👇 Ví dụ muốn vòng quay khởi động ở múi thứ 0
        const initialSegment = 0;
        const initialRotation = initialSegment * wheelConfig.segmentAngle + wheelConfig.pointerOffset;

        if (wheelRef.current) {
            wheelRef.current.style.transition = "none";
            wheelRef.current.style.transform = `rotate(${initialRotation}deg)`;
        }
    }, [prizes.length]);

    const spinWheel = () => {
        if (isSpinning || spinsLeft <= 0) return;

        setIsSpinning(true);
        setResult(null);
        setShowResultModal(false);

        const random = Math.random() * 100;
        let cumulativeProbability = 0;
        let selectedPrize = prizes[0];

        for (const prize of prizes) {
            cumulativeProbability += prize.probability;
            if (random <= cumulativeProbability) {
                console.log("=========================")
                selectedPrize = prize;
                console.log("quà nhận được ", prize.name)
                break;
            }
        }

        const wheel = wheelRef.current;
        if (wheel) {
            const currentRotation = parseFloat(wheel.style.transform.replace('rotate(', '').replace('deg)', '')) || 0;
            wheel.style.transform = `rotate(${currentRotation}deg)`;
            console.log("góc ban đầu", currentRotation)

            const { segmentAngle, pointerOffset } = wheelConfig;
            const prizeIndex = prizes.findIndex(p => p.id === selectedPrize.id);
            console.log("số đo góc 1 phần tử", segmentAngle)
            console.log("1 nửa số đo góc 1pt", pointerOffset)
            console.log("stt của phần quà trúng", prizeIndex)

            const targetRotation = currentRotation + 1440 + (360 - (prizeIndex + 1) * segmentAngle);
            console.log("số đo góc cần quay", targetRotation)
            console.log("=========================")
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
        setShowResultModal(false);
        setResult(null);
        console.log('Đã nhận quà:', result?.name);
    };

    const resetWheel = () => {
        setSpinsLeft(3);
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
                            const rotation = index * wheelConfig.segmentAngle;
                            const segmentStyle = {
                                '--segment-color': prize.color,
                                '--segment-angle': `${wheelConfig.segmentAngle}deg`,
                                transform: `rotate(${rotation}deg)`,
                            } as React.CSSProperties;

                            return (
                                <div
                                    key={prize.id}
                                    className={styles.wheelSegment}
                                    style={segmentStyle}
                                >
                                    <div
                                        className={styles.segmentContent}
                                        style={{
                                            '--segment-angle': `${wheelConfig.segmentAngle}deg`,
                                        } as React.CSSProperties}
                                    >
                                        <Icon className={styles.prizeIcon} />
                                        <span className={styles.prizeName}>{prize.name}</span>
                                    </div>
                                </div>
                            );
                        })}

                        {prizes.map((_, index) => {
                            const rotation = index * wheelConfig.segmentAngle;
                            return (
                                <div
                                    key={`divider-${index}`}
                                    className={styles.segmentDivider}
                                    style={{ transform: `rotate(${rotation}deg)` }}
                                ></div>
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