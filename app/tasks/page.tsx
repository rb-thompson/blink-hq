'use client';

import Link from 'next/link';

export default function TasksPage() {
  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: '#0a0e1a' }}>
      <div className="max-w-4xl mx-auto">
        <div className="border rounded-md p-6" style={{ backgroundColor: '#131629', borderColor: '#00f0ff20' }}>
          <h1 className="pixel-text mb-4" style={{ fontSize: '20px', color: '#00f0ff' }}>📋 TASKS</h1>
          <div className="pixel-text mb-6" style={{ fontSize: '14px', color: '#6a6a8a' }}>COMING SOON — FEATURE IN PROGRESS</div>
          <p className="pixel-text mb-8" style={{ fontSize: '10px', color: '#e0e0f0' }}>
            Agent task queue + cron. Schedule automated jobs, track progress, manage workflows.
          </p>
          <Link href="/" className="pixel-text px-4 py-2 border rounded transition-colors hover:bg-white/5" style={{ fontSize: '9px', color: '#00f0ff', borderColor: '#00f0ff40' }}>
            ← BACK TO DASHBOARD
          </Link>
        </div>
      </div>
    </div>
  );
}