import { TrackingEvent, Settings } from '../../types';
import { getMonthDays, getPhaseForDate } from '../../utils/cycleUtils';
import DayCell from './DayCell';

const WEEKDAY_LABELS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

interface CalendarGridProps {
  year: number;
  month: number; // 0-indexed
  events: TrackingEvent[];
  settings: Settings;
  onDaySelect: (date: string) => void;
}

export default function CalendarGrid({ year, month, events, settings, onDaySelect }: CalendarGridProps) {
  const days = getMonthDays(year, month);

  // Index events by date string for fast lookup
  const eventsByDate: Record<string, TrackingEvent[]> = {};
  for (const event of events) {
    const dateKey = event.timestamp.slice(0, 10);
    if (!eventsByDate[dateKey]) eventsByDate[dateKey] = [];
    eventsByDate[dateKey].push(event);
  }

  return (
    <div>
      {/* Weekday header */}
      <div className="grid grid-cols-7 px-2">
        {WEEKDAY_LABELS.map((label) => (
          <div key={label} className="text-center text-xs font-medium text-gray-400 py-1">
            {label}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-1 px-2 pb-24">
        {days.map(({ date, isCurrentMonth }) => (
          <DayCell
            key={date}
            date={date}
            isCurrentMonth={isCurrentMonth}
            phase={getPhaseForDate(date, settings)}
            events={eventsByDate[date] ?? []}
            onClick={() => onDaySelect(date)}
          />
        ))}
      </div>
    </div>
  );
}
