import React from 'react';

export default function TimelineSection() {
  const events = [
    { time: '11:00', title: 'Đón Tiếp Quý Khách', sub: 'Chụp ảnh kỷ niệm cùng Cô Dâu & Chú Rể' },
    { time: '11:45', title: 'Nghi Thức Thành Hôn', sub: 'Trao nhẫn cưới & Lời thề ước trăm năm' },
    { time: '12:15', title: 'Khai Tiệc Mừng Hỷ', sub: 'Thưởng thức ẩm thực & Âm nhạc truyền thống' },
    { time: '13:30', title: 'Cảm Ơn & Tiễn Khách', sub: 'Gửi trao món quà lưu niệm hoàng gia' },
  ];

  return (
    <section className="invitation-section" id="timeline">
      <p className="subtitle-traditional">Chương Trình</p>
      <h2 className="title-royal">Lịch Trình Tiệc Cưới</h2>
      <div className="section-divider">
        <div className="line"></div>
        <img src="/assets/images/cloud_motif.svg" alt="Họa tiết mây cung đình" className="emblem" />
        <div className="line"></div>
      </div>

      <div className="venue-card">
        <div className="timeline-list">
          {events.map((ev, idx) => (
            <div className="timeline-item" key={idx}>
              <div className="timeline-time">{ev.time}</div>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div>{ev.title}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--c-ink-muted)', fontWeight: 400, marginTop: '2px' }}>
                  {ev.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
