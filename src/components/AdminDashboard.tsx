import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  BookOpen, 
  School, 
  TrendingUp,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Clock,
  UserPlus
} from "lucide-react";

interface AdminDashboardProps {
  onBack: () => void;
}

export const AdminDashboard = ({ onBack }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  const systemStats = {
    totalUsers: 312,
    activeSchools: 8,
    totalLessons: 156,
    monthlyGrowth: 15
  };

  const pendingApprovals = [
    {
      id: 1,
      title: "Physics - Newton's Laws",
      teacher: "Dr. Rajesh Kumar",
      school: "Government School Nabha",
      type: "video",
      submittedAt: "2 hours ago"
    },
    {
      id: 2,
      title: "English Grammar - Tenses",
      teacher: "Mrs. Sunita Devi",
      school: "Primary School Rajpura",
      type: "pdf",
      submittedAt: "1 day ago"
    },
    {
      id: 3,
      title: "Mathematics Quiz - Geometry",
      teacher: "Mr. Amit Sharma",
      school: "High School Patiala",
      type: "quiz",
      submittedAt: "3 days ago"
    }
  ];

  const schoolStats = [
    { name: "Government School Nabha", students: 89, teachers: 12, completion: 85 },
    { name: "Primary School Rajpura", students: 67, teachers: 8, completion: 92 },
    { name: "High School Patiala", students: 134, teachers: 18, completion: 78 },
    { name: "Rural School Samana", students: 45, teachers: 6, completion: 88 }
  ];

  const usageData = [
    { month: "Jan", users: 45, lessons: 89 },
    { month: "Feb", users: 67, lessons: 134 },
    { month: "Mar", users: 89, lessons: 156 },
    { month: "Apr", users: 123, lessons: 201 }
  ];

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
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground">System overview and management</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline">
              <UserPlus className="w-4 h-4 mr-2" />
              Add User
            </Button>
            <Button>
              Generate Report
            </Button>
          </div>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{systemStats.totalUsers}</span>
                <Users className="w-5 h-5 text-primary" />
              </div>
              <p className="text-xs text-success mt-2">+{systemStats.monthlyGrowth}% this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Schools</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{systemStats.activeSchools}</span>
                <School className="w-5 h-5 text-success" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Across rural areas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Lessons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{systemStats.totalLessons}</span>
                <BookOpen className="w-5 h-5 text-warning" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Published content</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Growth Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-success">+{systemStats.monthlyGrowth}%</span>
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Monthly growth</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Pending Approvals */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Pending Approvals</CardTitle>
                  <CardDescription>Content waiting for review</CardDescription>
                </div>
                <Badge variant="destructive">{pendingApprovals.length}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingApprovals.map(item => (
                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-warning/10 rounded-lg">
                      <Clock className="w-4 h-4 text-warning" />
                    </div>
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        by {item.teacher} • {item.school}
                      </p>
                      <p className="text-xs text-muted-foreground">{item.submittedAt}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Approve
                    </Button>
                    <Button size="sm" variant="destructive">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* School Performance */}
          <Card>
            <CardHeader>
              <CardTitle>School Performance</CardTitle>
              <CardDescription>Completion rates by institution</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {schoolStats.map((school, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{school.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {school.students} students • {school.teachers} teachers
                      </p>
                    </div>
                    <span className="text-sm font-medium">{school.completion}%</span>
                  </div>
                  <Progress value={school.completion} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Usage Analytics */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Usage</CardTitle>
            <CardDescription>Monthly active users and lesson completions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {usageData.map((data, index) => (
                <div key={index} className="text-center p-4 border rounded-lg">
                  <h3 className="font-semibold text-lg">{data.month}</h3>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-primary">{data.users}</span> active users
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-success">{data.lessons}</span> lessons completed
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};