import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Camera, Lightbulb, Monitor, Square } from "lucide-react";

export default function Photography() {
  const features = [
    {
      name: "3m x 7.5m Cyclorama",
      description: "Spacious curved backdrop for seamless photography and infinite horizon effects",
      icon: Square,
      detail: "Professional curved wall construction eliminates harsh corners and creates perfect infinity backgrounds for portraits, products, and creative projects."
    },
    {
      name: "Professional Lighting System",
      description: "Complete lighting kit with strobes, continuous lights, and modifiers",
      icon: Lightbulb,
      detail: "High-end Profoto and Godox lighting equipment with softboxes, beauty dishes, and reflectors to achieve any lighting style you envision."
    },
    {
      name: "Epson Projector",
      description: "High-resolution projection system for creative backgrounds and effects",
      icon: Monitor,
      detail: "4K projection capabilities allow for dynamic backgrounds, mood lighting, and creative visual effects that transform your photos."
    },
    {
      name: "Flexible Setup",
      description: "Adaptable space configuration for any photography requirement",
      icon: Camera,
      detail: "Modular lighting setup and moveable equipment allow for quick reconfiguration between portrait, product, fashion, and commercial shoots."
    }
  ];

  const photographyTypes = [
    {
      title: "Portrait Sessions",
      description: "Professional headshots and portrait photography",
      details: ["Corporate headshots", "Personal branding", "Actor portfolios", "Creative portraits"]
    },
    {
      title: "Product Photography",
      description: "Clean, professional product shots with flexible lighting",
      details: ["E-commerce products", "Catalog photography", "Fashion accessories", "Technical products"]
    },
    {
      title: "Creative Projects",
      description: "Fashion, art, and experimental photography",
      details: ["Fashion editorials", "Art photography", "Conceptual shoots", "Commercial campaigns"]
    }
  ];

  const specifications = [
    {
      title: "Cyclorama Dimensions",
      detail: "3 meters wide × 7.5 meters long curved backdrop"
    },
    {
      title: "Lighting Power",
      detail: "Up to 2400W of flash power with HSS capability"
    },
    {
      title: "Projection Resolution",
      detail: "4K UHD projection with 3000 lumens brightness"
    },
    {
      title: "Color Temperature",
      detail: "Adjustable from 2700K-6500K for any lighting scenario"
    }
  ];

  return (
    <div className="split-screen-layout">
      {/* Sticky Image Side */}
      <div className="split-screen-image">
        <div className="sticky-image-container">
          <div className="studio-image-placeholder">
            <div className="image-overlay">
              <h1 className="split-screen-title" data-testid="text-photography-title">
                <span className="text-orange-accent">PHOTOGRAPHY</span>
                <span className="text-primary block">STUDIO</span>
              </h1>
              <p className="split-screen-subtitle">
                Spacious cyclorama studio with professional lighting for all your creative visual projects
              </p>
            </div>
            <div className="image-placeholder-content">
              <p className="text-2xl font-bold text-primary">PHOTOGRAPHY STUDIO IMAGE</p>
              <p className="text-muted-foreground mt-2">Professional photography environment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content Side */}
      <div className="split-screen-content">
        <div className="content-section">
          <div className="section-intro">
            <h2 className="section-title text-orange-accent" data-testid="text-photography-features-title">
              STUDIO FEATURES
            </h2>
            <p className="section-description">
              Our photography studio combines cutting-edge technology with professional-grade 
              equipment to create the perfect environment for any visual project. From intimate 
              portraits to large-scale commercial shoots.
            </p>
          </div>

          <div className="equipment-grid">
            {features.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="equipment-card" data-testid={`photography-feature-${index}`}>
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
          <h2 className="section-title text-orange-accent">PERFECT FOR</h2>
          <div className="features-grid">
            {photographyTypes.map((type, index) => (
              <div key={index} className="feature-card">
                <div className="feature-header">
                  <div className="feature-icon">
                    <Camera className="text-orange-accent w-8 h-8" />
                  </div>
                  <h3 className="feature-title">{type.title}</h3>
                </div>
                <p className="feature-description">{type.description}</p>
                <ul className="feature-details">
                  {type.details.map((detail, idx) => (
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
          <h2 className="section-title text-orange-accent">TECHNICAL SPECIFICATIONS</h2>
          <div className="tech-specs-grid">
            {specifications.map((spec, index) => (
              <div key={index} className="tech-spec-card">
                <h3 className="tech-spec-title">{spec.title}</h3>
                <p className="tech-spec-detail">{spec.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="content-section">
          <div className="cta-section">
            <h2 className="cta-title">Ready for Your Shoot?</h2>
            <p className="cta-description">
              Book your photography session and create stunning visuals in our professionally 
              equipped cyclorama studio with infinite creative possibilities.
            </p>
            <Link href="/contact">
              <Button 
                size="lg" 
                className="btn-orange-accent px-8 py-4 text-lg"
                data-testid="button-book-photography"
              >
                Book Photography Session
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
