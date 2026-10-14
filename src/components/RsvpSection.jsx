import React, { useState } from 'react';
import { audioManager } from '../utils/audioManager';

export default function RsvpSection({ guestName, particleEngine, onShowToast }) {
  const [name, setName] = useState(guestName || '');
  const [phone, setPhone] = useState('');
  const [count, setCount] = useState('1');
  const [status, setStatus] = useState('attend');
  const [diet, setDiet] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      onShowToast('Vui lòng nhập họ và tên của bạn!');
      return;
    }

    setIsSubmitted(true);
    audioManager.playChime();
    if (particleEngine) {
      particleEngine.burstConfetti(window.innerWidth / 2, window.innerHeight * 0.75);
    }

    if (status === 'attend') {
      onShowToast('Cảm ơn bạn! Hân hạnh được đón tiếp bạn tại lễ cưới! 🥂');
    } else {
      onShowToast('Cảm ơn bạn đã phản hồi! Chúc bạn luôn an khang! 🌸');
    }
  };

  return (
    <section className="invitation-section" id="rsvp">
      <p className="subtitle-traditional">Phản Hồi</p>
      <h2 className="title-royal">Xác Nhận Tham Dự (RSVP)</h2>
      <div className="section-divider">
        <div className="line"></div>
        <img src="/assets/images/cloud_motif.svg" alt="Họa tiết mây cung đình" className="emblem" />
        <div className="line"></div>
      </div>

      <div className="guestbook-card">
        {isSubmitted ? (
          <div style={{ padding: '24px 10px', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🎊</div>
            <h3 className="title-royal" style={{ fontSize: '1.25rem' }}>Đã Nhận Phản Hồi!</h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--c-ink)', marginTop: '8px', lineHeight: '1.6' }}>
              Trân trọng cảm ơn <strong>{name}</strong> đã xác nhận thông tin. Đôi tân lang và tân nương rất mong chờ được hội ngộ cùng quý khách!
            </p>
            <button 
              type="button" 
              className="btn-royal btn-royal-gold" 
              style={{ marginTop: '18px', fontSize: '0.85rem' }}
              onClick={() => setIsSubmitted(false)}
            >
              Chỉnh Sửa Lại Phản Hồi
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <p style={{ fontSize: '0.85rem', color: 'var(--c-ink-muted)', marginBottom: '18px' }}>
              Để gia đình chuẩn bị chu đáo nhất, xin vui lòng phản hồi trước ngày <strong>20/04/2026</strong>.
            </p>

            <div className="form-group">
              <label htmlFor="rsvp-name">HỌ VÀ TÊN</label>
              <input 
                type="text" 
                id="rsvp-name" 
                className="form-input" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Ví dụ: Nguyễn Văn Hùng" 
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="rsvp-phone">SỐ ĐIỆN THOẠI</label>
              <input 
                type="tel" 
                id="rsvp-phone" 
                className="form-input" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                placeholder="Số điện thoại liên hệ" 
              />
            </div>

            <div className="form-group">
              <label htmlFor="rsvp-count">SỐ LƯỢNG KHÁCH THAM DỰ</label>
              <select 
                id="rsvp-count" 
                className="form-input" 
                value={count} 
                onChange={(e) => setCount(e.target.value)}
              >
                <option value="1">1 Người (Đi một mình)</option>
                <option value="2">2 Người (Đi cùng người thương / bạn bè)</option>
                <option value="3">3 Người</option>
                <option value="family">Cả Gia Đình</option>
              </select>
            </div>

            <div className="form-group">
              <label>BẠN SẼ THAM DỰ CHỨ?</label>
              <div style={{ display: 'flex', gap: '14px', marginTop: '6px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', cursor: 'pointer' }}>
                  <input 
                    type="radio" 
                    name="rsvp-status" 
                    value="attend" 
                    checked={status === 'attend'} 
                    onChange={() => setStatus('attend')} 
                  />
                  <span>Chắc chắn tham dự</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', cursor: 'pointer' }}>
                  <input 
                    type="radio" 
                    name="rsvp-status" 
                    value="decline" 
                    checked={status === 'decline'} 
                    onChange={() => setStatus('decline')} 
                  />
                  <span>Rất tiếc không thể đến</span>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="rsvp-diet">LƯU Ý ĐẶC BIỆT / ĂN CHAY (NẾU CÓ)</label>
              <input 
                type="text" 
                id="rsvp-diet" 
                className="form-input" 
                value={diet} 
                onChange={(e) => setDiet(e.target.value)} 
                placeholder="Ví dụ: Ăn chay, dị ứng hải sản..." 
              />
            </div>

            <button 
              type="submit" 
              className="btn-royal btn-royal-primary" 
              style={{ width: '100%', marginTop: '8px' }}
            >
              ✅ Gửi Xác Nhận Tham Dự
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
