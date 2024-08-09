import { useState, useEffect } from 'react';
import EventItem from './EventItem';

const EventList = ({ filter }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Simulated API call to fetch events
    const fetchEvents = async () => {
      // Replace this with an actual API call in a real application
      const mockEvents = [
        { id: 1, name: 'Tech Conference', category: 'Technology', date: '2024-06-15', tags: ['tech', 'conference'] },
        { id: 2, name: 'Music Festival', category: 'Entertainment', date: '2024-07-20', tags: ['music', 'festival'] },
        { id: 3, name: 'Art Exhibition', category: 'Art', date: '2024-05-10', tags: ['art', 'exhibition'] },
        { id: 4, name: 'Food Fair', category: 'Culinary', date: '2024-08-05', tags: ['food', 'fair'] },
      ];
      setEvents(mockEvents);
    };

    fetchEvents();
  }, []);

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
