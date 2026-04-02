const MONTH_NAMES = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
];

interface CalendarHeaderProps {
  year: number;
  month: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function CalendarHeader({ year, month, onPrev, onNext }: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <button
        onClick={onPrev}
        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-700 text-gray-600 dark:text-gray-300"
        aria-label="Vorheriger Monat"
      >
        ‹
      </button>
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        {MONTH_NAMES[month]} {year}
      </h2>
      <button
        onClick={onNext}
        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-700 text-gray-600 dark:text-gray-300"
        aria-label="Nächster Monat"
      >
        ›
      </button>
    </div>
  );
}
