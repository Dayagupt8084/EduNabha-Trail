import { useState } from "react";
import { Bell, X, CheckCircle, Info, AlertTriangle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface Notification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'lesson' | 'quiz' | 'feedback';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  isOffline?: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'lesson',
    title: 'New Math Lesson Available',
    message: 'Algebra Basics - Chapter 3 has been assigned to your class',
    timestamp: '2 hours ago',
    isRead: false
  },
  {
    id: '2',
    type: 'quiz',
    title: 'Quiz Reminder',
    message: 'Science Quiz on "Solar System" is due tomorrow',
    timestamp: '4 hours ago',
    isRead: false
  },
  {
    id: '3',
    type: 'feedback',
    title: 'Teacher Feedback',
    message: 'Great work on your English essay! Keep it up.',
    timestamp: '1 day ago',
    isRead: true
  },
  {
    id: '4',
    type: 'success',
    title: 'Badge Earned!',
    message: 'You earned the "Week Warrior" badge for 7-day streak!',
    timestamp: '2 days ago',
    isRead: true
  },
  {
    id: '5',
    type: 'info',
    title: 'System Update',
    message: 'New features added: Offline quiz support and improved video quality',
    timestamp: '3 days ago',
    isRead: true,
    isOffline: true
  },
  {
    id: '6',
    type: 'warning',
    title: 'Low Storage Warning',
    message: 'Device storage is running low. Consider deleting old downloaded lessons.',
    timestamp: '5 days ago',
    isRead: false
  }
];

export const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'lesson':
      case 'quiz':
        return <Info className="h-4 w-4 text-primary" />;
      case 'feedback':
        return <CheckCircle className="h-4 w-4 text-success" />;
      default:
        return <Info className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 min-w-[1.2rem] h-5 flex items-center justify-center text-xs px-1"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h4 className="font-semibold">Notifications</h4>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs">
              Mark all read
            </Button>
          )}
        </div>
        
        <ScrollArea className="h-80">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Bell className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">No notifications</p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification, index) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-muted/50 cursor-pointer relative ${
                    !notification.isRead ? 'bg-primary/5' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium truncate">
                          {notification.title}
                        </p>
                        <div className="flex items-center gap-1">
                          {notification.isOffline && (
                            <Download className="h-3 w-3 text-muted-foreground" />
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeNotification(notification.id);
                            }}
                            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {notification.timestamp}
                      </p>
                    </div>
                  </div>
                  {!notification.isRead && (
                    <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full" />
                  )}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        
        {notifications.length > 0 && (
          <>
            <Separator />
            <div className="p-2">
              <Button variant="ghost" size="sm" className="w-full text-xs">
                View All Notifications
              </Button>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
};