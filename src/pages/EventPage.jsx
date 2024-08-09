import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEventContext } from '../contexts/EventContext';

const EventPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events } = useEventContext();

  const event = events.find(e => e.id === parseInt(id));

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Button onClick={() => navigate('/events')} className="mb-4">Back to Events</Button>
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
