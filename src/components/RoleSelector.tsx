import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Users, Shield } from "lucide-react";

interface RoleSelectorProps {
  onRoleSelect: (role: 'student' | 'teacher' | 'admin') => void;
}

export const RoleSelector = ({ onRoleSelect }: RoleSelectorProps) => {
  const roles = [
    {
      id: 'student' as const,
      title: 'Student',
      description: 'Access lessons, take quizzes, and track your progress',
      icon: GraduationCap,
      color: 'bg-primary text-primary-foreground'
    },
    {
      id: 'teacher' as const,
      title: 'Teacher',
      description: 'Create lessons, manage quizzes, and monitor student progress',
      icon: Users,
      color: 'bg-success text-success-foreground'
    },
    {
      id: 'admin' as const,
      title: 'Admin',
      description: 'Manage users, approve content, and generate reports',
      icon: Shield,
      color: 'bg-warning text-warning-foreground'
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {roles.map((role) => {
        const Icon = role.icon;
        return (
          <Card key={role.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onRoleSelect(role.id)}>
            <CardHeader className="text-center pb-4">
              <div className={`mx-auto w-16 h-16 rounded-full ${role.color} flex items-center justify-center mb-4`}>
                <Icon className="w-8 h-8" />
              </div>
              <CardTitle className="text-xl">{role.title}</CardTitle>
              <CardDescription className="text-base">{role.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full" 
                variant={role.id === 'student' ? 'default' : role.id === 'teacher' ? 'secondary' : 'outline'}
                onClick={(e) => {
                  e.stopPropagation();
                  onRoleSelect(role.id);
                }}
              >
                Continue as {role.title}
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};