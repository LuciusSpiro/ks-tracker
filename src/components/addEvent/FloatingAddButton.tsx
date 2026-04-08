import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import EventPickerSheet from './EventPickerSheet';
import { useAppContext } from '../../context/useAppContext';
export default function FloatingAddButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { dispatch } = useAppContext();
  const location = useLocation();

  if (location.pathname === '/settings') return null;

  function handleSelect(type: string, note?: string) {
    dispatch({
      type: 'ADD_EVENT',
      payload: {
        id: crypto.randomUUID(),
        type,
        timestamp: new Date().toISOString(),
        note,
      },
    });
  }

  const isCalendar = location.pathname === '/calendar';
  const isStats = location.pathname === '/stats';

  const navIconClass = (active: boolean) =>
    `flex items-center justify-center w-12 h-12 rounded-full transition-colors ${
      active
        ? 'text-rose-400'
        : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
    }`;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40">
        <div className="max-w-sm mx-auto bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex items-center justify-around px-6 h-16">
          {/* Calendar */}
          <Link to="/calendar" className={navIconClass(isCalendar)} aria-label="Kalender">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </Link>

          {/* Add button */}
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Ereignis hinzufügen"
            className="-mt-5 w-14 h-14 rounded-full bg-rose-400 text-white shadow-lg hover:bg-rose-500 active:bg-rose-600 flex items-center justify-center text-3xl transition-colors"
          >
            +
          </button>

          {/* Stats */}
          <Link to="/stats" className={navIconClass(isStats)} aria-label="Statistik">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </Link>
        </div>
      </div>

      <EventPickerSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSelect={handleSelect}
      />
    </>
  );
}
