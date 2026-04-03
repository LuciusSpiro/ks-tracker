import { AppData } from '../types';

const KEY = 'KS-tracker-data';

export function loadFromStorage(): AppData | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as AppData) : null;
  } catch {
    return null;
  }
}

export function saveToStorage(data: AppData): void {
  localStorage.setItem(KEY, JSON.stringify(data));
}
