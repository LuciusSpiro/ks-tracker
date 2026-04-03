import { EventType, Phase } from '../types';

export const EVENT_DEFINITIONS: { type: EventType; label: string; icon: string }[] = [
  { type: 'headache',    label: 'Kopfschmerzen',          icon: '🤕' },
  { type: 'dehydration', label: 'Zu wenig getrunken',     icon: '💧' },
  { type: 'stress',      label: 'Stress',                 icon: '😤' },
  { type: 'eye_strain',  label: 'Augenüberlastung',       icon: '👁️' },
  { type: 'painkillers',   label: 'Schmerzmittel genommen', icon: '💊' },
  { type: 'pill_forgotten', label: 'Pille vergessen',       icon: '🩷' },
];

export const DEFAULT_PHASES: Phase[] = [
  { name: 'Menstruation',  duration: 5, color: '#f87171' },
  { name: 'Follikelphase', duration: 9, color: '#fb923c' },
  { name: 'Ovulation',     duration: 5, color: '#facc15' },
  { name: 'Lutealphase',   duration: 9, color: '#a78bfa' },
];

export function getEventDef(type: EventType) {
  return EVENT_DEFINITIONS.find((e) => e.type === type)!;
}
