import React, { useRef, useEffect } from 'react';

interface OscilloscopeProps {
  height?: number;
  mode?: 'sine' | 'pulse' | 'fft' | 'rf';
  color?: string;
  speed?: number;
  className?: string;
}

export const OscilloscopeCanvas: React.FC<OscilloscopeProps> = ({
  height = 80,
  mode = 'pulse',
  color = '#00F0FF',
  speed = 1,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let phase = 0;

    const render = () => {
      // Resize to display width
      const width = canvas.clientWidth;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      // Background with subtle phosphor fade
      ctx.fillStyle = 'rgba(5, 8, 13, 0.25)';
      ctx.fillRect(0, 0, width, height);

      // Oscilloscope background technical grid
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
      ctx.lineWidth = 1;
      const step = 20;

      // Draw faint center line
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      // Render waveform based on mode
      ctx.lineWidth = 2;
      ctx.strokeStyle = color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = color;
      ctx.beginPath();

      const centerY = height / 2;

      if (mode === 'pulse') {
        // Shockwave / ECG Pulse waveform
        for (let x = 0; x < width; x++) {
          const t = (x + phase) % width;
          let y = centerY;
          
          // periodic cardiac/shock spike
          const spikeCenter = width * 0.4;
          const dist = Math.abs(t - spikeCenter);

          if (dist < 40) {
            if (dist < 10) {
              y -= Math.sin(dist * 0.3) * (height * 0.42);
            } else if (dist < 22) {
              y += Math.sin((dist - 10) * 0.25) * (height * 0.25);
            } else {
              y -= Math.sin((dist - 22) * 0.15) * (height * 0.15);
            }
          } else {
            // subtle background thermal noise
            y += Math.sin((x * 0.05) + phase * 0.1) * 3 + (Math.random() - 0.5) * 2;
          }

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
      } else if (mode === 'fft') {
        // FFT Frequency Spectrum Bars
        const barCount = Math.floor(width / 8);
        const barWidth = 4;
        for (let i = 0; i < barCount; i++) {
          const x = i * 8;
          const freqNorm = i / barCount;
          const barHeight = Math.max(
            4,
            Math.sin(freqNorm * 8 + phase * 0.08) * (height * 0.35) +
            Math.cos(freqNorm * 18 - phase * 0.12) * (height * 0.2) +
            Math.random() * (height * 0.15)
          );
          ctx.fillStyle = i % 5 === 0 ? '#FFE600' : color;
          ctx.fillRect(x, height - barHeight, barWidth, barHeight);
        }
      } else if (mode === 'rf') {
        // High frequency RF Carrier with amplitude modulation
        for (let x = 0; x < width; x++) {
          const carrier = Math.sin((x * 0.2) + phase * 0.2);
          const envelope = Math.sin((x * 0.02) + phase * 0.04) * 0.5 + 0.5;
          const y = centerY + carrier * envelope * (height * 0.38);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
      } else {
        // Pure harmonic sine wave
        for (let x = 0; x < width; x++) {
          const y = centerY + Math.sin((x * 0.04) + phase * 0.06) * (height * 0.32);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
      }

      ctx.stroke();
      ctx.shadowBlur = 0;

      phase += 2.5 * speed;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [height, mode, color, speed]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`w-full block rounded border border-shockwave-border/60 ${className}`} 
      style={{ height: `${height}px` }}
    />
  );
};
