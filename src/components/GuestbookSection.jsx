import React, { useState, useEffect } from 'react';
import { audioManager } from '../utils/audioManager';

export default function GuestbookSection({ particleEngine, onShowToast }) {
  const [wishes, setWishes] = useState([
    {
      author: 'Gia đình Bác Hùng',
      time: 'Vừa xong',
      text: 'Chúc hai cháu trăm năm tình viên mãn, đầu bạc răng long, luôn yêu thương và cùng nhau xây đắp tổ ấm hạnh phúc viên mãn!',
    },
    {
      author: 'Minh Tuấn (Bạn Thân Chú Rể)',
      time: '15 phút trước',
      text: 'Chúc mừng người anh em đã tìm được một nửa hoàn hảo của đời mình! Chúc hai bạn sớm có quý tử và một gia đình luôn ngập tràn tiếng cười!',
    },
    {
      author: 'Thùy Chi (Đồng Nghiệp Cô Dâu)',
      time: '1 giờ trước',
      text: 'Bộ thiệp Nhật Bình quá xuất sắc và trang trọng! Chúc Ngọc Ánh luôn là cô dâu xinh đẹp, rạng rỡ và hạnh phúc nhất trần đời!',
    },
  ]);

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('wedding_wishes_react');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setWishes(parsed);
        }
      }
    } catch {
      // Fallback to default
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      onShowToast('Vui lòng nhập tên và lời chúc phúc!');
      return;
    }

    const newWish = {
      author: name.trim(),
      time: 'Vừa xong',
      text: message.trim(),
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    try {
      localStorage.setItem('wedding_wishes_react', JSON.stringify(updated));
    } catch {
      // ignore
    }

    setName('');
    setMessage('');

    // Audio & Particle Celebration
    audioManager.playChime();
    if (particleEngine) {
      particleEngine.burstConfetti(window.innerWidth / 2, window.innerHeight * 0.7);
    }
    onShowToast('Cảm ơn lời chúc phúc tốt đẹp của bạn! ❤️');
  };

  return (
    <section className="invitation-section" id="guestbook">
      <p className="subtitle-traditional">Gửi Trao Yêu Thương</p>
      <h2 className="title-royal">Sổ Lưu Bút Hoàng Gia</h2>
      <div className="section-divider">
        <div className="line"></div>
        <img src="/assets/images/cloud_motif.svg" alt="Họa tiết mây cung đình" className="emblem" />
        <div className="line"></div>
      </div>

      <div className="guestbook-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="guestbook-name">TÊN CỦA BẠN</label>
            <input 
              type="text" 
              id="guestbook-name" 
              className="form-input" 
              placeholder="Ví dụ: Anh Tuấn & Chị Lan" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="guestbook-msg">LỜI CHÚC PHÚC</label>
            <textarea 
              id="guestbook-msg" 
              className="form-textarea" 
              placeholder="Gửi gắm lời chúc chân thành đến Thế Bảo & Ngọc Ánh..." 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="btn-royal btn-royal-primary" 
            style={{ width: '100%', marginTop: '6px' }}
          >
            💌 Gửi Lời Chúc Phúc
          </button>
        </form>

        <div className="wishes-stream">
          {wishes.map((w, idx) => (
            <div className="wish-item" key={idx}>
              <div className="wish-author">
                <span>{w.author}</span>
                <span className="wish-time">{w.time}</span>
              </div>
              <div className="wish-text">{w.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
