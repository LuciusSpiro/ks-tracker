export type EventType = string;

export interface EventDefinition {
  type: string;
  label: string;
  icon: string;
  hasNote?: boolean;
}

export interface TrackingEvent {
  id: string;
  type: string;
  timestamp: string; // ISO 8601
  note?: string;
}

export interface Phase {
  name: string;
  duration: number; // days
  color: string;    // hex "#rrggbb"
}

export interface Settings {
  cycleStartDate: string;   // "YYYY-MM-DD"
  phases: Phase[];          // 4 cycle phases, sum = 28
  pillStartDate: string;    // "YYYY-MM-DD"
  pillPhases: Phase[];      // 2 pill phases, sum = 28
  darkMode: boolean;
  eventDefinitions: EventDefinition[];
}

export interface AppData {
  events: TrackingEvent[];
  settings: Settings;
}
