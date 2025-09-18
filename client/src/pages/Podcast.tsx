import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Mic, Video, Monitor, Headphones } from "lucide-react";
import podcastStudioImg from "@assets/generated_images/Podcast_studio_background_image_a5f50052.png";

export default function Podcast() {
  const equipment = [
    {
      name: "Shure SM7B Microphones",
      description: "Broadcast-quality dynamic microphones",
      icon: Mic
    },
    {
      name: "RØDECaster Pro",
      description: "Integrated podcast production studio",
      icon: Monitor
    },
    {
      name: "ATEM Mini Pro",
      description: "Live production switcher for video",
      icon: Video
    },
    {
      name: "Multi-camera Setup",
      description: "Professional video recording capabilities",
      icon: Headphones
    }
  ];

  return (
    <div className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-8" data-testid="text-podcast-title">
            <span className="text-primary">PODCAST</span> STUDIO
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Multi-camera podcast setup perfect for intimate conversations and professional content creation
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <img 
            src={podcastStudioImg}
            alt="Modern podcast studio setup with multiple microphones and recording equipment"
            className="w-full h-96 object-cover rounded-xl" 
            data-testid="img-podcast-studio"
          />
          
          <div>
            <h2 className="text-3xl font-bold mb-8 text-accent" data-testid="text-podcast-equipment-title">Professional Podcast Equipment</h2>
            <div className="space-y-6">
              {equipment.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="flex items-start gap-4" data-testid={`podcast-equipment-${index}`}>
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
          <h2 className="text-3xl font-bold text-center mb-12 text-accent">Why Choose Our Podcast Studio</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <Video className="text-primary w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold">Video & Audio</h3>
              <p className="text-muted-foreground">Full video production capabilities with pristine audio quality</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <Mic className="text-primary w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold">Broadcast Quality</h3>
              <p className="text-muted-foreground">Professional-grade equipment for radio and streaming quality</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <Monitor className="text-primary w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold">Live Streaming</h3>
              <p className="text-muted-foreground">Stream live to multiple platforms simultaneously</p>
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-accent">Our Podcast Production Process</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Pre-Production", desc: "Consultation and setup planning" },
              { step: "2", title: "Recording", desc: "Professional multi-camera recording session" },
              { step: "3", title: "Post-Production", desc: "Editing, color correction, and audio mastering" },
              { step: "4", title: "Delivery", desc: "Final files ready for distribution" }
            ].map((item, index) => (
              <div key={index} className="text-center space-y-4" data-testid={`process-step-${index}`}>
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold">{item.step}</span>
                </div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Your Podcast?</h2>
          <p className="text-muted-foreground mb-8">Book your podcast recording session and bring your story to life</p>
          <Link href="/contact">
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground px-8 py-4 text-lg hover:bg-primary/90"
              data-testid="button-book-podcast"
            >
              Book Podcast Session
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
