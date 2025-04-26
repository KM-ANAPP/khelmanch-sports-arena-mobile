
import { Calendar, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

export const PrimaryActions = () => {
  return (
    <div className="primary-actions">
      <Link to="/booking">
        <Calendar className="icon" />
        <span>Book Now</span>
      </Link>
      <Link to="/tournaments">
        <Trophy className="icon" />
        <span>Tournament</span>
      </Link>
    </div>
  );
}
