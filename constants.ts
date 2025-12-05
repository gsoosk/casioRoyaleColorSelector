import { PresetTheme } from './types';

export const DEFAULT_COLORS = {
  dial: "#22c55e",      // Classic Green
  indicator: "#ef4444", // Warning Red
  map: "#3b82f6",       // Map Blue
  lower: "#eab308",     // LCD Yellowish
  strap: "#1f2937"      // Dark Resin
};

export const PRESET_THEMES: PresetTheme[] = [
  {
    name: "Classic Bond",
    colors: {
        dial: "#84cc16",
        indicator: "#ef4444",
        map: "#3b82f6",
        lower: "#eab308",
        strap: "#111827"
    }
  },
  {
    name: "Stealth Ops",
    colors: {
        dial: "#10b981",
        indicator: "#047857",
        map: "#065f46",
        lower: "#059669",
        strap: "#064e3b"
    }
  },
  {
    name: "Cyberpunk 2077",
    colors: {
        dial: "#f472b6",
        indicator: "#22d3ee",
        map: "#facc15",
        lower: "#c084fc",
        strap: "#312e81"
    }
  },
  {
    name: "Monochrome",
    colors: {
        dial: "#9ca3af",
        indicator: "#6b7280",
        map: "#4b5563",
        lower: "#d1d5db",
        strap: "#374151"
    }
  },
    {
    name: "Sunset",
    colors: {
        dial: "#fb923c",
        indicator: "#c026d3",
        map: "#db2777",
        lower: "#f59e0b",
        strap: "#4c0519"
    }
  }
];