import React from 'react';

export default function CeremonySection() {
  return (
    <section className="invitation-section" id="ceremony">
      <p className="subtitle-traditional">Trân Trọng Báo Hỷ</p>
      <h2 className="title-royal">Lễ Thành Hôn</h2>
      <div className="section-divider">
        <div className="line"></div>
        <img src="/assets/images/cloud_motif.svg" alt="Họa tiết mây cung đình" className="emblem" />
        <div className="line"></div>
      </div>

      <div className="ceremony-details-card">
        {/* Parents Information */}
        <div className="parents-grid">
          <div className="parent-side">
            <h4>NHÀ TRAI</h4>
            <div className="parent-names">
              Ông: <strong>Nguyễn Văn Hùng</strong><br />
              Bà: <strong>Trần Thị Lan</strong>
            </div>
            <div className="parent-address">TP. Hồ Chí Minh</div>
          </div>

          <div className="parent-side">
            <h4>NHÀ GÁI</h4>
            <div className="parent-names">
              Ông: <strong>Lê Văn Minh</strong><br />
              Bà: <strong>Phạm Thị Mai</strong>
            </div>
            <div className="parent-address">TP. Huế, Thừa Thiên Huế</div>
          </div>
        </div>

        {/* Ceremony Date & Time */}
        <div className="ceremony-meta">
          <div style={{ fontSize: '0.8rem', letterSpacing: '2px', color: 'var(--c-ink-muted)', marginBottom: '8px' }}>
            HÔN LỄ ĐƯỢC CỬ HÀNH VÀO LÚC
          </div>
          <div className="ceremony-time">09:00</div>

          <div className="ceremony-date-display">
            <span className="day-name">CHỦ NHẬT</span>
            <span className="day-number">03</span>
            <span className="month-year">THÁNG 05 / 2026</span>
          </div>

          <div className="lunar-date">
            (Tức ngày 17 tháng 03 năm Bính Ngọ)
          </div>
        </div>
      </div>
    </section>
  );
}
