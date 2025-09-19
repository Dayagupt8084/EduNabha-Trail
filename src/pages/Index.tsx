import { useState } from "react";
import { RoleSelector } from "@/components/RoleSelector";
import { StudentDashboard } from "@/components/StudentDashboard";
import { TeacherDashboard } from "@/components/TeacherDashboard";
import { AdminDashboard } from "@/components/AdminDashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Wifi, Globe, Smartphone } from "lucide-react";

type UserRole = 'student' | 'teacher' | 'admin' | null;

const Index = () => {
  const [currentRole, setCurrentRole] = useState<UserRole>(null);

  const handleRoleSelect = (role: UserRole) => {
    setCurrentRole(role);
  };

  const handleBack = () => {
    setCurrentRole(null);
  };

  if (currentRole === 'student') {
    return <StudentDashboard onBack={handleBack} />;
  }

  if (currentRole === 'teacher') {
    return <TeacherDashboard onBack={handleBack} />;
  }

  if (currentRole === 'admin') {
    return <AdminDashboard onBack={handleBack} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-primary rounded-full">
              <GraduationCap className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
              Digital Learning Platform
            </h1>
          </div>
          
          <p className="text-xl text-muted-foreground mb-4">
            Empowering Rural Education in Nabha
          </p>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Access quality education anywhere, anytime. Designed specifically for rural school students 
            with offline support, multi-language content, and mobile-optimized learning.
          </p>
        </div>

        {/* Features Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader className="pb-4">
              <div className="mx-auto w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mb-3">
                <Wifi className="w-6 h-6 text-success" />
              </div>
              <CardTitle className="text-lg">Offline Ready</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Download lessons and work offline. Perfect for areas with limited internet connectivity.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader className="pb-4">
              <div className="mx-auto w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mb-3">
                <Globe className="w-6 h-6 text-warning" />
              </div>
              <CardTitle className="text-lg">Multi-Language</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Content available in English, Hindi, and Punjabi to support local learning preferences.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader className="pb-4">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                <Smartphone className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Mobile First</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Optimized for low-end Android devices and designed for touch-first interaction.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader className="pb-4">
              <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-3">
                <GraduationCap className="w-6 h-6 text-destructive" />
              </div>
              <CardTitle className="text-lg">Interactive Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Engaging quizzes, progress tracking, and instant feedback to enhance learning outcomes.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Role Selection */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Choose Your Role</h2>
            <p className="text-muted-foreground">
              Select your role to access personalized features and dashboard
            </p>
          </div>
          
          <RoleSelector onRoleSelect={handleRoleSelect} />
        </div>

        {/* Platform Stats */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-8">Transforming Rural Education</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">312+</div>
              <div className="text-muted-foreground">Active Students</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-success mb-2">45+</div>
              <div className="text-muted-foreground">Dedicated Teachers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-warning mb-2">8</div>
              <div className="text-muted-foreground">Rural Schools Connected</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-border text-center">
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <Badge variant="secondary">PWA Ready</Badge>
            <Badge variant="secondary">Offline Support</Badge>
            <Badge variant="secondary">Mobile Optimized</Badge>
            <Badge variant="secondary">Multi-Language</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Built with ❤️ for rural education in Nabha. Powered by modern web technologies.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;