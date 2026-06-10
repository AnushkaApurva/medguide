import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { BottomNav } from "@/components/BottomNav";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  Plus,
  Clock,
  Edit,
  Calendar,
  Sun,
  Sunset,
  Moon,
} from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Reminders = () => {
  const [reminders, setReminders] = useState([
    {
      id: "1",
      medicine: "Amoxicillin 500mg",
      time: "9:00 AM",
      frequency: "Daily",
      enabled: true,
      timeOfDay: "morning",
    },
    {
      id: "2",
      medicine: "Paracetamol 650mg",
      time: "2:00 PM",
      frequency: "As needed",
      enabled: true,
      timeOfDay: "afternoon",
    },
    {
      id: "3",
      medicine: "Amoxicillin 500mg",
      time: "9:00 PM",
      frequency: "Daily",
      enabled: false,
      timeOfDay: "night",
    },
  ]);

  const upcomingReminders = reminders.filter((r) => r.enabled);

  const missedReminders = [
    {
      id: "m1",
      medicine: "Vitamin D",
      time: "Yesterday, 9:00 AM",
      timeOfDay: "morning",
    },
  ];

  const toggleReminder = (id) => {
    setReminders((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, enabled: !r.enabled } : r
      )
    );
    toast.success("Reminder updated");
  };

  const getTimeIcon = (time) => {
    if (time === "morning") return <Sun className="h-4 w-4" />;
    if (time === "afternoon") return <Sunset className="h-4 w-4" />;
    if (time === "night") return <Moon className="h-4 w-4" />;
    return <Clock className="h-4 w-4" />;
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Bell className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Reminders</h1>
                <p className="text-sm text-muted-foreground">
                  {upcomingReminders.length} active reminders
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-6 py-6 space-y-6">
        {/* Calendar Overview */}
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 card-shadow">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-foreground">Today's Schedule</h2>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4 text-warning-orange" />
                <span className="text-sm">Morning</span>
              </div>
              <span className="text-sm font-medium">2 medicines</span>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <Sunset className="h-4 w-4 text-warning-orange" />
                <span className="text-sm">Afternoon</span>
              </div>
              <span className="text-sm font-medium">1 medicine</span>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <Moon className="h-4 w-4 text-primary" />
                <span className="text-sm">Night</span>
              </div>
              <span className="text-sm font-medium">2 medicines</span>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="missed">
              Missed {missedReminders.length > 0 && `(${missedReminders.length})`}
            </TabsTrigger>
          </TabsList>

          {/* UPCOMING TAB */}
          <TabsContent value="upcoming" className="space-y-4 mt-6">
            {upcomingReminders.map((reminder) => (
              <Card key={reminder.id} className="p-4 card-shadow">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    {getTimeIcon(reminder.timeOfDay)}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-foreground">
                          {reminder.medicine}
                        </p>

                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          {reminder.time}
                        </p>
                      </div>

                      <button className="p-1 hover:bg-muted rounded">
                        <Edit className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        {reminder.frequency}
                      </Badge>

                      <Switch
                        checked={reminder.enabled}
                        onCheckedChange={() => toggleReminder(reminder.id)}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {upcomingReminders.length === 0 && (
              <Card className="p-8 text-center card-shadow">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No upcoming reminders</p>
              </Card>
            )}
          </TabsContent>

          {/* MISSED TAB */}
          <TabsContent value="missed" className="space-y-4 mt-6">
            {missedReminders.map((reminder) => (
              <Card
                key={reminder.id}
                className="p-4 card-shadow bg-destructive/5 border-destructive/20"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-destructive/10 rounded-lg">
                    {getTimeIcon(reminder.timeOfDay)}
                  </div>

                  <div className="flex-1">
                    <p className="font-medium text-foreground">
                      {reminder.medicine}
                    </p>
                    <p className="text-sm text-destructive">{reminder.time}</p>
                  </div>

                  <Button variant="outline" size="sm">
                    Mark Taken
                  </Button>
                </div>
              </Card>
            ))}

            {missedReminders.length === 0 && (
              <Card className="p-8 text-center card-shadow">
                <div className="text-4xl mb-4">✓</div>
                <p className="text-foreground font-medium mb-1">All caught up!</p>
                <p className="text-sm text-muted-foreground">
                  No missed reminders
                </p>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Add New Reminder */}
        <Button
          size="lg"
          className="w-full"
          onClick={() => toast.success("Add reminder dialog opened")}
        >
          <Plus className="mr-2 h-5 w-5" />
          Add New Reminder
        </Button>
      </main>

      <BottomNav />
    </div>
  );
};

export default Reminders;
