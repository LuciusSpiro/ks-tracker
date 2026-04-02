import { useState, useEffect } from 'react';
import { Phase } from '../../types';
import { useAppContext } from '../../context/useAppContext';
import PhaseRow from './PhaseRow';

export default function PhaseEditor() {
  const { state, dispatch } = useAppContext();
  const [draft, setDraft] = useState<Phase[]>(state.settings.phases);
  const [saved, setSaved] = useState(false);

  // Sync draft when settings change externally (e.g. import)
  useEffect(() => {
    setDraft(state.settings.phases);
  }, [state.settings.phases]);

  const sum = draft.reduce((s, p) => s + p.duration, 0);
  const isValid = sum === 28;

  function handleSave() {
    if (!isValid) return;
    dispatch({ type: 'UPDATE_SETTINGS', payload: { phases: draft } });
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        Zyklusphasen
      </label>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden px-3">
        {draft.map((phase, i) => (
          <PhaseRow
            key={phase.name}
            phase={phase}
            onChange={(updated) => {
              const next = [...draft];
              next[i] = updated;
              setDraft(next);
            }}
          />
        ))}
      </div>

      {/* Sum indicator */}
      <div className="flex items-center justify-between px-1">
        <span className={`text-sm font-medium ${isValid ? 'text-green-600' : 'text-red-500'}`}>
          Summe: {sum} / 28 Tage {isValid ? '✓' : '— muss 28 ergeben'}
        </span>
        <button
          onClick={handleSave}
          disabled={!isValid}
          className={[
            'px-4 py-1.5 rounded-lg text-sm font-medium transition-colors',
            isValid
              ? 'bg-rose-400 text-white hover:bg-rose-500 active:bg-rose-600'
              : 'bg-gray-100 text-gray-300 cursor-not-allowed',
          ].join(' ')}
        >
          {saved ? 'Gespeichert ✓' : 'Speichern'}
        </button>
      </div>
    </div>
  );
}
