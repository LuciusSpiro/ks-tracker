import { Phase } from '../../types';

interface PhaseRowProps {
  phase: Phase;
  onChange: (updated: Phase) => void;
}

export default function PhaseRow({ phase, onChange }: PhaseRowProps) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0">
      {/* Color picker */}
      <div className="relative shrink-0">
        <input
          type="color"
          value={phase.color}
          onChange={(e) => onChange({ ...phase, color: e.target.value })}
          className="w-9 h-9 rounded-lg border border-gray-200 cursor-pointer p-0.5"
          aria-label={`Farbe für ${phase.name}`}
        />
      </div>

      {/* Phase name */}
      <span className="flex-1 text-sm font-medium text-gray-800">{phase.name}</span>

      {/* Duration input */}
      <div className="flex items-center gap-1 shrink-0">
        <input
          type="number"
          min={1}
          max={25}
          value={phase.duration}
          onChange={(e) => {
            const val = parseInt(e.target.value, 10);
            if (!isNaN(val) && val >= 1) {
              onChange({ ...phase, duration: val });
            }
          }}
          className="w-12 text-center px-1 py-1 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
        />
        <span className="text-xs text-gray-400">Tage</span>
      </div>
    </div>
  );
}
