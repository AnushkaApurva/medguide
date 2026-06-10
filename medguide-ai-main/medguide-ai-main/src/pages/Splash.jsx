import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Pill, Brain, Sparkles } from "lucide-react";
import splashHero from "@/assets/splash-hero.jpg";

const Splash = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen gradient-mesh flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8"
      >
        {/* Logo */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/30 rounded-full blur-3xl animate-pulse-soft"></div>
            <div className="relative p-6 glass-card rounded-full card-shadow-xl">
              <div className="flex items-center justify-center">
                <Pill className="h-12 w-12 text-primary" />
                <Brain className="h-8 w-8 text-secondary -ml-3 -mb-3" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl overflow-hidden card-shadow-xl"
        >
          <img
            src={splashHero}
            alt="MedGuideAI medical illustration"
            className="w-full h-48 object-cover"
          />
        </motion.div>

        {/* Title & Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center space-y-2"
        >
          <h1 className="text-4xl font-bold text-foreground">MedGuideAI</h1>
          <p className="text-lg text-muted-foreground">
            Understand your medicines easily
          </p>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center space-y-2"
        >
          <p className="text-sm text-foreground">
            Read handwritten prescriptions, get simple explanations, and never
            miss a dose.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            onClick={() => navigate("/login")}
            size="lg"
            className="w-full text-lg h-12 hover-lift group"
          >
            Get Started
            <Sparkles className="ml-2 h-5 w-5 group-hover:rotate-12 smooth-transition" />
          </Button>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-3 gap-4 pt-4"
        >
          <div className="text-center">
            <div className="text-2xl mb-1">📋</div>
            <p className="text-xs text-muted-foreground">
              Scan Prescriptions
            </p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">💊</div>
            <p className="text-xs text-muted-foreground">
              Simple Explanations
            </p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">⏰</div>
            <p className="text-xs text-muted-foreground">Smart Reminders</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Splash;
