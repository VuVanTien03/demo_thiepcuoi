import React, { useState, useEffect, useCallback, useRef } from 'react';
import './styles/main.css';
import './styles/envelope.css';
import './styles/effects.css';

import ParticlesCanvas from './components/ParticlesCanvas';
import EnvelopeScreen from './components/EnvelopeScreen';
import HeroSection from './components/HeroSection';
import LoveStorySection from './components/LoveStorySection';
import CeremonySection from './components/CeremonySection';
import VenueSection from './components/VenueSection';
import TimelineSection from './components/TimelineSection';
import GallerySection from './components/GallerySection';
import GiftBoxSection from './components/GiftBoxSection';
import GuestbookSection from './components/GuestbookSection';
import RsvpSection from './components/RsvpSection';
import GiftModal from './components/GiftModal';
import LightboxModal from './components/LightboxModal';
import FloatingControls from './components/FloatingControls';
import Toast from './components/Toast';

export default function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [guestName, setGuestName] = useState('Quý Khách Quý & Gia Đình');
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const particleEngineRef = useRef(null);
  const toastTimeoutRef = useRef(null);

  // Parse guest name from URL search query (?to=... / ?khach=... / ?guest=...)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const guestParam = params.get('to') || params.get('khach') || params.get('guest');
      if (guestParam && guestParam.trim()) {
        setGuestName(guestParam.trim());
      }
    } catch {
      // ignore
    }
  }, []);

  const handleEngineReady = useCallback((engine) => {
    particleEngineRef.current = engine;
  }, []);

  const showToast = useCallback((msg) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(msg);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage('');
    }, 3200);
  }, []);

  const handleEnvelopeOpen = () => {
    setIsEnvelopeOpen(true);
    setIsMusicPlaying(true);
  };

  const handleReplayEnvelope = () => {
    setIsEnvelopeOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* 60 FPS HTML5 Canvas Petal & Gold Dust Particle Engine */}
      <ParticlesCanvas onEngineReady={handleEngineReady} />

      {/* Desktop Background Ambient Silk Lanterns */}
      <div className="desktop-backdrop" aria-hidden="true">
        <img 
          src="/assets/images/lantern.svg" 
          alt="Lồng đèn lụa đỏ" 
          className="lantern-hanger left" 
        />
        <img 
          src="/assets/images/lantern.svg" 
          alt="Lồng đèn lụa đỏ" 
          className="lantern-hanger right" 
        />
      </div>

      {/* 3D Wax-Sealed Folding Envelope Opening Screen */}
      <EnvelopeScreen 
        isOpen={isEnvelopeOpen} 
        onOpen={handleEnvelopeOpen} 
        guestName={guestName}
        particleEngine={particleEngineRef.current}
      />

      {/* Main Wedding Invitation Document Container */}
      <main className="app-viewport">
        {/* Traditional Imperial Corner Brackets */}
        <img src="/assets/images/corner_bracket.svg" alt="" className="corner-ornament top-left" aria-hidden="true" />
        <img src="/assets/images/corner_bracket.svg" alt="" className="corner-ornament top-right" aria-hidden="true" />
        <img src="/assets/images/corner_bracket.svg" alt="" className="corner-ornament bottom-left" aria-hidden="true" />
        <img src="/assets/images/corner_bracket.svg" alt="" className="corner-ornament bottom-right" aria-hidden="true" />

        {/* 1. Hero Showcase with Royal Arch, Countdown Timer & Couple Portrait */}
        <HeroSection guestName={guestName} />

        {/* 2. Love Story Journey Timeline */}
        <LoveStorySection />

        {/* 3. Official Ceremony Details & Dual Family Parents */}
        <CeremonySection />

        {/* 4. Banquet Venue, Google Maps & Royal Dress Code */}
        <VenueSection />

        {/* 5. Schedule of Events Timeline */}
        <TimelineSection />

        {/* 6. Wedding Album Photo Gallery */}
        <GallerySection 
          onSelectPhoto={(src, caption) => setLightboxPhoto({ src, caption })} 
        />

        {/* 7. Balanced Lacquer Gift Box (No Hint Badge per User Directive) */}
        <GiftBoxSection 
          onOpenGiftModal={() => setIsGiftModalOpen(true)} 
        />

        {/* 8. Interactive Guestbook with Real-time Wishes & Confetti */}
        <GuestbookSection 
          particleEngine={particleEngineRef.current}
          onShowToast={showToast}
        />

        {/* 9. RSVP Attendance Confirmation Form */}
        <RsvpSection 
          guestName={guestName}
          particleEngine={particleEngineRef.current}
          onShowToast={showToast}
        />

        {/* Royal Closing Footer */}
        <footer style={{
          padding: '40px 20px 48px',
          textAlign: 'center',
          borderTop: '1px solid var(--c-gold-border)',
          background: 'linear-gradient(180deg, var(--c-paper-cream) 0%, #F5EADB 100%)',
          marginTop: '20px'
        }}>
          <img 
            src="/assets/images/song_hy_gold.svg" 
            alt="Song Hỷ Hoàng Gia" 
            style={{ width: '48px', height: '48px', marginBottom: '14px', filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.15))' }} 
          />
          <h4 className="title-royal" style={{ fontSize: '1.2rem', marginBottom: '6px' }}>
            THẾ BẢO &amp; NGỌC ÁNH
          </h4>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: '1.02rem',
            color: 'var(--c-gold-dark)',
            maxWidth: '360px',
            margin: '0 auto 12px',
            lineHeight: '1.7',
            fontWeight: 500
          }}>
            "Cảm ơn bạn đã luôn đồng hành và là một phần tươi đẹp nhất trong câu chuyện tình yêu của chúng tôi."
          </p>
          <div style={{
            fontSize: '0.78rem',
            letterSpacing: '1.8px',
            color: 'var(--c-ink-muted)',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-sans)',
            fontWeight: 500
          }}>
            BÁCH NIÊN HẢO HỢP • VĨNH KẾT ĐỒNG TÂM
          </div>
        </footer>
      </main>

      {/* Floating Controls: Spinning Vinyl Guzheng Audio & Replay Envelope */}
      {isEnvelopeOpen && (
        <FloatingControls 
          isMusicPlaying={isMusicPlaying}
          setIsMusicPlaying={setIsMusicPlaying}
          onReplayEnvelope={handleReplayEnvelope}
        />
      )}

      {/* VietQR Wedding Gift Modal */}
      <GiftModal 
        isOpen={isGiftModalOpen}
        onClose={() => setIsGiftModalOpen(false)}
        onShowToast={showToast}
      />

      {/* Fullscreen Photo Lightbox Modal */}
      <LightboxModal 
        photo={lightboxPhoto}
        onClose={() => setLightboxPhoto(null)}
      />

      {/* Toast Notification Banner */}
      <Toast message={toastMessage} />
    </>
  );
}
