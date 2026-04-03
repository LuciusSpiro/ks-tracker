import { useState } from 'react';
import Modal from '../common/Modal';
import EventList from './EventList';
import EventPickerSheet from '../addEvent/EventPickerSheet';
import { useAppContext } from '../../context/useAppContext';
import { EventType } from '../../types';
import { formatDateDE, today } from '../../utils/cycleUtils';

interface DayDetailModalProps {
  date: string | null;
  onClose: () => void;
}

export default function DayDetailModal({ date, onClose }: DayDetailModalProps) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const { state, dispatch } = useAppContext();

  if (!date) return null;

  const dayEvents = state.events.filter((e) => e.timestamp.slice(0, 10) === date);
  const isToday = date === today();

  function handleAddEvent(type: EventType, note?: string) {
    const timestamp = isToday
      ? new Date().toISOString()
      : `${date}T12:00:00.000Z`;

    dispatch({
      type: 'ADD_EVENT',
      payload: {
        id: crypto.randomUUID(),
        type,
        timestamp,
        note,
      },
    });
  }

  return (
    <>
      <Modal isOpen={!!date} onClose={onClose} title={formatDateDE(date)}>
        <div className="p-4 space-y-4">
          <EventList events={dayEvents} />

          <button
            onClick={() => setPickerOpen(true)}
            className="w-full py-3 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-600 text-gray-400 dark:text-gray-500 hover:border-rose-300 dark:hover:border-rose-500 hover:text-rose-400 dark:hover:text-rose-400 text-sm font-medium transition-colors"
          >
            + Ereignis hinzufügen
          </button>
        </div>
      </Modal>

      <EventPickerSheet
        isOpen={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={handleAddEvent}
      />
    </>
  );
}
