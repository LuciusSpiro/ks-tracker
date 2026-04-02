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

  function handleDelete() {
    if (confirm(`"${def.label}" wirklich löschen?`)) {
      dispatch({ type: 'DELETE_EVENT', payload: { id: event.id } });
    }
  }

  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-50 dark:border-gray-700 last:border-0">
      <span className="text-2xl">{def.icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{def.label}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500">{formatTimeDE(event.timestamp)} Uhr</p>
      </div>
      {canDelete && (
        <button
          onClick={handleDelete}
          className="text-gray-300 dark:text-gray-600 hover:text-red-400 active:text-red-600 p-1"
          aria-label="Löschen"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      )}
    </div>
  );
}
