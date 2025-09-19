import { useState, useEffect } from "react";
import { Wifi, WifiOff, Download, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/hooks/use-toast";

export const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingSyncCount, setPendingSyncCount] = useState(3);
  const [issyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast({
        title: "Back Online",
        description: "Your internet connection has been restored. Syncing pending changes...",
        variant: "default",
      });
      // Auto-sync when coming back online
      handleSync();
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: "You're Offline",
        description: "Don't worry! You can continue learning with downloaded lessons.",
        variant: "destructive",
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleSync = async () => {
    if (!isOnline) {
      toast({
        title: "Cannot Sync",
        description: "Please check your internet connection and try again.",
        variant: "destructive",
      });
      return;
    }

    setIsSyncing(true);
    
    // Simulate sync process
    setTimeout(() => {
      setPendingSyncCount(0);
      setIsSyncing(false);
      toast({
        title: "Sync Complete",
        description: "All offline progress has been synced successfully.",
        variant: "default",
      });
    }, 2000);
  };

  if (isOnline && pendingSyncCount === 0) {
    return (
      <div className="flex items-center gap-2">
        <Wifi className="h-4 w-4 text-success" />
        <Badge variant="outline" className="text-success border-success/50">
          Online
        </Badge>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {isOnline ? (
          <Wifi className="h-4 w-4 text-success" />
        ) : (
          <WifiOff className="h-4 w-4 text-muted-foreground" />
        )}
        <Badge 
          variant={isOnline ? "outline" : "secondary"}
          className={isOnline ? "text-success border-success/50" : ""}
        >
          {isOnline ? "Online" : "Offline"}
        </Badge>
        
        {pendingSyncCount > 0 && (
          <>
            <Badge variant="destructive" className="text-xs">
              {pendingSyncCount} pending sync
            </Badge>
            {isOnline && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSync}
                disabled={issyncing}
                className="h-6 px-2 text-xs"
              >
                {issyncing ? (
                  <RotateCcw className="h-3 w-3 mr-1 animate-spin" />
                ) : (
                  <Download className="h-3 w-3 mr-1" />
                )}
                {issyncing ? "Syncing..." : "Sync"}
              </Button>
            )}
          </>
        )}
      </div>

      {!isOnline && (
        <Alert className="border-warning bg-warning/5">
          <WifiOff className="h-4 w-4" />
          <AlertDescription className="text-sm">
            You're currently offline. Downloaded lessons are available below. 
            Your progress will sync automatically when you're back online.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};