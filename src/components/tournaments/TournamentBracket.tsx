
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export interface Match {
  id: string;
  round: number;
  position: number;
  team1: {
    id: string;
    name: string;
    score?: number;
  } | null;
  team2: {
    id: string;
    name: string;
    score?: number;
  } | null;
  winner?: 'team1' | 'team2';
  date: string;
  time: string;
  court?: string;
  officials?: string[];
  completed: boolean;
}

export interface BracketData {
  rounds: number;
  matches: Match[];
}

interface TournamentBracketProps {
  data: BracketData;
  onMatchClick?: (match: Match) => void;
}

export const TournamentBracket: React.FC<TournamentBracketProps> = ({ data, onMatchClick }) => {
  // Group matches by round
  const matchesByRound = data.matches.reduce((acc, match) => {
    if (!acc[match.round]) {
      acc[match.round] = [];
    }
    acc[match.round].push(match);
    return acc;
  }, {} as Record<number, Match[]>);
  
  // Calculate bracket dimensions
  const maxTeamsFirstRound = matchesByRound[1]?.length * 2 || 0;
  const levels = data.rounds;

  return (
    <div className="overflow-auto pb-4">
      <div className="bracket-container flex" style={{ minWidth: levels * 220 + 'px' }}>
        {Array.from({ length: levels }, (_, i) => i + 1).map((round) => (
          <div key={round} className="round-column flex flex-col flex-1 px-2">
            <h3 className="text-center font-medium py-2 text-sm">
              {round === levels 
                ? "Final" 
                : round === levels - 1 
                  ? "Semi Finals" 
                  : round === levels - 2 
                    ? "Quarter Finals" 
                    : `Round ${round}`}
            </h3>
            
            <div className="matches-container flex flex-col justify-around h-full" 
                 style={{ gap: `${50 * (2 ** (round - 1))}px` }}>
              {matchesByRound[round]?.map((match) => (
                <Card 
                  key={match.id} 
                  className={`match-card w-48 cursor-pointer transition-shadow hover:shadow-md ${
                    match.completed ? 'border-green-200' : ''
                  }`}
                  onClick={() => onMatchClick?.(match)}
                >
                  <CardContent className="p-3">
                    <div className="flex flex-col gap-2">
                      <div className={`team flex justify-between items-center p-1 rounded ${
                        match.winner === 'team1' ? 'bg-green-50' : ''
                      }`}>
                        <span className="font-medium text-sm truncate max-w-[100px]">
                          {match.team1?.name || 'TBD'}
                        </span>
                        {typeof match.team1?.score === 'number' && (
                          <span className="font-bold">{match.team1.score}</span>
                        )}
                      </div>
                      
                      <div className={`team flex justify-between items-center p-1 rounded ${
                        match.winner === 'team2' ? 'bg-green-50' : ''
                      }`}>
                        <span className="font-medium text-sm truncate max-w-[100px]">
                          {match.team2?.name || 'TBD'}
                        </span>
                        {typeof match.team2?.score === 'number' && (
                          <span className="font-bold">{match.team2.score}</span>
                        )}
                      </div>
                      
                      <div className="match-info text-xs text-muted-foreground mt-1">
                        <div className="flex justify-between">
                          <span>{match.date}</span>
                          <span>{match.time}</span>
                        </div>
                        {match.court && (
                          <div className="mt-1">Court: {match.court}</div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TournamentBracket;
