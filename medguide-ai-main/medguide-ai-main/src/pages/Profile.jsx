import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { BottomNav } from "@/components/BottomNav";
import {
  User,
  Mail,
  Edit,
  FileText,
  Bell,
  Shield,
  LogOut,
  Camera,
} from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-lg mx-auto px-6 py-4">
          <h1 className="text-xl font-bold text-foreground">Profile & Settings</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-6 py-6 space-y-6">
        {/* Profile Info */}
        <Card className="p-6 card-shadow">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground text-2xl font-bold">
                JD
              </div>
              <button className="absolute bottom-0 right-0 p-1.5 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 smooth-transition">
                <Camera className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground">John Doe</h2>
              <p className="text-sm text-muted-foreground">john.doe@email.com</p>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => toast.success("Edit profile opened")}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </Card>

        {/* Account Info */}
        <section className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Account Information
          </h3>

          <Card className="divide-y divide-border">
            <div className="p-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm">
                  Full Name
                </Label>
                <Input id="name" defaultValue="John Doe" />
              </div>
            </div>

            <div className="p-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm">
                  Email
                </Label>
                <Input id="email" type="email" defaultValue="john.doe@email.com" />
              </div>
            </div>
          </Card>
        </section>

        {/* Saved Prescriptions */}
        <Card className="p-4 card-shadow">
          <button
            onClick={() => navigate("/results")}
            className="w-full flex items-center justify-between hover:bg-muted/50 p-2 rounded-lg smooth-transition"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-medium text-foreground">Saved Prescriptions</p>
                <p className="text-sm text-muted-foreground">5 prescriptions</p>
              </div>
            </div>
            <span className="text-muted-foreground">›</span>
          </button>
        </Card>

        {/* Notification Settings */}
        <section className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Notifications
          </h3>

          <Card className="divide-y divide-border">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Push Notifications</p>
                    <p className="text-sm text-muted-foreground">Medication reminders</p>
                  </div>
                </div>
                <Switch
                  checked={notificationsEnabled}
                  onCheckedChange={setNotificationsEnabled}
                />
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Weekly summary</p>
                  </div>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
            </div>
          </Card>
        </section>

        {/* Privacy & Legal */}
        <section className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Privacy & Legal
          </h3>

          <Card className="divide-y divide-border">
            <button className="w-full p-4 flex items-center justify-between hover:bg-muted/50 smooth-transition">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-primary" />
                <span className="font-medium text-foreground">Privacy Policy</span>
              </div>
              <span className="text-muted-foreground">›</span>
            </button>

            <button className="w-full p-4 flex items-center justify-between hover:bg-muted/50 smooth-transition">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <span className="font-medium text-foreground">Terms of Service</span>
              </div>
              <span className="text-muted-foreground">›</span>
            </button>

            <button className="w-full p-4 flex items-center justify-between hover:bg-muted/50 smooth-transition">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <span className="font-medium text-foreground">Medical Disclaimer</span>
              </div>
              <span className="text-muted-foreground">›</span>
            </button>
          </Card>
        </section>

        {/* Disclaimer */}
        <Card className="p-4 bg-muted/30">
          <p className="text-xs text-muted-foreground text-center">
            MedGuideAI provides information for educational purposes only.
            Always consult your healthcare provider for medical advice.
          </p>
        </Card>

        {/* Logout */}
        <Button
          variant="destructive"
          size="lg"
          className="w-full"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-5 w-5" />
          Logout
        </Button>

        {/* Version */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">MedGuideAI v1.0.0</p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Profile;
