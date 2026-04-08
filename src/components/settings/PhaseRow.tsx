import { useState } from 'react';
import { Phase } from '../../types';

interface PhaseRowProps {
  phase: Phase;
  onChange: (updated: Phase) => void;
  editableName?: boolean;
  onDelete?: () => void;
}

export default function PhaseRow({ phase, onChange, editableName, onDelete }: PhaseRowProps) {
  const [inputValue, setInputValue] = useState(String(phase.duration));

  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
      <input
        type="color"
        value={phase.color}
        onChange={(e) => onChange({ ...phase, color: e.target.value })}
        className="w-9 h-9 shrink-0 rounded-lg border border-gray-200 dark:border-gray-600 cursor-pointer p-0.5 bg-white dark:bg-gray-700"
        aria-label={`Farbe für ${phase.name}`}
      />

      {editableName ? (
        <input
          type="text"
          value={phase.name}
          onChange={(e) => onChange({ ...phase, name: e.target.value })}
          placeholder="Name …"
          className="flex-1 min-w-0 px-2 py-1 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
        />
      ) : (
        <span className="flex-1 text-sm font-medium text-gray-800 dark:text-gray-100">{phase.name}</span>
      )}

      <div className="flex items-center gap-1 shrink-0">
        <input
          type="number"
          min={1}
          max={27}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            const val = parseInt(e.target.value, 10);
            if (!isNaN(val) && val >= 1) {
              onChange({ ...phase, duration: val });
            }
          }}
          onBlur={() => {
            const val = parseInt(inputValue, 10);
            if (isNaN(val) || val < 1) {
              setInputValue(String(phase.duration));
            }
          }}
          className="w-12 text-center px-1 py-1 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
        />
        <span className="text-xs text-gray-400 dark:text-gray-500">Tage</span>
      </div>

      {onDelete && (
        <button
          onClick={onDelete}
          className="p-1 text-gray-300 dark:text-gray-600 hover:text-red-400 transition-colors shrink-0"
          aria-label="Phase löschen"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
