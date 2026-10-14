import React, { useState } from 'react';
import { audioManager } from '../utils/audioManager';

export default function EnvelopeScreen({ isOpen, onOpen, guestName, particleEngine }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenEnvelope = (e) => {
    if (isOpening || isOpen) return;
    setIsOpening(true);

    // 1. Play wax crack sound
    audioManager.playWaxCrack();

    // 2. Confetti burst from seal
    if (particleEngine) {
      const rect = e.currentTarget.getBoundingClientRect();
      particleEngine.burstConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }

    // 3. Play paper slide sound
    setTimeout(() => {
      audioManager.playPaperSlide();
    }, 400);

    // 4. Start ambient music
    setTimeout(() => {
      audioManager.startAmbientMusic();
    }, 900);

    // 5. Complete transition
    setTimeout(() => {
      onOpen();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  return (
    <div className={`envelope-screen ${isOpen ? 'opened' : ''}`} id="envelope-screen">
      <div 
        className={`envelope-wrapper ${isOpening ? 'opening' : ''}`} 
        onClick={handleOpenEnvelope}
        title="Bấm để mở phong bì thiệp cưới"
      >
        {/* Envelope Back & Brocade Lining */}
        <div className="envelope-back">
          <div className="envelope-inner-lining"></div>
        </div>

        {/* Letter Sheet emerging from inside */}
        <div className="letter-sheet">
          <div className="letter-tag">THIỆP BÁO HỶ HOÀNG GIA</div>
          <div className="letter-couple gold-shimmer">THẾ BẢO &amp; NGỌC ÁNH</div>
          <div className="letter-date">Chủ Nhật • 03 Tháng 05, 2026</div>
        </div>

        {/* Folding Flaps with 3D Depth */}
        <div className="flap-left"></div>
        <div className="flap-right"></div>
        <div className="flap-bottom"></div>
        <div className="flap-top"></div>

        {/* Silk Ribbon Wrap (Ruy Băng Lụa Đỏ & Viền Vàng) */}
        <div className="envelope-ribbon-h"></div>
        <div className="envelope-ribbon-v"></div>

        {/* Personalized Guest Badge */}
        <div className="guest-callout">
          <div className="guest-label">Trân trọng kính mời</div>
          <div className="guest-name">{guestName}</div>
        </div>

        {/* 3D Red Wax Seal with Golden Song Hỷ Stamp & Halo */}
        <button 
          type="button"
          className="wax-seal-btn" 
          aria-label="Mở phong bì"
          onClick={(e) => {
            e.stopPropagation();
            handleOpenEnvelope(e);
          }}
        >
          <img src="/assets/images/wax_seal.svg" alt="Con dấu sáp đỏ Song Hỷ" />
        </button>

        {/* Click to Open Hint */}
        <div className="open-hint">
          <span>✨</span> Chạm con dấu sáp để mở thiệp hoàng gia <span>✨</span>
        </div>
      </div>
    </div>
  );
}
