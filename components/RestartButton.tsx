'use client';

import { useState } from 'react';

export default function RestartButton({ className = '' }: { className?: string }) {
  const [confirming, setConfirming] = useState(false);
  const [restarting, setRestarting] = useState(false);

  const handleRestart = async () => {
    if (confirming) {
      setRestarting(true);
      try {
        const res = await fetch('/api/openclaw', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tool: 'gateway',
            action: 'restart',
            note: 'Restart requested from Blink HQ Dashboard'
          }),
        });
        if (res.ok) {
          alert('Gateway restart initiated! Check logs.');
        } else {
          alert('Restart failed — check terminal.');
        }
      } catch (e) {
        alert('Error — manual: openclaw gateway restart');
      }
      setRestarting(false);
      setConfirming(false);
    } else {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 3000);
    }
  };

  return (
    <button
      onClick={handleRestart}
      disabled={restarting}
      className={`pixel-text py-1 px-3 rounded border transition-all ${className}`}
      style={{
        backgroundColor: '#1a1f3a',
        borderColor: '#00f0ff40',
        color: '#00f0ff',
        fontSize: '6px',
        marginTop: '4px',
      }}
    >
      {restarting ? 'RESTARTING...' : confirming ? 'CONFIRM ⚠️' : 'RESTART'}
    </button>
  );
}