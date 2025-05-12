
import { Calendar, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const PrimaryActions = () => {
  const navigate = useNavigate();
  
  const handleBookNow = () => {
    navigate("/checkout", {
      state: {
        orderDetails: {
          amount: 99900, // ₹999 in paise
          currency: "INR",
          orderId: `ground_booking_${Date.now()}`,
          description: "Ground Booking",
          type: "ground",
          itemId: "ground-booking-default",
          itemName: "Ground Booking"
        }
      }
    });
  };

  return (
    <div className="primary-actions">
      <Button 
        onClick={handleBookNow}
        className="flex flex-col items-center justify-center"
        variant="ghost"
      >
        <Calendar className="icon" />
        <span>Book Now</span>
      </Button>
      <Link to="/tournaments">
        <Button
          className="flex flex-col items-center justify-center"
          variant="ghost"
        >
          <Trophy className="icon" />
          <span>Tournament</span>
        </Button>
      </Link>
    </div>
  );
}
