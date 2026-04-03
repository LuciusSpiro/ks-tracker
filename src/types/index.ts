export type EventType =
  | 'headache'
  | 'dehydration'
  | 'stress'
  | 'eye_strain'
  | 'painkillers'
  | 'pill_forgotten';

export interface TrackingEvent {
  id: string;
  type: EventType;
  timestamp: string; // ISO 8601
  note?: string;
}

export interface Phase {
  name: string;
  duration: number; // days, all 4 must sum to 28
  color: string;    // hex "#rrggbb"
}

export interface Settings {
  cycleStartDate: string; // "YYYY-MM-DD"
  phases: Phase[];
  darkMode: boolean;
}

export interface AppData {
  events: TrackingEvent[];
  settings: Settings;
}
