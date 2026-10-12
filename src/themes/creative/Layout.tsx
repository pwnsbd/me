import type { ReactNode } from 'react';
import './global.css';
import { usePencilSound } from './hooks/usePencilSound';
import { PullChainToggle } from '../../core/PullChainToggle';
import lamp from './Lamp.module.css';

const BLUE = '#3A5F8A';

const fixture = (
  <g filter="url(#pencil)" stroke="#1C1710" fill="none" strokeLinecap="round">
    <g className={lamp.rays} pointerEvents="none" stroke="#EF9F27" strokeWidth="1.7" filter="url(#pencil)">
      <line x1="25.1" y1="29.5" x2="37.2" y2="22.5" />
      <line x1="29" y1="42" x2="45" y2="42" />
      <line x1="25.1" y1="54.5" x2="38.1" y2="62" />
      <line x1="0" y1="71" x2="0" y2="85" />
      <line x1="-14.5" y1="67.1" x2="-22" y2="80.1" />
      <line x1="-25.1" y1="54.5" x2="-39" y2="62.5" />
      <line x1="-29" y1="42" x2="-44" y2="42" />
      <line x1="-25.1" y1="29.5" x2="-36.4" y2="23" />
    </g>
    <path d="M0 0 q1.5 -28 -0.5 -56" strokeWidth="1.2" />
    <path d="M-30 2 q30 12 60 0" strokeWidth="1.3" />
    <path d="M-12 8 l2 16 h20 l2 -16" strokeWidth="1.3" />
    <path d="M-10 24 q-12 4 -12 18 q0 18 22 20 q22 -2 22 -20 q0 -14 -12 -18" strokeWidth="1.2" fill="#FAC775" fillOpacity="0.85" />
    <path d="M-4 40 q4 -8 8 0" strokeWidth="0.8" opacity="0.6" />
  </g>
);

const hint = (
  <g filter="url(#pencil)" stroke={BLUE} strokeWidth="1.3" fill="none" strokeLinecap="round">
    <path d="M-58 128 q22 6 64 -18" />
    <path d="M-4 104 l10 6 l-9 7" />
    <text x="-92" y="140" stroke="none" fill={BLUE} fontSize="17"
      style={{ fontFamily: 'var(--font-sketch)' }}>pull me</text>
  </g>
);

export function Layout({ children }: { children: ReactNode }) {
  usePencilSound();
  return (
    <>
      {children}
      <PullChainToggle label="Switch to recruiter view" chainColor="#4A4235"
        flashOpacity={0.9} fixture={fixture} hint={hint} />
    </>
  );
}
