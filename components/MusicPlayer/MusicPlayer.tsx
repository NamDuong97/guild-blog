"use client";
import React, { useState, useRef } from 'react';
import { Music, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import styles from './MusicPlayer.module.css';

interface MusicPlayerProps {
  audioSrc?: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  audioSrc = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

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

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
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

      <audio ref={audioRef} loop src={audioSrc} />
    </>
  );
};

export default MusicPlayer;