import React from 'react';
import { useEventContext } from '../contexts/EventContext';
import EventList from '../components/EventList';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { events } = useEventContext();
  const navigate = useNavigate();

  const today = new Date();
  const upcomingEvents = events
    .filter(event => new Date(event.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);  // Show only the next 5 upcoming events

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">Welcome to Event Manager</h1>
      <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
      <EventList events={upcomingEvents} onTagClick={() => {}} />
      <div className="mt-6">
        <Button onClick={() => navigate('/events')}>View All Upcoming Events</Button>
      </div>
    </div>
  );
};

export default Index;
