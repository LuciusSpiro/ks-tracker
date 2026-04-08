import { useRef } from 'react';
import CycleStartPicker from '../components/settings/CycleStartPicker';
import PhaseEditor from '../components/settings/PhaseEditor';
import PillStartPicker from '../components/settings/PillStartPicker';
import EventEditor from '../components/settings/EventEditor';
import { useAppContext } from '../context/useAppContext';
import { exportJSON, importJSON } from '../utils/exportImport';

export default function SettingsPage() {
  const { state, dispatch } = useAppContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="max-w-sm mx-auto px-4 py-6 space-y-8 pb-12">

      <section className="space-y-4">
        <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          Zyklus
        </h3>
        <CycleStartPicker />
        <PhaseEditor
          label="Zyklusphasen"
          phases={state.settings.phases}
          onSave={(phases) => dispatch({ type: 'UPDATE_SETTINGS', payload: { phases } })}
        />
      </section>

      <section className="space-y-4">
        <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          Pille
        </h3>
        <PillStartPicker />
        <PhaseEditor
          label="Pillenphasen"
          phases={state.settings.pillPhases}
          onSave={(pillPhases) => dispatch({ type: 'UPDATE_SETTINGS', payload: { pillPhases } })}
        />
        <p className="text-xs text-gray-400 dark:text-gray-500 -mt-1">
          Die Pillenphase wird als untere Hälfte jedes Kalendertags angezeigt.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          Ereignisse
        </h3>
        <EventEditor />
      </section>

      <section className="space-y-4">
        <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          Daten
        </h3>

        <div className="space-y-3">
          <button
            onClick={() => exportJSON(state)}
            className="w-full py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600 flex items-center justify-center gap-2 transition-colors"
          >
            <span>⬇️</span> Daten exportieren (JSON)
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600 flex items-center justify-center gap-2 transition-colors"
          >
            <span>⬆️</span> Daten importieren (JSON)
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              importJSON(file, (data) => {
                dispatch({ type: 'IMPORT_DATA', payload: data });
                alert('Daten erfolgreich importiert!');
              });
              e.target.value = '';
            }}
          />
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-500">
          Alle Daten werden lokal auf diesem Gerät gespeichert. Nutze Export/Import um Daten zu sichern oder zu übertragen.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          Gefahrenzone
        </h3>
        <button
          onClick={() => {
            if (confirm('Alle Ereignisse löschen? Diese Aktion kann nicht rückgängig gemacht werden.')) {
              dispatch({ type: 'IMPORT_DATA', payload: { events: [], settings: state.settings } });
            }
          }}
          className="w-full py-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 active:bg-red-200 transition-colors"
        >
          Alle Ereignisse löschen
        </button>
      </section>
    </div>
  );
}
