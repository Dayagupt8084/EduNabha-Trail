import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Play, BookOpen, Trophy, Download, Globe, ArrowLeft } from "lucide-react";
import { LessonCard } from "./LessonCard";

interface StudentDashboardProps {
  onBack: () => void;
}

export const StudentDashboard = ({ onBack }: StudentDashboardProps) => {
  const [language, setLanguage] = useState('english');
  
  const languages = [
    { code: 'english', label: 'English' },
    { code: 'hindi', label: 'हिंदी' },
    { code: 'punjabi', label: 'ਪੰਜਾਬੀ' }
  ];

  const lessons = [
    {
      id: 1,
      title: "Introduction to Mathematics",
      description: "Basic concepts and number systems",
      type: "video" as const,
      duration: "45 min",
      progress: 75,
      completed: false,
      language: "english"
    },
    {
      id: 2,
      title: "Hindi Grammar Basics",
      description: "Vowels, consonants and sentence formation",
      type: "pdf" as const,
      duration: "30 min",
      progress: 100,
      completed: true,
      language: "hindi"
    },
    {
      id: 3,
      title: "Science Quiz - Chapter 1",
      description: "Test your knowledge of basic science concepts",
      type: "quiz" as const,
      duration: "15 min",
      progress: 0,
      completed: false,
      language: "english"
    }
  ];

  const stats = {
    completedLessons: 12,
    totalLessons: 25,
    averageScore: 85,
    streak: 7
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={onBack}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Welcome back, Priya!</h1>
              <p className="text-muted-foreground">Continue your learning journey</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-background border border-border rounded-md px-3 py-2"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>{lang.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold">{stats.completedLessons}/{stats.totalLessons}</span>
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <Progress value={(stats.completedLessons / stats.totalLessons) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">Lessons completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Average Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-success">{stats.averageScore}%</span>
                <Trophy className="w-5 h-5 text-warning" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Quiz performance</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Learning Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-warning">{stats.streak}</span>
                <div className="text-warning">🔥</div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Days in a row</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Offline Ready</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="bg-accent">
                  <Download className="w-3 h-3 mr-1" />
                  Available
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Download for offline use</p>
            </CardContent>
          </Card>
        </div>

        {/* Continue Learning Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="w-5 h-5 text-primary" />
              Continue Learning
            </CardTitle>
            <CardDescription>Pick up where you left off</CardDescription>
          </CardHeader>
          <CardContent>
            <LessonCard lesson={lessons[0]} />
          </CardContent>
        </Card>

        {/* All Lessons */}
        <div>
          <h2 className="text-2xl font-bold mb-6">All Lessons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map(lesson => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};