import React from 'react';
import { audioManager } from '../utils/audioManager';

export default function FloatingControls({ isMusicPlaying, setIsMusicPlaying, onReplayEnvelope }) {
  const toggleMusic = () => {
    if (isMusicPlaying) {
      audioManager.stopAmbientMusic();
      setIsMusicPlaying(false);
    } else {
      audioManager.startAmbientMusic();
      setIsMusicPlaying(true);
    }
  };

  return (
    <>
      {/* Replay Envelope Screen Button */}
      <button 
        type="button" 
        className="replay-envelope-btn" 
        onClick={onReplayEnvelope}
        title="Xem lại phong bì thiệp cưới"
      >
        ✉️ Xem Lại Phong Bì
      </button>

      {/* Floating Vinyl Audio Control */}
      <div className="floating-audio-ctrl">
        <button 
          type="button" 
          className={`vinyl-disc-btn ${isMusicPlaying ? 'playing' : ''}`} 
          onClick={toggleMusic}
          title={isMusicPlaying ? 'Tạm dừng nhạc Guzheng cung đình' : 'Bật nhạc Guzheng cung đình'}
          aria-label="Điều khiển âm nhạc"
        >
          <div className="vinyl-center-dot">
            {isMusicPlaying ? '🎵' : '🔇'}
          </div>
        </button>
      </div>
    </>
  );
}
