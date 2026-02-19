'use client';

// Subtle office furniture as CSS pixel art
export function PottedPlant({ top, left, size = 'small' }: { top: string; left: string; size?: 'small' | 'large' }) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{ top, left, width: size === 'large' ? '24px' : '16px', height: size === 'large' ? '36px' : '24px' }}
    >
      {/* Pot */}
      <div
        className="absolute bottom-0"
        style={{
          width: '100%',
          height: size === 'large' ? '16px' : '10px',
          backgroundColor: '#8B4513',
          clipPath: 'polygon(15% 0, 85% 0, 100% 100%, 0% 100%)',
        }}
      />
      {/* Plant leaves */}
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
      <div
        className="absolute"
        style={{
          bottom: size === 'large' ? '15px' : '8px',
          left: '20%',
          width: '5px',
          height: size === 'large' ? '16px' : '10px',
          backgroundColor: '#32CD32',
          borderRadius: '50% 50% 0 50%',
          transform: 'rotate(-20deg)',
        }}
      />
      <div
        className="absolute"
        style={{
          bottom: size === 'large' ? '15px' : '8px',
          right: '20%',
          width: '5px',
          height: size === 'large' ? '16px' : '10px',
          backgroundColor: '#32CD32',
          borderRadius: '50% 50% 50% 0',
          transform: 'rotate(20deg)',
        }}
      />
    </div>
  );
}

export function OfficeChair({ color = '#444' }: { color?: string }) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        width: '20px',
        height: '28px',
        opacity: 0.6,
      }}
    >
      {/* Seat */}
      <div
        className="absolute bottom-4"
        style={{
          width: '20px',
          height: '6px',
          backgroundColor: color,
          borderRadius: '2px',
        }}
      />
      {/* Back */}
      <div
        className="absolute bottom-10"
        style={{
          width: '16px',
          height: '16px',
          backgroundColor: color,
          borderRadius: '2px',
          left: '2px',
        }}
      />
      {/* Base */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{
          width: '2px',
          height: '4px',
          backgroundColor: '#666',
        }}
      />
      <div
        className="absolute bottom-0"
        style={{
          width: '14px',
          height: '2px',
          backgroundColor: '#666',
          left: '3px',
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
      {/* Machine body */}
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
      {/* Dispenser */}
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
      {/* Cup */}
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
      {/* Steam */}
      <div
        className="absolute"
        style={{
          top: '8px',
          left: '50%',
          width: '2px',
          height: '4px',
          backgroundColor: '#fff',
          opacity: 0.3,
          animation: 'rise 2s infinite',
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
      {/* Frame */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: '#1a1a2a',
          border: '2px solid #2a3a4a',
          borderRadius: '2px',
        }}
      />
      {/* Server units with blinky lights */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i}>
          <div
            className="absolute"
            style={{
              top: `${8 + i * 10}px`,
              left: '4px',
              right: '4px',
              height: '8px',
              backgroundColor: '#0a0e1a',
            }}
          />
          {/* Status lights */}
          <div
            className="absolute"
            style={{
              top: `${10 + i * 10}px`,
              right: '8px',
              width: '2px',
              height: '2px',
              backgroundColor: i % 2 === 0 ? '#00ff88' : '#ffaa00',
              opacity: 0.8,
              animation: `pulse-active ${1.5 + i * 0.2}s ease-in-out infinite`,
            }}
          />
          <div
            className="absolute"
            style={{
              top: `${10 + i * 10}px`,
              right: '4px',
              width: '2px',
              height: '2px',
              backgroundColor: '#00f0ff',
              opacity: 0.6,
              animation: `pulse-active ${2 + i * 0.3}s ease-in-out infinite`,
            }}
          />
        </div>
      ))}
    </div>
  );
}

export function CableRun({ orientation }: { orientation: 'h' | 'v' }) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        [orientation === 'h' ? 'left' : 'top']: 0,
        [orientation === 'h' ? 'right' : 'bottom']: 0,
        [orientation === 'h' ? 'height' : 'width']: '2px',
        [orientation === 'h' ? 'top' : 'left']: '50%',
        backgroundColor: '#2a3a4a40',
        opacity: 0.3,
      }}
    />
  );
}

export function FloorTile({ x, y }: { x: number; y: number }) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: '20px',
        height: '20px',
        backgroundColor: '#0f1320',
        border: '1px solid #1a1f2a',
        opacity: 0.5,
      }}
    />
  );
}

export function Window({ top, left, width = 40 }: { top: string; left: string; width?: number }) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        top,
        left,
        width: `${width}px`,
        height: '60px',
        backgroundColor: '#0a0e3a',
        border: '2px solid #1a1f3a',
        borderRadius: '2px',
        opacity: 0.8,
      }}
    >
      {/* Window panes */}
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
      {/* Star visible through window */}
      <div