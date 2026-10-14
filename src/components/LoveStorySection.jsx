import React from 'react';

export default function LoveStorySection() {
  const stories = [
    {
      date: '10 / 2022',
      title: 'Ánh Mắt Đầu Tiên',
      desc: 'Tình cờ gặp gỡ giữa mùa thu Hà Nội, một cái nhìn dịu dàng đã mở ra câu chuyện tình yêu bình dị nhưng sâu lắng.',
      marker: '🏮',
    },
    {
      date: '12 / 2024',
      title: 'Lời Hẹn Ước Dưới Trăng',
      desc: 'Dưới ánh trăng thơ mộng bên bờ biển Đà Nẵng, anh trao chiếc nhẫn và nhận lại nụ cười đồng ý ngọt ngào.',
      marker: '💍',
    },
    {
      date: '05 / 2026',
      title: 'Khởi Đầu Trăm Năm',
      desc: 'Ngày hôm nay, trong tà áo Nhật Bình truyền thống, chúng mình chính thức kết tóc se duyên, trọn đời bên nhau.',
      marker: '❤️',
    },
  ];

  return (
    <section className="invitation-section" id="story">
      <p className="subtitle-traditional">Hành Trình Gắn Kết</p>
      <h2 className="title-royal">Chuyện Tình Yêu</h2>
      <div className="section-divider">
        <div className="line"></div>
        <img src="/assets/images/cloud_motif.svg" alt="Họa tiết mây cung đình" className="emblem" />
        <div className="line"></div>
      </div>

      <div className="love-story-card">
        <div className="story-timeline">
          {stories.map((item, index) => (
            <div className="story-item" key={index}>
              <div className="story-marker">{item.marker}</div>
              <div className="story-date">{item.date}</div>
              <h3 className="story-title">{item.title}</h3>
              <p className="story-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
