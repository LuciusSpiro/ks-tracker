import { useState } from 'react';
import BottomSheet from '../common/BottomSheet';
import { EVENT_DEFINITIONS } from '../../constants/events';
import { EventType } from '../../types';

interface EventPickerSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (type: EventType, note?: string) => void;
}

export default function EventPickerSheet({ isOpen, onClose, onSelect }: EventPickerSheetProps) {
  const [noteStep, setNoteStep] = useState(false);
  const [note, setNote] = useState('');

  function handleClose() {
    setNoteStep(false);
    setNote('');
    onClose();
  }

  function handlePick(type: EventType) {
    if (type === 'painkillers') {
      setNoteStep(true);
    } else {
      onSelect(type);
      handleClose();
    }
  }

  function handleNoteConfirm() {
    onSelect('painkillers', note.trim() || undefined);
    setNoteStep(false);
    setNote('');
    onClose();
  }

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={handleClose}
      title={noteStep ? 'Notiz hinzufügen' : 'Ereignis hinzufügen'}
    >
      {noteStep ? (
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700">
            <span className="text-3xl">💊</span>
            <span className="text-base font-medium text-gray-800 dark:text-gray-100">Schmerzmittel genommen</span>
          </div>
          <textarea
            autoFocus
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="z.B. Ibuprofen 400mg, wegen starken Kopfschmerzen …"
            rows={3}
            className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-300 resize-none"
          />
          <div className="flex gap-2">
            <button
              onClick={() => { setNoteStep(false); setNote(''); }}
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
          {EVENT_DEFINITIONS.map((def) => (
            <button
              key={def.type}
              onClick={() => handlePick(def.type)}
              className="w-full flex items-center gap-4 px-4 py-4 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 active:bg-gray-200 dark:active:bg-gray-500 text-left transition-colors"
            >
              <span className="text-3xl">{def.icon}</span>
              <div>
                <span className="text-base font-medium text-gray-800 dark:text-gray-100">{def.label}</span>
                {def.type === 'painkillers' && (
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
