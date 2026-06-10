import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeft,
  Pill,
  AlertCircle,
  Info,
  Clock,
  Sun,
  Sunset,
  Moon,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const MedicineDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isTaken, setIsTaken] = useState(false);

  // Mock data
  const medicine = {
    name: "Amoxicillin",
    strength: "500mg",
    purpose: "Antibiotic to fight bacterial infections",
    howItWorks:
      "Amoxicillin works by stopping bacteria from building their cell walls, which kills the bacteria and treats your infection.",
    dosage: "Take one tablet twice daily (morning and night) for 7 days",
    frequency: ["morning", "night"],
    sideEffects: [
      { name: "Nausea", severity: "mild" },
      { name: "Diarrhea", severity: "moderate" },
      { name: "Rash", severity: "mild" },
      { name: "Allergic reaction", severity: "serious" },
    ],
    warnings: [
      "Tell your doctor if you're allergic to penicillin",
      "Complete the full course even if you feel better",
      "Don't skip doses",
    ],
    interactions:
      "May reduce effectiveness of birth control pills. Avoid alcohol during treatment.",
  };

  const getSeverityColor = (severity) => {
    if (severity === "serious") return "text-critical-red";
    if (severity === "moderate") return "text-warning-orange";
    return "text-muted-foreground";
  };

  const handleMarkTaken = (checked) => {
    setIsTaken(checked);
    toast.success(checked ? "Marked as taken" : "Unmarked");
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/results")}
              className="p-2 hover:bg-muted rounded-lg smooth-transition"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-foreground">
                {medicine.name}
              </h1>
              <p className="text-sm text-muted-foreground">
                {medicine.strength}
              </p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <Pill className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-6 py-6 space-y-6">
        {/* Purpose */}
        <Card className="p-6 card-shadow">
          <h2 className="font-semibold text-foreground mb-2 flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            What is it for?
          </h2>
          <p className="text-foreground">{medicine.purpose}</p>
        </Card>

        {/* How It Works */}
        <Card className="p-6 card-shadow">
          <h2 className="font-semibold text-foreground mb-2">
            How it works
          </h2>
          <p className="text-sm text-foreground">{medicine.howItWorks}</p>
        </Card>

        {/* Dosage */}
        <Card className="p-6 card-shadow">
          <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            How to take
          </h2>
          <p className="text-sm text-foreground mb-4">{medicine.dosage}</p>

          <div className="flex gap-2">
            {medicine.frequency.map((time, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 text-primary"
              >
                {time === "morning" && <Sun className="h-4 w-4" />}
                {time === "afternoon" && <Sunset className="h-4 w-4" />}
                {time === "night" && <Moon className="h-4 w-4" />}
                <span className="text-sm capitalize">{time}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Side Effects */}
        <Card className="p-6 card-shadow">
          <h2 className="font-semibold text-foreground mb-3">
            Possible side effects
          </h2>
          <div className="space-y-2">
            {medicine.sideEffects.map((effect, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="text-sm text-foreground">
                  {effect.name}
                </span>
                <Badge
                  variant={
                    effect.severity === "serious"
                      ? "destructive"
                      : "secondary"
                  }
                  className="text-xs"
                >
                  {effect.severity}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Warnings */}
        {medicine.warnings.length > 0 && (
          <Card className="p-6 card-shadow bg-destructive/5 border-destructive/20">
            <h2 className="font-semibold text-destructive mb-3 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Important Warnings
            </h2>
            <ul className="space-y-2">
              {medicine.warnings.map((warning, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-sm text-foreground"
                >
                  <span className="text-destructive mt-0.5">⚠</span>
                  <span>{warning}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}

        {/* Interactions */}
        {medicine.interactions && (
          <Card className="p-6 card-shadow">
            <h2 className="font-semibold text-foreground mb-2">
              Drug Interactions
            </h2>
            <p className="text-sm text-foreground">
              {medicine.interactions}
            </p>
          </Card>
        )}

        {/* Mark as Taken */}
        <Card className="p-6 card-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground mb-1">
                Mark as Taken
              </h3>
              <p className="text-sm text-muted-foreground">
                Track your medication
              </p>
            </div>
            <Switch checked={isTaken} onCheckedChange={handleMarkTaken} />
          </div>
        </Card>

        {/* Actions */}
        <div className="space-y-2">
          <Button
            size="lg"
            className="w-full"
            onClick={() => {
              toast.success("Reminder added!");
              navigate("/reminders");
            }}
          >
            Add Reminder
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => navigate("/results")}
          >
            Back to Results
          </Button>
        </div>
      </main>
    </div>
  );
};

export default MedicineDetail;
