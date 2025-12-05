import React from 'react';
import { WatchColors } from '../types';

interface WatchFaceProps {
  colors: WatchColors;
}

export const WatchFace: React.FC<WatchFaceProps> = ({ colors }) => {
  return (
    <div className="relative w-full max-w-xl mx-auto drop-shadow-2xl">
      {/* Expanded viewBox to accommodate straps */}
      <svg viewBox="0 -120 600 800" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="black" strokeOpacity="0.1" strokeWidth="0.5"/>
          </pattern>
          <linearGradient id="strapShadow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="black" stopOpacity="0.4" />
            <stop offset="10%" stopColor="black" stopOpacity="0.1" />
            <stop offset="50%" stopColor="black" stopOpacity="0" />
            <stop offset="90%" stopColor="black" stopOpacity="0.1" />
            <stop offset="100%" stopColor="black" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* --- STRAPS (Drawn behind the case) --- */}
        <g id="straps">
          {/* Top Strap */}
          <path d="M 180 50 L 420 50 L 410 -120 L 190 -120 Z" fill={colors.strap} />
          {/* Top Strap Details */}
          <rect x="180" y="50" width="240" height="170" fill="url(#strapShadow)" style={{pointerEvents: 'none'}} transform="scale(1, -1) translate(0, -100)" />
          <path d="M 200 40 L 400 40" stroke="black" strokeOpacity="0.2" strokeWidth="2" />
          <path d="M 200 20 L 400 20" stroke="black" strokeOpacity="0.2" strokeWidth="2" />
          <path d="M 200 0 L 400 0" stroke="black" strokeOpacity="0.2" strokeWidth="2" />

          {/* Bottom Strap */}
          <path d="M 180 500 L 420 500 L 410 680 L 190 680 Z" fill={colors.strap} />
          {/* Bottom Strap Details */}
          <rect x="180" y="500" width="240" height="180" fill="url(#strapShadow)" style={{pointerEvents: 'none'}} />
          <path d="M 200 520 L 400 520" stroke="black" strokeOpacity="0.2" strokeWidth="2" />
          <path d="M 200 540 L 400 540" stroke="black" strokeOpacity="0.2" strokeWidth="2" />
          <path d="M 200 560 L 400 560" stroke="black" strokeOpacity="0.2" strokeWidth="2" />
        </g>

        {/* --- CASE BODY (Simplified Bezel) --- */}
        <path d="M 60 40 L 540 40 L 580 120 L 580 430 L 540 510 L 60 510 L 20 430 L 20 120 Z" fill="#1a1a1a" stroke="#444" strokeWidth="4" />
        
        {/* Inner Bezel Frame */}
        <path d="M 45 130 L 555 130 L 555 420 L 45 420 Z" fill="#2a2a2a" />

        {/* --- ZONE 1: DIAL (Top Left) --- */}
        {/* Background Color Filter */}
        <circle cx="150" cy="225" r="85" fill={colors.dial} opacity="0.4" />
        <circle cx="150" cy="225" r="85" fill="url(#grid)" opacity="0.3" />
        
        {/* Dial UI Elements */}
        <circle cx="150" cy="225" r="80" stroke="#000" strokeWidth="2" fill="none" />
        <circle cx="150" cy="225" r="3" fill="#000" />
        {/* Clock Hands */}
        <line x1="150" y1="225" x2="150" y2="165" stroke="#000" strokeWidth="3" opacity="0.8" />
        <line x1="150" y1="225" x2="190" y2="225" stroke="#000" strokeWidth="3" opacity="0.8" />
        <text x="150" y="325" textAnchor="middle" className="font-lcd text-[10px] fill-gray-400">ANALOG</text>

        {/* --- ZONE 2: INDICATOR (Top Right) --- */}
        {/* Background Color Filter */}
        <rect x="250" y="145" width="290" height="70" rx="4" fill={colors.indicator} opacity="0.4" />
        
        {/* Indicator UI */}
        <rect x="255" y="150" width="280" height="60" fill="none" stroke="#000" strokeWidth="1" opacity="0.2" />
        <text x="270" y="185" className="font-lcd text-xl fill-black opacity-80 font-bold">MUTE  SIG  ALM</text>
        <text x="470" y="165" textAnchor="end" className="font-lcd text-xs fill-black opacity-60">INDICATOR</text>


        {/* --- ZONE 3: MAP (Middle Right) --- */}
        {/* Background Color Filter */}
        <rect x="250" y="225" width="290" height="85" rx="4" fill={colors.map} opacity="0.4" />
        
        {/* World Map Placeholder (Stylized) */}
        <g opacity="0.6" fill="#000">
             <path d="M 270 260 C 280 250, 300 250, 310 260 C 320 270, 310 280, 290 285 Z" />
             <path d="M 330 250 C 350 240, 390 240, 400 250 L 400 280 C 390 290, 350 290, 330 270 Z" />
             <path d="M 420 250 C 440 245, 460 250, 470 270 L 450 290 Z" />
        </g>
        <rect x="250" y="225" width="290" height="85" fill="url(#grid)" opacity="0.1" />
        <text x="530" y="300" textAnchor="end" className="font-lcd text-xs fill-black opacity-60">WORLD MAP</text>

        {/* --- ZONE 4: LOWER (Bottom Main Display) --- */}
        {/* Background Color Filter */}
        <path d="M 60 330 L 540 330 L 540 460 L 490 490 L 110 490 L 60 460 Z" fill={colors.lower} opacity="0.4" />
        
        {/* Digital Time Display */}
        <text x="300" y="440" textAnchor="middle" className="font-lcd text-8xl fill-black opacity-90 tracking-widest font-bold" style={{textShadow: "2px 2px 0px rgba(0,0,0,0.1)"}}>
          10:58
        </text>
        <text x="450" y="400" className="font-lcd text-3xl fill-black opacity-80">50</text>
        <text x="120" y="370" className="font-mono-display text-sm fill-black opacity-70 font-bold">PM</text>
        <text x="300" y="475" textAnchor="middle" className="font-mono-display text-lg fill-black opacity-70">UTC T-2  LON</text>


        {/* --- LABELS ON BEZEL --- */}
        <text x="300" y="80" textAnchor="middle" className="font-lcd font-bold text-lg fill-white tracking-[0.3em]">CASIO</text>
        <text x="300" y="100" textAnchor="middle" className="font-mono-display text-xs fill-gray-400">5 ALARMS</text>
        
        <text x="70" y="150" className="font-mono-display text-[10px] fill-white">WORLD TIME</text>
        <text x="530" y="150" textAnchor="end" className="font-mono-display text-[10px] fill-white">ILLUMINATOR</text>
        
        {/* Buttons hints */}
        <text x="10" y="180" className="font-mono-display text-[10px] fill-gray-500" transform="rotate(-90 10 180)">ADJUST</text>
        <text x="10" y="400" className="font-mono-display text-[10px] fill-gray-500" transform="rotate(-90 10 400)">MODE</text>
        <text x="590" y="180" className="font-mono-display text-[10px] fill-gray-500" transform="rotate(90 590 180)">LIGHT</text>
        <text x="590" y="400" className="font-mono-display text-[10px] fill-gray-500" transform="rotate(90 590 400)">SEARCH</text>

      </svg>
    </div>
  );
};