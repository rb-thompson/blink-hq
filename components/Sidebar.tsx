'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/',
    icon: () => (
      <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: 18, height: 18 }}>
        <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
      </svg>
    ),
  },
  {
    id: 'visualizer',
    label: 'Visualizer',
    href: '/visualizer',
    icon: () => (
      <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: 18, height: 18 }}>
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    id: 'agents',
    label: 'Agents',
    href: '/agents',
    icon: () => (
      <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: 18, height: 18 }}>
        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
      </svg>
    ),
  },
  {
    id: 'logs',
    label: 'Logs',
    href: '/logs',
    icon: () => (
      <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: 18, height: 18 }}>
        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className="fixed left-0 top-0 bottom-0 z-50 flex flex-col border-r transition-all duration-300 ease-out"
      style={{
        width: expanded ? '160px' : '48px',
        backgroundColor: '#0a0e1aee',
        borderColor: '#131629',
      }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div className="border-b border-[#131629] py-4 px-3 flex items-center h-14">
        <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, minWidth: 24 }}>
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#00f0ff" />
        </svg>
        <span
          className="ml-2 pixel-text overflow-hidden whitespace-nowrap transition-all duration-300"
          style={{
            fontSize: '11px',
            opacity: expanded ? 1 : 0,
            maxWidth: expanded ? '100px' : 0,
          }}
        >
          BLINK HQ
        </span>
      </div>

      <nav className="flex-1 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.id}
              href={item.href}
              className="flex items-center px-3 py-3 mx-2 rounded-md transition-colors hover:bg-white/5"
              style={{ color: isActive ? '#00f0ff' : '#6a6a8a' }}
            >
              <item.icon />
              <span
                className="ml-3 pixel-text overflow-hidden whitespace-nowrap transition-all duration-300"
                style={{
                  fontSize: '9px',
                  opacity: expanded ? 1 : 0,
                  maxWidth: expanded ? '120px' : 0,
                }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-[#131629] py-2 px-3">
        <div
          className="w-2 h-2 rounded-full"
          style={{
            backgroundColor: '#00ff88',
            boxShadow: '0 0 6px #00ff88',
            animation: 'pulse 2s infinite',
          }}
        />
      </div>
    </div>
  );
}
