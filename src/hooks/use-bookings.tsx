
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";

export interface Booking {
  id: string;
  userId: string;
  groundId?: string;
  tournamentId?: string;
  groundName?: string;
  tournamentName?: string;
  date: Date;
  startTime?: string;
  endTime?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  amount: number;
  sport: string;
  location: string;
  teamName?: string;
}

export function useBookings() {
  const { user, isAuthenticated } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = async () => {
    if (!isAuthenticated || !user) {
      setError("User not authenticated");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // In a real app, this would be an API call
      // For demo, we'll use mock data
      const mockBookings: Booking[] = [
        {
          id: "booking1",
          userId: user.id,
          groundId: "ground1",
          groundName: "Victory Cricket Ground",
          date: new Date(2025, 4, 25),
          startTime: "16:00",
          endTime: "18:00",
          status: "confirmed",
          amount: 2400,
          sport: "Cricket",
          location: "Andheri, Mumbai"
        },
        {
          id: "booking2",
          userId: user.id,
          groundId: "ground2",
          groundName: "Champions Football Arena",
          date: new Date(2025, 4, 30),
          startTime: "19:00",
          endTime: "20:00",
          status: "confirmed",
          amount: 1500,
          sport: "Football",
          location: "Powai, Mumbai"
        },
        {
          id: "booking3",
          userId: user.id,
          tournamentId: "tournament1",
          tournamentName: "Mumbai Cricket League",
          date: new Date(2025, 5, 15),
          status: "confirmed",
          amount: 5000,
          sport: "Cricket",
          location: "Multiple Venues, Mumbai",
          teamName: "Thunder Strikers"
        }
      ];

      setBookings(mockBookings);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError("Failed to fetch bookings. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const createBooking = async (bookingData: Partial<Booking>) => {
    if (!isAuthenticated || !user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to make a booking",
        variant: "destructive",
      });
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      // In a real app, this would be an API call
      // For demo, we'll simulate creating a booking
      const newBooking: Booking = {
        id: `booking${Date.now()}`,
        userId: user.id,
        date: new Date(),
        status: "pending",
        amount: bookingData.amount || 0,
        sport: bookingData.sport || "",
        location: bookingData.location || "",
        ...bookingData
      };

      setBookings([...bookings, newBooking]);
      
      toast({
        title: "Booking Created",
        description: "Your booking has been successfully created",
      });
      
      return newBooking;
    } catch (err) {
      console.error("Error creating booking:", err);
      setError("Failed to create booking. Please try again.");
      
      toast({
        title: "Booking Failed",
        description: "Failed to create your booking. Please try again.",
        variant: "destructive",
      });
      
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const cancelBooking = async (bookingId: string) => {
    if (!isAuthenticated || !user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to cancel a booking",
        variant: "destructive",
      });
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      // In a real app, this would be an API call
      // For demo, we'll simulate cancelling a booking
      const updatedBookings = bookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'cancelled' as const } 
          : booking
      );

      setBookings(updatedBookings);
      
      toast({
        title: "Booking Cancelled",
        description: "Your booking has been successfully cancelled",
      });
      
      return true;
    } catch (err) {
      console.error("Error cancelling booking:", err);
      setError("Failed to cancel booking. Please try again.");
      
      toast({
        title: "Cancellation Failed",
        description: "Failed to cancel your booking. Please try again.",
        variant: "destructive",
      });
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Load bookings when user changes
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchBookings();
    }
  }, [isAuthenticated, user]);

  return {
    bookings,
    isLoading,
    error,
    fetchBookings,
    createBooking,
    cancelBooking
  };
}
