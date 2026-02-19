'use client';

export function PottedPlant({ top, left, size = 'small' }: { top: string; left: string; size?: 'small' | 'large' }) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{ top, left, width: size === 'large' ? '24px' : '16px', height: size === 'large' ? '36px' : '24px' }}
    >
      <div
        className="absolute bottom-0"
        style={{
          width: '100%',
          height: size === 'large' ? '16px' : '10px',
          backgroundColor: '#8B4513',
          clipPath: 'polygon(15% 0, 85% 0, 100% 100%, 0% 100%)',
        }}
      />
      <div
        classN