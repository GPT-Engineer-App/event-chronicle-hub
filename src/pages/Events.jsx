import React, { useState } from 'react';
import EventList from '../components/EventList';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { useEventContext } from '../contexts/EventContext';

const Events = () => {
  const { events, addEvent } = useEventContext();
  const [textFilter, setTextFilter] = useState('');
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');

  const { register, handleSubmit, reset } = useForm();

  const handleTextFilterChange = (e) => {
    setTextFilter(e.target.value);
  };

  const handleStartDateFilterChange = (e) => {
    setStartDateFilter(e.target.value);
  };

  const handleEndDateFilterChange = (e) => {
    setEndDateFilter(e.target.value);
  };

  const handleTagClick = (tag) => {
    setTagFilter(tag === tagFilter ? '' : tag);
  };

  const onSubmit = (data) => {
    const newEvent = {
      ...data,
      tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : []
    };
    addEvent(newEvent);
    reset();
  };

  const today = new Date();
  const upcomingEvents = events.filter(event => new Date(event.date) >= today);

  const filteredEvents = upcomingEvents.filter(event => {
    const matchesText = 
      event.name.toLowerCase().includes((textFilter || '').toLowerCase()) ||
      event.category.toLowerCase().includes((textFilter || '').toLowerCase()) ||
      event.tags.some(tag => tag.toLowerCase().includes((textFilter || '').toLowerCase()));
    
    const eventDate = new Date(event.date);
    const matchesStartDate = !startDateFilter || eventDate >= new Date(startDateFilter);
    const matchesEndDate = !endDateFilter || eventDate <= new Date(endDateFilter);
    const matchesTag = !tagFilter || event.tags.includes(tagFilter);

    return matchesText && matchesStartDate && matchesEndDate && matchesTag;
  });

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Upcoming Events</h1>
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
      <div className="flex space-x-4 mb-4">
        <Input
          type="text"
          placeholder="Filter events..."
          value={textFilter}
          onChange={handleTextFilterChange}
          className="flex-grow"
        />
        <Input
          type="date"
          value={startDateFilter}
          onChange={handleStartDateFilterChange}
          placeholder="Start Date"
        />
        <Input
          type="date"
          value={endDateFilter}
          onChange={handleEndDateFilterChange}
          placeholder="End Date"
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

export default Events;
