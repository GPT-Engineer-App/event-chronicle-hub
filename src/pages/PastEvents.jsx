import React, { useState } from 'react';
import EventList from '../components/EventList';
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEventContext } from '../contexts/EventContext';
import { useNavigate } from 'react-router-dom';

const PastEvents = () => {
  const { events } = useEventContext();
  const navigate = useNavigate();
  const [textFilter, setTextFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');

  const handleTextFilterChange = (e) => {
    setTextFilter(e.target.value);
  };

  const handleTagClick = (tag) => {
    setTagFilter(tag === tagFilter ? '' : tag);
  };

  const today = new Date();
  const pastEvents = events.filter(event => new Date(event.date) < today);

  const filteredEvents = pastEvents.filter(event => {
    const matchesText = 
      event.name.toLowerCase().includes((textFilter || '').toLowerCase()) ||
      event.category.toLowerCase().includes((textFilter || '').toLowerCase()) ||
      event.tags.some(tag => tag.toLowerCase().includes((textFilter || '').toLowerCase()));
    
    const matchesTag = !tagFilter || event.tags.includes(tagFilter);

    return matchesText && matchesTag;
  });

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Past Events</h1>
        <Button onClick={() => navigate('/events')}>View Upcoming Events</Button>
      </div>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Filter events..."
          value={textFilter}
          onChange={handleTextFilterChange}
          className="w-full"
        />
      </div>
      {tagFilter && (
        <div className="mb-4">
          <Badge 
            variant="secondary" 
            className="cursor-pointer bg-[#AB4967] text-[#F7F2F4]"
            onClick={() => setTagFilter('')}
          >
            {tagFilter} ×
          </Badge>
        </div>
      )}
      <EventList events={filteredEvents} onTagClick={handleTagClick} />
    </div>
  );
};

export default PastEvents;
