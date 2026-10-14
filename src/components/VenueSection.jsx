import React from 'react';

export default function VenueSection() {
  const dressCodes = [
    { icon: '👘', title: 'ÁO DÀI', desc: 'Truyền thống' },
    { icon: '👗', title: 'DẠ HỘI', desc: 'Trang nhã' },
    { icon: '🤵', title: 'ÂU PHỤC', desc: 'Lịch lãm' },
  ];

  const swatches = [
    { className: 'c1', name: 'Đỏ Son' },
    { className: 'c2', name: 'Đỏ Thẫm' },
    { className: 'c3', name: 'Hồng Phấn' },
    { className: 'c4', name: 'Hoàng Kim' },
  ];

  return (
    <section className="invitation-section" id="venue">
      <p className="subtitle-traditional">Không Gian Tiệc Cưới</p>
      <h2 className="title-royal">Địa Điểm Đón Tiếp</h2>
      <div className="section-divider">
        <div className="line"></div>
        <img src="/assets/images/cloud_motif.svg" alt="Họa tiết mây cung đình" className="emblem" />
        <div className="line"></div>
      </div>

      <div className="venue-card">
        <h3 className="venue-name">WHITE PALACE CONVENTION CENTER</h3>
        <p className="venue-address">
          Sảnh Grand Ballroom • 194 Hoàng Văn Thụ, Phường 9, Quận Phú Nhuận, TP. Hồ Chí Minh
        </p>

        <div className="map-wrapper">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.1678252278917!2d106.67137837583852!3d10.798453958788417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528d73b06ad4b%3A0x6b107b7ad9cebcfc!2sWhite%20Palace%20Convention%20Center!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s" 
            title="Bản đồ chỉ đường White Palace"
            loading="lazy"
            allowFullScreen=""
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <a 
          href="https://maps.google.com/?q=White+Palace+194+Hoang+Van+Thu+Phu+Nhuan" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn-royal btn-royal-primary"
          style={{ fontSize: '0.85rem', padding: '10px 22px' }}
        >
          📍 Mở Bản Đồ Chỉ Đường
        </a>
      </div>

      {/* Dress Code Section */}
      <div className="venue-card" style={{ marginTop: '20px' }}>
        <p className="subtitle-traditional">Gợi Ý Trang Phục</p>
        <h3 className="venue-name" style={{ fontSize: '1.1rem' }}>DRESS CODE HOÀNG GIA</h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--c-ink-muted)' }}>
          Kính mời quý khách ưu tiên trang phục trang nhã, truyền thống hoặc dạ tiệc
        </p>

        <div className="dress-code-cards">
          {dressCodes.map((d, idx) => (
            <div className="dress-card-item" key={idx}>
              <div className="dress-card-icon">{d.icon}</div>
              <div className="dress-card-title">{d.title}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--c-ink-muted)' }}>{d.desc}</div>
            </div>
          ))}
        </div>

        <div className="dress-code-palette">
          {swatches.map((s, idx) => (
            <div className="color-swatch-item" key={idx}>
              <div className={`swatch-circle ${s.className}`}></div>
              <span className="swatch-label">{s.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
