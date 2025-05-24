import { useState } from "react";
import { useParams } from "react-router-dom";
import { MobileLayout } from "@/components/layouts/mobile-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon, MapPin, Clock, Star, Users, Compass, Check, X } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";

export default function GroundDetails() {
  const { id } = useParams<{ id: string }>();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  
  const ground = {
    id: Number(id),
    name: "Victory Cricket Ground",
    location: "Andheri, Mumbai",
    address: "123 Sports Complex, Andheri East, Mumbai, Maharashtra 400069",
    sports: ["Cricket", "Football"],
    rating: 4.5,
    totalReviews: 124,
    pricePerHour: 1200,
    description: "Victory Cricket Ground is a premium sports facility located in the heart of Andheri. The ground features international standard cricket pitches, well-maintained outfield, and modern amenities for players and spectators. The venue also accommodates football with full-size pitches available for booking.",
    images: [
      "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1705&q=80",
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
    ],
    facilities: [
      { name: "Floodlights", available: true },
      { name: "Changing Rooms", available: true },
      { name: "Parking", available: true },
      { name: "Washrooms", available: true },
      { name: "Drinking Water", available: true },
      { name: "Spectator Seating", available: true },
      { name: "Equipment Rental", available: true },
      { name: "Cafeteria", available: false },
      { name: "Coaching", available: false }
    ],
    mapUrl: "https://maps.google.com",
    availableSlots: {
      morning: [
        { time: "06:00 - 07:00", available: true },
        { time: "07:00 - 08:00", available: true },
        { time: "08:00 - 09:00", available: true },
        { time: "09:00 - 10:00", available: false },
        { time: "10:00 - 11:00", available: true },
        { time: "11:00 - 12:00", available: true }
      ],
      afternoon: [
        { time: "12:00 - 13:00", available: true },
        { time: "13:00 - 14:00", available: true },
        { time: "14:00 - 15:00", available: false },
        { time: "15:00 - 16:00", available: false },
        { time: "16:00 - 17:00", available: true },
        { time: "17:00 - 18:00", available: true }
      ],
      evening: [
        { time: "18:00 - 19:00", available: true },
        { time: "19:00 - 20:00", available: true },
        { time: "20:00 - 21:00", available: true },
        { time: "21:00 - 22:00", available: true },
        { time: "22:00 - 23:00", available: false }
      ]
    },
    additionalServices: [
      { id: 1, name: "Equipment Rental", price: 500, description: "Cricket/Football gear" },
      { id: 2, name: "Referee/Umpire", price: 1000, description: "Professional official" },
      { id: 3, name: "Video Recording", price: 1500, description: "HD recording of your session" },
      { id: 4, name: "Lights for Evening", price: 800, description: "Floodlights after 6 PM" }
    ]
  };

  return (
    <MobileLayout isLoggedIn={true}>
      <div className="pb-4">
        {/* Images Carousel */}
        <Carousel className="w-full">
          <CarouselContent>
            {ground.images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="h-48 w-full">
                  <img 
                    src={image} 
                    alt={`${ground.name} - Image ${index + 1}`} 
                    className="object-cover w-full h-full"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>

        {/* Ground Info */}
        <div className="p-4 pb-2">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl font-bold text-primary">{ground.name}</h1>
              <div className="flex items-center text-sm mt-1">
                <MapPin className="h-4 w-4 mr-1 text-secondary" />
                <span>{ground.location}</span>
              </div>
            </div>
            <div className="flex items-center bg-primary/10 px-2 py-1 rounded">
              <Star className="h-4 w-4 text-accent fill-accent" />
              <span className="ml-1 font-medium">{ground.rating}</span>
              <span className="text-xs text-muted-foreground ml-1">({ground.totalReviews})</span>
            </div>
          </div>

          <div className="flex flex-wrap mt-3">
            {ground.sports.map((sport) => (
              <span 
                key={sport} 
                className="text-sm bg-muted px-2 py-0.5 rounded mr-2 mb-1"
              >
                {sport}
              </span>
            ))}
          </div>

          <div className="mt-3 text-sm">
            <p>{ground.description}</p>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <div>
              <span className="text-lg font-bold">₹{ground.pricePerHour}</span>
              <span className="text-sm text-muted-foreground">/hour</span>
            </div>
            <a 
              href={ground.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary text-sm flex items-center"
            >
              <Compass className="h-4 w-4 mr-1" />
              View on Map
            </a>
          </div>
        </div>

        {/* Tabs for Details */}
        <Tabs defaultValue="book" className="w-full px-4 pb-16">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="book">Book</TabsTrigger>
            <TabsTrigger value="facilities">Facilities</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="book" className="space-y-4 mt-4">
            {/* Date Selection */}
            <div>
              <Label>Select Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal mt-1"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            {/* Time Slots */}
            <div className="space-y-3">
              <Label>Select Time Slot</Label>
              
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium mb-2">Morning</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {ground.availableSlots.morning.map((slot) => (
                      <Button
                        key={slot.time}
                        variant={selectedSlot === slot.time ? "default" : "outline"}
                        size="sm"
                        className="h-auto py-2"
                        disabled={!slot.available}
                        onClick={() => setSelectedSlot(slot.time)}
                      >
                        {slot.time}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Afternoon</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {ground.availableSlots.afternoon.map((slot) => (
                      <Button
                        key={slot.time}
                        variant={selectedSlot === slot.time ? "default" : "outline"}
                        size="sm"
                        className="h-auto py-2"
                        disabled={!slot.available}
                        onClick={() => setSelectedSlot(slot.time)}
                      >
                        {slot.time}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Evening</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {ground.availableSlots.evening.map((slot) => (
                      <Button
                        key={slot.time}
                        variant={selectedSlot === slot.time ? "default" : "outline"}
                        size="sm"
                        className="h-auto py-2"
                        disabled={!slot.available}
                        onClick={() => setSelectedSlot(slot.time)}
                      >
                        {slot.time}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Booking Button */}
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  className="w-full mt-4" 
                  disabled={!selectedSlot}
                >
                  Proceed to Book
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Complete Your Booking</DialogTitle>
                  <DialogDescription>
                    Fill in the details to confirm your booking at {ground.name}.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Date</Label>
                      <Input value={date ? format(date, "PPP") : ""} readOnly />
                    </div>
                    <div>
                      <Label>Time Slot</Label>
                      <Input value={selectedSlot || ""} readOnly />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="sport">Select Sport</Label>
                    <Select>
                      <SelectTrigger id="sport">
                        <SelectValue placeholder="Select sport" />
                      </SelectTrigger>
                      <SelectContent>
                        {ground.sports.map(sport => (
                          <SelectItem key={sport} value={sport}>{sport}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="players">Number of Players</Label>
                    <Input id="players" type="number" min="2" placeholder="Enter number of players" />
                  </div>
                  
                  <div>
                    <Label className="mb-2 block">Additional Services</Label>
                    {ground.additionalServices.map(service => (
                      <div key={service.id} className="flex items-start space-x-2 mb-2">
                        <Checkbox id={`service-${service.id}`} />
                        <div>
                          <label
                            htmlFor={`service-${service.id}`}
                            className="text-sm font-medium"
                          >
                            {service.name} - ₹{service.price}
                          </label>
                          <p className="text-xs text-muted-foreground">{service.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div>
                    <Label htmlFor="notes">Special Requests/Notes</Label>
                    <Input id="notes" placeholder="Any specific requirements?" />
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between mb-2">
                      <span>Ground charges (1 hour)</span>
                      <span>₹{ground.pricePerHour}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Total Amount</span>
                      <span>₹{ground.pricePerHour}</span>
                    </div>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button type="submit">
                    Proceed to Payment
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>
          
          <TabsContent value="facilities" className="mt-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold mb-3">Available Facilities</h3>
                <div className="grid grid-cols-2 gap-3">
                  {ground.facilities.map((facility) => (
                    <div key={facility.name} className="flex items-center text-sm">
                      {facility.available ? (
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                      ) : (
                        <X className="h-4 w-4 text-red-500 mr-2" />
                      )}
                      <span className={facility.available ? "" : "text-muted-foreground"}>{facility.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{ground.rating}/5</h3>
                    <p className="text-sm text-muted-foreground">Based on {ground.totalReviews} reviews</p>
                  </div>
                  <div className="flex">
                    {[1, 2, 3, 4].map((star) => (
                      <Star key={star} className="h-4 w-4 text-accent fill-accent" />
                    ))}
                    <Star className="h-4 w-4 text-accent fill-accent opacity-50" />
                  </div>
                </div>
                
                {/* This would be populated with actual reviews in a real app */}
                <div className="text-center py-4 text-muted-foreground text-sm">
                  Reviews will appear here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  );
}
