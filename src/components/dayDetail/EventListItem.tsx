import { useState } from 'react';
import { TrackingEvent } from '../../types';
import { getEventDef } from '../../constants/events';
import { formatTimeDE } from '../../utils/cycleUtils';
import { useAppContext } from '../../context/useAppContext';

const TWENTY_FOUR_HOURS = 86_400_000;

interface EventListItemProps {
  event: TrackingEvent;
}

export default function EventListItem({ event }: EventListItemProps) {
  const { dispatch } = useAppContext();
  const def = getEventDef(event.type);
  const canDelete = Date.now() - new Date(event.timestamp).getTime() < TWENTY_FOUR_HOURS;
  const [confirming, setConfirming] = useState(false);

  function handleConfirm() {
    dispatch({ type: 'DELETE_EVENT', payload: { id: event.id } });
    setConfirming(false);
  }

  return (
    <>
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-50 dark:border-gray-700 last:border-0">
        <span className="text-2xl">{def.icon}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{def.label}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">{formatTimeDE(event.timestamp)} Uhr</p>
          {event.note && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 italic">„{event.note}"</p>
          )}
        </div>
        {canDelete && (
          <button
            onClick={() => setConfirming(true)}
            className="text-gray-300 dark:text-gray-600 hover:text-red-400 active:text-red-600 p-1"
            aria-label="Löschen"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>

      {/* Delete confirmation popup */}
      {confirming && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/50" onClick={() => setConfirming(false)} />
          <div className="relative w-full max-w-xs bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 space-y-4">
            <div className="text-center space-y-1">
              <p className="text-base font-semibold text-gray-800 dark:text-gray-100">Eintrag löschen?</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {def.icon} {def.label}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirming(false)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Abbrechen
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 active:bg-red-700 transition-colors"
              >
                Löschen
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
