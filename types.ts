export interface WatchColors {
  dial: string;
  indicator: string;
  map: string;
  lower: string;
  strap: string;
}

export interface PresetTheme {
  name: string;
  colors: WatchColors;
}

export type ZoneKey = keyof WatchColors;