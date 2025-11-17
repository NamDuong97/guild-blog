// Header.tsx
"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Users, Trophy, Gamepad2, Crown, Shield, Sparkles, User, Music, Play, Pause, Volume2, VolumeX, Eye, EyeOff, Lock } from 'lucide-react';
import styles from './Header.module.css';
import LoginModal from '../LoginModal/LoginModal'
import { useUser } from '@/contexts/UserContext'

const Header: React.FC = () => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isUserInteracted, setIsUserInteracted] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isLogin, setLogin] = useState(false);
    const { user, logout, loadUser } = useUser();
    const audioRef = useRef<HTMLAudioElement>(null);

    const playlist = [
        { id: 1, name: "Bá Hổ Thuyết", url: "/music/bahothuyet.mp3" },
        { id: 2, name: "Thương Thì Thôi", url: "/music/thuongthithoi.mp3" }
    ];

    // Music Player functions
    const toggleMusic = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    // Xử lý khi kết thúc bài hát
    const handleEnded = () => {
        playNextTrack();
    };

    // Xử lý bật bài hát tiếp theo
    const playNextTrack = () => {
        const nextIndex = (currentTrackIndex + 1) % playlist.length;
        setCurrentTrackIndex(nextIndex);
        setIsPlaying(true);

        // Đảm bảo audio được load và play
        setTimeout(() => {
            if (audioRef.current) {
                audioRef.current.play();
            }
        }, 100);
    };

    useEffect(() => {
        const handleUserInteraction = () => {
            setIsUserInteracted(true);
            if (audioRef.current && !isPlaying) {
                audioRef.current.play().then(() => {
                    setIsPlaying(true);
                });
            }
            document.removeEventListener('click', handleUserInteraction);
        };

        document.addEventListener('click', handleUserInteraction);

        return () => {
            document.removeEventListener('click', handleUserInteraction);
        };
    }, []);

    useEffect(() => {
        if (user) setLogin(true);
        else setLogin(false);
    }, [user]);

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    // Login functions
    const handleLogin = () => {
        loadUser();
        if (!isLoginModalOpen) {
            setIsLoginModalOpen(true);
        }
    };

    const handleLogout = async () => {
        setLogin(true);
        console.log("Ban đã logout");
        await logout();
    };

    const onCloseLogin = () => {
        if (isLoginModalOpen) {
            setIsLoginModalOpen(false);
        }
    };

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
                        <span>Việt Nam</span>
                        <span className={styles.dropdownIcon}>▼</span>
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

                            <Music className={`${styles.musicIcon} ${isPlaying ? styles.pulse : ''}`} onClick={playNextTrack} />
                        </div>

                        {/* Login Button */}

                        {
                            !isLogin ?
                                <button
                                    className={styles.loginButton}
                                    onClick={handleLogin}
                                >
                                    <User className={styles.loginIcon} />
                                    <span>Đăng Nhập</span>
                                </button> : (
                                    <><button
                                        onClick={handleLogout}
                                        className={styles.loginButton}
                                    >
                                        Đăng Xuất
                                    </button><p className={styles.welcomeText}>Xin Chào {user?.name}</p></>
                                )
                        }


                    </div>
                </div>

                {/* Main Logo & Title */}
                <div className={styles.mainSection}>
                    <div className={styles.logoContainer}>
                        <div className={styles.logoGlow}></div>
                        <div className={styles.logo}>
                            {/* <Gamepad2 className={styles.logoIcon} /> */}
                            <img src="/image/logo.jpg" alt="logo" className={styles.logoIcon} />
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
                                <Users className={styles.statIcon} />
                            </div>
                            <div className={styles.statContent}>
                                <div className={styles.statValue}>58</div>
                                <div className={styles.statLabel}>Active Members</div>
                            </div>
                        </div>

                        <div className={styles.statCard}>
                            <div className={styles.statIconWrapper}>
                                <Trophy className={styles.statIcon} />
                            </div>
                            <div className={styles.statContent}>
                                <div className={styles.statValue}>Top 3</div>
                                <div className={styles.statLabel}>Server Rank</div>
                            </div>
                        </div>

                        <div className={styles.statCard}>
                            <div className={styles.statIconWrapper}>
                                <Shield className={styles.statIcon} />
                            </div>
                            <div className={styles.statContent}>
                                <div className={styles.statValue}>Lv5</div>
                                <div className={styles.statLabel}>Guild Level</div>
                            </div>
                        </div>
                    </div>

                    {/* Guild Motto */}
                    <div className={styles.motto}>
                        <div className={styles.mottoText}>"Kéo xe bò đi năn nỉ é"</div>
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
                <LoginModal isOpen={isLoginModalOpen} onClose={onCloseLogin} />)
            }

            {/* Audio Element */}
            <audio
                ref={audioRef}
                loop={false} // Tắt loop để chuyển bài tự động
                src={playlist[currentTrackIndex].url}
                onEnded={handleEnded}
            />
        </header>
    );
};

export default Header;