import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Camera, Lightbulb, Monitor, Square } from "lucide-react";

export default function Photography() {
  const features = [
    {
      name: "3m x 7.5m Cyclorama",
      description: "Spacious curved backdrop for seamless photography",
      icon: Square
    },
    {
      name: "Professional Lighting",
      description: "Complete lighting kit with various options",
      icon: Lightbulb
    },
    {
      name: "Epson Projector",
      description: "High-quality projection for creative backgrounds",
      icon: Monitor
    },
    {
      name: "Flexible Setup",
      description: "Adaptable space for any photography need",
      icon: Camera
    }
  ];

  return (
    <div className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-8" data-testid="text-photography-title">
            <span className="text-primary">PHOTOGRAPHY</span> STUDIO
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Spacious cyclorama studio with professional lighting for all your creative visual projects
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="w-full h-96 bg-card/30 rounded-xl flex items-center justify-center border border-border">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">IMAGE HERE</p>
              <p className="text-muted-foreground mt-2">Photography studio image placeholder</p>
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl font-bold mb-8 text-accent" data-testid="text-photography-features-title">Studio Features</h2>
            <div className="space-y-6">
              {features.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="flex items-start gap-4" data-testid={`photography-feature-${index}`}>
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="text-primary w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Photography Types */}
        <div className="bg-card/30 rounded-xl p-12 mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-accent">Perfect For</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <Camera className="text-primary w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold">Portrait Sessions</h3>
              <p className="text-muted-foreground">Professional headshots and portrait photography</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <Monitor className="text-primary w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold">Product Photography</h3>
              <p className="text-muted-foreground">Clean, professional product shots with flexible lighting</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <Lightbulb className="text-primary w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold">Creative Projects</h3>
              <p className="text-muted-foreground">Fashion, art, and experimental photography</p>
            </div>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-accent">Technical Specifications</h2>
            <div className="space-y-4">
              <div className="bg-card rounded-lg p-4">
                <h3 className="font-semibold mb-2">Cyclorama Dimensions</h3>
                <p className="text-muted-foreground">3 meters wide × 7.5 meters long curved backdrop</p>
              </div>
              <div className="bg-card rounded-lg p-4">
                <h3 className="font-semibold mb-2">Lighting Options</h3>
                <p className="text-muted-foreground">Professional strobes, continuous lighting, and softboxes</p>
              </div>
              <div className="bg-card rounded-lg p-4">
                <h3 className="font-semibold mb-2">Projection Capability</h3>
                <p className="text-muted-foreground">High-resolution Epson projector for creative backgrounds</p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-6 text-accent">What's Included</h2>
            <ul className="space-y-3">
              {[
                "Full cyclorama setup",
                "Professional lighting kit",
                "Light stands and modifiers",
                "Color gels and filters",
                "Backdrop projection system",
                "Equipment technical support",
                "Flexible booking hours"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold mb-4">Ready for Your Shoot?</h2>
          <p className="text-muted-foreground mb-8">Book your photography session and create stunning visuals</p>
          <Link href="/contact">
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground px-8 py-4 text-lg hover:bg-primary/90"
              data-testid="button-book-photography"
            >
              Book Photography Session
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
