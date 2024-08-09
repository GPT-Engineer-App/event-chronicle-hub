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

  const getTagColor = (tag) => {
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500'];
    const index = tag.charCodeAt(0) % colors.length;
    return colors[index];
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
                className={`mr-1 cursor-pointer ${getTagColor(tag)} text-white`}
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
