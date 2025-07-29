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
}

interface TournamentFilterSheetProps {
  onFiltersChange: (filters: FilterState) => void;
}

export const TournamentFilterSheet = ({ onFiltersChange }: TournamentFilterSheetProps) => {
  const [filters, setFilters] = useState<FilterState>({
    sports: []
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
    // Close the sheet by dispatching an escape key event
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
  };

  const handleResetFilters = () => {
    const resetFilters = {
      sports: []
    };
    setFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-fit justify-start">
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