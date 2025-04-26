
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { MobileLayout } from "@/components/layouts/mobile-layout";
import { useAuth } from "@/context/AuthContext";
import { TournamentHeader } from "@/components/tournaments/TournamentHeader";
import { TournamentTabs } from "@/components/tournaments/TournamentTabs";
import { useState } from 'react';

interface WordPressProduct {
  id: number;
  title: {
    rendered: string;
  };
  acf: {
    venue_address: string;
  };
}

const fetchProductDetails = async (id: string): Promise<WordPressProduct> => {
  const response = await fetch(`https://khelmanch.com/wp-json/wp/v2/product/${id}?acf=true`);
  if (!response.ok) {
    throw new Error('Failed to fetch product details');
  }
  return response.json();
};

export default function ProductDetails() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductDetails(id!),
    enabled: !!id,
  });

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4">Error loading product</div>;
  if (!product) return null;

  const mockTournamentData = {
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55",
    sport: "Sports Venue",
    registrationOpen: true,
    title: product.title.rendered,
    organizer: "Khelmanch Sports",
    date: "Available Now",
    location: product.acf.venue_address,
    registrationDeadline: "Open for Booking",
    description: "This is a premium sports facility offering state-of-the-art amenities and equipment for various sporting activities. Perfect for both casual players and professional athletes.",
    rules: [
      "Prior booking required",
      "Follow venue guidelines",
      "Maintain cleanliness",
      "Respect other players"
    ],
    ticketTypes: [
      { id: 1, name: "1 Hour Slot", price: 500, description: "Basic slot booking" },
      { id: 2, name: "2 Hour Slot", price: 900, description: "Extended slot booking" }
    ]
  };

  const handleRegisterClick = () => {
    // Handle registration
    console.log("Register clicked");
  };

  const handleTicketsClick = () => {
    // Handle tickets
    console.log("Tickets clicked");
  };

  return (
    <MobileLayout isLoggedIn={isAuthenticated}>
      <TournamentHeader
        tournament={mockTournamentData}
        isExpanded={isExpanded}
        onExpandClick={() => setIsExpanded(!isExpanded)}
        onRegisterClick={handleRegisterClick}
        onTicketsClick={handleTicketsClick}
      />
      
      <TournamentTabs
        tournament={mockTournamentData}
        matchesData={[]}
        bracketData={null}
        onMatchClick={() => {}}
      />
    </MobileLayout>
  );
}
