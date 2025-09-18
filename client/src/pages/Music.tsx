import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Mic, Sliders, Monitor, Volume2 } from "lucide-react";
import recordingStudioImg from "@assets/generated_images/Recording_studio_hero_background_1aff66b6.png";

export default function Music() {
  const equipment = [
    {
      name: "Neve 1073DPX",
      description: "Industry-standard preamp and EQ",
      icon: Mic
    },
    {
      name: "Tube-Tech CL 1B",
      description: "Vintage-style optical compressor",
      icon: Sliders
    },
    {
      name: "SSL Sigma",
      description: "Professional mixing console",
      icon: Monitor
    },
    {
      name: "U87 & Focal Trio6",
      description: "Premium microphones and monitors",
      icon: Volume2
    }
  ];

  return (
    <div className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-8" data-testid="text-music-title">
            <span className="text-primary">MUSIC</span> / RECORDING STUDIO
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional recording space with industry-standard equipment for your musical creations
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <img 
            src={recordingStudioImg}
            alt="High-end recording studio featuring vintage and modern equipment with warm ambient lighting"
            className="w-full h-96 object-cover rounded-xl" 
            data-testid="img-recording-studio"
          />
          
          <div>
            <h2 className="text-3xl font-bold mb-8 text-accent" data-testid="text-equipment-title">Professional Equipment</h2>
            <div className="space-y-6">
              {equipment.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="flex items-start gap-4" data-testid={`equipment-${index}`}>
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

        {/* Features Section */}
        <div className="bg-card/30 rounded-xl p-12">
          <h2 className="text-3xl font-bold text-center mb-12 text-accent">What Makes Our Studio Special</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <Mic className="text-primary w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold">Professional Grade</h3>
              <p className="text-muted-foreground">Industry-standard equipment used by top artists worldwide</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <Volume2 className="text-primary w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold">Acoustically Treated</h3>
              <p className="text-muted-foreground">Professionally designed space for optimal sound recording</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <Monitor className="text-primary w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold">Complete Setup</h3>
              <p className="text-muted-foreground">Everything you need for recording, mixing, and production</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold mb-4">Ready to Record?</h2>
          <p className="text-muted-foreground mb-8">Book your session and bring your musical vision to life</p>
          <Link href="/contact">
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground px-8 py-4 text-lg hover:bg-primary/90"
              data-testid="button-book-recording"
            >
              Book Recording Session
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
