import React from 'react';

interface ColorControlProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
  description: string;
}

const PRESET_COLORS = [
  "#ef4444", // Red
  "#f97316", // Orange
  "#eab308", // Yellow
  "#84cc16", // Lime
  "#22c55e", // Green
  "#06b6d4", // Cyan
  "#3b82f6", // Blue
  "#a855f7", // Purple
  "#ec4899", // Pink
  "#d1d5db", // Gray (Neutral)
];

export const ColorControl: React.FC<ColorControlProps> = ({ label, color, onChange, description }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="text-sm font-bold text-gray-200 uppercase tracking-wider font-lcd">{label}</h3>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
        <div className="flex items-center space-x-2">
           <div 
            className="w-8 h-8 rounded-full border-2 border-white shadow-inner" 
            style={{backgroundColor: color}}
           />
           <input 
            type="color" 
            value={color}
            onChange={(e) => onChange(e.target.value)}
            className="w-8 h-8 opacity-0 absolute cursor-pointer"
            aria-label={`Choose color for ${label}`}
           />
           {/* Visual trigger for the hidden input above */}
           <div className="text-xs text-gray-400 bg-gray-900 px-2 py-1 rounded cursor-pointer hover:bg-gray-700">
             PICK
           </div>
        </div>
      </div>
      
      {/* Quick Swatches */}
      <div className="flex flex-wrap gap-2 mt-3">
        {PRESET_COLORS.map((preset) => (
          <button
            key={preset}
            onClick={() => onChange(preset)}
            className={`w-5 h-5 rounded-full transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-gray-800 focus:ring-white ${color === preset ? 'ring-2 ring-white scale-110' : ''}`}
            style={{ backgroundColor: preset }}
            aria-label={`Select color ${preset}`}
          />
        ))}
      </div>
    </div>
  );
};