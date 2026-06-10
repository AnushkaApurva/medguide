import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MedicineCard } from "@/components/MedicineCard";
import { BottomNav } from "@/components/BottomNav";
import {
  ArrowLeft,
  Download,
  Share2,
  Eye,
  EyeOff,
  Save,
  Info,
} from "lucide-react";
import { toast } from "sonner";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const Results = () => {
  const navigate = useNavigate();
  const [showRawText, setShowRawText] = useState(false);

  const rawPrescription = `Dr. Smith Medical Clinic
Date: Nov 30, 2024

Patient: John Doe

Rx:
1. Tab Amoxicillin 500mg - BD x 7 days
2. Tab Paracetamol 650mg - TDS PRN
3. Syp Cough mixture 5ml - TDS x 5 days

Advice: Take medicines after food
Follow up after 1 week`;

  const medicines = [
    {
      id: "1",
      name: "Amoxicillin",
      strength: "500mg",
      purpose: "Antibiotic to fight bacterial infections",
      frequency: ["morning", "night"],
      sideEffects: ["Nausea", "Diarrhea", "Rash"],
      warning: false,
    },
    {
      id: "2",
      name: "Paracetamol",
      strength: "650mg",
      purpose: "Reduces fever and relieves pain",
      frequency: ["morning", "afternoon", "night"],
      sideEffects: ["Rare allergic reactions"],
      warning: false,
    },
    {
      id: "3",
      name: "Cough Mixture",
      strength: "5ml",
      purpose: "Relieves cough and throat irritation",
      frequency: ["morning", "afternoon", "night"],
      sideEffects: ["Drowsiness", "Dry mouth"],
      warning: true,
    },
  ];

  const handleSave = () => {
    toast.success("Prescription saved successfully!");
  };

  const handleShare = () => {
    toast.success("Sharing options opened");
  };

  const handleDownload = () => {
    toast.success("Prescription downloaded");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-light-blue-bg pb-20">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card border-b border-border sticky top-0 z-10"
      >
        <div className="max-w-lg mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="p-2 hover:bg-muted rounded-lg smooth-transition hover-lift"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  Prescription Results
                </h1>
                <p className="text-sm text-muted-foreground">
                  3 medicines found
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <main className="max-w-lg mx-auto px-6 py-6 space-y-6">
        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-2"
        >
          <Button variant="outline" className="flex-1 hover-lift" onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
          <Button variant="outline" className="flex-1 hover-lift" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button
            variant="outline"
            className="flex-1 hover-lift"
            onClick={handleDownload}
          >
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </motion.div>

        {/* Raw OCR Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Collapsible open={showRawText} onOpenChange={setShowRawText}>
            <Card className="card-shadow hover-lift">
              <CollapsibleTrigger className="w-full p-4 flex items-center justify-between smooth-transition">
                <div className="flex items-center gap-2">
                  {showRawText ? (
                    <EyeOff className="h-4 w-4 text-primary" />
                  ) : (
                    <Eye className="h-4 w-4 text-primary" />
                  )}
                  <span className="font-medium text-foreground">
                    Original Prescription Text
                  </span>
                </div>
                <Info className="h-4 w-4 text-muted-foreground" />
              </CollapsibleTrigger>

              <CollapsibleContent className="px-4 pb-4">
                <div className="p-3 bg-muted/50 rounded-lg backdrop-blur-sm">
                  <pre className="text-xs text-foreground whitespace-pre-wrap font-mono">
                    {rawPrescription}
                  </pre>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  * AI detected text from handwriting
                </p>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        </motion.div>

        {/* Medicines */}
        <section>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg font-semibold text-foreground mb-4"
          >
            Your Medicines (Simple Explanation)
          </motion.h2>

          <div className="space-y-4">
            {medicines.map((medicine, idx) => (
              <motion.div
                key={medicine.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
              >
                <MedicineCard {...medicine} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Extra Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-4 glass-card border-secondary/20">
            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <Info className="h-4 w-4 text-secondary" />
              Doctor's Instructions
            </h3>

            <p className="text-sm text-foreground mb-2">
              • Take all medicines after food
            </p>
            <p className="text-sm text-foreground">
              • Follow up appointment in 1 week
            </p>
          </Card>
        </motion.div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Results;
