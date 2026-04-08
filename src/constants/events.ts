import { EventDefinition, Phase } from '../types';

export const EVENT_DEFINITIONS: EventDefinition[] = [
  { type: 'headache',      label: 'Kopfschmerzen',          icon: '🤕' },
  { type: 'dehydration',   label: 'Zu wenig getrunken',     icon: '💧' },
  { type: 'stress',        label: 'Stress',                 icon: '😤' },
  { type: 'eye_strain',    label: 'Augenüberlastung',       icon: '👁️' },
  { type: 'painkillers',   label: 'Schmerzmittel genommen', icon: '💊', hasNote: true },
  { type: 'pill_forgotten', label: 'Pille vergessen',       icon: '🩷' },
];

export const DEFAULT_PHASES: Phase[] = [
  { name: 'Menstruation',  duration: 5, color: '#f87171' },
  { name: 'Follikelphase', duration: 9, color: '#fb923c' },
  { name: 'Ovulation',     duration: 5, color: '#facc15' },
  { name: 'Lutealphase',   duration: 9, color: '#a78bfa' },
];

export const DEFAULT_PILL_PHASES: Phase[] = [
  { name: 'Einnahme', duration: 21, color: '#34d399' },
  { name: 'Pause',    duration: 7,  color: '#94a3b8' },
];

export const ICON_PICKER_OPTIONS: string[] = [
  // Symptome
  '🤕', '🤢', '🤧', '🤒', '😷', '🥵', '🥶', '😵', '💫', '😰', '😓', '😫', '😩', '🌀',
  // Medizin
  '💊', '💉', '🩺', '🩹', '🩻', '🧬',
  // Zyklus / Frauen
  '🩸', '🩷', '❤️', '💛', '💜', '🌸', '🌺', '🌷', '🌼',
  // Essen & Trinken
  '💧', '🥤', '🍵', '☕', '🫖', '🍎', '🥗', '🥦',
  // Fitness & Schlaf
  '🏃', '🚶', '🧘', '💪', '🛌', '💤',
  // Stimmung
  '😊', '😢', '😡', '😟', '😬', '🙂', '😐', '😤', '🥹', '😌',
  // Wetter / Natur
  '⚡', '❄️', '🔥', '☁️', '☀️', '🌙', '🌧️',
  // Sonstiges
  '⭐', '🎯', '✅', '⚠️', '📝', '🔔', '🎗️', '🧠',
];

export function getEventDef(type: string, definitions: EventDefinition[]): EventDefinition {
  return definitions.find((e) => e.type === type) ?? { type, label: type, icon: '❓' };
}
