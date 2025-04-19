
import { Card, CardContent } from "@/components/ui/card";

interface TournamentRulesTabProps {
  rules: string[];
}

export const TournamentRulesTab = ({ rules }: TournamentRulesTabProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-sm font-semibold mb-2">Tournament Rules</h3>
        <ul className="text-sm space-y-2">
          {rules.map((rule, index) => (
            <li key={index} className="flex">
              <span className="mr-2">•</span>
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
