import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BottomNav } from "@/components/BottomNav";
import {
  Upload,
  Clock,
  Phone,
  FileText,
  Bell,
  AlertCircle,
  User,
  Sparkles,
  History,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const recentPrescriptions = [
    {
      id: "1",
      date: "Today, 2:30 PM",
      medicines: 4,
      doctor: "Dr. Smith",
    },
    {
      id: "2",
      date: "Yesterday",
      medicines: 2,
      doctor: "Dr. Johnson",
    },
  ];

  const todayReminders = [
    { time: "9:00 AM", medicine: "Amoxicillin 500mg", taken: true },
    { time: "2:00 PM", medicine: "Paracetamol 650mg", taken: false },
    { time: "9:00 PM", medicine: "Amoxicillin 500mg", taken: false },
  ];

  return (
    <div className="min-h-screen gradient-mesh pb-20">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card border-b border-border sticky top-0 z-10"
      >
        <div className="max-w-lg mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Hello, Shruti 👋
              </h1>
              <p className="text-sm text-muted-foreground">
                Stay on track with your health
              </p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-muted rounded-lg smooth-transition relative hover-lift">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full animate-pulse-soft"></span>
              </button>
              <button
                onClick={() => navigate("/profile")}
                className="p-2 hover:bg-muted rounded-lg smooth-transition hover-lift"
              >
                <User className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <main className="max-w-lg mx-auto px-6 py-6 space-y-6">
        {/* Upload CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card
            className="p-6 gradient-primary border-0 card-shadow-xl cursor-pointer hover-lift group relative overflow-hidden"
            onClick={() => navigate("/upload")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 smooth-transition"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Upload className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1 text-white">
                  Upload Prescription
                </h3>
                <p className="text-sm text-white/90">
                  Take a photo or upload your prescription
                </p>
              </div>
              <Sparkles className="h-5 w-5 text-white/80" />
            </div>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-3"
        >
          <Button
            variant="outline"
            className="h-auto py-4 flex-col gap-2 hover-lift"
            onClick={() => navigate("/saved-prescriptions")}
          >
            <History className="h-5 w-5 text-primary" />
            <span className="text-sm">Saved</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-4 flex-col gap-2 hover-lift border-destructive/20 hover:bg-destructive/5"
            onClick={() => navigate("/emergency")}
          >
            <Phone className="h-5 w-5 text-destructive" />
            <span className="text-sm">Emergency</span>
          </Button>
        </motion.div>

        {/* Today's Reminders */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Today's Reminders
            </h2>
            <button
              onClick={() => navigate("/reminders")}
              className="text-sm text-primary hover:underline"
            >
              View all
            </button>
          </div>

          <div className="space-y-3">
            {todayReminders.map((reminder, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
              >
                <Card
                  className={`p-4 ${
                    reminder.taken ? "bg-muted/50" : "bg-card"
                  } card-shadow hover-lift`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        reminder.taken
                          ? "bg-secondary/20 text-secondary"
                          : "bg-primary/20 text-primary"
                      }`}
                    >
                      <Clock className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {reminder.time}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {reminder.medicine}
                      </p>
                    </div>
                    {reminder.taken ? (
                      <span className="text-xs text-secondary font-medium">
                        ✓ Taken
                      </span>
                    ) : (
                      <AlertCircle className="h-5 w-5 text-warning-orange" />
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Recent Prescriptions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Recent Prescriptions
            </h2>
            <button
              onClick={() => navigate("/saved-prescriptions")}
              className="text-sm text-primary hover:underline"
            >
              View all
            </button>
          </div>

          <div className="space-y-3">
            {recentPrescriptions.map((prescription, idx) => (
              <motion.div
                key={prescription.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + idx * 0.1 }}
              >
                <Card
                  className="p-4 card-shadow cursor-pointer hover-lift"
                  onClick={() => navigate("/results")}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">
                        {prescription.medicines} medicines
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {prescription.doctor}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {prescription.date}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
