import { TrackingEvent, Phase } from '../../types';
import { getEventDef } from '../../constants/events';
import { today } from '../../utils/cycleUtils';

interface DayCellProps {
  date: string;
  isCurrentMonth: boolean;
  phase: Phase | null;
  events: TrackingEvent[];
  onClick: () => void;
}

export default function DayCell({ date, isCurrentMonth, phase, events, onClick }: DayCellProps) {
  const dayNum = parseInt(date.slice(8), 10);
  const isToday = date === today();

  const uniqueTypes = [...new Set(events.map((e) => e.type))].slice(0, 4);

  const bgStyle = phase && isCurrentMonth
    ? { backgroundColor: phase.color + '44' }
    : {};

  return (
    <button
      onClick={onClick}
      className={[
        'flex flex-col items-center pt-1 pb-1 rounded-lg transition-colors relative',
        'hover:brightness-95 active:brightness-90',
        isCurrentMonth
          ? 'text-gray-800 dark:text-gray-100'
          : 'text-gray-300 dark:text-gray-600',
      ].join(' ')}
      style={bgStyle}
    >
      <span
        className={[
          'w-7 h-7 flex items-center justify-center rounded-full text-sm font-medium',
          isToday ? 'bg-rose-400 text-white font-bold' : '',
        ].join(' ')}
      >
        {dayNum}
      </span>

      <div className="flex flex-wrap justify-center gap-0.5 min-h-[16px] mt-0.5">
        {uniqueTypes.map((type) => (
          <span key={type} className="text-[10px] leading-none">
            {getEventDef(type).icon}
          </span>
        ))}
      </div>
    </button>
  );
}
