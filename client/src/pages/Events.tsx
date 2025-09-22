import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Users, Music, Mic, Coffee } from "lucide-react";

export default function Events() {
  const spaces = [
    {
      name: "Creative Lounge",
      description: "Open, relaxed space perfect for creative collaboration and intimate gatherings",
      icon: Users,
      detail: "Flexible, comfortable environment designed for artists to connect, collaborate, and create together. Perfect for fostering community and creative energy."
    },
    {
      name: "PIONEER XDJ-XZ",
      description: "Professional DJ controller for events, parties, and listening sessions",
      icon: Music,
      detail: "Industry-standard 4-channel DJ system with rekordbox compatibility, perfect for DJs of all levels and high-quality music playback for any event."
    },
    {
      name: "Full Sound System",
      description: "High-quality audio setup for any event size from intimate to energetic",
      icon: Mic,
      detail: "Professional-grade speakers and audio equipment that can adapt from quiet background music to full party volume while maintaining crystal clear sound quality."
    },
    {
      name: "Kitchen Facilities",
      description: "Complete kitchen for catering, refreshments, and community dining",
      icon: Coffee,
      detail: "Fully equipped kitchen allows for event catering, community meals, and creative collaborations around food and hospitality."
    }
  ];

  const eventTypes = [
    {
      title: "Listening Parties",
      description: "Album launches and music showcases",
      details: ["Album release events", "Artist showcases", "Music discovery sessions", "Community listening experiences"]
    },
    {
      title: "Creative Workshops",
      description: "Skill sharing and collaborative learning sessions",
      details: ["Music production workshops", "Creative writing sessions", "Art and design meetups", "Industry talks and panels"]
    },
    {
      title: "Intimate Events",
      description: "Small gatherings and special occasions",
      details: ["Private celebrations", "Acoustic performances", "Poetry readings", "Community gatherings"]
    },
    {
      title: "Brand Activations",
      description: "Product launches and marketing events",
      details: ["Product launches", "Brand partnerships", "Marketing activations", "Corporate events"]
    }
  ];

  return (
    <div className="split-screen-layout">
      {/* Sticky Image Side */}
      <div className="split-screen-image">
        <div className="sticky-image-container">
          <div className="studio-image-placeholder">
            <div className="image-overlay">
              <h1 className="split-screen-title" data-testid="text-events-title">
                <span className="text-orange-accent">EVENTS</span>
                <span className="text-primary block">CREATIVE LOUNGE</span>
              </h1>
              <p className="split-screen-subtitle">
                Open, relaxed space for rehearsals, writing, workshops, intimate events, listening parties, activations or just hanging out
              </p>
            </div>
            <div className="image-placeholder-content">
              <p className="text-2xl font-bold text-primary">CREATIVE LOUNGE IMAGE</p>
              <p className="text-muted-foreground mt-2">Community creative space</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content Side */}
      <div className="split-screen-content">
        <div className="content-section">
          <div className="section-intro">
            <h2 className="section-title text-orange-accent" data-testid="text-lounge-features-title">
              LOUNGE FEATURES
            </h2>
            <p className="section-description">
              Our creative lounge is more than just an event space - it's a community hub where 
              artists connect, collaborate, and celebrate together. Every detail is designed to 
              foster creativity and authentic connection.
            </p>
          </div>

          <div className="equipment-grid">
            {spaces.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="equipment-card" data-testid={`lounge-feature-${index}`}>
                  <div className="equipment-header">
                    <div className="equipment-icon">
                      <IconComponent className="text-orange-accent w-6 h-6" />
                    </div>
                    <h3 className="equipment-name">{item.name}</h3>
                  </div>
                  <p className="equipment-description">{item.description}</p>
                  <p className="equipment-detail">{item.detail}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="content-section">
          <h2 className="section-title text-orange-accent">PERFECT EVENTS FOR OUR SPACE</h2>
          <div className="features-grid">
            {eventTypes.map((event, index) => (
              <div key={index} className="feature-card">
                <div className="feature-header">
                  <div className="feature-icon">
                    <Users className="text-orange-accent w-8 h-8" />
                  </div>
                  <h3 className="feature-title">{event.title}</h3>
                </div>
                <p className="feature-description">{event.description}</p>
                <ul className="feature-details">
                  {event.details.map((detail, idx) => (
                    <li key={idx} className="feature-detail-item">
                      <div className="detail-bullet"></div>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="content-section">
          <h2 className="section-title text-orange-accent">SPACE DETAILS</h2>
          <div className="tech-specs-grid">
            <div className="tech-spec-card">
              <h3 className="tech-spec-title">Capacity</h3>
              <p className="tech-spec-detail">Up to 50 people standing, 30 seated comfortably</p>
            </div>
            <div className="tech-spec-card">
              <h3 className="tech-spec-title">Layout</h3>
              <p className="tech-spec-detail">Flexible open-plan with moveable furniture</p>
            </div>
            <div className="tech-spec-card">
              <h3 className="tech-spec-title">Kitchen</h3>
              <p className="tech-spec-detail">Full catering facilities and refreshment setup</p>
            </div>
            <div className="tech-spec-card">
              <h3 className="tech-spec-title">Equipment</h3>
              <p className="tech-spec-detail">Professional sound, DJ setup, projection</p>
            </div>
          </div>
        </div>

        <div className="content-section">
          <div className="cta-section">
            <h2 className="cta-title">Ready to Host Your Event?</h2>
            <p className="cta-description">
              Book our creative lounge and create meaningful connections in a space designed 
              for artists, by artists. Make your event truly memorable.
            </p>
            <Link href="/contact">
              <Button 
                size="lg" 
                className="btn-orange-accent px-8 py-4 text-lg"
                data-testid="button-book-event"
              >
                Book Event Space
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
