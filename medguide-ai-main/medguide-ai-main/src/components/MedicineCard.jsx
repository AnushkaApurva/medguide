import { Pill, Sun, Sunset, Moon, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const MedicineCard = ({
  id,
  name,
  strength,
  purpose,
  frequency,
  sideEffects,
  warning,
}) => {
  const navigate = useNavigate();

  const getFrequencyIcon = (time) => {
    if (time === "morning") return <Sun className="h-4 w-4" />;
    if (time === "afternoon") return <Sunset className="h-4 w-4" />;
    if (time === "night") return <Moon className="h-4 w-4" />;
    return null;
  };

  return (
    <Card
      className="p-4 card-shadow hover:shadow-lg smooth-transition cursor-pointer"
      onClick={() => navigate(`/medicine/${id}`)}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Pill className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-foreground">{name}</h3>
              <p className="text-sm text-muted-foreground">{strength}</p>
            </div>
            {warning && (
              <Badge variant="destructive" className="gap-1">
                <AlertCircle className="h-3 w-3" />
                Warning
              </Badge>
            )}
          </div>

          <p className="text-sm text-foreground mb-3">{purpose}</p>

          <div className="flex items-center gap-2 mb-3">
            {frequency.map((time, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1 px-2 py-1 rounded-lg bg-muted text-muted-foreground"
              >
                {getFrequencyIcon(time)}
                <span className="text-xs capitalize">{time}</span>
              </div>
            ))}
          </div>

          <div className="mb-3">
            <p className="text-xs text-muted-foreground mb-1">Side effects:</p>
            <p className="text-xs text-foreground">{sideEffects.join(", ")}</p>
          </div>

          <Button variant="outline" size="sm" className="w-full">
            Set Reminder
          </Button>
        </div>
      </div>
    </Card>
  );
};
