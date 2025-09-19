import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Play, FileText, HelpCircle, Clock, CheckCircle, Download } from "lucide-react";

interface Lesson {
  id: number;
  title: string;
  description: string;
  type: 'video' | 'pdf' | 'quiz';
  duration: string;
  progress: number;
  completed: boolean;
  language: string;
}

interface LessonCardProps {
  lesson: Lesson;
}

export const LessonCard = ({ lesson }: LessonCardProps) => {
  const getIcon = () => {
    switch (lesson.type) {
      case 'video':
        return <Play className="w-5 h-5" />;
      case 'pdf':
        return <FileText className="w-5 h-5" />;
      case 'quiz':
        return <HelpCircle className="w-5 h-5" />;
    }
  };

  const getTypeColor = () => {
    switch (lesson.type) {
      case 'video':
        return 'bg-primary text-primary-foreground';
      case 'pdf':
        return 'bg-success text-success-foreground';
      case 'quiz':
        return 'bg-warning text-warning-foreground';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:bg-lesson-hover">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className={`p-2 rounded-lg ${getTypeColor()}`}>
            {getIcon()}
          </div>
          {lesson.completed && (
            <CheckCircle className="w-5 h-5 text-success" />
          )}
        </div>
        <CardTitle className="text-lg leading-tight">{lesson.title}</CardTitle>
        <CardDescription className="text-sm">{lesson.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="w-4 h-4" />
            {lesson.duration}
          </div>
          <Badge variant="outline" className="text-xs">
            {lesson.type.toUpperCase()}
          </Badge>
        </div>

        {lesson.progress > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{lesson.progress}%</span>
            </div>
            <Progress value={lesson.progress} className="h-2" />
          </div>
        )}

        <div className="flex gap-2">
          <Button 
            className="flex-1" 
            variant={lesson.progress > 0 ? "default" : "outline"}
          >
            {lesson.progress > 0 ? 'Continue' : 'Start'}
          </Button>
          <Button variant="outline" size="icon">
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};