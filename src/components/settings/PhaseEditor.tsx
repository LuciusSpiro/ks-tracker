import { useState, useEffect } from 'react';
import { Phase } from '../../types';
import PhaseRow from './PhaseRow';

interface PhaseEditorProps {
  label: string;
  phases: Phase[];
  onSave: (phases: Phase[]) => void;
  allowAddDelete?: boolean;
}

const DEFAULT_COLORS = ['#60a5fa', '#f472b6', '#a78bfa', '#34d399', '#fb923c', '#facc15'];

export default function PhaseEditor({ label, phases, onSave, allowAddDelete }: PhaseEditorProps) {
  const [draft, setDraft] = useState<Phase[]>(phases);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setDraft(phases);
  }, [phases]);

  const sum = draft.reduce((s, p) => s + p.duration, 0);
  const isValid = sum === 28 && draft.every((p) => p.name.trim() !== '');

  function handleSave() {
    if (!isValid) return;
    onSave(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  function addPhase() {
    const remaining = Math.max(1, 28 - sum);
    const color = DEFAULT_COLORS[draft.length % DEFAULT_COLORS.length];
    setDraft([...draft, { name: '', duration: remaining, color }]);
  }

  function deletePhase(index: number) {
    setDraft(draft.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
        {label}
      </label>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-600 overflow-hidden px-3">
        {draft.map((phase, i) => (
          <PhaseRow
            key={i}
            phase={phase}
            editableName={allowAddDelete}
            onChange={(updated) => {
              const next = [...draft];
              next[i] = updated;
              setDraft(next);
            }}
            onDelete={allowAddDelete && draft.length > 1 ? () => deletePhase(i) : undefined}
          />
        ))}

        {allowAddDelete && (
          <button
            onClick={addPhase}
            className="w-full py-2.5 flex items-center justify-center gap-1.5 text-sm font-medium text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
          >
            <span className="text-lg leading-none">+</span> Phase hinzufügen
          </button>
        )}
      </div>

      <div className="flex items-center justify-between px-1">
        <span className={`text-sm font-medium ${isValid ? 'text-green-600 dark:text-green-400' : 'text-red-500'}`}>
          Summe: {sum} / 28 Tage {isValid ? '✓' : '— muss 28 ergeben'}
        </span>
        <button
          onClick={handleSave}
          disabled={!isValid}
          className={[
            'px-4 py-1.5 rounded-lg text-sm font-medium transition-colors',
            isValid
              ? 'bg-rose-400 text-white hover:bg-rose-500 active:bg-rose-600'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-300 dark:text-gray-500 cursor-not-allowed',
          ].join(' ')}
        >
          {saved ? 'Gespeichert ✓' : 'Speichern'}
        </button>
      </div>
    </div>
  );
}
