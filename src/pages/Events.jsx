import { useState } from 'react';
import EventList from '../components/EventList';
import { Input } from "@/components/ui/input";

const Events = () => {
  const [filter, setFilter] = useState('');

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Events</h1>
      <Input
        type="text"
        placeholder="Filter events..."
        value={filter}
        onChange={handleFilterChange}
        className="mb-4"
      />
      <EventList filter={filter} />
    </div>
  );
};

export default Events;
