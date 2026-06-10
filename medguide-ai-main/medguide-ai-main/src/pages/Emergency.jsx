import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BottomNav } from "@/components/BottomNav";
import {
  Phone,
  MapPin,
  AlertTriangle,
  Navigation,
  Clock,
  Ambulance,
} from "lucide-react";
import { toast } from "sonner";

const Emergency = () => {
  const handleEmergencyCall = () => {
    toast.success("Calling emergency services...");
    // In real app: window.location.href = 'tel:108';
  };

  const hospitals = [
    {
      id: "1",
      name: "City General Hospital",
      distance: "1.2 km",
      phone: "+1 234-567-8901",
      emergency: true,
    },
    {
      id: "2",
      name: "St. Mary's Medical Center",
      distance: "2.5 km",
      phone: "+1 234-567-8902",
      emergency: true,
    },
    {
      id: "3",
      name: "Community Health Clinic",
      distance: "3.8 km",
      phone: "+1 234-567-8903",
      emergency: false,
    },
  ];

  const safetyTips = [
    "Call emergency services immediately if experiencing severe reactions",
    "Keep your prescription and medicine list handy",
    "Note the time of last medication dose",
    "Stay calm and follow dispatcher instructions",
    "Don't drive yourself to the hospital in emergencies",
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-destructive text-destructive-foreground">
        <div className="max-w-lg mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-full animate-pulse-soft">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Emergency Help</h1>
              <p className="text-sm opacity-90">
                Quick access to emergency services
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-6 py-6 space-y-6">
        {/* Emergency Call Button */}
        <Card className="p-6 bg-gradient-to-br from-destructive to-destructive/80 text-destructive-foreground card-shadow-lg">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-6 bg-white/20 rounded-full">
                <Phone className="h-12 w-12" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Emergency Helpline</h2>
              <p className="text-sm opacity-90">24/7 Medical Emergency Services</p>
            </div>
            <Button
              size="lg"
              variant="secondary"
              className="w-full h-16 text-lg font-semibold"
              onClick={handleEmergencyCall}
            >
              <Phone className="mr-2 h-6 w-6" />
              Call 108 Now
            </Button>
          </div>
        </Card>

        {/* Ambulance Service */}
        <Card className="p-4 card-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-destructive/10 rounded-lg">
                <Ambulance className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Ambulance Service</p>
                <p className="text-sm text-muted-foreground">Emergency transport</p>
              </div>
            </div>
            <Button
              variant="destructive"
              onClick={() => toast.success("Calling ambulance...")}
            >
              Call
            </Button>
          </div>
        </Card>

        {/* Nearby Hospitals */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Nearby Hospitals
            </h2>
            <button
              onClick={() => toast.success("Opening maps...")}
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              <Navigation className="h-4 w-4" />
              Map View
            </button>
          </div>

          <div className="space-y-3">
            {hospitals.map((hospital) => (
              <Card key={hospital.id} className="p-4 card-shadow">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">
                          {hospital.name}
                        </h3>
                        {hospital.emergency && (
                          <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded-full">
                            24/7
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{hospital.distance} away</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>~5 mins</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => toast.success("Opening directions...")}
                    >
                      <Navigation className="mr-2 h-4 w-4" />
                      Directions
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() =>
                        toast.success(`Calling ${hospital.name}...`)
                      }
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Call
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Safety Tips */}
        <Card className="p-6 bg-primary/5 border-primary/20 card-shadow">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            Emergency Safety Tips
          </h3>
          <ul className="space-y-3">
            {safetyTips.map((tip, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-sm text-foreground"
              >
                <span className="text-primary mt-0.5">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Location Permission */}
        <Card className="p-4 bg-muted/30">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-foreground mb-2">
                Enable location services to find the nearest hospitals
                automatically
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toast.success("Requesting location access...")}
              >
                Enable Location
              </Button>
            </div>
          </div>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default Emergency;
