import { useRef } from 'react';
import CycleStartPicker from '../components/settings/CycleStartPicker';
import PhaseEditor from '../components/settings/PhaseEditor';
import { useAppContext } from '../context/useAppContext';
import { exportJSON, importJSON } from '../utils/exportImport';

export default function SettingsPage() {
  const { state, dispatch } = useAppContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="max-w-sm mx-auto px-4 py-6 space-y-8 pb-12">
      <section className="space-y-4">
        <h3 className="text-base font-bold text-gray-700 uppercase tracking-wide text-xs">
          Zyklus
        </h3>
        <CycleStartPicker />
        <PhaseEditor />
      </section>

      <section className="space-y-4">
        <h3 className="text-base font-bold text-gray-700 uppercase tracking-wide text-xs">
          Daten
        </h3>

        <div className="space-y-3">
          <button
            onClick={() => exportJSON(state)}
            className="w-full py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-100 active:bg-gray-200 flex items-center justify-center gap-2 transition-colors"
          >
            <span>⬇️</span> Daten exportieren (JSON)
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-100 active:bg-gray-200 flex items-center justify-center gap-2 transition-colors"
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
              // Reset so same file can be re-imported
              e.target.value = '';
            }}
          />
        </div>

        <p className="text-xs text-gray-400">
          Alle Daten werden lokal auf diesem Gerät gespeichert. Nutze Export/Import um Daten zu sichern oder zu übertragen.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-base font-bold text-gray-700 uppercase tracking-wide text-xs">
          Gefahrenzone
        </h3>
        <button
          onClick={() => {
            if (confirm('Alle Ereignisse löschen? Diese Aktion kann nicht rückgängig gemacht werden.')) {
              dispatch({ type: 'IMPORT_DATA', payload: { events: [], settings: state.settings } });
            }
          }}
          className="w-full py-3 rounded-xl bg-red-50 border border-red-200 text-sm font-medium text-red-600 hover:bg-red-100 active:bg-red-200 transition-colors"
        >
          Alle Ereignisse löschen
        </button>
      </section>
    </div>
  );
}
