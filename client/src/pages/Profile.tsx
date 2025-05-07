import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User, Settings, LogOut, Shield, Bell, HelpCircle, Phone, Mail } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const { user, logoutMutation } = useAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const handleSettingChange = (setting: string) => {
    toast({
      title: "Setting Updated",
      description: `${setting} setting has been updated.`,
    });
  };

  return (
    <div className="container max-w-md mx-auto p-4 pb-20">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      {/* Profile Card */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mr-4">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div>
              <CardTitle>{user?.username}</CardTitle>
              <p className="text-sm text-muted-foreground">{user?.phone || "No phone added"}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Account Balance</p>
              <p className="text-xl font-semibold">
                {user?.points?.toLocaleString() || 0} Points
              </p>
            </div>
            <Button variant="outline">Add Points</Button>
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <h2 className="text-lg font-semibold mb-4">Settings</h2>
      <Card className="mb-6">
        <CardContent className="p-0">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <Bell className="h-5 w-5 mr-3 text-muted-foreground" />
              <div>
                <h3 className="font-medium">Notifications</h3>
                <p className="text-sm text-muted-foreground">Receive app notifications</p>
              </div>
            </div>
            <Switch id="notifications" onCheckedChange={() => handleSettingChange("Notification")} />
          </div>
          <Separator />
          
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="h-5 w-5 mr-3 text-muted-foreground" />
              <div>
                <h3 className="font-medium">Privacy</h3>
                <p className="text-sm text-muted-foreground">Manage your privacy settings</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Help & Support */}
      <h2 className="text-lg font-semibold mb-4">Help & Support</h2>
      <Card className="mb-6">
        <CardContent className="p-0">
          <div className="p-4 flex items-center">
            <HelpCircle className="h-5 w-5 mr-3 text-muted-foreground" />
            <div>
              <h3 className="font-medium">FAQs</h3>
              <p className="text-sm text-muted-foreground">Find answers to common questions</p>
            </div>
          </div>
          <Separator />
          
          <div className="p-4 flex items-center">
            <Phone className="h-5 w-5 mr-3 text-muted-foreground" />
            <div>
              <h3 className="font-medium">Contact Support</h3>
              <p className="text-sm text-muted-foreground">+12 345 6789</p>
            </div>
          </div>
          <Separator />
          
          <div className="p-4 flex items-center">
            <Mail className="h-5 w-5 mr-3 text-muted-foreground" />
            <div>
              <h3 className="font-medium">Email Support</h3>
              <p className="text-sm text-muted-foreground">support@32xscanner.com</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logout Button */}
      <Button 
        variant="destructive" 
        className="w-full" 
        onClick={handleLogout}
        disabled={logoutMutation.isPending}
      >
        <LogOut className="h-4 w-4 mr-2" />
        {logoutMutation.isPending ? "Logging out..." : "Logout"}
      </Button>
    </div>
  );
}