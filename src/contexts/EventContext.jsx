import React, { createContext, useState, useContext, useEffect } from 'react';

const EventContext = createContext();

export const useEventContext = () => useContext(EventContext);

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState(() => {
    const storedEvents = localStorage.getItem('events');
    return storedEvents ? JSON.parse(storedEvents) : [
      { id: 1, name: 'Tech Conference 2024', category: 'Technology', date: '2024-06-15', tags: ['tech', 'conference'] },
      { id: 2, name: 'Summer Music Festival', category: 'Entertainment', date: '2024-07-20', tags: ['music', 'festival'] },
      { id: 3, name: 'Modern Art Exhibition', category: 'Art', date: '2024-05-10', tags: ['art', 'exhibition'] },
      { id: 4, name: 'Food and Wine Fair', category: 'Culinary', date: '2024-08-05', tags: ['food', 'wine'] },
      { id: 5, name: 'Startup Pitch Competition', category: 'Business', date: '2024-09-01', tags: ['startup', 'business'] },
      { id: 6, name: 'International Film Festival', category: 'Entertainment', date: '2024-10-12', tags: ['film', 'festival'] },
      { id: 7, name: 'Eco-Friendly Products Expo', category: 'Environment', date: '2024-11-05', tags: ['eco', 'sustainability'] },
      { id: 8, name: 'Artificial Intelligence Summit', category: 'Technology', date: '2025-01-20', tags: ['AI', 'tech'] },
      { id: 9, name: 'Wellness and Yoga Retreat', category: 'Health', date: '2024-04-18', tags: ['wellness', 'yoga'] },
      { id: 10, name: 'Vintage Car Show', category: 'Automotive', date: '2024-08-30', tags: ['cars', 'vintage'] },
      { id: 11, name: 'Blockchain and Cryptocurrency Conference', category: 'Finance', date: '2024-07-10', tags: ['blockchain', 'crypto'] },
      { id: 12, name: 'Gourmet Food Truck Festival', category: 'Culinary', date: '2024-06-22', tags: ['food', 'festival'] },
      { id: 13, name: 'Virtual Reality Gaming Expo', category: 'Technology', date: '2024-09-15', tags: ['VR', 'gaming'] },
      { id: 14, name: 'Sustainable Fashion Show', category: 'Fashion', date: '2024-10-05', tags: ['fashion', 'sustainability'] },
    ];
  });

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const addEvent = (newEvent) => {
    setEvents(prevEvents => {
      const newEvents = [...prevEvents, { ...newEvent, id: prevEvents.length + 1 }];
      localStorage.setItem('events', JSON.stringify(newEvents));
      return newEvents;
    });
  };

  return (
    <EventContext.Provider value={{ events, addEvent }}>
      {children}
    </EventContext.Provider>
  );
};
