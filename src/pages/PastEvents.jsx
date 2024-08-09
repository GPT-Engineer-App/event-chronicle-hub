import React, { useState } from 'react';
import EventList from '../components/EventList';
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useEventContext } from '../contexts/EventContext';

const PastEvents = () => {
  const { events } = useEventContext();
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
      <h1 className="text-3xl font-bold mb-4">Past Events</h1>
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
