import { useAppContext } from '../../context/useAppContext';

export default function CycleStartPicker() {
  const { state, dispatch } = useAppContext();

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
        Zyklusbeginn
      </label>
      <input
        type="date"
        value={state.settings.cycleStartDate}
        onChange={(e) => {
          if (e.target.value) {
            dispatch({
              type: 'UPDATE_SETTINGS',
              payload: { cycleStartDate: e.target.value },
            });
          }
        }}
        className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-300"
      />
      <p className="text-xs text-gray-400 dark:text-gray-500">
        Erster Tag deines letzten Zyklus
      </p>
    </div>
  );
}
