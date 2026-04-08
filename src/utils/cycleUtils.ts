import { Phase, Settings } from '../types';

/** Returns the number of calendar days between two "YYYY-MM-DD" strings (DST-safe). */
function calendarDiff(startStr: string, endStr: string): number {
  const [sy, sm, sd] = startStr.split('-').map(Number);
  const [ey, em, ed] = endStr.split('-').map(Number);
  return Math.round((Date.UTC(ey, em - 1, ed) - Date.UTC(sy, sm - 1, sd)) / 86400000);
}

/** Returns the cycle phase a given date falls in, or null if before cycleStartDate. */
export function getPhaseForDate(date: string, settings: Settings): Phase | null {
  const diffDays = calendarDiff(settings.cycleStartDate, date);
  if (diffDays < 0) return null;

  const cycleLen = settings.phases.reduce((s, p) => s + p.duration, 0) || 28;
  const cycleDay = diffDays % cycleLen;
  let count = 0;
  for (const phase of settings.phases) {
    count += phase.duration;
    if (cycleDay < count) return phase;
  }
  return null;
}

/** Returns the pill phase a given date falls in, or null if before pillStartDate. */
export function getPillPhaseForDate(date: string, settings: Settings): Phase | null {
  if (!settings.pillStartDate || !settings.pillPhases?.length) return null;
  const diffDays = calendarDiff(settings.pillStartDate, date);
  if (diffDays < 0) return null;

  const cycleLen = settings.pillPhases.reduce((s, p) => s + p.duration, 0) || 28;
  const cycleDay = diffDays % cycleLen;
  let count = 0;
  for (const phase of settings.pillPhases) {
    count += phase.duration;
    if (cycleDay < count) return phase;
  }
  return null;
}

/** Returns ISO date string "YYYY-MM-DD" for a given Date object (local time). */
export function toDateString(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** Returns today's date as "YYYY-MM-DD". */
export function today(): string {
  return toDateString(new Date());
}

export interface DayInfo {
  date: string;
  isCurrentMonth: boolean;
}

/**
 * Returns 42 day entries (6 rows × 7 cols, Monday-first) for a calendar grid.
 * month is 0-indexed (0 = January).
 */
export function getMonthDays(year: number, month: number): DayInfo[] {
  const days: DayInfo[] = [];

  const firstDay = new Date(year, month, 1);
  // getDay() returns 0=Sun..6=Sat; we want Mon=0..Sun=6
  const startOffset = (firstDay.getDay() + 6) % 7;

  const totalDays = new Date(year, month + 1, 0).getDate();

  // Fill days from previous month
  const prevMonthDays = new Date(year, month, 0).getDate();
  for (let i = startOffset - 1; i >= 0; i--) {
    const d = new Date(year, month - 1, prevMonthDays - i);
    days.push({ date: toDateString(d), isCurrentMonth: false });
  }

  // Fill current month
  for (let i = 1; i <= totalDays; i++) {
    const d = new Date(year, month, i);
    days.push({ date: toDateString(d), isCurrentMonth: true });
  }

  // Fill days from next month
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    const d = new Date(year, month + 1, i);
    days.push({ date: toDateString(d), isCurrentMonth: false });
  }

  return days;
}

/** Format a date string "YYYY-MM-DD" to a human readable German string. */
export function formatDateDE(date: string): string {
  const d = new Date(date + 'T00:00:00');
  return d.toLocaleDateString('de-DE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/** Format an ISO timestamp to HH:MM in local time. */
export function formatTimeDE(iso: string): string {
  return new Date(iso).toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
  });
}
