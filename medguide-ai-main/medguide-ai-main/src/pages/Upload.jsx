import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload as UploadIcon, Camera, Image, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const Upload = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    if (!preview) {
      toast.error("Please upload a prescription first");
      return;
    }
    navigate("/processing");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 hover:bg-muted rounded-lg smooth-transition"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-bold text-foreground">Upload Prescription</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-6 py-6 space-y-6">
        {/* Upload Area */}
        {!preview ? (
          <Card className="p-8 card-shadow-lg">
            <div className="space-y-6">
              {/* File Upload */}
              <label className="block">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary smooth-transition">
                  <div className="flex flex-col items-center gap-4">
                    <div className="p-4 bg-primary/10 rounded-full">
                      <UploadIcon className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">
                        Click to upload
                      </p>
                      <p className="text-sm text-muted-foreground">
                        or drag and drop your prescription
                      </p>
                    </div>
                  </div>
                </div>
              </label>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-card px-2 text-muted-foreground">Or</span>
                </div>
              </div>

              {/* Camera Button */}
              <Button variant="outline" size="lg" className="w-full">
                <Camera className="mr-2 h-5 w-5" />
                Take a Photo
              </Button>
            </div>
          </Card>
        ) : (
          <Card className="p-4 card-shadow-lg">
            <div className="space-y-4">
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={preview}
                  alt="Prescription preview"
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setPreview(null)}
                >
                  Change Image
                </Button>
                <Button className="flex-1" onClick={handleAnalyze}>
                  Analyze Prescription
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Guidelines */}
        <Card className="p-6 bg-muted/30">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Image className="h-5 w-5 text-primary" />
            Photo Guidelines
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-secondary mt-0.5">✓</span>
              <span>Take a clear, well-lit photo</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-secondary mt-0.5">✓</span>
              <span>Avoid shadows and glare</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-secondary mt-0.5">✓</span>
              <span>Make sure handwriting is visible</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-secondary mt-0.5">✓</span>
              <span>Include all prescription details</span>
            </li>
          </ul>
        </Card>
      </main>
    </div>
  );
};

export default Upload;
