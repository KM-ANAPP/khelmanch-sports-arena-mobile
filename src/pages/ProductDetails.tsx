
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { MobileLayout } from "@/components/layouts/mobile-layout";
import { useAuth } from "@/context/AuthContext";

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
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductDetails(id!),
    enabled: !!id,
  });

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4">Error loading product</div>;
  if (!product) return null;

  return (
    <MobileLayout isLoggedIn={isAuthenticated}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">{product.title.rendered}</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {product.acf.venue_address}
        </p>
        
        {/* Static content similar to tournament details */}
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p>This is a sports facility where you can enjoy various activities.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-2">Amenities</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Parking Available</li>
              <li>Changing Rooms</li>
              <li>Equipment Rental</li>
              <li>Refreshments</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-2">Opening Hours</h2>
            <p>Monday - Sunday: 6:00 AM - 10:00 PM</p>
          </section>
        </div>
      </div>
    </MobileLayout>
  );
}
