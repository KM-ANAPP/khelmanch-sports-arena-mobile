import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";

interface FilterState {
  sports: string[];
  timePeriod: string;
  location: string;
  registrationOpen: boolean;
}

interface TournamentFilterSheetProps {
  onFiltersChange: (filters: FilterState) => void;
}

export const TournamentFilterSheet = ({ onFiltersChange }: TournamentFilterSheetProps) => {
  const [filters, setFilters] = useState<FilterState>({
    sports: [],
    timePeriod: "all",
    location: "all",
    registrationOpen: false
  });

  const handleSportChange = (sport: string, checked: boolean) => {
    const newSports = checked 
      ? [...filters.sports, sport]
      : filters.sports.filter(s => s !== sport);
    
    const newFilters = { ...filters, sports: newSports };
    setFilters(newFilters);
  };

  const handleApplyFilters = () => {
    onFiltersChange(filters);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      sports: [],
      timePeriod: "all",
      location: "all",
      registrationOpen: false
    };
    setFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <Filter className="h-4 w-4 mr-2" />
          Filter Tournaments
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filter Tournaments</SheetTitle>
        </SheetHeader>
        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <Label>Sport Type</Label>
            <div className="space-y-2">
              {["Cricket", "Football", "Badminton", "Tennis", "Basketball", "Volleyball"].map((sport) => (
                <div className="flex items-center space-x-2" key={sport}>
                  <Checkbox 
                    id={`sport-${sport}`} 
                    checked={filters.sports.includes(sport)}
                    onCheckedChange={(checked) => handleSportChange(sport, checked as boolean)}
                  />
                  <label
                    htmlFor={`sport-${sport}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {sport}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Time Period</Label>
            <Select value={filters.timePeriod} onValueChange={(value) => setFilters({...filters, timePeriod: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="thisMonth">This Month</SelectItem>
                <SelectItem value="nextMonth">Next Month</SelectItem>
                <SelectItem value="next3Months">Next 3 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Location</Label>
            <Select value={filters.location} onValueChange={(value) => setFilters({...filters, location: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="mumbai">Mumbai</SelectItem>
                <SelectItem value="delhi">Delhi</SelectItem>
                <SelectItem value="bangalore">Bangalore</SelectItem>
                <SelectItem value="pune">Pune</SelectItem>
                <SelectItem value="goa">Goa</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Registration Status</Label>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="registration-open" 
                checked={filters.registrationOpen}
                onCheckedChange={(checked) => setFilters({...filters, registrationOpen: checked as boolean})}
              />
              <label
                htmlFor="registration-open"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Registration Open
              </label>
            </div>
          </div>
        </div>
        <SheetFooter>
          <div className="flex gap-2 w-full">
            <Button variant="outline" className="flex-1" onClick={handleResetFilters}>
              Reset
            </Button>
            <Button className="flex-1" onClick={handleApplyFilters}>
              Apply Filters
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};