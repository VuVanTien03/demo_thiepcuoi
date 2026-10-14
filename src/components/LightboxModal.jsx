import React from 'react';

export default function LightboxModal({ photo, onClose }) {
  if (!photo) return null;

  return (
    <div className="modal-overlay active" onClick={onClose} style={{ zIndex: 2500 }}>
      <div 
        className="modal-card" 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: '600px', padding: '16px', background: '#120704', border: '2px solid var(--c-gold-primary)' }}
      >
        <button 
          type="button" 
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Đóng ảnh"
          style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}
        >
          ✕
        </button>

        <div style={{ borderRadius: '10px', overflow: 'hidden', maxHeight: '75vh' }}>
          <img 
            src={photo.src} 
            alt={photo.caption} 
            style={{ width: '100%', height: 'auto', maxHeight: '72vh', objectFit: 'contain', display: 'block' }} 
          />
        </div>

        {photo.caption && (
          <p style={{
            color: 'var(--c-gold-shimmer)',
            fontFamily: 'var(--font-royal)',
            fontSize: '0.9rem',
            marginTop: '12px',
            letterSpacing: '1px'
          }}>
            {photo.caption}
          </p>
        )}
      </div>
    </div>
  );
}
