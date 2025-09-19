import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Upload, 
  Users, 
  BookOpen, 
  BarChart3, 
  ArrowLeft,
  Video,
  FileText,
  HelpCircle
} from "lucide-react";
import { TeacherAnalytics, mockStudentProgress } from "./TeacherAnalytics";
import { LessonUpload } from "./LessonUpload";

interface TeacherDashboardProps {
  onBack: () => void;
}

export const TeacherDashboard = ({ onBack }: TeacherDashboardProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  const handleLessonUpload = (lessonData: any) => {
    console.log('New lesson uploaded:', lessonData);
  };

  const classStats = {
    totalStudents: 45,
    avgCompletion: 78,
    avgScore: 82,
    strugglingStudents: 3
  };

  const stats = {
    totalStudents: 45,
    activeLessons: 12,
    averageCompletion: 78,
    pendingQuizzes: 5
  };

  const recentLessons = [
    {
      id: 1,
      title: "Mathematics - Algebra Basics",
      type: "video",
      students: 32,
      avgCompletion: 85,
      status: "active"
    },
    {
      id: 2,
      title: "Science - States of Matter",
      type: "pdf",
      students: 28,
      avgCompletion: 92,
      status: "active"
    },
    {
      id: 3,
      title: "Hindi Grammar Quiz",
      type: "quiz",
      students: 15,
      avgCompletion: 60,
      status: "pending"
    }
  ];

  const studentProgress = [
    { name: "Arjun Patel", lessons: 8, completion: 90, lastActive: "Today" },
    { name: "Priya Singh", lessons: 12, completion: 85, lastActive: "Yesterday" },
    { name: "Rahul Kumar", lessons: 6, completion: 75, lastActive: "2 days ago" },
    { name: "Anita Sharma", lessons: 10, completion: 95, lastActive: "Today" }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'pdf': return <FileText className="w-4 h-4" />;
      case 'quiz': return <HelpCircle className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
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
              <h1 className="text-3xl font-bold text-foreground">Teacher Dashboard</h1>
              <p className="text-muted-foreground">Manage your lessons and track student progress</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Upload Content
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Lesson
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{stats.totalStudents}</span>
                <Users className="w-5 h-5 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Across all classes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Lessons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{stats.activeLessons}</span>
                <BookOpen className="w-5 h-5 text-success" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Published content</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Completion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-success">{stats.averageCompletion}%</span>
                <BarChart3 className="w-5 h-5 text-warning" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Student progress</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-warning">{stats.pendingQuizzes}</span>
                <HelpCircle className="w-5 h-5 text-destructive" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Quiz submissions</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="upload">Upload Lesson</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Lessons</CardTitle>
                  <CardDescription>Your latest published content</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentLessons.map(lesson => (
                    <div key={lesson.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-secondary rounded-lg">
                          {getTypeIcon(lesson.type)}
                        </div>
                        <div>
                          <h4 className="font-medium">{lesson.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {lesson.students} students • {lesson.avgCompletion}% completion
                          </p>
                        </div>
                      </div>
                      <Badge variant={lesson.status === 'active' ? 'default' : 'secondary'}>
                        {lesson.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Student Progress</CardTitle>
                  <CardDescription>Track individual student performance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {studentProgress.map((student, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{student.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {student.lessons} lessons • Last active: {student.lastActive}
                          </p>
                        </div>
                        <span className="text-sm font-medium">{student.completion}%</span>
                      </div>
                      <Progress value={student.completion} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <TeacherAnalytics students={mockStudentProgress} classStats={classStats} />
          </TabsContent>

          <TabsContent value="upload">
            <LessonUpload onLessonUploaded={handleLessonUpload} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};