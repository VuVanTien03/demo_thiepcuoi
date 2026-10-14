import React from 'react';

export default function GallerySection({ onSelectPhoto }) {
  const photos = [
    {
      src: '/assets/images/couple_nhat_binh.jpg',
      caption: 'Thế Bảo & Ngọc Ánh trong trang phục Nhật Bình Đỏ',
      featured: true,
    },
    {
      src: '/assets/images/wedding_album_1.jpg',
      caption: 'Khoảnh khắc bình yên bên thềm hoa xuân',
      featured: false,
    },
    {
      src: '/assets/images/wedding_album_2.jpg',
      caption: 'Nụ cười rạng rỡ của nàng dâu mới',
      featured: false,
    },
  ];

  return (
    <section className="invitation-section" id="gallery">
      <p className="subtitle-traditional">Khoảnh Khắc</p>
      <h2 className="title-royal">Album Ảnh Cưới</h2>
      <div className="section-divider">
        <div className="line"></div>
        <img src="/assets/images/cloud_motif.svg" alt="Họa tiết mây cung đình" className="emblem" />
        <div className="line"></div>
      </div>

      <div className="gallery-grid">
        {photos.map((p, idx) => (
          <div 
            key={idx}
            className={`gallery-card ${p.featured ? 'featured' : ''}`}
            onClick={() => onSelectPhoto(p.src, p.caption)}
            title="Bấm để xem ảnh phóng to"
          >
            <img src={p.src} alt={p.caption} loading="lazy" />
            <div className="gallery-overlay">
              <span>🔍 {p.caption}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
