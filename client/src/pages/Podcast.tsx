import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Mic, Video, Monitor, Headphones } from "lucide-react";

export default function Podcast() {
  const equipment = [
    {
      name: "Shure SM7B Microphones",
      description: "Broadcast-quality dynamic microphones for crystal-clear vocal capture",
      icon: Mic,
      detail: "The industry standard for podcasting and broadcasting. Exceptional noise rejection and smooth, warm sound that makes every voice sound professional."
    },
    {
      name: "RØDECaster Pro",
      description: "Integrated podcast production studio with intuitive controls",
      icon: Monitor,
      detail: "All-in-one solution for podcast recording, mixing, and processing. Built-in sound effects, phone integration, and seamless recording workflow."
    },
    {
      name: "ATEM Mini Pro",
      description: "Live production switcher for professional video podcasting",
      icon: Video,
      detail: "Seamlessly switch between multiple camera angles, add graphics, and stream live to multiple platforms simultaneously with broadcast-quality results."
    },
    {
      name: "Multi-camera Setup",
      description: "Professional video recording capabilities with multiple angles",
      icon: Headphones,
      detail: "Multiple Sony FX cameras positioned for dynamic conversations. Capture every expression and gesture with cinematic quality."
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Pre-Production",
      description: "Consultation and setup planning",
      details: ["Show concept development", "Technical requirements", "Guest coordination", "Content strategy"]
    },
    {
      step: "02", 
      title: "Recording",
      description: "Professional multi-camera recording session",
      details: ["Live multi-camera switching", "Professional audio mixing", "Real-time monitoring", "Backup recording systems"]
    },
    {
      step: "03",
      title: "Post-Production", 
      description: "Editing, color correction, and audio mastering",
      details: ["Professional video editing", "Color grading and correction", "Audio mastering and cleanup", "Graphics and titles"]
    },
    {
      step: "04",
      title: "Delivery",
      description: "Final files ready for distribution",
      details: ["Multiple format delivery", "Platform optimization", "Thumbnail creation", "Distribution guidance"]
    }
  ];

  return (
    <div className="split-screen-layout">
      {/* Sticky Image Side */}
      <div className="split-screen-image">
        <div className="sticky-image-container">
          <div className="studio-image-placeholder">
            <div className="image-overlay">
              <h1 className="split-screen-title" data-testid="text-podcast-title">
                <span className="text-orange-accent">PODCAST</span>
                <span className="text-primary block">STUDIO</span>
              </h1>
              <p className="split-screen-subtitle">
                Multi-camera podcast setup perfect for intimate conversations and professional content creation
              </p>
            </div>
            <div className="image-placeholder-content">
              <p className="text-2xl font-bold text-primary">PODCAST STUDIO IMAGE</p>
              <p className="text-muted-foreground mt-2">Professional podcast recording environment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content Side */}
      <div className="split-screen-content">
        <div className="content-section">
          <div className="section-intro">
            <h2 className="section-title text-orange-accent" data-testid="text-podcast-equipment-title">
              PROFESSIONAL PODCAST EQUIPMENT
            </h2>
            <p className="section-description">
              Our podcast studio features broadcast-quality equipment designed specifically for 
              intimate conversations and professional content creation. Every component works 
              together to capture your authentic voice and story.
            </p>
          </div>

          <div className="equipment-grid">
            {equipment.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="equipment-card" data-testid={`podcast-equipment-${index}`}>
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
          <h2 className="section-title text-orange-accent">OUR PODCAST PRODUCTION PROCESS</h2>
          <div className="features-grid">
            {processSteps.map((step, index) => (
              <div key={index} className="feature-card" data-testid={`process-step-${index}`}>
                <div className="feature-header">
                  <div className="feature-icon">
                    <span className="text-orange-accent text-2xl font-bold">{step.step}</span>
                  </div>
                  <h3 className="feature-title">{step.title}</h3>
                </div>
                <p className="feature-description">{step.description}</p>
                <ul className="feature-details">
                  {step.details.map((detail, idx) => (
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
          <div className="cta-section">
            <h2 className="cta-title">Ready to Start Your Podcast?</h2>
            <p className="cta-description">
              Book your podcast recording session and bring your story to life with our 
              professional multi-camera setup and broadcast-quality audio.
            </p>
            <Link href="/contact">
              <Button 
                size="lg" 
                className="btn-orange-accent px-8 py-4 text-lg"
                data-testid="button-book-podcast"
              >
                Book Podcast Session
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
