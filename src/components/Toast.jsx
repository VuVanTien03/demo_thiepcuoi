import React from 'react';

export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div className={`toast-notice ${message ? 'show' : ''}`} role="alert">
      {message}
    </div>
  );
}
