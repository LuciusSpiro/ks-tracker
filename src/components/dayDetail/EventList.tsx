import { TrackingEvent } from '../../types';
import EventListItem from './EventListItem';

interface EventListProps {
  events: TrackingEvent[];
}

export default function EventList({ events }: EventListProps) {
  if (events.length === 0) {
    return (
      <p className="text-center text-gray-400 text-sm py-8">
        Keine Ereignisse für diesen Tag.
      </p>
    );
  }

  const sorted = [...events].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  return (
    <div className="bg-white rounded-xl overflow-hidden">
      {sorted.map((event) => (
        <EventListItem key={event.id} event={event} />
      ))}
    </div>
  );
}
