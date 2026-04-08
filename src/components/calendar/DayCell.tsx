import { TrackingEvent, Phase } from '../../types';
import { getEventDef } from '../../constants/events';
import { useAppContext } from '../../context/useAppContext';
import { today } from '../../utils/cycleUtils';

interface DayCellProps {
  date: string;
  isCurrentMonth: boolean;
  phase: Phase | null;
  pillPhase: Phase | null;
  events: TrackingEvent[];
  onClick: () => void;
}

export default function DayCell({ date, isCurrentMonth, phase, pillPhase, events, onClick }: DayCellProps) {
  const { state } = useAppContext();
  const dayNum = parseInt(date.slice(8), 10);
  const isToday = date === today();

  const uniqueTypes = [...new Set(events.map((e) => e.type))].slice(0, 4);

  // Build background: top half = cycle phase, bottom half = pill phase
  let bgStyle: React.CSSProperties = {};
  if (isCurrentMonth) {
    const topColor = phase ? phase.color + '55' : 'transparent';
    const botColor = pillPhase ? pillPhase.color + '55' : 'transparent';

    if (phase && pillPhase) {
      bgStyle = {
        background: `linear-gradient(to bottom, ${topColor} 50%, ${botColor} 50%)`,
      };
    } else if (phase) {
      bgStyle = { backgroundColor: topColor };
    } else if (pillPhase) {
      bgStyle = {
        background: `linear-gradient(to bottom, transparent 50%, ${botColor} 50%)`,
      };
    }
  }

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
            {getEventDef(type, state.settings.eventDefinitions).icon}
          </span>
        ))}
      </div>
    </button>
  );
}
