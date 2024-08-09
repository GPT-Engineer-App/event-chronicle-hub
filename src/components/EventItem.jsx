import { useNavigate } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const EventItem = ({ event, onTagClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/events/${event.id}`);
  };

  const handleTagClick = (e, tag) => {
    e.stopPropagation();
    onTagClick(tag);
  };

  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={handleClick}>
      <CardHeader>
        <CardTitle>{event.name}</CardTitle>
        <CardDescription>
          <div className="flex justify-between items-center">
            <span>{event.category}</span>
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          <div className="mt-2">
            {event.tags.map(tag => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="mr-1 cursor-pointer bg-[#AB4967] text-[#F7F2F4] hover:bg-[#8A3B52] transition-colors duration-200"
                onClick={(e) => handleTagClick(e, tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default EventItem;
