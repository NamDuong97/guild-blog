// Header.tsx
"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Users, Trophy, Gamepad2, Crown, Shield, Sparkles, User, Music, Play, Pause, Volume2, VolumeX, Eye, EyeOff, Lock } from 'lucide-react';
import styles from './Header.module.css';

const Header: React.FC = () => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isUserInteracted, setIsUserInteracted] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
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

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    // Login functions
    const handleLogin = () => {
        console.log('Login:', { username, password });
        alert(`Đăng nhập với tài khoản: ${username}`);
        setIsLoginModalOpen(false);
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

                            <Music className={`${styles.musicIcon} ${isPlaying ? styles.pulse : ''}`} />
                        </div>

                        {/* Login Button */}
                        <button
                            className={styles.loginButton}
                            onClick={() => setIsLoginModalOpen(true)}
                        >
                            <User className={styles.loginIcon} />
                            <span>Đăng Nhập</span>
                        </button>
                    </div>
                </div>

                {/* Main Logo & Title */}
                <div className={styles.mainSection}>
                    <div className={styles.logoContainer}>
                        <div className={styles.logoGlow}></div>
                        <div className={styles.logo}>
                            <Gamepad2 className={styles.logoIcon} />
                            <div className={styles.logoSparkle}>
                                <Sparkles className={styles.sparkleIcon} />
                            </div>
                        </div>
                    </div>

                    <div className={styles.titleSection}>
                        <h1 className={styles.title}>
                            <span className={styles.titleMain}>Atiste</span>
                            <span className={styles.titleSub}>Guild</span>
                        </h1>
                        <div className={styles.guildBadge}>
                            <Crown className={styles.badgeIcon} />
                            <span>Atiste Guild</span>
                        </div>
                        <p className={styles.subtitle}>Where Legends Are Forged in Fire</p>
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
                        <div className={styles.mottoText}>"From Ashes We Rise"</div>
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
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        {/* Nút đóng */}
                        <button onClick={() => setIsLoginModalOpen(false)} className={styles.closeButton}>
                            ×
                        </button>

                        {/* Header */}
                        <div className={styles.modalHeader}>
                            <div className={styles.modalIconWrapper}>
                                <User className={styles.modalHeaderIcon} />
                            </div>
                            <h2 className={styles.modalTitle}>Đăng Nhập</h2>
                            <p className={styles.modalSubtitle}>Chào mừng bạn trở lại!</p>
                        </div>

                        {/* Form */}
                        <div className={styles.modalForm}>
                            {/* Username */}
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Tài khoản</label>
                                <div className={styles.inputWrapper}>
                                    <User className={styles.inputIcon} />
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Nhập tài khoản"
                                        className={styles.input}
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Mật khẩu</label>
                                <div className={styles.inputWrapper}>
                                    <Lock className={styles.inputIcon} />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Nhập mật khẩu"
                                        className={styles.input}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className={styles.togglePassword}
                                    >
                                        {showPassword ? (
                                            <EyeOff className={styles.eyeIcon} />
                                        ) : (
                                            <Eye className={styles.eyeIcon} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Remember & Forgot */}
                            <div className={styles.options}>
                                <label className={styles.remember}>
                                    <input type="checkbox" className={styles.checkbox} />
                                    <span>Ghi nhớ đăng nhập</span>
                                </label>
                                <button className={styles.forgotPassword}>Quên mật khẩu?</button>
                            </div>

                            {/* Submit Button */}
                            <button onClick={handleLogin} className={styles.submitButton}>
                                Đăng Nhập Ngay
                            </button>

                            {/* Divider */}
                            <div className={styles.divider}>
                                <div className={styles.dividerLine}></div>
                                <span className={styles.dividerText}>Hoặc đăng nhập với</span>
                            </div>

                            {/* Social Login */}
                            <div className={styles.socialButtons}>
                                <button className={styles.facebookButton}>
                                    <span>📘</span>
                                    Facebook
                                </button>
                                <button className={styles.googleButton}>
                                    <span>🔍</span>
                                    Google
                                </button>
                            </div>

                            {/* Register Link */}
                            <div className={styles.register}>
                                <span className={styles.registerText}>Chưa có tài khoản? </span>
                                <button className={styles.registerLink}>Đăng ký ngay</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

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