"use client";
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Prize } from '@/types';
import { Gift, RotateCcw, Sparkles, Trophy } from 'lucide-react';
import styles from './LuckyWheel.module.css';
import { prizes } from '@/data/mockData';
import HistoryModal from '@/components/HistoryModal/HistoryModal'
import { SpinHistory } from '@/types/index'
import { GOOGLE_SCRIPT_URL_LUCKY_WHEEL } from '@/untils/Constants'
import { useUser } from '@/contexts/UserContext'


const LuckyWheel: React.FC = () => {
    const [isSpinning, setIsSpinning] = useState(false);
    const [result, setResult] = useState<Prize | null>(null);
    const [spinsLeft, setSpinsLeft] = useState(1);
    const [showResultModal, setShowResultModal] = useState(false);
    const [isShowHistoryWheel, setShowHistoryWheel] = useState(false);
    const spinHistoryRef = useRef<SpinHistory[]>([]);
    const spinHistoryRefForUser = useRef<SpinHistory[]>([]);
    const wheelRef = useRef<HTMLDivElement>(null);
    const { user } = useUser();


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
            // Khi bắt đầu quay
            wheel.classList.add('spinning');

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
                // Khi kết thúc quay
                setIsSpinning(false);
                setResult(selectedPrize);
                setShowResultModal(true);
                addHistoryWheel(selectedPrize);
                setSpinsLeft(prev => prev - 1);
                wheel.classList.remove('spinning');
            }, 2000);
        }
    };

    const saveHistoryToStorage = () => {
        try {
            const data = JSON.stringify(spinHistoryRef.current);
            if (data) {
                localStorage.setItem('spinHistoryRef', data)
            }
        } catch (error) {
            console.error('Error parsing localStorage data:', error);
        }
    }

    const saveToGoogleSheets = async (history: SpinHistory) => {
        try {
            const response = await fetch(GOOGLE_SCRIPT_URL_LUCKY_WHEEL, {
                method: "POST",
                body: JSON.stringify(history)
            });

            const result = await response.json();
            if (result.success) {
                console.log("✅ Saved to Google Sheets");
            } else {
                console.error("❌ Google Sheets error:", result.error);
            }
        } catch (error) {
            console.error("❌ Network error:", error);
        }
    };

    // Load lịch sử từ Google Sheets
    const loadFromGoogleSheets = async (): Promise<SpinHistory[]> => {
        try {
            const response = await fetch(GOOGLE_SCRIPT_URL_LUCKY_WHEEL);
            const result = await response.json();

            if (result.success) {
                return result.data.map((item: any) => {
                    // Clean keys - remove trailing spaces
                    const cleanItem: any = {};
                    Object.keys(item).forEach(key => {
                        const cleanKey = key.trim(); // Remove spaces from both ends
                        cleanItem[cleanKey] = item[key];
                    });
                    return {
                        timestamp: new Date(cleanItem.timestamp),
                        prizeName: cleanItem.prizename || cleanItem.prizeName || 'Unknown Prize',
                        prizeId: cleanItem.prizeid || cleanItem.prizeId || 'Unknown ID',
                        userId: cleanItem.userid || 'nam',
                        quantity: Number(cleanItem.quantity) || 1,
                        status: cleanItem.status || 'received',
                        type: cleanItem.type || 'general'
                    } as SpinHistory;
                });
            }
        } catch (error) {
            console.error('Load from Google Sheets error:', error);
        }
        return [];
    };

    const loadSpinHistory = async () => {
        try {
            const storedData = localStorage.getItem('spinHistoryRef');
            let dataFromGG: SpinHistory[] = await loadFromGoogleSheets();
            let dataFromLS: SpinHistory[] = JSON.parse(storedData || '[]');
            if (dataFromGG.length != dataFromLS.length) {
                spinHistoryRef.current = dataFromGG;
                localStorage.setItem('spinHistoryRef', JSON.stringify(dataFromGG))
            } else {
                spinHistoryRef.current = dataFromLS;
            }
        } catch (error) {
            console.error('Error parsing localStorage data or Error load data from Google Sheet:', error);
        }

        if (user) {
            spinHistoryRefForUser.current = spinHistoryRef.current.filter(it => it.userId == user.userId)
        }
    }

    useEffect(() => {
        loadSpinHistory();
        return () => {
            // Lưu khi component unmount
            saveHistoryToStorage();
        };
    }, []);

    useEffect(() => {
        if (user) {
            spinHistoryRefForUser.current = spinHistoryRef.current.filter(it => it.userId == user.userId)
        } else {
            spinHistoryRefForUser.current = []
        }
    }, [user]);

    const addHistoryWheel = async (prize: Prize) => {
        const pr: SpinHistory = {
            timestamp: new Date(),
            prizeName: prize?.name || 'Unknown Prize',
            prizeId: String(prize?.id || 'UNKNOWN'),
            userId: user?.userId || 'UNKNOWN',
            quantity: 1,
            status: 'received',
            type: prize?.type || 'general'
        };
        spinHistoryRef.current = [...spinHistoryRef.current, pr];
        spinHistoryRefForUser.current = [...spinHistoryRefForUser.current, pr];
        saveHistoryToStorage();
        await saveToGoogleSheets(pr);
    };

    const receiveGifts = () => {
        setShowResultModal(false);
        setResult(null);
    };

    const resetWheel = () => {
        setSpinsLeft(1);
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
                    <div className={styles.resetButton} onClick={() => setShowHistoryWheel(true)}>
                        Lịch sử
                    </div>
                </div>
            </div>

            <div className={styles.wheelContainer}>
                <div className={styles.wheelWrapper}>
                    <div className={styles.musicWaves}></div>
                    <div className={styles.musicWaves}></div>
                    <div className={styles.musicWaves}></div>
                    <div className={styles.musicWaves}></div>
                    <div
                        ref={wheelRef}
                        className={`${styles.wheel} ${isSpinning ? styles.spinning : ''}`}
                    >
                        {prizes.map((prize, index) => {
                            // const Icon = prize.icon;
                            console.log("index: ", index + prize.name);
                            const rotation = (index + 1) * wheelConfig.segmentAngle;
                            console.log("rotation: ", rotation);
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
                            <Gift className={styles.resultPrizeIcon} />
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

            {isShowHistoryWheel && (
                <HistoryModal
                    isShowHistory={isShowHistoryWheel}
                    onClose={() => setShowHistoryWheel(false)}
                    spinHistory={spinHistoryRefForUser.current}
                    user={user}
                />
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
                                    <img src={prize.icon} alt={prize.name} />
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