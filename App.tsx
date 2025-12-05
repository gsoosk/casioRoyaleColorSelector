import React, { useState } from 'react';
import { WatchFace } from './components/WatchFace';
import { ColorControl } from './components/ColorControl';
import { WatchColors, ZoneKey } from './types';
import { DEFAULT_COLORS, PRESET_THEMES } from './constants';
import { generateThemeFromPrompt } from './services/geminiService';

export default function App() {
  const [colors, setColors] = useState<WatchColors>(DEFAULT_COLORS);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleColorChange = (zone: ZoneKey, color: string) => {
    setColors(prev => ({ ...prev, [zone]: color }));
  };

  const handleGenerateTheme = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    setIsGenerating(true);
    try {
      const newColors = await generateThemeFromPrompt(aiPrompt);
      setColors(newColors);
    } catch (err) {
      console.error(err);
      alert("Failed to generate theme. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    const json = JSON.stringify(colors, null, 2);
    navigator.clipboard.writeText(json);
    alert("Color configuration copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gray-900 pb-20">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 py-6 mb-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-lcd font-bold text-white tracking-widest mb-2">
            CASIO<span className="text-cyan-400">MODDER</span>
          </h1>
          <p className="text-gray-400 text-sm font-mono-display">AE-1200 COLOR CUSTOMIZER</p>
        </div>
      </header>

      <main className="container mx-auto px-4 md:flex gap-8 items-start">
        
        {/* Left Column: Visualizer */}
        <div className="w-full md:w-1/2 lg:w-3/5 sticky top-4 mb-12 md:mb-0">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-2xl">
            <WatchFace colors={colors} />
          </div>
          
          <div className="mt-6 flex justify-center gap-4">
             <button 
              onClick={() => setColors(DEFAULT_COLORS)}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded font-mono-display text-xs uppercase tracking-wider transition-colors"
             >
               Reset Defaults
             </button>
             <button 
              onClick={copyToClipboard}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-cyan-400 rounded font-mono-display text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
             >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
               </svg>
               Copy Config
             </button>
          </div>
        </div>

        {/* Right Column: Controls */}
        <div className="w-full md:w-1/2 lg:w-2/5 space-y-8">
          
          {/* AI Generator Section */}
          <section className="bg-gray-800/50 rounded-xl p-6 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
            <h2 className="text-xl font-lcd text-cyan-400 mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              AI Theme Generator
            </h2>
            <form onSubmit={handleGenerateTheme} className="space-y-4">
              <div>
                <label htmlFor="prompt" className="block text-xs font-mono-display text-gray-400 mb-1">
                  Describe a mood, character, or style
                </label>
                <div className="flex gap-2">
                  <input
                    id="prompt"
                    type="text"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="e.g., 'Retro Synthwave', 'Forest Ranger', 'Iron Man'"
                    className="flex-1 bg-gray-900 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono-display text-sm"
                  />
                  <button
                    type="submit"
                    disabled={isGenerating || !aiPrompt}
                    className="bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-700 disabled:text-gray-500 text-white px-4 py-2 rounded font-bold font-mono-display text-sm transition-colors uppercase"
                  >
                    {isGenerating ? '...' : 'GO'}
                  </button>
                </div>
              </div>
            </form>
          </section>

          {/* Quick Presets */}
          <section>
            <h2 className="text-gray-400 font-mono-display text-xs uppercase mb-3 ml-1">Quick Presets</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PRESET_THEMES.map((theme) => (
                <button
                  key={theme.name}
                  onClick={() => setColors(theme.colors)}
                  className="bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs py-2 px-3 rounded border border-gray-700 hover:border-gray-500 transition-all text-left truncate font-mono-display"
                >
                  {theme.name}
                </button>
              ))}
            </div>
          </section>

          {/* Manual Controls */}
          <section className="space-y-4">
            <h2 className="text-gray-400 font-mono-display text-xs uppercase mb-3 ml-1">Manual Filters</h2>
            <ColorControl 
              label="DIAL" 
              description="Top-left analog clock face"
              color={colors.dial} 
              onChange={(c) => handleColorChange('dial', c)} 
            />
            <ColorControl 
              label="INDICATOR" 
              description="Top-right status panel"
              color={colors.indicator} 
              onChange={(c) => handleColorChange('indicator', c)} 
            />
            <ColorControl 
              label="MAP" 
              description="Middle-right world map"
              color={colors.map} 
              onChange={(c) => handleColorChange('map', c)} 
            />
            <ColorControl 
              label="LOWER" 
              description="Main digital display area"
              color={colors.lower} 
              onChange={(c) => handleColorChange('lower', c)} 
            />
             <div className="my-4 border-t border-gray-700/50"></div>
            <ColorControl 
              label="STRAP" 
              description="Watch band color"
              color={colors.strap} 
              onChange={(c) => handleColorChange('strap', c)} 
            />
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-8 text-center text-gray-600 text-xs font-mono-display border-t border-gray-800">
        <p>CASIO is a registered trademark of Casio Computer Co., Ltd. This is a fan-made project.</p>
        <p className="mt-2">Use these colors to buy custom filter gels for your mod.</p>
      </footer>
    </div>
  );
}