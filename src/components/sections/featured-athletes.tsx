
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface WordPressProduct {
  id: number;
  title: {
    rendered: string;
  };
  acf: {
    venue_address: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
  };
}

const fetchWordPressProducts = async (): Promise<WordPressProduct[]> => {
  const response = await fetch('https://khelmanch.com/wp-json/wp/v2/product?per_page=3&_embed&acf=true');
  if (!response.ok) {
    throw new Error('Failed to fetch WordPress products');
  }
  return response.json();
};

export const FeaturedAthletes = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['wp-products'],
    queryFn: fetchWordPressProducts
  });

  const slides = products?.map(product => ({
    id: product.id,
    title: product.title.rendered,
    address: product.acf?.venue_address || "Address not available",
    image: product._embedded?.['wp:featuredmedia']?.[0]?.source_url || 
      "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80",
  })) || [];

  const navigateToProduct = (productId: number) => {
    navigate(`/products/${productId}`);
  };

  if (isLoading) {
    return <div className="p-4 text-center">Loading products...</div>;
  }

  if (error) {
    console.error('Error fetching WordPress products:', error);
    return null;
  }

  return (
    <div className="relative">
      <Carousel 
        className="w-full"
        onSelect={(index) => {
          if (typeof index === 'number') {
            setActiveIndex(index);
          }
        }}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={slide.id}>
              <motion.div 
                className="relative h-64 overflow-hidden rounded-xl cursor-pointer"
                whileTap={{ scale: 0.98 }}
                onClick={() => navigateToProduct(slide.id)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-white text-xl font-bold">{slide.title}</h3>
                  <p className="text-white/90 mt-2">{slide.address}</p>
                  
                  <div className="absolute top-3 right-3 bg-accent/70 text-accent-foreground text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                    Tap to view
                  </div>
                </div>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
      
      <div className="flex justify-center mt-2 space-x-1">
        {slides.map((_, index) => (
          <div 
            key={index}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === activeIndex ? "w-4 bg-accent" : "w-1.5 bg-muted"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
