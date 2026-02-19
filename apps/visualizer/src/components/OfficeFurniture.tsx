'use client';

// Simple office furniture components
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
        className="absolute"
        style={{
          bottom: size === 'large' ? '12px' : '6px',
          left: '50%',
          width: '6px',
          height: size === 'large' ? '20px' : '14px',
          backgroundColor: '#228B22',
          transform: 'translateX(-50%)',
          borderRadius: '50% 50% 0 0',
        }}
      />
    </div>
  );
}

export function ServerRack({ top, left }: { top: string; left: string }) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{ top, left, width: '40px', height: '60px' }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: '#1a1a2a',
          border: '2px solid #2a3a4a',
          borderRadius: '2px',
        }}
      />
      <div
        className="absolute"
        style={{
          top: '15px',
          left: '4px',
          right: '4px',
          height: '8px',
          backgroundColor: '#0a0e1a',
        }}
      />
      <div
        className="absolute"
        style={{
          top: '25px',
          left: '4px',
          right: '4px',
          height: '8px',
          backgroundColor: '#0a0e1a',
        }}
      />
      <div
        className="absolute"
        style={{
          top: '17px',
          right: '8px',
          width: '2px',
          height: '2px',
          backgroundColor: '#00ff88',
          opacity: 0.8,
        }}
      />
      <div
        className="absolute"
        style={{
          top: '27px',
          right: '4px',
          width: '2px',
          height: '2px',
          backgroundColor: '#00f0ff',
          opacity: 0.6,
        }}
      />
    </div>
  );
}

export function CoffeeStation({ top, left }: { top: string; left: string }) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{ top, left, width: '32px', height: '40px' }}
    >
      <div
        className="absolute bottom-0"
        style={{
          width: '100%',
          height: '32px',
          backgroundColor: '#2a2a3a',
          borderRadius: '2px',
          border: '1px solid #3a3a4a',
        }}
      />
      <div
        className="absolute"
        style={{
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '8px',
          height: '6px',
          backgroundColor: '#1a1a2a',
        }}
      />
      <div
        className="absolute"
        style={{
          bottom: '6px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '6px',
          height: '10px',
          backgroundColor: '#fff',
          opacity: 0.8,
          borderRadius: '0 0 3px 3px',
        }}
      />
    </div>
  );
}

export function Window({ top, left, width = 40 }: { top: string; left: string; width?: number }) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        top,
        left,
        width: width + 'px',
        height: '60px',
        backgroundColor: '#0a0e3a',
        border: '2px solid #1a1f3a',
        borderRadius: '2px',
        opacity: 0.8,
      }}
    >
      <div
        className="absolute"
        style={{
          top: 0,
          left: '50%',
          width: '2px',
          height: '100%',
          backgroundColor: '#1a1f3a',
        }}
      />
      <div
        className="absolute"
        style={{
          top: '50%',
          left: 0,
          width: '100%',
          height: '2px',
          backgroundColor: '#1a1f3a',
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          top: '30%',
          left: '70%',
          width: '2px',
          height: '2px',
          backgroundColor: '#ffffff',
          opacity: 0.6,
        }}
      />
    </div>
  );
}