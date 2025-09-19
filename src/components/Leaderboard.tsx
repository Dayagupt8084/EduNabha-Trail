import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Medal, Award } from "lucide-react";

interface LeaderboardEntry {
  id: string;
  name: string;
  avatar?: string;
  points: number;
  level: number;
  rank: number;
  school: string;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  currentUserId: string;
  type: 'school' | 'class' | 'global';
}

export const Leaderboard = ({ entries, currentUserId, type }: LeaderboardProps) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="w-5 h-5 text-warning" />;
      case 2: return <Medal className="w-5 h-5 text-muted-foreground" />;
      case 3: return <Award className="w-5 h-5 text-accent" />;
      default: return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold">{rank}</span>;
    }
  };

  const getRankBadgeVariant = (rank: number) => {
    if (rank <= 3) return 'default';
    if (rank <= 10) return 'secondary';
    return 'outline';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-warning" />
          {type === 'school' && 'School Leaderboard'}
          {type === 'class' && 'Class Leaderboard'}
          {type === 'global' && 'Global Leaderboard'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${
                entry.id === currentUserId 
                  ? 'bg-primary/10 border-primary' 
                  : 'bg-card hover:bg-accent/50'
              }`}
            >
              <div className="flex items-center justify-center w-8">
                {getRankIcon(entry.rank)}
              </div>
              
              <Avatar className="w-10 h-10">
                <AvatarImage src={entry.avatar} />
                <AvatarFallback>{entry.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold truncate">{entry.name}</h4>
                  {entry.id === currentUserId && <Badge variant="outline" className="text-xs">You</Badge>}
                </div>
                <p className="text-sm text-muted-foreground">{entry.school}</p>
              </div>
              
              <div className="text-right">
                <div className="font-bold text-primary">{entry.points.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Level {entry.level}</div>
              </div>
              
              <Badge variant={getRankBadgeVariant(entry.rank)} className="min-w-[2rem]">
                #{entry.rank}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export const mockLeaderboardData: LeaderboardEntry[] = [
  {
    id: '1',
    name: 'Arjun Singh',
    points: 2450,
    level: 24,
    rank: 1,
    school: 'Government High School, Nabha'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    points: 2340,
    level: 23,
    rank: 2,
    school: 'Government High School, Nabha'
  },
  {
    id: '3',
    name: 'Ravi Kumar',
    points: 2180,
    level: 21,
    rank: 3,
    school: 'Government High School, Nabha'
  },
  {
    id: '4',
    name: 'Simran Kaur',
    points: 1950,
    level: 19,
    rank: 4,
    school: 'Government High School, Nabha'
  },
  {
    id: '5',
    name: 'Gurpreet Singh',
    points: 1820,
    level: 18,
    rank: 5,
    school: 'Government High School, Nabha'
  }
];