import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TrendingUp, Users, BookOpen, AlertTriangle, CheckCircle } from "lucide-react";

interface StudentProgress {
  id: string;
  name: string;
  avatar?: string;
  lessonsCompleted: number;
  totalLessons: number;
  averageScore: number;
  lastActive: string;
  strugglingSubjects: string[];
  streak: number;
}

interface TeacherAnalyticsProps {
  students: StudentProgress[];
  classStats: {
    totalStudents: number;
    avgCompletion: number;
    avgScore: number;
    strugglingStudents: number;
  };
}

export const TeacherAnalytics = ({ students, classStats }: TeacherAnalyticsProps) => {
  const getPerformanceColor = (score: number) => {
    if (score >= 85) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-destructive';
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-success';
    if (progress >= 60) return 'bg-warning';
    return 'bg-destructive';
  };

  return (
    <div className="space-y-6">
      {/* Class Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{classStats.totalStudents}</span>
              <Users className="w-5 h-5 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Active learners</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold text-primary">{classStats.avgCompletion}%</span>
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <Progress value={classStats.avgCompletion} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">Lesson progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className={`text-2xl font-bold ${getPerformanceColor(classStats.avgScore)}`}>
                {classStats.avgScore}%
              </span>
              <CheckCircle className="w-5 h-5 text-success" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Quiz performance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Need Help</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-destructive">{classStats.strugglingStudents}</span>
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Students struggling</p>
          </CardContent>
        </Card>
      </div>

      {/* Individual Student Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Student Progress Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {students.map((student) => {
              const completionPercent = (student.lessonsCompleted / student.totalLessons) * 100;
              
              return (
                <div key={student.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={student.avatar} />
                    <AvatarFallback>{student.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold truncate">{student.name}</h4>
                      {student.strugglingSubjects.length > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Needs Help
                        </Badge>
                      )}
                      {student.streak >= 7 && (
                        <Badge variant="secondary" className="text-xs">
                          🔥 {student.streak} days
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{student.lessonsCompleted}/{student.totalLessons} lessons</span>
                      <span>Avg: {student.averageScore}%</span>
                      <span>Last active: {student.lastActive}</span>
                    </div>
                    
                    {student.strugglingSubjects.length > 0 && (
                      <div className="mt-2">
                        <span className="text-xs text-muted-foreground">Struggling with: </span>
                        {student.strugglingSubjects.map((subject, index) => (
                          <Badge key={subject} variant="outline" className="text-xs mr-1">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="text-right min-w-[120px]">
                    <div className="flex items-center gap-2 mb-2">
                      <Progress value={completionPercent} className="w-16 h-2" />
                      <span className="text-sm font-medium">{Math.round(completionPercent)}%</span>
                    </div>
                    <div className={`text-sm font-semibold ${getPerformanceColor(student.averageScore)}`}>
                      Score: {student.averageScore}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const mockStudentProgress: StudentProgress[] = [
  {
    id: '1',
    name: 'Arjun Singh',
    lessonsCompleted: 18,
    totalLessons: 25,
    averageScore: 92,
    lastActive: '2 hours ago',
    strugglingSubjects: [],
    streak: 12
  },
  {
    id: '2',
    name: 'Priya Sharma',
    lessonsCompleted: 15,
    totalLessons: 25,
    averageScore: 88,
    lastActive: '1 day ago',
    strugglingSubjects: [],
    streak: 8
  },
  {
    id: '3',
    name: 'Ravi Kumar',
    lessonsCompleted: 8,
    totalLessons: 25,
    averageScore: 65,
    lastActive: '3 days ago',
    strugglingSubjects: ['Mathematics', 'Science'],
    streak: 2
  },
  {
    id: '4',
    name: 'Simran Kaur',
    lessonsCompleted: 22,
    totalLessons: 25,
    averageScore: 94,
    lastActive: '30 minutes ago',
    strugglingSubjects: [],
    streak: 15
  },
  {
    id: '5',
    name: 'Gurpreet Singh',
    lessonsCompleted: 12,
    totalLessons: 25,
    averageScore: 58,
    lastActive: '1 week ago',
    strugglingSubjects: ['English', 'Social Studies'],
    streak: 0
  }
];