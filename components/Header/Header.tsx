"use client";
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Users, Trophy, Gamepad2, Crown, Shield, Sparkles, User, Music, Play, Pause, Volume2, VolumeX, Eye, EyeOff, Lock, Calendar } from 'lucide-react';
import styles from './Header.module.css';
import LoginModal from '../LoginModal/LoginModal';
import { useUser } from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface PlaylistItem {
    id: number;
    name: string;
    url: string;
}

const Header: React.FC = () => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isUserInteracted, setIsUserInteracted] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isLogin, setLogin] = useState(false);
    const { user, logout, loadUser } = useUser();
    const audioRef = useRef<HTMLAudioElement>(null);
    const router = useRouter();

    const playlist: PlaylistItem[] = [
        { id: 0, name: "Nhạc Thiện Nữ", url: "/music/nhacgamethiennu.mp3" },
        { id: 1, name: "Bá Hổ Thuyết", url: "/music/bahothuyet.mp3" },
        { id: 2, name: "Thương Thì Thôi", url: "/music/thuongthithoi.mp3" }
    ];

    // Xử lý khi kết thúc bài hát - Chuyển bài tiếp theo
    const handleEnded = useCallback(() => {
        const nextIndex = (currentTrackIndex + 1) % playlist.length;
        setCurrentTrackIndex(nextIndex);
    }, [currentTrackIndex, playlist.length]);

    // Effect để play bài mới khi currentTrackIndex thay đổi
    useEffect(() => {
        if (audioRef.current && isPlaying) {
            audioRef.current.load(); // Load bài mới
            audioRef.current.play().catch(error => {
                console.error('Audio play failed:', error);
            });
        }
    }, [currentTrackIndex, isPlaying]);

    // Music Player functions
    const toggleMusic = useCallback(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(error => {
                    console.error('Audio play failed:', error);
                });
            }
            setIsPlaying(!isPlaying);
        }
    }, [isPlaying]);

    // Xử lý bật bài hát tiếp theo (manual)
    const playNextTrack = useCallback(() => {
        const nextIndex = (currentTrackIndex + 1) % playlist.length;
        setCurrentTrackIndex(nextIndex);
        setIsPlaying(true);
    }, [currentTrackIndex, playlist.length]);

    useEffect(() => {
        const handleUserInteraction = () => {
            setIsUserInteracted(true);
            if (audioRef.current && !isPlaying) {
                audioRef.current.play().then(() => {
                    setIsPlaying(true);
                }).catch(error => {
                    console.error('Auto-play failed:', error);
                });
            }
            document.removeEventListener('click', handleUserInteraction);
        };

        document.addEventListener('click', handleUserInteraction);

        return () => {
            document.removeEventListener('click', handleUserInteraction);
        };
    }, [isPlaying]);

    // Sửa lỗi setState trong useEffect
    useEffect(() => {
        let mounted = true;

        const updateLoginState = () => {
            if (mounted) {
                setLogin(!!user);
            }
        };

        const timer = setTimeout(updateLoginState, 0);

        return () => {
            mounted = false;
            clearTimeout(timer);
        };
    }, [user]);

    const toggleMute = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    }, [isMuted]);

    // Login functions
    const handleLogin = useCallback(() => {
        loadUser();
        if (!isLoginModalOpen) {
            setIsLoginModalOpen(true);
        }
    }, [isLoginModalOpen, loadUser]);

    const handleLogout = useCallback(async () => {
        console.log("Bạn đã logout");
        await logout();
        router.push('/');
    }, [logout, router]);

    const onCloseLogin = useCallback(() => {
        if (isLoginModalOpen) {
            setIsLoginModalOpen(false);
        }
    }, [isLoginModalOpen]);

    return (
        <header className={styles.header}>
            {/* Background Effects */}
            <div className={styles.backgroundEffects}>
                <div className={styles.floatingOrb1}></div>
                <div className={styles.floatingOrb2}></div>
                <div className={styles.floatingOrb3}></div>
            </div>

            <div className={styles.container}>
                {/* Top Bar với Language và Login */}
                <div className={styles.topBar}>
                    <div className={styles.languageSelector}>
                        <span>Việt Nam Vô Địch</span>
                    </div>

                    <div className={styles.topActions}>
                        {/* Music Player */}
                        <div className={styles.musicPlayer}>
                            <button onClick={toggleMusic} className={styles.playButton}>
                                {isPlaying ? (
                                    <Pause className={styles.icon} />
                                ) : (
                                    <Play className={styles.iconPlay} />
                                )}
                            </button>

                            <button onClick={toggleMute} className={styles.volumeButton}>
                                {isMuted ? (
                                    <VolumeX className={styles.icon} />
                                ) : (
                                    <Volume2 className={styles.icon} />
                                )}
                            </button>

                            <Music
                                className={`${styles.musicIcon} ${isPlaying ? styles.pulse : ''}`}
                                onClick={playNextTrack}
                            />
                        </div>

                        {/* Login Button */}
                        {!isLogin ? (
                            <button
                                className={styles.loginButton}
                                onClick={handleLogin}
                            >
                                <User className={styles.loginIcon} />
                                <span>Đăng Nhập</span>
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={handleLogout}
                                    className={styles.loginButton}
                                >
                                    Đăng Xuất
                                </button>
                                <Link href="/account" className={styles.welcomeText}>
                                    {user?.name}
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Main Logo & Title */}
                <div className={styles.mainSection}>
                    <div className={styles.logoContainer}>
                        <div className={styles.logoGlow}></div>
                        <div className={styles.logo}>
                            <Image
                                src="/image/logo.jpg"
                                alt="logo"
                                width={64}
                                height={64}
                                className={styles.logoIcon}
                                priority
                                unoptimized
                                quality={100}
                            />
                            <div className={styles.logoSparkle}>
                                <Sparkles className={styles.sparkleIcon} />
                            </div>
                        </div>
                    </div>

                    <div className={styles.titleSection}>
                        <h1 className={styles.title}>
                            <span className={styles.titleMain}>Artisté</span>
                            <span className={styles.titleSub}>mãi mận</span>
                        </h1>
                        <div className={styles.guildBadge}>
                            <Crown className={styles.badgeIcon} />
                            <span>Bang Artisté</span>
                        </div>
                        <p className={styles.subtitle}>Bang cần tiếng cười, Bang cần anh em</p>
                    </div>
                </div>

                {/* Stats & Info */}
                <div className={styles.infoSection}>
                    <div className={styles.statsGrid}>
                        <div className={styles.statCard}>
                            <div className={styles.statIconWrapper}>
                                <Calendar className={styles.statIcon} />
                            </div>
                            <div className={styles.statContent}>
                                <div className={styles.statValue}>02/09/2021</div>
                                <div className={styles.statLabel}>Ngày lập</div>
                            </div>
                        </div>

                        <div className={styles.statCard}>
                            <div className={styles.statIconWrapper}>
                                <Users className={styles.statIcon} />
                            </div>
                            <div className={styles.statContent}>
                                <div className={styles.statValue}>93</div>
                                <div className={styles.statLabel}>Thành viên</div>
                            </div>
                        </div>

                        <div className={styles.statCard}>
                            <div className={styles.statIconWrapper}>
                                <Shield className={styles.statIcon} />
                            </div>
                            <div className={styles.statContent}>
                                <div className={styles.statValue}>5</div>
                                <div className={styles.statLabel}>Cấp bang</div>
                            </div>
                        </div>
                    </div>

                    {/* Guild Motto */}
                    <div className={styles.motto}>
                        <div className={styles.mottoText}>
                            &quot;Kéo xe bò đi năn nỉ é&quot;
                        </div>
                        <div className={styles.mottoDivider}></div>
                    </div>
                </div>
            </div>

            {/* Navigation Wave */}
            <div className={styles.navWave}>
                <div className={styles.wave}></div>
            </div>

            {/* Login Modal */}
            {isLoginModalOpen && (
                <LoginModal isOpen={isLoginModalOpen} onClose={onCloseLogin} />
            )}

            {/* ⭐ Audio Element - BỎ LOOP */}
            <audio
                ref={audioRef}
                src={playlist[currentTrackIndex].url}
                onEnded={handleEnded}
            />
        </header>
    );
};

export default Header;