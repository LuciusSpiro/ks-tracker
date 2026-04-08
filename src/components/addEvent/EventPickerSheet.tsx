import { useState } from 'react';
import BottomSheet from '../common/BottomSheet';
import { useAppContext } from '../../context/useAppContext';
import { EventDefinition } from '../../types';

interface EventPickerSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (type: string, note?: string) => void;
}

export default function EventPickerSheet({ isOpen, onClose, onSelect }: EventPickerSheetProps) {
  const { state } = useAppContext();
  const eventDefinitions = state.settings.eventDefinitions;

  const [noteFor, setNoteFor] = useState<EventDefinition | null>(null);
  const [note, setNote] = useState('');

  function handleClose() {
    setNoteFor(null);
    setNote('');
    onClose();
  }

  function handlePick(def: EventDefinition) {
    if (def.hasNote) {
      setNoteFor(def);
    } else {
      onSelect(def.type);
      handleClose();
    }
  }

  function handleNoteConfirm() {
    if (!noteFor) return;
    onSelect(noteFor.type, note.trim() || undefined);
    setNoteFor(null);
    setNote('');
    onClose();
  }

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={handleClose}
      title={noteFor ? 'Notiz hinzufügen' : 'Ereignis hinzufügen'}
    >
      {noteFor ? (
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700">
            <span className="text-3xl">{noteFor.icon}</span>
            <span className="text-base font-medium text-gray-800 dark:text-gray-100">{noteFor.label}</span>
          </div>
          <textarea
            autoFocus
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Notiz hinzufügen …"
            rows={3}
            className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-300 resize-none"
          />
          <div className="flex gap-2">
            <button
              onClick={() => { setNoteFor(null); setNote(''); }}
              className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Zurück
            </button>
            <button
              onClick={handleNoteConfirm}
              className="flex-1 py-3 rounded-xl bg-rose-400 text-white text-sm font-medium hover:bg-rose-500 active:bg-rose-600 transition-colors"
            >
              Hinzufügen
            </button>
          </div>
        </div>
      ) : (
        <div className="p-4 space-y-2">
          {eventDefinitions.map((def) => (
            <button
              key={def.type}
              onClick={() => handlePick(def)}
              className="w-full flex items-center gap-4 px-4 py-4 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 active:bg-gray-200 dark:active:bg-gray-500 text-left transition-colors"
            >
              <span className="text-3xl">{def.icon}</span>
              <div>
                <span className="text-base font-medium text-gray-800 dark:text-gray-100">{def.label}</span>
                {def.hasNote && (
                  <p className="text-xs text-gray-400 dark:text-gray-500">Notiz möglich</p>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </BottomSheet>
  );
}
