import { useMemo } from 'react';
import { useAppContext } from '../context/useAppContext';
import { getPhaseForDate, getPillPhaseForDate } from '../utils/cycleUtils';


interface BarProps {
  percentage: number;
  count: number;
  color: string;
  label: string;
  sublabel?: string;
}

function Bar({ percentage, count, color, label, sublabel }: BarProps) {
  const pct = Math.max(0, Math.min(100, percentage));
  return (
    <div className="space-y-1">
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-gray-700 dark:text-gray-200">{label}</span>
        {sublabel && <span className="text-xs text-gray-400 dark:text-gray-500">{sublabel}</span>}
      </div>
      <div className="relative h-7 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
        {/* Count label: inside bar if wide enough, otherwise outside */}
        <span
          className={[
            'absolute inset-y-0 flex items-center text-xs font-semibold',
            pct >= 15
              ? 'right-2 text-white'
              : 'left-[calc(100%+6px)] text-gray-500 dark:text-gray-400',
          ].join(' ')}
          style={pct >= 15 ? { right: `${100 - pct + 2}%` } : {}}
        >
          {count}
        </span>
      </div>
    </div>
  );
}

export default function StatsPage() {
  const { state } = useAppContext();
  const { events, settings } = state;

  // --- Chart 1: Headaches & Triggers ---
  const triggerStats = useMemo(() => {
    const headacheDays = new Set(
      events.filter((e) => e.type === 'headache').map((e) => e.timestamp.slice(0, 10))
    );
    const headacheTotal = headacheDays.size;

    const triggers = settings.eventDefinitions.filter((def) => def.type !== 'headache');

    return triggers.map(({ type, label, icon }) => {
      const triggerDays = new Set(
        events.filter((e) => e.type === type).map((e) => e.timestamp.slice(0, 10))
      );
      const count = [...headacheDays].filter((d) => triggerDays.has(d)).length;
      return { type, label, icon, count, headacheTotal };
    });
  }, [events, settings.eventDefinitions]);

  const headacheTotal = triggerStats[0]?.headacheTotal ?? 0;

  // --- Chart 2: Headaches per Cycle Phase ---
  const phaseStats = useMemo(() => {
    const countByPhase: Record<string, number> = {};
    for (const phase of settings.phases) {
      countByPhase[phase.name] = 0;
    }

    for (const event of events) {
      if (event.type !== 'headache') continue;
      const phase = getPhaseForDate(event.timestamp.slice(0, 10), settings);
      if (phase) {
        countByPhase[phase.name] = (countByPhase[phase.name] ?? 0) + 1;
      }
    }

    const maxCount = Math.max(1, ...Object.values(countByPhase));

    return settings.phases.map((phase) => ({
      phase,
      count: countByPhase[phase.name] ?? 0,
      maxCount,
    }));
  }, [events, settings]);

  // --- Chart 3: Headaches per Pill Phase ---
  const pillPhaseStats = useMemo(() => {
    const countByPhase: Record<string, number> = {};
    for (const phase of settings.pillPhases) {
      countByPhase[phase.name] = 0;
    }

    for (const event of events) {
      if (event.type !== 'headache') continue;
      const phase = getPillPhaseForDate(event.timestamp.slice(0, 10), settings);
      if (phase) {
        countByPhase[phase.name] = (countByPhase[phase.name] ?? 0) + 1;
      }
    }

    const maxCount = Math.max(1, ...Object.values(countByPhase));

    return settings.pillPhases.map((phase) => ({
      phase,
      count: countByPhase[phase.name] ?? 0,
      maxCount,
    }));
  }, [events, settings]);

  return (
    <div className="max-w-sm mx-auto px-4 py-6 pb-28 space-y-8">

      {/* Chart 1 */}
      <section className="space-y-4">
        <div>
          <h2 className="text-base font-bold text-gray-800 dark:text-gray-100">
            Kopfschmerzen & Auslöser
          </h2>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
            Tage mit Kopfschmerz <em>und</em> dem jeweiligen Auslöser
            {headacheTotal > 0 && ` (von ${headacheTotal} Kopfschmerztagen)`}
          </p>
        </div>

        {headacheTotal === 0 ? (
          <p className="text-sm text-gray-400 dark:text-gray-500 py-4 text-center">
            Noch keine Kopfschmerz-Einträge vorhanden.
          </p>
        ) : (
          <div className="space-y-3">
            {triggerStats.map(({ type, label, icon, count, headacheTotal: total }) => (
              <Bar
                key={type}
                label={`${icon} ${label}`}
                count={count}
                percentage={total > 0 ? (count / total) * 100 : 0}
                color="#fb7185"
                sublabel={total > 0 ? `${Math.round((count / total) * 100)} %` : undefined}
              />
            ))}
          </div>
        )}
      </section>

      <div className="border-t border-gray-100 dark:border-gray-700" />

      {/* Chart 2 */}
      <section className="space-y-4">
        <div>
          <h2 className="text-base font-bold text-gray-800 dark:text-gray-100">
            Kopfschmerzen pro Zyklusphase
          </h2>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
            Anzahl Kopfschmerztage je Phase
          </p>
        </div>

        <div className="space-y-3">
          {phaseStats.map(({ phase, count, maxCount }) => (
            <Bar
              key={phase.name}
              label={phase.name}
              count={count}
              percentage={(count / maxCount) * 100}
              color={phase.color}
            />
          ))}
        </div>
      </section>

      <div className="border-t border-gray-100 dark:border-gray-700" />

      {/* Chart 3 */}
      <section className="space-y-4">
        <div>
          <h2 className="text-base font-bold text-gray-800 dark:text-gray-100">
            Kopfschmerzen pro Pillenphase
          </h2>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
            Anzahl Kopfschmerztage je Pillenphase
          </p>
        </div>

        <div className="space-y-3">
          {pillPhaseStats.map(({ phase, count, maxCount }) => (
            <Bar
              key={phase.name}
              label={phase.name}
              count={count}
              percentage={(count / maxCount) * 100}
              color={phase.color}
            />
          ))}
        </div>
      </section>

    </div>
  );
}
