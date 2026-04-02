import { useState } from 'react';
import CalendarHeader from '../components/calendar/CalendarHeader';
import CalendarGrid from '../components/calendar/CalendarGrid';
import DayDetailModal from '../components/dayDetail/DayDetailModal';
import { useAppContext } from '../context/useAppContext';

export default function CalendarPage() {
  const { state } = useAppContext();
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  function goPrev() {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  }

  function goNext() {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  }

  return (
    <div className="max-w-sm mx-auto">
      <CalendarHeader year={year} month={month} onPrev={goPrev} onNext={goNext} />
      <CalendarGrid
        year={year}
        month={month}
        events={state.events}
        settings={state.settings}
        onDaySelect={setSelectedDate}
      />
      <DayDetailModal
        date={selectedDate}
        onClose={() => setSelectedDate(null)}
      />
    </div>
  );
}
