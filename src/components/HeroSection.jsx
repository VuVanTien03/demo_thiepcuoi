import React, { useState, useEffect } from 'react';

export default function HeroSection({ guestName }) {
  const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', mins: '00', secs: '00' });

  useEffect(() => {
    function calcTime() {
      const now = new Date();
      const currentYear = now.getFullYear();
      let targetDate = new Date(`${currentYear}-05-03T09:00:00+07:00`).getTime();
      if (targetDate - now.getTime() < 0) {
        targetDate = new Date(`${currentYear + 1}-05-03T09:00:00+07:00`).getTime();
      }

      const distance = targetDate - now.getTime();
      if (distance < 0) return;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days: days < 10 ? '0' + days : String(days),
        hours: hours < 10 ? '0' + hours : String(hours),
        mins: minutes < 10 ? '0' + minutes : String(minutes),
        secs: seconds < 10 ? '0' + seconds : String(seconds),
      });
    }

    calcTime();
    const timer = setInterval(calcTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Royal Brocade Arch Header Crest with Hue Phoenix Silk Pattern */}
      <div className="royal-header-crest">
        <div className="royal-crest-emblem">
          <img src="/assets/images/song_hy_gold.svg" alt="Song Hỷ Hoàng Gia" />
          <div className="royal-crest-badge">ĐẠI HỶ HOÀNG GIA</div>
        </div>
      </div>

      <section className="hero-section" id="hero">
        <div className="hero-subtitle">NHÀ CÓ HỶ • BÁCH NIÊN HẢO HỢP</div>

        <h1 className="hero-couple-names">
          <span className="gold-shimmer">THẾ BẢO</span>
          <div className="ampersand">&amp;</div>
          <span className="gold-shimmer">NGỌC ÁNH</span>
        </h1>

        {/* Days of Love Counter */}
        <div>
          <span className="love-days-badge">❤️ 1,280 Ngày Yêu Thương &amp; Gắn Kết</span>
        </div>

        {/* Portrait of Royal Couple in Áo Nhật Bình */}
        <div className="hero-portrait-frame">
          <div className="vermilion-seal">
            <span>TRĂM NĂM</span>
            <span>HẠNH PHÚC</span>
          </div>
          <img src="/assets/images/couple_nhat_binh.jpg" alt="Thế Bảo và Ngọc Ánh trong trang phục Nhật Bình" />
          <div className="hero-portrait-tag">TRĂM NĂM VIÊN MÃN</div>
        </div>

        {/* Poetic Couple Banner */}
        <div style={{
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontSize: '1.05rem',
          color: 'var(--c-gold-dark)',
          maxWidth: '360px',
          margin: '0 auto 20px',
          lineHeight: '1.7',
          fontWeight: 500
        }}>
          "Trăm năm kết tóc se duyên<br />Một đời trọn vẹn nghĩa tình phu thê"
        </div>

        {/* Personalized Guest Welcome Box */}
        <div style={{ marginBottom: '24px' }}>
          <p className="subtitle-traditional">Thân Mời</p>
          <p className="title-royal" style={{ fontSize: '1.5rem', color: 'var(--c-red-primary)', marginTop: '4px' }}>{guestName}</p>
          <p style={{ fontSize: '0.92rem', color: 'var(--c-ink-muted)' }}>Đến dự ngày vui và chung vui cùng gia đình chúng tôi</p>
        </div>

        {/* Countdown Timer */}
        <div className="countdown-container">
          <div style={{
            fontSize: '0.8rem',
            fontWeight: 600,
            color: 'var(--c-gold-dark)',
            letterSpacing: '1.8px',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-sans)',
            marginBottom: '12px'
          }}>
            ĐẾM NGƯỢC ĐẾN NGÀY THÀNH HÔN
          </div>
          <div className="countdown-grid">
            <div className="countdown-box">
              <div className="count-num">{timeLeft.days}</div>
              <div className="count-label">Ngày</div>
            </div>
            <div className="countdown-colon">:</div>
            <div className="countdown-box">
              <div className="count-num">{timeLeft.hours}</div>
              <div className="count-label">Giờ</div>
            </div>
            <div className="countdown-colon">:</div>
            <div className="countdown-box">
              <div className="count-num">{timeLeft.mins}</div>
              <div className="count-label">Phút</div>
            </div>
            <div className="countdown-colon">:</div>
            <div className="countdown-box">
              <div className="count-num">{timeLeft.secs}</div>
              <div className="count-label">Giây</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '18px', flexWrap: 'wrap' }}>
            <a 
              href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Lễ+Thành+Hôn+-+Thế+Bảo+%26+Ngọc+Ánh&dates=20260503T020000Z/20260503T140000Z&details=Hân+hạnh+đón+tiếp+quý+khách+tại+White+Palace+Convention+Center&location=194+Hoàng+Văn+Thụ,+Phú+Nhuận,+TP.+Hồ+Chí+Minh" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-royal btn-royal-gold" 
              style={{ fontSize: '0.85rem', padding: '10px 20px' }}
            >
              📅 Thêm vào lịch
            </a>
            <a 
              href="#rsvp" 
              className="btn-royal btn-royal-primary" 
              style={{ fontSize: '0.85rem', padding: '10px 20px' }}
            >
              ✍️ Xác nhận tham dự
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
