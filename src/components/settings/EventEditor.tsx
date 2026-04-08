import { useState } from 'react';
import { useAppContext } from '../../context/useAppContext';
import { EventDefinition } from '../../types';
import { ICON_PICKER_OPTIONS } from '../../constants/events';

type EditTarget = { mode: 'new' } | { mode: 'edit'; index: number };

interface FormState {
  label: string;
  icon: string;
  hasNote: boolean;
}

const EMPTY_FORM: FormState = { label: '', icon: '⭐', hasNote: false };

export default function EventEditor() {
  const { state, dispatch } = useAppContext();
  const defs = state.settings.eventDefinitions;

  const [target, setTarget] = useState<EditTarget | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  function openNew() {
    setForm(EMPTY_FORM);
    setShowIconPicker(false);
    setTarget({ mode: 'new' });
  }

  function openEdit(index: number) {
    const def = defs[index];
    setForm({ label: def.label, icon: def.icon, hasNote: def.hasNote ?? false });
    setShowIconPicker(false);
    setTarget({ mode: 'edit', index });
  }

  function closeForm() {
    setTarget(null);
    setShowIconPicker(false);
  }

  function save() {
    if (!form.label.trim() || !target) return;

    const updated = [...defs];

    if (target.mode === 'new') {
      const newDef: EventDefinition = {
        type: `custom_${Date.now()}`,
        label: form.label.trim(),
        icon: form.icon,
        hasNote: form.hasNote || undefined,
      };
      updated.push(newDef);
    } else {
      updated[target.index] = {
        ...updated[target.index],
        label: form.label.trim(),
        icon: form.icon,
        hasNote: form.hasNote || undefined,
      };
    }

    dispatch({ type: 'UPDATE_SETTINGS', payload: { eventDefinitions: updated } });
    closeForm();
  }

  function confirmDelete(index: number) {
    setDeleteIndex(index);
  }

  function executeDelete() {
    if (deleteIndex === null) return;
    const updated = defs.filter((_, i) => i !== deleteIndex);
    dispatch({ type: 'UPDATE_SETTINGS', payload: { eventDefinitions: updated } });
    setDeleteIndex(null);
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
      {/* List */}
      {defs.map((def, i) => (
        <div
          key={def.type}
          className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-0"
        >
          <span className="text-2xl w-8 text-center">{def.icon}</span>
          <span className="flex-1 text-sm font-medium text-gray-800 dark:text-gray-100 truncate">{def.label}</span>
          {def.hasNote && (
            <span className="text-[10px] text-gray-400 dark:text-gray-500 shrink-0">Notiz</span>
          )}
          <button
            onClick={() => openEdit(i)}
            className="p-1.5 text-gray-400 dark:text-gray-500 hover:text-rose-400 dark:hover:text-rose-400 transition-colors shrink-0"
            aria-label="Bearbeiten"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          <button
            onClick={() => confirmDelete(i)}
            className="p-1.5 text-gray-300 dark:text-gray-600 hover:text-red-400 dark:hover:text-red-400 transition-colors shrink-0"
            aria-label="Löschen"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      ))}

      {/* Add button */}
      <button
        onClick={openNew}
        className="w-full py-3 flex items-center justify-center gap-2 text-sm font-medium text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
      >
        <span className="text-lg leading-none">+</span> Ereignis hinzufügen
      </button>

      {/* Edit / New modal */}
      {target && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center">
          <div className="absolute inset-0 bg-black/50" onClick={closeForm} />
          <div className="relative w-full max-w-sm bg-white dark:bg-gray-800 rounded-t-2xl sm:rounded-2xl shadow-xl p-5 space-y-4">
            <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100">
              {target.mode === 'new' ? 'Neues Ereignis' : 'Ereignis bearbeiten'}
            </h3>

            {/* Icon + Label row */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowIconPicker((v) => !v)}
                className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-2xl flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors shrink-0"
                aria-label="Icon wählen"
              >
                {form.icon}
              </button>
              <input
                type="text"
                value={form.label}
                onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
                placeholder="Bezeichnung …"
                className="flex-1 px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-300"
                autoFocus
              />
            </div>

            {/* Icon picker */}
            {showIconPicker && (
              <div className="max-h-40 overflow-y-auto rounded-xl border border-gray-200 dark:border-gray-600 p-2 bg-gray-50 dark:bg-gray-700">
                <div className="grid grid-cols-8 gap-1">
                  {ICON_PICKER_OPTIONS.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => { setForm((f) => ({ ...f, icon: emoji })); setShowIconPicker(false); }}
                      className={[
                        'w-9 h-9 text-xl flex items-center justify-center rounded-lg transition-colors',
                        form.icon === emoji
                          ? 'bg-rose-100 dark:bg-rose-900/40 ring-2 ring-rose-300'
                          : 'hover:bg-gray-200 dark:hover:bg-gray-600',
                      ].join(' ')}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* hasNote toggle */}
            <label className="flex items-center gap-3 cursor-pointer">
              <div
                onClick={() => setForm((f) => ({ ...f, hasNote: !f.hasNote }))}
                className={[
                  'w-10 h-6 rounded-full transition-colors relative shrink-0',
                  form.hasNote ? 'bg-rose-400' : 'bg-gray-200 dark:bg-gray-600',
                ].join(' ')}
              >
                <span
                  className={[
                    'absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform',
                    form.hasNote ? 'translate-x-4' : 'translate-x-0.5',
                  ].join(' ')}
                />
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">Notiz möglich</span>
            </label>

            {/* Actions */}
            <div className="flex gap-2 pt-1">
              <button
                onClick={closeForm}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Abbrechen
              </button>
              <button
                onClick={save}
                disabled={!form.label.trim()}
                className="flex-1 py-2.5 rounded-xl bg-rose-400 text-white text-sm font-medium hover:bg-rose-500 active:bg-rose-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Speichern
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteIndex !== null && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDeleteIndex(null)} />
          <div className="relative w-full max-w-xs bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 space-y-4">
            <div className="text-center space-y-1">
              <p className="text-base font-semibold text-gray-800 dark:text-gray-100">Ereignis löschen?</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {defs[deleteIndex]?.icon} {defs[deleteIndex]?.label}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteIndex(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Abbrechen
              </button>
              <button
                onClick={executeDelete}
                className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 active:bg-red-700 transition-colors"
              >
                Löschen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
