import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Pill,
  Brain,
  FileText,
  Shield,
  Bell,
  Heart,
  Zap,
  CheckCircle,
  ArrowRight,
  Play,
  Sparkles,
} from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const features = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Handwriting to Text AI",
      description: "Advanced AI reads doctor's handwriting instantly",
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Simple Explanations",
      description: "Medical jargon translated to everyday language",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Side Effect Insights",
      description: "Comprehensive safety information at your fingertips",
    },
    {
      icon: <Bell className="h-6 w-6" />,
      title: "Smart Reminders",
      description: "Never miss a dose with intelligent notifications",
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Emergency Help",
      description: "Quick access to emergency contacts and hospitals",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Instant Results",
      description: "Get prescription analysis in seconds, not hours",
    },
  ];

  const testimonials = [
    {
      name: "Shruti Sharma",
      role: "Patient",
      image: "👩",
      text: "MedGuideAI helped me understand my medications clearly. No more confusion!",
    },
    {
      name: "Rajesh Kumar",
      role: "Caregiver",
      image: "👨",
      text: "Managing my mother's medicines became so much easier with this app.",
    },
    {
      name: "Priya Singh",
      role: "Healthcare Worker",
      image: "👩‍⚕️",
      text: "I recommend this to all my patients. It's a game-changer!",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-mesh">
        {/* Animated Background Pills */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 left-20 text-primary/20"
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <Pill className="h-16 w-16" />
          </motion.div>
          <motion.div
            className="absolute top-40 right-32 text-secondary/20"
            animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          >
            <Brain className="h-20 w-20" />
          </motion.div>
          <motion.div
            className="absolute bottom-32 left-40 text-primary/20"
            animate={{ y: [0, -15, 0], rotate: [0, 15, 0] }}
            transition={{ duration: 7, repeat: Infinity, delay: 2 }}
          >
            <Sparkles className="h-12 w-12" />
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center space-y-8"
          >
            {/* Logo */}
            <motion.div variants={itemVariants} className="flex justify-center">
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

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold text-foreground leading-tight"
            >
              Understand Your Prescription
              <br />
              <span className="gradient-primary bg-clip-text text-transparent">
                in Seconds
              </span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto"
            >
              Upload your doctor's handwriting. Get simple, safe explanations
              instantly.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                size="lg"
                onClick={() => navigate("/login")}
                className="text-lg h-14 px-8 hover-lift group"
              >
                Try Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 smooth-transition" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg h-14 px-8 hover-glow"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-8 pt-8"
            >
              {["AI-Powered", "HIPAA Compliant", "1M+ Users", "4.9★ Rating"].map(
                (badge, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle className="h-4 w-4 text-secondary" />
                    {badge}
                  </div>
                )
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-light-blue-bg/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Everything You Need to
              <span className="gradient-primary bg-clip-text text-transparent">
                {" "}
                Stay Safe
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Powerful features designed for your health and peace of mind
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="p-6 h-full hover-lift cursor-pointer group">
                  <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4 group-hover:bg-primary/20 smooth-transition">
                    <div className="text-primary">{feature.icon}</div>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Three simple steps to better health understanding
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Upload",
                desc: "Take a photo of your prescription",
              },
              {
                step: "2",
                title: "Analyze",
                desc: "AI reads and processes the text",
              },
              {
                step: "3",
                title: "Understand",
                desc: "Get clear, simple explanations",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto rounded-full gradient-primary flex items-center justify-center card-shadow-lg">
                    <span className="text-3xl font-bold text-white">
                      {item.step}
                    </span>
                  </div>
                  {idx < 2 && (
                    <div className="hidden md:block absolute top-10 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary to-secondary"></div>
                  )}
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-light-blue-bg/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-muted-foreground">
              See what our users have to say
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="p-6 hover-lift">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-4xl">{testimonial.image}</div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">
                    "{testimonial.text}"
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 gradient-mesh relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Ready to Take Control of Your Health?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of users who trust MedGuideAI
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/login")}
              className="text-lg h-14 px-8 hover-lift group"
            >
              Get Started for Free
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 smooth-transition" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Pill className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg text-foreground">
                  MedGuideAI
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Making healthcare accessible and understandable for everyone.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-primary cursor-pointer smooth-transition">
                  Features
                </li>
                <li className="hover:text-primary cursor-pointer smooth-transition">
                  Pricing
                </li>
                <li className="hover:text-primary cursor-pointer smooth-transition">
                  FAQ
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-primary cursor-pointer smooth-transition">
                  About
                </li>
                <li className="hover:text-primary cursor-pointer smooth-transition">
                  Contact
                </li>
                <li className="hover:text-primary cursor-pointer smooth-transition">
                  Careers
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-primary cursor-pointer smooth-transition">
                  Privacy Policy
                </li>
                <li className="hover:text-primary cursor-pointer smooth-transition">
                  Terms of Service
                </li>
                <li className="hover:text-primary cursor-pointer smooth-transition">
                  HIPAA Compliance
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 MedGuideAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
