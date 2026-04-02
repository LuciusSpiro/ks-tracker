import BottomSheet from '../common/BottomSheet';
import { EVENT_DEFINITIONS } from '../../constants/events';
import { EventType } from '../../types';

interface EventPickerSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (type: EventType) => void;
}

export default function EventPickerSheet({ isOpen, onClose, onSelect }: EventPickerSheetProps) {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Ereignis hinzufügen">
      <div className="p-4 space-y-2">
        {EVENT_DEFINITIONS.map((def) => (
          <button
            key={def.type}
            onClick={() => {
              onSelect(def.type);
              onClose();
            }}
            className="w-full flex items-center gap-4 px-4 py-4 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 active:bg-gray-200 dark:active:bg-gray-500 text-left transition-colors"
          >
            <span className="text-3xl">{def.icon}</span>
            <span className="text-base font-medium text-gray-800 dark:text-gray-100">{def.label}</span>
          </button>
        ))}
      </div>
    </BottomSheet>
  );
}
