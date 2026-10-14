import React, { useState } from 'react';
import { audioManager } from '../utils/audioManager';

export default function GiftModal({ isOpen, onClose, onShowToast }) {
  const [activeTab, setActiveTab] = useState('groom');

  if (!isOpen) return null;

  const handleCopy = (accountNumber, ownerName) => {
    navigator.clipboard.writeText(accountNumber).then(() => {
      audioManager.playCoinSound();
      onShowToast(`Đã sao chép số tài khoản của ${ownerName}! 💰`);
    }).catch(() => {
      onShowToast('Không thể tự động sao chép, vui lòng nhập thủ công.');
    });
  };

  return (
    <div className={`modal-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button 
          type="button" 
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Đóng cửa sổ mừng cưới"
        >
          ✕
        </button>

        <p className="subtitle-traditional" style={{ marginTop: '4px' }}>MỪNG CƯỚI ĐÔI UYÊN ƯƠNG</p>
        <h3 className="title-royal" style={{ fontSize: '1.25rem', marginBottom: '8px' }}>
          Hộp Mừng Cưới Hoàng Gia
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--c-ink-muted)' }}>
          Quý khách có thể quét mã VietQR hoặc chuyển khoản trực tiếp bên dưới:
        </p>

        {/* Tab switcher */}
        <div className="qr-tabs">
          <button 
            type="button" 
            className={`qr-tab-btn ${activeTab === 'groom' ? 'active' : ''}`}
            onClick={() => setActiveTab('groom')}
          >
            Mừng Chú Rể (Nhà Trai)
          </button>
          <button 
            type="button" 
            className={`qr-tab-btn ${activeTab === 'bride' ? 'active' : ''}`}
            onClick={() => setActiveTab('bride')}
          >
            Mừng Cô Dâu (Nhà Gái)
          </button>
        </div>

        {/* Groom Pane */}
        {activeTab === 'groom' && (
          <div className="qr-pane active">
            <div className="qr-image-frame">
              <img src="/assets/images/vietqr_groom.svg" alt="VietQR Chú Rể Thế Bảo" />
            </div>
            <div className="account-info">
              <div className="acc-name">NGUYEN THE BAO (Chú Rể)</div>
              <div className="acc-number">9999 8888 6666</div>
              <div className="acc-bank">Ngân hàng Quân Đội (MB Bank) - Chi nhánh TP.HCM</div>
            </div>
            <button 
              type="button" 
              className="btn-royal btn-royal-gold" 
              style={{ fontSize: '0.85rem', padding: '10px 22px' }}
              onClick={() => handleCopy('999988886666', 'Chú Rể Thế Bảo')}
            >
              📋 Sao Chép Số Tài Khoản
            </button>
          </div>
        )}

        {/* Bride Pane */}
        {activeTab === 'bride' && (
          <div className="qr-pane active">
            <div className="qr-image-frame">
              <img src="/assets/images/vietqr_bride.svg" alt="VietQR Cô Dâu Ngọc Ánh" />
            </div>
            <div className="account-info">
              <div className="acc-name">LE NGOC ANH (Cô Dâu)</div>
              <div className="acc-number">0071 0012 34567</div>
              <div className="acc-bank">Ngân hàng Ngoại Thương (Vietcombank) - Chi nhánh Huế</div>
            </div>
            <button 
              type="button" 
              className="btn-royal btn-royal-gold" 
              style={{ fontSize: '0.85rem', padding: '10px 22px' }}
              onClick={() => handleCopy('0071001234567', 'Cô Dâu Ngọc Ánh')}
            >
              📋 Sao Chép Số Tài Khoản
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
