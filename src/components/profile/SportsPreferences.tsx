
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface SportsPreferencesProps {
  availableSports: string[];
  selectedSports: string[];
  skillLevels: Record<string, string>;
  skillOptions: string[];
  toggleSportSelection: (sport: string) => void;
  setSkillLevel: (sport: string, level: string) => void;
}

export function SportsPreferences({
  availableSports,
  selectedSports,
  skillLevels,
  skillOptions,
  toggleSportSelection,
  setSkillLevel,
}: SportsPreferencesProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label className="text-base mb-2 block">Select Sports You Play</Label>
        <div className="grid grid-cols-2 gap-2">
          {availableSports.map(sport => (
            <Button
              key={sport}
              type="button"
              variant={selectedSports.includes(sport) ? "default" : "outline"}
              className="justify-start"
              onClick={() => toggleSportSelection(sport)}
            >
              {sport}
            </Button>
          ))}
        </div>
      </div>
      
      {selectedSports.length > 0 && (
        <div>
          <Label className="text-base mb-2 block">Your Skill Levels</Label>
          <div className="space-y-3">
            {selectedSports.map(sport => (
              <div key={sport} className="flex items-center">
                <div className="w-1/3">{sport}:</div>
                <div className="w-2/3">
                  <select
                    className="w-full h-9 rounded-md border border-input bg-background px-3 py-1"
                    value={skillLevels[sport] || 'Beginner'}
                    onChange={(e) => setSkillLevel(sport, e.target.value)}
                  >
                    {skillOptions.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
