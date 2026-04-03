import { useState } from 'react';
import CalendarHeader from '../components/calendar/CalendarHeader';
import CalendarGrid from '../components/calendar/CalendarGrid';
import DayDetailModal from '../components/dayDetail/DayDetailModal';
import { useAppContext } from '../context/useAppContext';

function lastEventOf(
  events: { type: string; timestamp: string; note?: string }[],
  type: string
): { date: string; daysSince: number; note?: string } | null {
  const last = [...events]
    .filter((e) => e.type === type)
    .sort((a, b) => a.timestamp.localeCompare(b.timestamp))
    .at(-1);
  if (!last) return null;
  const lastDate = new Date(last.timestamp);
  const daysSince = Math.floor((Date.now() - lastDate.getTime()) / 86400000);
  return {
    date: lastDate.toLocaleDateString('de-DE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    daysSince,
    note: last.note,
  };
}

export default function CalendarPage() {
  const { state } = useAppContext();
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  function goPrev() {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  }

  function goNext() {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  }

  return (
    <div className="max-w-sm mx-auto">
      <CalendarHeader year={year} month={month} onPrev={goPrev} onNext={goNext} />
      <CalendarGrid
        year={year}
        month={month}
        events={state.events}
        settings={state.settings}
        onDaySelect={setSelectedDate}
      />

      {/* Last occurrence info */}
      {(() => {
        const lastHeadache = lastEventOf(state.events, 'headache');
        const lastPainkillers = lastEventOf(state.events, 'painkillers');
        return (
          <div className="mx-4 mb-24 -mt-20 space-y-2">
            <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
              <span className="text-sm text-gray-500 dark:text-gray-400">🤕 Letzter Kopfschmerz</span>
              <div className="text-right">
                <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                  {lastHeadache?.date ?? '—'}
                </span>
                {lastHeadache && (
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {lastHeadache.daysSince === 0
                      ? 'heute'
                      : lastHeadache.daysSince === 1
                      ? 'vor 1 Tag'
                      : `vor ${lastHeadache.daysSince} Tagen`}
                  </p>
                )}
              </div>
            </div>
            <div className="px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">💊 Letztes Schmerzmittel</span>
                <div className="text-right">
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    {lastPainkillers?.date ?? '—'}
                  </span>
                  {lastPainkillers && (
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {lastPainkillers.daysSince === 0
                        ? 'heute'
                        : lastPainkillers.daysSince === 1
                        ? 'vor 1 Tag'
                        : `vor ${lastPainkillers.daysSince} Tagen`}
                    </p>
                  )}
                </div>
              </div>
              {lastPainkillers?.note && (
                <p className="text-xs text-gray-400 dark:text-gray-500 italic mt-1">„{lastPainkillers.note}"</p>
              )}
            </div>
          </div>
        );
      })()}

      <DayDetailModal
        date={selectedDate}
        onClose={() => setSelectedDate(null)}
      />
    </div>
  );
}
