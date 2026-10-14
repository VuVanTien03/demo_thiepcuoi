import React from 'react';

export default function GiftBoxSection({ onOpenGiftModal }) {
  return (
    <section className="invitation-section" id="gift">
      <p className="subtitle-traditional">Gửi Mừng Chúc Phúc</p>
      <h2 className="title-royal">Hộp Quà Mừng Cưới</h2>
      <div className="section-divider">
        <div className="line"></div>
        <img src="/assets/images/cloud_motif.svg" alt="Họa tiết mây cung đình" className="emblem" />
        <div className="line"></div>
      </div>

      <div className="giftbox-card">
        <div className="giftbox-glow"></div>

        {/* Balanced Ornamental Circular Royal Medallion - No Hint Badge per User Request */}
        <div 
          className="giftbox-interactive" 
          onClick={onOpenGiftModal}
          title="Tráp Quà Mừng Cưới Hoàng Gia"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onOpenGiftModal();
            }
          }}
        >
          <img src="/assets/images/lacquer_gift_box.jpg" alt="Tráp Sơn Mài Hoàng Gia Mừng Cưới" />
        </div>

        {/* Subtle Grounding Shadow for visual equilibrium */}
        <div className="giftbox-shadow"></div>

        <p style={{
          marginTop: '22px',
          fontSize: '0.92rem',
          color: 'var(--c-ink)',
          maxWidth: '340px',
          lineHeight: '1.6'
        }}>
          Sự hiện diện và lời chúc phúc của quý khách là món quà ý nghĩa nhất dành cho đôi uyên ương trong ngày vui trọng đại.
        </p>

        <button 
          type="button" 
          className="btn-royal btn-royal-gold" 
          style={{ marginTop: '16px', fontSize: '0.92rem' }}
          onClick={onOpenGiftModal}
        >
          🎁 Mở Tráp Mừng Cưới (VietQR)
        </button>
      </div>
    </section>
  );
}
