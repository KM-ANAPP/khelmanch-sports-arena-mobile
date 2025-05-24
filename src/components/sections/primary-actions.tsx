
import { Calendar, Trophy, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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
    <div className="grid grid-cols-2 gap-4 my-6">
      {/* Book Now Button */}
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="relative overflow-hidden rounded-2xl"
      >
        <Button
          onClick={handleBookNow}
          className="w-full h-20 bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-black font-semibold border-0 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          <div className="flex flex-col items-center justify-center space-y-1 relative z-10">
            <div className="relative">
              <Calendar className="w-6 h-6" />
              <Sparkles className="w-3 h-3 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <span className="text-sm font-bold">Book Now</span>
          </div>
        </Button>
      </motion.div>

      {/* Tournament Button */}
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="relative overflow-hidden rounded-2xl"
      >
        <Link to="/tournaments" className="block w-full">
          <Button
            className="w-full h-20 bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 text-white font-semibold border-0 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <div className="flex flex-col items-center justify-center space-y-1 relative z-10">
              <div className="relative">
                <Trophy className="w-6 h-6" />
                <Zap className="w-3 h-3 absolute -top-1 -right-1 animate-pulse text-accent" />
              </div>
              <span className="text-sm font-bold">Tournament</span>
            </div>
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};
