import EventItem from './EventItem';

const EventList = ({ events, filter }) => {
  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(filter.toLowerCase()) ||
    event.category.toLowerCase().includes(filter.toLowerCase()) ||
    event.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase()))
  );

  const sortedEvents = filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="space-y-4">
      {sortedEvents.map(event => (
        <EventItem key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventList;
