import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, FileText, Sparkles, Check } from "lucide-react";

const Processing = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);

  const tips = [
    "Reading doctor's handwriting...",
    "Extracting medicine names...",
    "Cleaning unclear text...",
    "Simplifying medical terms...",
    "Preparing your explanation...",
  ];

  useEffect(() => {
    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => navigate("/results"), 500);
          return 100;
        }
        return prev + 5;
      });
    }, 200);

    // Rotate tips
    const tipInterval = setInterval(
      () => setTipIndex((prev) => (prev + 1) % tips.length),
      2000
    );

    return () => {
      clearInterval(progressInterval);
      clearInterval(tipInterval);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen gradient-mesh flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="w-full max-w-md p-8 card-shadow-xl glass-card">
          <div className="space-y-8">
            {/* Animated Icon */}
            <div className="flex justify-center">
              <div className="relative">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-primary/30 rounded-full blur-2xl"
                ></motion.div>

                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="relative p-6 gradient-primary rounded-full"
                >
                  <Brain className="h-12 w-12 text-white" />
                </motion.div>
              </div>
            </div>

            {/* Status */}
            <div className="text-center space-y-2">
              <motion.h2
                key={tipIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-2xl font-bold text-foreground"
              >
                Analyzing Prescription
              </motion.h2>

              <motion.p
                key={tipIndex + 'tip'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-muted-foreground"
              >
                {tips[tipIndex]}
              </motion.p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-center text-sm text-muted-foreground">
                {progress}% complete
              </p>
            </div>

            {/* Processing Steps */}
            <div className="space-y-3">
              {[
                { threshold: 20, icon: FileText, label: "Scanning document" },
                { threshold: 50, icon: Brain, label: "Extracting information" },
                { threshold: 80, icon: Sparkles, label: "Simplifying language" },
              ].map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  className="flex items-center gap-3 text-sm"
                >
                  <motion.div
                    animate={
                      progress >= step.threshold
                        ? { scale: [1, 1.2, 1] }
                        : {}
                    }
                    transition={{ duration: 0.3 }}
                    className={
                      progress >= step.threshold
                        ? "text-secondary"
                        : "text-muted-foreground"
                    }
                  >
                    {progress >= step.threshold ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-current"></div>
                    )}
                  </motion.div>

                  <div className="flex items-center gap-2">
                    <step.icon className="h-4 w-4" />
                    <span>{step.label}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Processing;
