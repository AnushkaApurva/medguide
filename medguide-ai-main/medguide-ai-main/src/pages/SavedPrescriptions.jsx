import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BottomNav } from "@/components/BottomNav";
import {
  ArrowLeft,
  Search,
  Filter,
  Calendar,
  FileText,
  MoreVertical,
  Download,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SavedPrescriptions = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const prescriptions = [
    {
      id: "1",
      date: "Nov 30, 2024",
      doctor: "Dr. Sarah Smith",
      clinic: "City Medical Center",
      medicines: 3,
      thumbnail: "📋",
    },
    {
      id: "2",
      date: "Nov 25, 2024",
      doctor: "Dr. Rajesh Kumar",
      clinic: "Apollo Hospital",
      medicines: 2,
      thumbnail: "📄",
    },
    {
      id: "3",
      date: "Nov 20, 2024",
      doctor: "Dr. Priya Sharma",
      clinic: "Wellness Clinic",
      medicines: 4,
      thumbnail: "📃",
    },
    {
      id: "4",
      date: "Nov 15, 2024",
      doctor: "Dr. Michael Brown",
      clinic: "Care Hospital",
      medicines: 2,
      thumbnail: "📝",
    },
  ];

  const filteredPrescriptions = prescriptions.filter(
    (prescription) =>
      prescription.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prescription.clinic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10 glass-card">
        <div className="max-w-lg mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="p-2 hover:bg-muted rounded-lg smooth-transition"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>

              <div>
                <h1 className="text-xl font-bold text-foreground">
                  Saved Prescriptions
                </h1>
                <p className="text-sm text-muted-foreground">
                  {filteredPrescriptions.length} prescriptions
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-6 py-6 space-y-6">
        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-3"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by doctor or clinic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Button variant="outline" size="icon" className="hover-glow">
            <Filter className="h-4 w-4" />
          </Button>
        </motion.div>

        {/* Filter Chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 overflow-x-auto pb-2"
        >
          {["All", "This Week", "This Month", "Older"].map((filter, idx) => (
            <Button
              key={idx}
              variant={idx === 0 ? "default" : "outline"}
              size="sm"
              className="whitespace-nowrap"
            >
              {filter}
            </Button>
          ))}
        </motion.div>

        {/* Prescriptions List */}
        <div className="space-y-4">
          {filteredPrescriptions.map((prescription, idx) => (
            <motion.div
              key={prescription.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card
                className="p-4 card-shadow hover-lift cursor-pointer"
                onClick={() => navigate("/results")}
              >
                <div className="flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-3xl flex-shrink-0">
                    {prescription.thumbnail}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {prescription.doctor}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {prescription.clinic}
                        </p>
                      </div>

                      {/* Menu */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>

                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {prescription.date}
                      </div>

                      <div className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        {prescription.medicines} medicines
                      </div>
                    </div>

                    <div className="mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate("/results");
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPrescriptions.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No prescriptions found
            </h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filters
            </p>
            <Button onClick={() => setSearchQuery("")}>Clear Search</Button>
          </motion.div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default SavedPrescriptions;
