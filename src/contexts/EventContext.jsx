import React, { createContext, useState, useContext } from 'react';

const EventContext = createContext();

export const useEventContext = () => useContext(EventContext);

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([
    { id: 1, name: 'Tech Conference 2024', category: 'Technology', date: '2024-06-15', tags: ['tech', 'conference'] },
    { id: 2, name: 'Summer Music Festival', category: 'Entertainment', date: '2024-07-20', tags: ['music', 'festival'] },
    { id: 3, name: 'Modern Art Exhibition', category: 'Art', date: '2024-05-10', tags: ['art', 'exhibition'] },
    { id: 4, name: 'Food and Wine Fair', category: 'Culinary', date: '2024-08-05', tags: ['food', 'wine'] },
  ]);

  const addEvent = (newEvent) => {
    setEvents(prevEvents => [...prevEvents, { ...newEvent, id: prevEvents.length + 1 }]);
  };

  return (
    <EventContext.Provider value={{ events, addEvent }}>
      {children}
    </EventContext.Provider>
  );
};
