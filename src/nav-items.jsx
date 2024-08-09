import { Home, Calendar, History } from "lucide-react";
import Index from "./pages/Index.jsx";
import Events from "./pages/Events.jsx";
import PastEvents from "./pages/PastEvents.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Upcoming Events",
    to: "/events",
    icon: <Calendar className="h-4 w-4" />,
    page: <Events />,
  },
  {
    title: "Past Events",
    to: "/past-events",
    icon: <History className="h-4 w-4" />,
    page: <PastEvents />,
  },
];
