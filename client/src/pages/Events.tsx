import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Users, Music, Mic, Coffee } from "lucide-react";

export default function Events() {
  const spaces = [
    {
      name: "Creative Lounge",
      description: "Open, relaxed space perfect for creative collaboration",
      icon: Users
    },
    {
      name: "PIONEER XDJ-XZ",
      description: "Professional DJ controller for events and parties",
      icon: Music
    },
    {
      name: "Full Sound System",
      description: "High-quality audio setup for any event size",
      icon: Mic
    },
    {
      name: "Kitchen Facilities",
      description: "Complete kitchen for catering and refreshments",
      icon: Coffee
    }
  ];

  return (
    <div className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-8" data-testid="text-events-title">
            <span className="text-primary">EVENTS</span> / CREATIVE LOUNGE
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Open, relaxed space for rehearsals, writing, workshops, intimate events, listening parties, activations or just hanging out
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="w-full h-96 bg-card/30 rounded-xl flex items-center justify-center border border-border">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">IMAGE HERE</p>
              <p className="text-muted-foreground mt-2">Creative lounge image placeholder</p>
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl font-bold mb-8 text-accent" data-testid="text-lounge-features-title">Lounge Features</h2>
            <div className="space-y-6">
              {spaces.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="flex items-start gap-4" data-testid={`lounge-feature-${index}`}>
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

        {/* Event Types */}
        <div className="bg-card/30 rounded-xl p-12 mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-accent">Perfect Events For Our Space</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <Music className="text-primary w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold">Listening Parties</h3>
              <p className="text-sm text-muted-foreground">Album launches and music showcases</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <Users className="text-primary w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold">Workshops</h3>
              <p className="text-sm text-muted-foreground">Creative sessions and skill sharing</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <Mic className="text-primary w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold">Intimate Events</h3>
              <p className="text-sm text-muted-foreground">Small gatherings and performances</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <Coffee className="text-primary w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold">Activations</h3>
              <p className="text-sm text-muted-foreground">Brand events and product launches</p>
            </div>
          </div>
        </div>

        {/* Capacity and Layout */}
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-accent">Space Details</h2>
            <div className="space-y-4">
              <div className="bg-card rounded-lg p-4">
                <h3 className="font-semibold mb-2">Capacity</h3>
                <p className="text-muted-foreground">Up to 50 people for standing events, 30 seated</p>
              </div>
              <div className="bg-card rounded-lg p-4">
                <h3 className="font-semibold mb-2">Layout</h3>
                <p className="text-muted-foreground">Flexible open-plan space with moveable furniture</p>
              </div>
              <div className="bg-card rounded-lg p-4">
                <h3 className="font-semibold mb-2">Catering</h3>
                <p className="text-muted-foreground">Full kitchen facilities available for events</p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-6 text-accent">Available Equipment</h2>
            <ul className="space-y-3">
              {[
                "PIONEER XDJ-XZ DJ controller",
                "Professional sound system",
                "Wireless microphones",
                "Projection capabilities",
                "Comfortable seating areas",
                "Kitchen and bar facilities",
                "High-speed WiFi",
                "Climate control"
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
          <h2 className="text-2xl font-bold mb-4">Ready to Host Your Event?</h2>
          <p className="text-muted-foreground mb-8">Book our creative lounge and make your event memorable</p>
          <Link href="/contact">
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground px-8 py-4 text-lg hover:bg-primary/90"
              data-testid="button-book-event"
            >
              Book Event Space
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
