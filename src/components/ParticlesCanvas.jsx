import React, { useEffect, useRef } from 'react';
import { ParticleEngine } from '../utils/particleEngine';

export default function ParticlesCanvas({ onEngineReady }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const engine = new ParticleEngine(canvasRef.current);
    if (onEngineReady) {
      onEngineReady(engine);
    }
    return () => {
      engine.destroy();
    };
  }, [onEngineReady]);

  return <canvas ref={canvasRef} id="particles-canvas" aria-hidden="true" />;
}
