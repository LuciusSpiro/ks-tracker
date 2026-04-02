import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import EventPickerSheet from './EventPickerSheet';
import { useAppContext } from '../../context/useAppContext';
import { EventType } from '../../types';

export default function FloatingAddButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { dispatch } = useAppContext();
  const location = useLocation();

  // Hide on settings page
  if (location.pathname === '/settings') return null;

  function handleSelect(type: EventType) {
    dispatch({
      type: 'ADD_EVENT',
      payload: {
        id: crypto.randomUUID(),
        type,
        timestamp: new Date().toISOString(),
      },
    });
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Ereignis hinzufügen"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-16 h-16 rounded-full bg-rose-400 text-white shadow-lg hover:bg-rose-500 active:bg-rose-600 flex items-center justify-center text-3xl transition-colors"
      >
        +
      </button>
      <EventPickerSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSelect={handleSelect}
      />
    </>
  );
}
