import { AppData } from '../types';
import { EVENT_DEFINITIONS, DEFAULT_PILL_PHASES } from '../constants/events';
import { today } from './cycleUtils';

const KEY = 'KS-tracker-data';

export function loadFromStorage(): AppData | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as AppData;
    // Migrate: add eventDefinitions if missing (older stored data)
    if (!data.settings.eventDefinitions) {
      data.settings.eventDefinitions = EVENT_DEFINITIONS;
    }
    // Migrate: add pill tracker fields if missing
    if (!data.settings.pillPhases) {
      data.settings.pillPhases = DEFAULT_PILL_PHASES;
    }
    if (!data.settings.pillStartDate) {
      data.settings.pillStartDate = today();
    }
    return data;
  } catch {
    return null;
  }
}

export function saveToStorage(data: AppData): void {
  localStorage.setItem(KEY, JSON.stringify(data));
}
