"use client";
import React, { useState, useRef, useMemo, useEffect, useCallback } from "react";
import { Prize } from "@/types";
import { Gift, RotateCcw, Sparkles } from "lucide-react";
import styles from "./LuckyWheel.module.css";
import { prizes } from "@/data/mockData";
import HistoryModal from "@/components/HistoryModal/HistoryModal";
import { SpinHistory } from "@/types/index";
import { GOOGLE_SCRIPT_URL_LUCKY_WHEEL } from "@/untils/Constants";
import { useUser } from "@/contexts/UserContext";

interface GoogleSheetItem {
    timestamp?: string;
    prizename?: string;
    prizeName?: string;
    prizeid?: string;
    prizeId?: string;
    userid?: string;
    quantity?: string | number;
    status?: string;
    type?: string;
    [key: string]: string | number | undefined;
}

interface CleanGoogleSheetItem {
    timestamp?: string;
    prizename?: string;
    prizeName?: string;
    prizeid?: string;
    prizeId?: string;
    userid?: string;
    quantity?: string | number;
    status?: string;
    type?: string;
}

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

    // Cấu hình wheel
    const wheelConfig = useMemo(() => {
        const totalPrizes = prizes.length;
        const segmentAngle = 360 / totalPrizes;
        const pointerOffset = segmentAngle / 2;
        return {
            totalPrizes,
            segmentAngle,
            pointerOffset,
        };
    }, [prizes.length]);

    useEffect(() => {
        const wheel = wheelRef.current;
        if (!wheel) return;
        wheel.style.transition = "none";
        wheel.style.transform = `rotate(0deg)`;
        void wheel.offsetWidth;
    }, [prizes.length]);

    // Tách hàm chọn giải thưởng ra ngoài để tránh lỗi purity
    const selectPrize = useCallback((): Prize => {
        const totalProb = prizes.reduce((s, p) => s + (p.probability || 0), 0);
        if (totalProb <= 0) {
            return prizes[prizes.length - 1];
        }

        // Sửa: Tạo random number trong callback function
        const rnd = Math.random() * totalProb;
        let cumulative = 0;

        for (const p of prizes) {
            cumulative += p.probability;
            if (rnd < cumulative) {
                return p;
            }
        }

        return prizes[prizes.length - 1];
    }, []);

    const spinWheel = () => {
        if (isSpinning || spinsLeft <= 0) return;

        setIsSpinning(true);
        setResult(null);
        setShowResultModal(false);

        // Sửa: Gọi hàm selectPrize thay vì tính toán trực tiếp trong render
        const selectedPrize = selectPrize();

        const wheel = wheelRef.current;
        if (!wheel) {
            setIsSpinning(false);
            return;
        }

        const computed = window.getComputedStyle(wheel).transform;
        let currentRotation = 0;
        if (computed && computed !== "none") {
            const m = computed.match(/^matrix\((.+)\)$/);
            if (m) {
                const nums = m[1].split(",").map((s) => parseFloat(s));
                const a = nums[0],
                    b = nums[1];
                const angle = Math.atan2(b, a) * (180 / Math.PI);
                currentRotation = angle;
            } else {
                const r = (wheel.style.transform || "").match(/rotate\(([-0-9.]+)deg\)/);
                if (r) currentRotation = parseFloat(r[1]);
            }
        }
        currentRotation = ((currentRotation % 360) + 360) % 360;

        const N = prizes.length;
        if (N <= 0) {
            setIsSpinning(false);
            return;
        }
        const segmentAngle = wheelConfig.segmentAngle;

        const prizeIndex = prizes.findIndex((p) => p.id === selectedPrize.id);
        if (prizeIndex < 0) {
            setIsSpinning(false);
            return;
        }

        const centerOfSegment = prizeIndex * segmentAngle + segmentAngle / 2;
        const pointerAngle = 0;
        const desiredFinalMod = ((360 - centerOfSegment + pointerAngle) % 360 + 360) % 360;

        let delta = desiredFinalMod - currentRotation;
        if (delta < 0) delta += 360;

        const fullSpins = 4;
        const targetRotation = currentRotation + fullSpins * 360 + delta;

        const wheelEl = wheelRef.current;
        if (wheelEl) {
            wheelEl.classList.add(styles.spinning);
        }

        const durationMs = 4000;
        const onTransitionEnd = () => {
            if (wheelEl) {
                wheelEl.classList.remove(styles.spinning);
            }
            setIsSpinning(false);
            setResult(selectedPrize);
            setShowResultModal(true);
            addHistoryWheel(selectedPrize);
            setSpinsLeft((prev) => prev - 1);

            if (wheel) {
                const normalizedFinal = targetRotation % 360;
                wheel.style.transition = "none";
                wheel.style.transform = `rotate(${normalizedFinal}deg)`;
                void wheel.offsetWidth;
            }
        };

        wheel.addEventListener("transitionend", onTransitionEnd as EventListener, { once: true });
        wheel.style.transition = `transform ${durationMs / 1000}s cubic-bezier(0.2,0.8,0.3,1)`;
        wheel.style.transform = `rotate(${targetRotation}deg)`;

        setTimeout(() => {
            if (isSpinning) {
                onTransitionEnd();
            }
        }, durationMs + 400);
    };

    const saveHistoryToStorage = useCallback(() => {
        try {
            const data = JSON.stringify(spinHistoryRef.current);
            if (data) {
                localStorage.setItem("spinHistoryRef", data);
            }
        } catch (error) {
            console.error("Error parsing localStorage data:", error);
        }
    }, []);

    const saveToGoogleSheets = async (history: SpinHistory) => {
        try {
            const response = await fetch(GOOGLE_SCRIPT_URL_LUCKY_WHEEL, {
                method: "POST",
                body: JSON.stringify(history),
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

    const loadFromGoogleSheets = async (): Promise<SpinHistory[]> => {
        try {
            const response = await fetch(GOOGLE_SCRIPT_URL_LUCKY_WHEEL);
            const result = await response.json();
            if (result.success && Array.isArray(result.data)) {
                return result.data.map((item: GoogleSheetItem): SpinHistory => {
                    const cleanItem: CleanGoogleSheetItem & Record<string, any> = {} as any;

                    // Clean và normalize data từ Google Sheets
                    Object.keys(item).forEach((key) => {
                        const cleanKey = key.trim();
                        cleanItem[cleanKey] = item[key];
                    });

                    return {
                        timestamp: new Date(cleanItem.timestamp || Date.now()),
                        prizeName: cleanItem.prizename || cleanItem.prizeName || "Unknown Prize",
                        prizeId: cleanItem.prizeid || cleanItem.prizeId || "Unknown ID",
                        userId: cleanItem.userid || "nam",
                        quantity: Number(cleanItem.quantity) || 1,
                        status: (cleanItem.status || "received") as "received" | "pending" | "failed",
                        type: cleanItem.type || "general",
                    };
                });
            }
        } catch (error) {
            console.error("Load from Google Sheets error:", error);
        }
        return [];
    };

    const loadSpinHistory = useCallback(async () => {
        try {
            const storedData = localStorage.getItem("spinHistoryRef");
            const dataFromGG: SpinHistory[] = await loadFromGoogleSheets(); // Sửa: const thay vì let
            const dataFromLS: SpinHistory[] = JSON.parse(storedData || "[]"); // Sửa: const thay vì let

            if (dataFromGG.length !== dataFromLS.length) {
                spinHistoryRef.current = dataFromGG;
                localStorage.setItem("spinHistoryRef", JSON.stringify(dataFromGG));
            } else {
                spinHistoryRef.current = dataFromLS;
            }
        } catch (error) {
            console.error("Error parsing localStorage data or Error load data from Google Sheet:", error);
        }
        if (user) {
            spinHistoryRefForUser.current = spinHistoryRef.current.filter((it) => it.userId === user.userId);
        }
    }, [user]);

    useEffect(() => {
        loadSpinHistory();
        return () => {
            saveHistoryToStorage();
        };
    }, [loadSpinHistory, saveHistoryToStorage]);

    useEffect(() => {
        if (user) {
            spinHistoryRefForUser.current = spinHistoryRef.current.filter((it) => it.userId === user.userId);
        } else {
            spinHistoryRefForUser.current = [];
        }
    }, [user]);

    const addHistoryWheel = async (prize: Prize) => {
        const pr: SpinHistory = {
            timestamp: new Date(),
            prizeName: prize?.name || "Unknown Prize",
            prizeId: String(prize?.id || "UNKNOWN"),
            userId: user?.userId || "UNKNOWN",
            quantity: 1,
            status: "received",
            type: prize?.type || "general",
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
            wheel.style.transition = "none";
            wheel.style.transform = "rotate(0deg)";
        }
        setResult(null);
        setShowResultModal(false);
    };

    const getTypeColor = (type: string) => {
        const typeColors: Record<string, string> = {
            gold: "linear-gradient(135deg, #fbbf24, #d97706)",
            item: "linear-gradient(135deg, #06b6d4, #0891b2)",
            vip: "linear-gradient(135deg, #ec4899, #db2777)",
            special: "linear-gradient(135deg, #dc2626, #b91c1c)",
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
                            const rotation = index * wheelConfig.segmentAngle;
                            const centerAngle = wheelConfig.segmentAngle / 2;

                            const segmentStyle = {
                                transform: `rotate(${rotation}deg)`,
                            } as React.CSSProperties;

                            const contentStyle: React.CSSProperties = {
                                transform: `rotate(${centerAngle}deg)`,
                            };

                            return (
                                <div
                                    key={prize.id}
                                    className={styles.wheelSegment}
                                    style={segmentStyle}
                                >
                                    <div
                                        className={styles.segmentContent}
                                        style={contentStyle}
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
                                    style={{
                                        transform: `rotate(${rotation}deg)`,
                                    } as React.CSSProperties}
                                />
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
                    className={`${styles.spinButton} ${isSpinning ? styles.spinning : ""} ${spinsLeft <= 0 ? styles.disabled : ""}`}
                    onClick={spinWheel}
                    disabled={isSpinning || spinsLeft <= 0}
                >
                    {spinsLeft <= 0 ? "Hết lượt quay" : "QUAY NGAY"}
                </button>
            </div>

            {showResultModal && result && (
                <div className={styles.resultModal}>
                    <div className={styles.resultContent}>
                        <div className={styles.resultIcon} style={{ background: getTypeColor(result.type) }}>
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

                        <button className={styles.closeButton} onClick={() => setShowResultModal(false)}>
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
                    {prizes.map((prize) => {
                        return (
                            <div key={prize.id} className={styles.prizeItem}>
                                <div className={styles.prizeItemIcon} style={{ background: getTypeColor(prize.type) }}>
                                    <img src={prize.icon} alt={prize.name} />
                                </div>
                                <div className={styles.prizeItemInfo}>
                                    <span className={styles.prizeItemName}>{prize.name}</span>
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