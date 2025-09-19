import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Star, Target, Zap, Award, Flame } from "lucide-react";

interface BadgeData {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  earned: boolean;
  earnedDate?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface BadgeSystemProps {
  userBadges: BadgeData[];
  totalPoints: number;
}

export const BadgeSystem = ({ userBadges, totalPoints }: BadgeSystemProps) => {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-secondary';
      case 'rare': return 'bg-primary';
      case 'epic': return 'bg-accent';
      case 'legendary': return 'bg-warning';
      default: return 'bg-secondary';
    }
  };

  const earnedBadges = userBadges.filter(badge => badge.earned);
  const unearnedBadges = userBadges.filter(badge => !badge.earned);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-warning" />
            Your Achievement Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{totalPoints}</div>
              <div className="text-sm text-muted-foreground">Total Points</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">{earnedBadges.length}</div>
              <div className="text-sm text-muted-foreground">Badges Earned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">{Math.floor(totalPoints / 100)}</div>
              <div className="text-sm text-muted-foreground">Level</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">7</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Earned Badges ({earnedBadges.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {earnedBadges.map(badge => (
              <div key={badge.id} className="text-center p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                <div className={`inline-flex p-3 rounded-full ${getRarityColor(badge.rarity)} mb-2`}>
                  {badge.icon}
                </div>
                <h4 className="font-semibold text-sm">{badge.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                <Badge variant="secondary" className="mt-2 text-xs">
                  {badge.earnedDate}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Available Badges ({unearnedBadges.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {unearnedBadges.map(badge => (
              <div key={badge.id} className="text-center p-4 rounded-lg border bg-muted/30 opacity-60">
                <div className="inline-flex p-3 rounded-full bg-muted mb-2">
                  {badge.icon}
                </div>
                <h4 className="font-semibold text-sm">{badge.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                <Badge variant="outline" className="mt-2 text-xs">
                  {badge.rarity}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const mockBadges: BadgeData[] = [
  {
    id: '1',
    name: 'First Steps',
    description: 'Complete your first lesson',
    icon: <Star className="w-4 h-4" />,
    earned: true,
    earnedDate: '2 days ago',
    rarity: 'common'
  },
  {
    id: '2',
    name: 'Quiz Master',
    description: 'Score 90% or higher on 5 quizzes',
    icon: <Target className="w-4 h-4" />,
    earned: true,
    earnedDate: '1 week ago',
    rarity: 'rare'
  },
  {
    id: '3',
    name: 'Speed Learner',
    description: 'Complete 10 lessons in one day',
    icon: <Zap className="w-4 h-4" />,
    earned: false,
    rarity: 'epic'
  },
  {
    id: '4',
    name: 'Knowledge Seeker',
    description: 'Complete 50 lessons',
    icon: <Award className="w-4 h-4" />,
    earned: true,
    earnedDate: '3 days ago',
    rarity: 'rare'
  },
  {
    id: '5',
    name: 'Streak Champion',
    description: 'Maintain a 30-day learning streak',
    icon: <Flame className="w-4 h-4" />,
    earned: false,
    rarity: 'legendary'
  }
];