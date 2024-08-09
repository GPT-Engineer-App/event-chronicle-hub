import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const EventPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    // Simulated API call to fetch event details
    const fetchEvent = async () => {
      // Replace this with an actual API call in a real application
      const mockEvent = {
        id: parseInt(id),
        name: 'Tech Conference',
        category: 'Technology',
        date: '2024-06-15',
        tags: ['tech', 'conference'],
        description: 'A conference showcasing the latest in technology innovations.',
        location: 'San Francisco, CA',
      };
      setEvent(mockEvent);
    };

    fetchEvent();
  }, [id]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>{event.name}</CardTitle>
          <CardDescription>
            <div className="flex justify-between items-center">
              <span>{event.category}</span>
              <span>{new Date(event.date).toLocaleDateString()}</span>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{event.description}</p>
          <p className="mb-4">Location: {event.location}</p>
          <div>
            {event.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="mr-1">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventPage;
