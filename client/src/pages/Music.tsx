import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Mic, Sliders, Monitor, Volume2 } from "lucide-react";

export default function Music() {
  const equipment = [
    {
      name: "Neve 1073DPX",
      description: "Industry-standard preamp and EQ for that legendary Neve sound",
      icon: Mic,
      detail: "The holy grail of preamps, used on countless classic recordings. Warm, musical EQ that adds character to any source."
    },
    {
      name: "Tube-Tech CL 1B",
      description: "Vintage-style optical compressor for smooth, musical compression",
      icon: Sliders,
      detail: "Classic tube compression that glues mixes together. Perfect for vocals, bass, and mix bus processing."
    },
    {
      name: "SSL Sigma",
      description: "Professional mixing console with that unmistakable SSL sound",
      icon: Monitor,
      detail: "Industry-standard mixing console trusted by top engineers worldwide. Clean, punchy, and reliable."
    },
    {
      name: "U87 & Focal Trio6",
      description: "Premium microphones and studio monitors for pristine audio capture and playback",
      icon: Volume2,
      detail: "The legendary U87 microphone paired with Focal's reference monitors ensure your recordings sound exactly as intended."
    }
  ];

  const features = [
    {
      title: "Professional Grade",
      description: "Industry-standard equipment used by top artists worldwide",
      icon: Mic,
      details: ["Neve 1073DPX preamps", "SSL Sigma mixing console", "Tube-Tech compression", "U87 microphones"]
    },
    {
      title: "Acoustically Treated",
      description: "Professionally designed space for optimal sound recording",
      icon: Volume2,
      details: ["Bass traps and acoustic panels", "Floating floor construction", "Isolated control room", "Perfect acoustics for any genre"]
    },
    {
      title: "Complete Setup",
      description: "Everything you need for recording, mixing, and production",
      icon: Monitor,
      details: ["Full Pro Tools rig", "Extensive plugin library", "MIDI controllers", "Reference monitoring"]
    }
  ];

  return (
    <div className="split-screen-layout">
      {/* Sticky Image Side */}
      <div className="split-screen-image">
        <div className="sticky-image-container">
          <div className="studio-image-placeholder">
            <div className="image-overlay">
              <h1 className="split-screen-title" data-testid="text-music-title">
                <span className="text-orange-accent">MUSIC</span>
                <span className="text-primary block">RECORDING STUDIO</span>
              </h1>
              <p className="split-screen-subtitle">
                Professional recording space with industry-standard equipment
              </p>
            </div>
            <div className="image-placeholder-content">
              <p className="text-2xl font-bold text-primary">RECORDING STUDIO IMAGE</p>
              <p className="text-muted-foreground mt-2">Professional recording environment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content Side */}
      <div className="split-screen-content">
        <div className="content-section">
          <div className="section-intro">
            <h2 className="section-title text-orange-accent" data-testid="text-equipment-title">
              PROFESSIONAL EQUIPMENT
            </h2>
            <p className="section-description">
              Every piece of gear in our studio has been carefully selected for its sonic character 
              and proven track record in professional music production.
            </p>
          </div>

          <div className="equipment-grid">
            {equipment.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="equipment-card" data-testid={`equipment-${index}`}>
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
          <h2 className="section-title text-orange-accent">WHAT MAKES OUR STUDIO SPECIAL</h2>
          <div className="features-grid">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="feature-card">
                  <div className="feature-header">
                    <div className="feature-icon">
                      <IconComponent className="text-orange-accent w-8 h-8" />
                    </div>
                    <h3 className="feature-title">{feature.title}</h3>
                  </div>
                  <p className="feature-description">{feature.description}</p>
                  <ul className="feature-details">
                    {feature.details.map((detail, idx) => (
                      <li key={idx} className="feature-detail-item">
                        <div className="detail-bullet"></div>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        <div className="content-section">
          <div className="cta-section">
            <h2 className="cta-title">Ready to Record?</h2>
            <p className="cta-description">
              Book your session and bring your musical vision to life in our professionally 
              designed recording environment.
            </p>
            <Link href="/contact">
              <Button 
                size="lg" 
                className="btn-orange-accent px-8 py-4 text-lg"
                data-testid="button-book-recording"
              >
                Book Recording Session
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
