import { useAppContext } from '../../context/useAppContext';

export default function PillStartPicker() {
  const { state, dispatch } = useAppContext();

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
        Pillenbeginn
      </label>
      <input
        type="date"
        value={state.settings.pillStartDate}
        onChange={(e) => {
          if (e.target.value) {
            dispatch({
              type: 'UPDATE_SETTINGS',
              payload: { pillStartDate: e.target.value },
            });
          }
        }}
        className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-300"
      />
      <p className="text-xs text-gray-400 dark:text-gray-500">
        Erster Tag deiner aktuellen Pillenpackung
      </p>
    </div>
  );
}
