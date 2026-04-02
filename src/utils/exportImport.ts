import { AppData } from '../types';

export function exportJSON(data: AppData): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `alice-tracker-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function importJSON(file: File, onSuccess: (data: AppData) => void): void {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const parsed = JSON.parse(e.target!.result as string) as AppData;
      if (Array.isArray(parsed.events) && parsed.settings?.phases) {
        onSuccess(parsed);
      } else {
        alert('Ungültige Datei — Format nicht erkannt.');
      }
    } catch {
      alert('Fehler beim Lesen der Datei.');
    }
  };
  reader.readAsText(file);
}
