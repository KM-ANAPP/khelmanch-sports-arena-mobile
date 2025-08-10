import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PastResultsSlider, TournamentResult } from "./PastResultsSlider";

interface TournamentResultsTabProps {
  results: TournamentResult[];
}

export const TournamentResultsTab: React.FC<TournamentResultsTabProps> = ({ results }) => {
  if (!results || results.length === 0) return null;

  return (
    <Card>
      <CardContent className="p-0">
        <div className="h-48 relative">
          <PastResultsSlider results={results} />
        </div>
      </CardContent>
    </Card>
  );
};
