import EventItem from './EventItem';

const EventList = ({ events, textFilter, dateFilter }) => {
  const filteredEvents = events.filter(event => {
    const matchesText = 
      event.name.toLowerCase().includes((textFilter || '').toLowerCase()) ||
      event.category.toLowerCase().includes((textFilter || '').toLowerCase()) ||
      event.tags.some(tag => tag.toLowerCase().includes((textFilter || '').toLowerCase()));
    
    const matchesDate = !dateFilter || event.date === dateFilter;

    return matchesText && matchesDate;
  });

  const sortedEvents = filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="space-y-4">
      {sortedEvents.length > 0 ? (
        sortedEvents.map(event => (
          <EventItem key={event.id} event={event} />
        ))
      ) : (
        <p>No events found matching the current filters.</p>
      )}
    </div>
  );
};

export default EventList;
