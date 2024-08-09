import EventItem from './EventItem';

const EventList = ({ events, onTagClick }) => {
  const sortedEvents = events.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="space-y-4">
      {sortedEvents.length > 0 ? (
        sortedEvents.map(event => (
          <EventItem key={event.id} event={event} onTagClick={onTagClick} />
        ))
      ) : (
        <p>No events found matching the current filters.</p>
      )}
    </div>
  );
};

export default EventList;
