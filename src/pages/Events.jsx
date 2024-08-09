import React, { useState } from 'react';
import EventList from '../components/EventList';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

const Events = () => {
  const [filter, setFilter] = useState('');
  const [events, setEvents] = useState([
    { id: 1, name: 'Tech Conference 2024', category: 'Technology', date: '2024-06-15', tags: ['tech', 'conference'] },
    { id: 2, name: 'Summer Music Festival', category: 'Entertainment', date: '2024-07-20', tags: ['music', 'festival'] },
    { id: 3, name: 'Modern Art Exhibition', category: 'Art', date: '2024-05-10', tags: ['art', 'exhibition'] },
    { id: 4, name: 'Food and Wine Fair', category: 'Culinary', date: '2024-08-05', tags: ['food', 'wine'] },
  ]);

  const { register, handleSubmit, reset } = useForm();

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const onSubmit = (data) => {
    const newEvent = {
      id: events.length + 1,
      ...data,
      tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : []
    };
    setEvents([...events, newEvent]);
    reset();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Events</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create Event</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="name">Event Name</Label>
                <Input id="name" {...register("name", { required: true })} />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input id="category" {...register("category", { required: true })} />
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" {...register("date", { required: true })} />
              </div>
              <div>
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input id="tags" {...register("tags")} />
              </div>
              <Button type="submit">Create Event</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Input
        type="text"
        placeholder="Filter events..."
        value={filter}
        onChange={handleFilterChange}
        className="mb-4"
      />
      <EventList events={events} filter={filter} />
    </div>
  );
};

export default Events;
