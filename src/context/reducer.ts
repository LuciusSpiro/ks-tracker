import { AppData, Settings, TrackingEvent } from '../types';
import { DEFAULT_PHASES } from '../constants/events';
import { today } from '../utils/cycleUtils';

export type Action =
  | { type: 'ADD_EVENT'; payload: TrackingEvent }
  | { type: 'DELETE_EVENT'; payload: { id: string } }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<Settings> }
  | { type: 'IMPORT_DATA'; payload: AppData };

export const DEFAULT_SETTINGS: Settings = {
  cycleStartDate: today(),
  phases: DEFAULT_PHASES,
  darkMode: false,
};

export const INITIAL_STATE: AppData = {
  events: [],
  settings: DEFAULT_SETTINGS,
};

export function reducer(state: AppData, action: Action): AppData {
  switch (action.type) {
    case 'ADD_EVENT':
      return { ...state, events: [...state.events, action.payload] };

    case 'DELETE_EVENT':
      return {
        ...state,
        events: state.events.filter((e) => e.id !== action.payload.id),
      };

    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: { ...state.settings, ...action.payload },
      };

    case 'IMPORT_DATA':
      return action.payload;

    default:
      return state;
  }
}
